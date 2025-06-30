import jsonld from "jsonld";
import { Api } from "../Api.js";
import { Field } from "../Field.js";
import { Resource } from "../Resource.js";
import { Operation } from "../Operation.js";
import fetchJsonLd from "./fetchJsonLd.js";
import getParameters from "./getParameters.js";
import getType from "./getType.js";
import type { OperationType } from "../Operation.js";
import type { Parameter } from "../Parameter.js";
import type {
  ExpandedClass,
  ExpandedDoc,
  Entrypoint,
  ExpandedOperation,
  ExpandedRdfProperty,
} from "./types.js";
import type { RequestInitExtended } from "../types.js";

/**
 * Extracts the short name of a resource.
 */
function guessNameFromUrl(url: string, entrypointUrl: string): string {
  return url.slice(entrypointUrl.length + 1);
}

function getTitleOrLabel(obj: ExpandedOperation): string {
  const a =
    obj["http://www.w3.org/2000/01/rdf-schema#label"] ??
    obj["http://www.w3.org/ns/hydra/core#title"] ??
    null;

  if (a === null) {
    throw new Error("No title nor label defined on this operation.");
  }

  return a[0]["@value"];
}

/**
 * Finds the description of the class with the given id.
 */
function findSupportedClass(
  docs: ExpandedDoc[],
  classToFind: string,
): ExpandedClass {
  const supportedClasses =
    docs?.[0]?.["http://www.w3.org/ns/hydra/core#supportedClass"];
  if (!Array.isArray(supportedClasses)) {
    throw new TypeError(
      'The API documentation has no "http://www.w3.org/ns/hydra/core#supportedClass" key or its value is not an array.',
    );
  }

  for (const supportedClass of supportedClasses) {
    if (supportedClass["@id"] === classToFind) {
      return supportedClass;
    }
  }

  throw new Error(
    `The class "${classToFind}" is not defined in the API documentation.`,
  );
}

export function getDocumentationUrlFromHeaders(headers: Headers): string {
  const linkHeader = headers.get("Link");
  if (!linkHeader) {
    throw new Error('The response has no "Link" HTTP header.');
  }

  const matches =
    /<([^<]+)>; rel="http:\/\/www.w3.org\/ns\/hydra\/core#apiDocumentation"/.exec(
      linkHeader,
    );
  if (matches === null) {
    throw new Error(
      'The "Link" HTTP header is not of the type "http://www.w3.org/ns/hydra/core#apiDocumentation".',
    );
  }

  if (typeof matches[1] !== "string") {
    throw new TypeError(
      'The "Link" HTTP header does not contain a documentation URL.',
    );
  }

  return matches[1];
}

/**
 * Retrieves Hydra's entrypoint and API docs.
 */
async function fetchEntrypointAndDocs(
  entrypointUrl: string,
  options: RequestInitExtended = {},
): Promise<{
  entrypointUrl: string;
  docsUrl: string;
  response: Response;
  entrypoint: Entrypoint[];
  docs: ExpandedDoc[];
}> {
  async function documentLoader(input: string) {
    const response = await fetchJsonLd(input, options);
    if (!("body" in response)) {
      throw new Error(
        "An empty response was received when expanding documentation or entrypoint JSON-LD documents.",
      );
    }
    return response;
  }

  try {
    const d = await fetchJsonLd(entrypointUrl, options);
    if (!("body" in d)) {
      throw new Error("An empty response was received for the entrypoint URL.");
    }
    const entrypointJsonLd = d.body;
    const docsUrl = getDocumentationUrlFromHeaders(d.response.headers);

    const docsResponse = await fetchJsonLd(docsUrl, options);
    if (!("body" in docsResponse)) {
      throw new Error(
        "An empty response was received for the documentation URL.",
      );
    }
    const docsJsonLd = docsResponse.body;

    const [docs, entrypoint] = (await Promise.all([
      jsonld.expand(docsJsonLd, {
        base: docsUrl,
        documentLoader,
      }),
      jsonld.expand(entrypointJsonLd, {
        base: entrypointUrl,
        documentLoader,
      }),
    ])) as unknown as [ExpandedDoc[], Entrypoint[]];

    return {
      entrypointUrl,
      docsUrl,
      entrypoint,
      response: d.response,
      docs,
    };
  } catch (error) {
    const { response } = error as { response: Response };
    // oxlint-disable-next-line no-throw-literal
    throw {
      api: new Api(entrypointUrl, { resources: [] }),
      error,
      response,
      status: response?.status,
    };
  }
}

function removeTrailingSlash(url: string): string {
  if (url.endsWith("/")) {
    url = url.slice(0, -1);
  }

  return url;
}

