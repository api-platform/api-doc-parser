import jsonld from "jsonld";
import get from "lodash.get";
import { Api } from "../Api";
import { Field } from "../Field";
import { Resource } from "../Resource";
import { Operation } from "../Operation";
import { Parameter } from "../Parameter";
import fetchJsonLd from "./fetchJsonLd";
import getParameters from "./getParameters";

/**
 * Extracts the short name of a resource.
 */
function guessNameFromUrl(url: string, entrypointUrl: string): string {
  return url.substr(entrypointUrl.length + 1);
}

/**
 * Finds the description of the class with the given id.
 */
function findSupportedClass(
  docs: any[],
  classToFind: string
): Record<string, any> {
  const supportedClasses = get(
    docs,
    '[0]["http://www.w3.org/ns/hydra/core#supportedClass"]'
  );
  if (!Array.isArray(supportedClasses)) {
    throw new Error(
      'The API documentation has no "http://www.w3.org/ns/hydra/core#supportedClass" key or its value is not an array.'
    );
  }

  for (const supportedClass of supportedClasses) {
    if (supportedClass["@id"] === classToFind) {
      return supportedClass;
    }
  }

  throw new Error(
    `The class "${classToFind}" is not defined in the API documentation.`
  );
}

export function getDocumentationUrlFromHeaders(headers: Headers): string {
  const linkHeader = headers.get("Link");
  if (!linkHeader) {
    throw new Error('The response has no "Link" HTTP header.');
  }

  const matches = /<(.+)>; rel="http:\/\/www.w3.org\/ns\/hydra\/core#apiDocumentation"/.exec(
    linkHeader
  );
  if (matches === null) {
    throw new Error(
      'The "Link" HTTP header is not of the type "http://www.w3.org/ns/hydra/core#apiDocumentation".'
    );
  }

  return matches[1];
}

/**
 * Retrieves Hydra's entrypoint and API docs.
 */
async function fetchEntrypointAndDocs(
  entrypointUrl: string,
  options: RequestInitExtended = {}
): Promise<{
  entrypointUrl: string;
  docsUrl: string;
  response: Response;
  entrypoint: any;
  docs: any;
}> {
  const d = await fetchJsonLd(entrypointUrl, options);
  const docsUrl = getDocumentationUrlFromHeaders(d.response.headers);

  // @TODO this is suspect according to the jsonld type defs
  const documentLoader = (input: string): Promise<any /* RemoteDocument */> =>
    fetchJsonLd(input, options);

  const docsJsonLd = (await fetchJsonLd(docsUrl, options)).body;

  const [docs, entrypoint] = await Promise.all([
    jsonld.expand(docsJsonLd, {
      base: docsUrl,
      documentLoader
    }),
    jsonld.expand(d.body, {
      base: entrypointUrl,
      documentLoader
    })
  ]);

  return {
    entrypointUrl,
    docsUrl,
    entrypoint,
    response: d.response,
    docs
  };
}

function removeTrailingSlash(url: string): string {
  if (url.endsWith("/")) {
    url = url.slice(0, -1);
  }

  return url;
}

function findRelatedClass(
  docs: any,
  property: Record<string, any>
): Record<string, any> {
  // Use the entrypoint property's owl:equivalentClass if available
  if (Array.isArray(property["http://www.w3.org/2000/01/rdf-schema#range"])) {
    for (const range of property[
      "http://www.w3.org/2000/01/rdf-schema#range"
    ]) {
      const onProperty = get(
        range,
        '["http://www.w3.org/2002/07/owl#equivalentClass"][0]["http://www.w3.org/2002/07/owl#onProperty"][0]["@id"]'
      );
      const allValuesFrom = get(
        range,
        '["http://www.w3.org/2002/07/owl#equivalentClass"][0]["http://www.w3.org/2002/07/owl#allValuesFrom"][0]["@id"]'
      );

      if (
        allValuesFrom &&
        "http://www.w3.org/ns/hydra/core#member" === onProperty
      ) {
        return findSupportedClass(docs, allValuesFrom);
      }
    }
  }

  // As a fallback, find an operation available on the property of the entrypoint returning the searched type (usually POST)
  for (const entrypointSupportedOperation of property[
    "http://www.w3.org/ns/hydra/core#supportedOperation"
  ]) {
    if (
      !entrypointSupportedOperation["http://www.w3.org/ns/hydra/core#returns"]
    ) {
      continue;
    }

    const returns = get(
      entrypointSupportedOperation,
      '["http://www.w3.org/ns/hydra/core#returns"][0]["@id"]'
    );
    if (
      "string" === typeof returns &&
      0 !== returns.indexOf("http://www.w3.org/ns/hydra/core")
    ) {
      return findSupportedClass(docs, returns);
    }
  }

  throw new Error(`Cannot find the class related to ${property["@id"]}.`);
}