function findRelatedClass(
  docs: ExpandedDoc[],
  property: ExpandedRdfProperty,
): ExpandedClass {
  // Use the entrypoint property's owl:equivalentClass if available

  for (const range of property["http://www.w3.org/2000/01/rdf-schema#range"] ??
    []) {
    const equivalentClass =
      "http://www.w3.org/2002/07/owl#equivalentClass" in range
        ? range?.["http://www.w3.org/2002/07/owl#equivalentClass"]?.[0]
        : undefined;

    if (!equivalentClass) {
      continue;
    }

    const onProperty =
      equivalentClass["http://www.w3.org/2002/07/owl#onProperty"]?.[0]?.["@id"];
    const allValuesFrom =
      equivalentClass["http://www.w3.org/2002/07/owl#allValuesFrom"]?.[0]?.[
        "@id"
      ];

    if (
      allValuesFrom &&
      onProperty === "http://www.w3.org/ns/hydra/core#member"
    ) {
      return findSupportedClass(docs, allValuesFrom);
    }
  }

  // As a fallback, find an operation available on the property of the entrypoint returning the searched type (usually POST)
  for (const entrypointSupportedOperation of property[
    "http://www.w3.org/ns/hydra/core#supportedOperation"
  ] || []) {
    if (
      !entrypointSupportedOperation["http://www.w3.org/ns/hydra/core#returns"]
    ) {
      continue;
    }

    const returns =
      entrypointSupportedOperation?.[
        "http://www.w3.org/ns/hydra/core#returns"
      ]?.[0]?.["@id"];
    if (
      typeof returns === "string" &&
      returns.indexOf("http://www.w3.org/ns/hydra/core") !== 0
    ) {
      return findSupportedClass(docs, returns);
    }
  }

  throw new Error(`Cannot find the class related to ${property["@id"]}.`);
}

/**
 * Parses Hydra documentation and converts it to an intermediate representation.
 */
export default async function parseHydraDocumentation(
  entrypointUrl: string,
  options: RequestInitExtended = {},
): Promise<{
  api: Api;
  response: Response;
  status: number;
}> {
  entrypointUrl = removeTrailingSlash(entrypointUrl);

  const { entrypoint, docs, response } = await fetchEntrypointAndDocs(
    entrypointUrl,
    options,
  );

  const resources = [],
    fields = [],
    operations = [];
  const title =
    docs?.[0]?.["http://www.w3.org/ns/hydra/core#title"]?.[0]?.["@value"] ??
    "API Platform";

  const entrypointType = entrypoint?.[0]?.["@type"]?.[0];
  if (!entrypointType) {
    throw new Error('The API entrypoint has no "@type" key.');
  }

  const entrypointClass = findSupportedClass(docs, entrypointType);
  if (
    !Array.isArray(
      entrypointClass["http://www.w3.org/ns/hydra/core#supportedProperty"],
    )
  ) {
    throw new TypeError(
      'The entrypoint definition has no "http://www.w3.org/ns/hydra/core#supportedProperty" key or it is not an array.',
    );
  }

  // Add resources
  for (const properties of entrypointClass[
    "http://www.w3.org/ns/hydra/core#supportedProperty"
  ]) {
    const readableFields = [],
      resourceFields = [],
      writableFields = [],
      resourceOperations = [];

    const property =
      properties?.["http://www.w3.org/ns/hydra/core#property"]?.[0];
    const propertyIri = property?.["@id"];

    if (!property || !propertyIri) {
      continue;
    }

    const resourceProperty = entrypoint?.[0]?.[propertyIri]?.[0];

    const url =
      typeof resourceProperty === "object"
        ? resourceProperty["@id"]
        : undefined;

    if (!url) {
      console.error(
        new Error(
          `Unable to find the URL for "${propertyIri}" in the entrypoint, make sure your API resource has at least one GET collection operation declared.`,
        ),
      );
      continue;
    }

    // Add fields
    const relatedClass = findRelatedClass(docs, property);
    for (const supportedProperties of relatedClass?.[
      "http://www.w3.org/ns/hydra/core#supportedProperty"
    ] ?? []) {
      const supportedProperty =
        supportedProperties?.["http://www.w3.org/ns/hydra/core#property"]?.[0];
      const id = supportedProperty?.["@id"];
      const range =
        supportedProperty?.[
          "http://www.w3.org/2000/01/rdf-schema#range"
        ]?.[0]?.["@id"] ?? null;

      const field = new Field(
        supportedProperties?.["http://www.w3.org/ns/hydra/core#title"]?.[0]?.[
          "@value"
        ] ??
          supportedProperty?.[
            "http://www.w3.org/2000/01/rdf-schema#label"
          ]?.[0]?.["@value"],
        {
          id,
          range,
          type: getType(id, range),
          reference:
            supportedProperty?.["@type"]?.[0] ===
            "http://www.w3.org/ns/hydra/core#Link"
              ? range // Will be updated in a subsequent pass
              : null,
          embedded:
            supportedProperty?.["@type"]?.[0] ===
            "http://www.w3.org/ns/hydra/core#Link"
              ? null
              : (range as unknown as Resource), // Will be updated in a subsequent pass
          required:
            supportedProperties?.[
              "http://www.w3.org/ns/hydra/core#required"
            ]?.[0]?.["@value"] ?? false,
          description:
            supportedProperties?.[
              "http://www.w3.org/ns/hydra/core#description"
            ]?.[0]?.["@value"] ?? "",
          maxCardinality:
            supportedProperty?.[
              "http://www.w3.org/2002/07/owl#maxCardinality"
            ]?.[0]?.["@value"] ?? null,
          deprecated:
            supportedProperties?.[
              "http://www.w3.org/2002/07/owl#deprecated"
            ]?.[0]?.["@value"] ?? false,
        },
      );

      fields.push(field);
      resourceFields.push(field);

      if (
        supportedProperties?.[
          "http://www.w3.org/ns/hydra/core#readable"
        ]?.[0]?.["@value"]
      ) {
        readableFields.push(field);
      }

      if (
        supportedProperties?.[
          "http://www.w3.org/ns/hydra/core#writeable"
        ]?.[0]?.["@value"] ||
        supportedProperties?.[
          "http://www.w3.org/ns/hydra/core#writable"
        ]?.[0]?.["@value"]
      ) {
        writableFields.push(field);
      }
    }

    // parse entrypoint's operations (a.k.a. collection operations)
    if (property["http://www.w3.org/ns/hydra/core#supportedOperation"]) {
      for (const entrypointOperation of property[
        "http://www.w3.org/ns/hydra/core#supportedOperation"
      ]) {
        if (!entrypointOperation["http://www.w3.org/ns/hydra/core#returns"]) {
          continue;
        }

        const range =
          entrypointOperation["http://www.w3.org/ns/hydra/core#returns"]?.[0]?.[
            "@id"
          ];
        const method =
          entrypointOperation["http://www.w3.org/ns/hydra/core#method"]?.[0]?.[
            "@value"
          ];
        let type: OperationType = "list";
        if (method === "POST") {
          type = "create";
        }
        const operation = new Operation(
          getTitleOrLabel(entrypointOperation),
          type,
          {
            method,
            expects:
              entrypointOperation[
                "http://www.w3.org/ns/hydra/core#expects"
              ]?.[0]?.["@id"],
            returns: range,
            types: entrypointOperation["@type"],
            deprecated:
              entrypointOperation?.[
                "http://www.w3.org/2002/07/owl#deprecated"
              ]?.[0]?.["@value"] ?? false,
          },
        );

        resourceOperations.push(operation);
        operations.push(operation);
      }
    }

    // parse resource operations (a.k.a. item operations)
    for (const supportedOperation of relatedClass[
      "http://www.w3.org/ns/hydra/core#supportedOperation"
    ] || []) {
      if (!supportedOperation["http://www.w3.org/ns/hydra/core#returns"]) {
        continue;
      }

      const range =
        supportedOperation["http://www.w3.org/ns/hydra/core#returns"]?.[0]?.[
          "@id"
        ];
      const method =
        supportedOperation["http://www.w3.org/ns/hydra/core#method"]?.[0]?.[
          "@value"
        ];
      let type: OperationType = "show";
      if (method === "POST") {
        type = "create";
      }
      if (method === "PUT" || method === "PATCH") {
        type = "edit";
      }
      if (method === "DELETE") {
        type = "delete";
      }
      const operation = new Operation(
        getTitleOrLabel(supportedOperation),
        type,
        {
          method,
          expects:
            supportedOperation[
              "http://www.w3.org/ns/hydra/core#expects"
            ]?.[0]?.["@id"],
          returns: range,
          types: supportedOperation["@type"],
          deprecated:
            supportedOperation?.[
              "http://www.w3.org/2002/07/owl#deprecated"
            ]?.[0]?.["@value"] ?? false,
        },
      );

      resourceOperations.push(operation);
      operations.push(operation);
    }

    const resource = new Resource(guessNameFromUrl(url, entrypointUrl), url, {
      id: relatedClass["@id"],
      title:
        relatedClass?.["http://www.w3.org/ns/hydra/core#title"]?.[0]?.[
          "@value"
        ] ?? "",
      fields: resourceFields,
      readableFields,
      writableFields,
      operations: resourceOperations,
      deprecated:
        relatedClass?.["http://www.w3.org/2002/07/owl#deprecated"]?.[0]?.[
          "@value"
        ] ?? false,
    });

    resource.parameters = [];
    resource.getParameters = (): Promise<Parameter[]> =>
      getParameters(resource, options);

    resources.push(resource);
  }

  // Resolve references and embedded
  for (const field of fields) {
    if (field.reference !== null) {
      field.reference =
        resources.find((resource) => resource.id === field.reference) || null;
    }
    if (field.embedded !== null) {
      field.embedded =
        resources.find((resource) => resource.id === field.embedded) || null;
    }
  }

  return {
    api: new Api(entrypointUrl, { title, resources }),
    response,
    status: response.status,
  };
}