/**
 * Parses Hydra documentation and converts it to an intermediate representation.
 */
export default function parseHydraDocumentation(
  entrypointUrl: string,
  options: RequestInitExtended = {}
): Promise<{
  api: Api;
  response: Response;
  status: number;
}> {
  entrypointUrl = removeTrailingSlash(entrypointUrl);

  return fetchEntrypointAndDocs(entrypointUrl, options).then(
    ({ entrypoint, docs, response }) => {
      const resources = [],
        fields = [],
        operations = [];
      const title = get(
        docs,
        '[0]["http://www.w3.org/ns/hydra/core#title"][0]["@value"]',
        "API Platform"
      );

      const entrypointType = get(entrypoint, '[0]["@type"][0]');
      if (!entrypointType) {
        throw new Error('The API entrypoint has no "@type" key.');
      }

      const entrypointClass = findSupportedClass(docs, entrypointType);
      if (
        !Array.isArray(
          entrypointClass["http://www.w3.org/ns/hydra/core#supportedProperty"]
        )
      ) {
        throw new Error(
          'The entrypoint definition has no "http://www.w3.org/ns/hydra/core#supportedProperty" key or it is not an array.'
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

        const property = get(
          properties,
          '["http://www.w3.org/ns/hydra/core#property"][0]'
        );
        if (!property) {
          continue;
        }

        // Add fields
        const relatedClass = findRelatedClass(docs, property);
        for (const supportedProperties of relatedClass[
          "http://www.w3.org/ns/hydra/core#supportedProperty"
        ]) {
          const supportedProperty = get(
            supportedProperties,
            '["http://www.w3.org/ns/hydra/core#property"][0]'
          );
          const range = get(
            supportedProperty,
            '["http://www.w3.org/2000/01/rdf-schema#range"][0]["@id"]',
            null
          );

          const field = new Field(
            supportedProperty["http://www.w3.org/2000/01/rdf-schema#label"][0][
              "@value"
            ],
            {
              id: supportedProperty["@id"],
              range: range,
              reference:
                "http://www.w3.org/ns/hydra/core#Link" ===
                get(supportedProperty, '["@type"][0]')
                  ? range // Will be updated in a subsequent pass
                  : null,
              embedded:
                "http://www.w3.org/ns/hydra/core#Link" !==
                get(supportedProperty, '["@type"][0]')
                  ? range // Will be updated in a subsequent pass
                  : null,
              required: get(
                supportedProperties,
                '["http://www.w3.org/ns/hydra/core#required"][0]["@value"]',
                false
              ),
              description: get(
                supportedProperties,
                '["http://www.w3.org/ns/hydra/core#description"][0]["@value"]',
                ""
              ),
              maxCardinality: get(
                supportedProperty,
                '["http://www.w3.org/2002/07/owl#maxCardinality"][0]["@value"]',
                null
              ),
              deprecated: get(
                supportedProperties,
                '["http://www.w3.org/2002/07/owl#deprecated"][0]["@value"]',
                false
              )
            }
          );

          fields.push(field);
          resourceFields.push(field);

          if (
            get(
              supportedProperties,
              '["http://www.w3.org/ns/hydra/core#readable"][0]["@value"]'
            )
          ) {
            readableFields.push(field);
          }

          if (
            get(
              supportedProperties,
              '["http://www.w3.org/ns/hydra/core#writeable"][0]["@value"]'
            ) ||
            get(
              supportedProperties,
              '["http://www.w3.org/ns/hydra/core#writable"][0]["@value"]'
            )
          ) {
            writableFields.push(field);
          }
        }

        // parse entrypoint's operations (a.k.a. collection operations)
        if (property["http://www.w3.org/ns/hydra/core#supportedOperation"]) {
          for (const entrypointOperation of property[
            "http://www.w3.org/ns/hydra/core#supportedOperation"
          ]) {
            if (
              !entrypointOperation["http://www.w3.org/ns/hydra/core#returns"]
            ) {
              continue;
            }

            const range =
              entrypointOperation["http://www.w3.org/ns/hydra/core#returns"][0][
                "@id"
              ];
            const operation = new Operation(
              entrypointOperation[
                "http://www.w3.org/2000/01/rdf-schema#label"
              ][0]["@value"],
              {
                method:
                  entrypointOperation[
                    "http://www.w3.org/ns/hydra/core#method"
                  ][0]["@value"],
                expects:
                  entrypointOperation[
                    "http://www.w3.org/ns/hydra/core#expects"
                  ] &&
                  entrypointOperation[
                    "http://www.w3.org/ns/hydra/core#expects"
                  ][0]["@id"],
                returns: range,
                types: entrypointOperation["@type"],
                deprecated: get(
                  entrypointOperation,
                  '["http://www.w3.org/2002/07/owl#deprecated"][0]["@value"]',
                  false
                )
              }
            );

            resourceOperations.push(operation);
            operations.push(operation);
          }
        }

        // parse resource operations (a.k.a. item operations)
        for (const supportedOperation of relatedClass[
          "http://www.w3.org/ns/hydra/core#supportedOperation"
        ]) {
          if (!supportedOperation["http://www.w3.org/ns/hydra/core#returns"]) {
            continue;
          }

          const range =
            supportedOperation["http://www.w3.org/ns/hydra/core#returns"][0][
              "@id"
            ];
          const operation = new Operation(
            supportedOperation["http://www.w3.org/2000/01/rdf-schema#label"][0][
              "@value"
            ],
            {
              method:
                supportedOperation["http://www.w3.org/ns/hydra/core#method"][0][
                  "@value"
                ],
              expects:
                supportedOperation["http://www.w3.org/ns/hydra/core#expects"] &&
                supportedOperation[
                  "http://www.w3.org/ns/hydra/core#expects"
                ][0]["@id"],
              returns: range,
              types: supportedOperation["@type"],
              deprecated: get(
                supportedOperation,
                '["http://www.w3.org/2002/07/owl#deprecated"][0]["@value"]',
                false
              )
            }
          );

          resourceOperations.push(operation);
          operations.push(operation);
        }

        const url = get(entrypoint, `[0]["${property["@id"]}"][0]["@id"]`);
        if (!url) {
          throw new Error(
            `Unable to find the URL for "${property["@id"]}", make sure your api resource has at least one GET item operation declared.`
          );
        }

        const resource = new Resource(
          guessNameFromUrl(url, entrypointUrl),
          url,
          {
            id: relatedClass["@id"],
            title: get(
              relatedClass,
              '["http://www.w3.org/ns/hydra/core#title"][0]["@value"]',
              ""
            ),
            fields: resourceFields,
            readableFields,
            writableFields,
            operations: resourceOperations,
            deprecated: get(
              relatedClass,
              '["http://www.w3.org/2002/07/owl#deprecated"][0]["@value"]',
              false
            )
          }
        );

        resource.parameters = [];
        resource.getParameters = (): Promise<Parameter[]> =>
          getParameters(resource, options);

        resources.push(resource);
      }

      // Resolve references and embedded
      for (const field of fields) {
        if (null !== field.reference) {
          field.reference =
            resources.find(resource => resource.id === field.reference) || null;
        }
        if (null !== field.embedded) {
          field.embedded =
            resources.find(resource => resource.id === field.embedded) || null;
        }
      }

      return {
        api: new Api(entrypointUrl, { title, resources }),
        response,
        status: response.status
      };
    },
    data =>
      Promise.reject({
        api: new Api(entrypointUrl, { resources: [] }),
        error: data,
        response: data.response,
        status: get(data.response, "status")
      })
  );
}
