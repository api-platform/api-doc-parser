import { parse as dereference } from "jsonref";
import get from "lodash.get";
import inflection from "inflection";
import { Field } from "../Field.js";
import { Operation } from "../Operation.js";
import { Parameter } from "../Parameter.js";
import { Resource } from "../Resource.js";
import getResourcePaths from "../utils/getResources.js";
import getType from "./getType.js";
import type { OpenAPIV3 } from "openapi-types";
import type { OperationType } from "../Operation.js";

function isParameter(
  maybeParameter: OpenAPIV3.ReferenceObject | OpenAPIV3.ParameterObject,
): maybeParameter is OpenAPIV3.ParameterObject {
  return (
    maybeParameter !== undefined &&
    "name" in maybeParameter &&
    "in" in maybeParameter
  );
}

function isSchema(
  maybeSchema: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject | undefined,
): maybeSchema is OpenAPIV3.SchemaObject {
  return maybeSchema !== undefined && !("$ref" in maybeSchema);
}

export function removeTrailingSlash(url: string): string {
  if (url.endsWith("/")) {
    url = url.slice(0, -1);
  }
  return url;
}

function mergeResources(resourceA: Resource, resourceB: Resource) {
  for (const fieldB of resourceB.fields ?? []) {
    if (!resourceA.fields?.some((fieldA) => fieldA.name === fieldB.name)) {
      resourceA.fields?.push(fieldB);
    }
  }
  for (const fieldB of resourceB.readableFields ?? []) {
    if (
      !resourceA.readableFields?.some((fieldA) => fieldA.name === fieldB.name)
    ) {
      resourceA.readableFields?.push(fieldB);
    }
  }
  for (const fieldB of resourceB.writableFields ?? []) {
    if (
      !resourceA.writableFields?.some((fieldA) => fieldA.name === fieldB.name)
    ) {
      resourceA.writableFields?.push(fieldB);
    }
  }

  return resourceA;
}

function buildResourceFromSchema(
  schema: OpenAPIV3.SchemaObject,
  name: string,
  title: string,
  url: string,
) {
  const { description = "", properties = {} } = schema;
  const fieldNames = Object.keys(properties);
  const requiredFields = schema.required || [];

  const readableFields: Field[] = [];
  const writableFields: Field[] = [];

  const fields = fieldNames.map((fieldName) => {
    const property = properties[fieldName] as OpenAPIV3.SchemaObject;

    const type = getType(property.type || "string", property.format);
    const field = new Field(fieldName, {
      id: null,
      range: null,
      type,
      arrayType:
        type === "array" && "items" in property
          ? getType(
              (property.items as OpenAPIV3.SchemaObject).type || "string",
              (property.items as OpenAPIV3.SchemaObject).format,
            )
          : null,
      enum: property.enum
        ? Object.fromEntries(
            // Object.values is used because the array is annotated: it contains the __meta symbol used by jsonref.
            Object.values<string | number>(property.enum).map((enumValue) => [
              typeof enumValue === "string"
                ? inflection.humanize(enumValue)
                : enumValue,
              enumValue,
            ]),
          )
        : null,
      reference: null,
      embedded: null,
      nullable: property.nullable || false,
      required: requiredFields.some((value) => value === fieldName),
      description: property.description || "",
    });

    if (!property.writeOnly) {
      readableFields.push(field);
    }
    if (!property.readOnly) {
      writableFields.push(field);
    }

    return field;
  });

  return new Resource(name, url, {
    id: null,
    title,
    description,
    fields,
    readableFields,
    writableFields,
    parameters: [],
    // oxlint-disable-next-line prefer-await-to-then
    getParameters: () => Promise.resolve([]),
  });
}

function buildOperationFromPathItem(
  httpMethod: `${OpenAPIV3.HttpMethods}`,
  operationType: OperationType,
  pathItem: OpenAPIV3.OperationObject,
): Operation {
  return new Operation(pathItem.summary || operationType, operationType, {
    method: httpMethod.toUpperCase(),
    deprecated: !!pathItem.deprecated,
  });
}

/*
  Assumptions:
  RESTful APIs typically have two paths per resources: a `/noun` path and a
  `/noun/{id}` path. `getResources` strips out the former, allowing us to focus
  on the latter.

  In OpenAPI 3, the `/noun/{id}` path will typically have a `get` action, that
  probably accepts parameters and would respond with an object.
*/

export default async function handleJson(
  response: OpenAPIV3.Document,
  entrypointUrl: string,
): Promise<Resource[]> {
  const document = (await dereference(response, {
    scope: entrypointUrl,
  })) as OpenAPIV3.Document;

  const paths = getResourcePaths(document.paths);

  const serverUrlOrRelative = document.servers?.[0]?.url || "/";
  const serverUrl = new URL(serverUrlOrRelative, entrypointUrl).href;

  const resources: Resource[] = [];

  for (const path of paths) {
    const splittedPath = removeTrailingSlash(path).split("/");
    const baseName = splittedPath[splittedPath.length - 2];
    if (!baseName) {
      throw new Error("Invalid path: " + path);
    }

    const name = inflection.pluralize(baseName);
    const url = `${removeTrailingSlash(serverUrl)}/${name}`;
    const pathItem = document.paths[path];
    if (!pathItem) {
      throw new Error();
    }

    const title = inflection.classify(baseName);

    const showOperation = pathItem.get;
    const editOperation = pathItem.put || pathItem.patch;
    if (!showOperation && !editOperation) {
      continue;
    }

    const showSchema = showOperation
      ? (get(
          showOperation,
          "responses.200.content.application/json.schema",
          get(document, `components.schemas[${title}]`),
        ) as OpenAPIV3.SchemaObject)
      : null;
    const editSchema = editOperation
      ? (get(
          editOperation,
          "requestBody.content.application/json.schema",
        ) as unknown as OpenAPIV3.SchemaObject)
      : null;

    if (!showSchema && !editSchema) {
      continue;
    }

    const showResource = showSchema
      ? buildResourceFromSchema(showSchema, name, title, url)
      : null;
    const editResource = editSchema
      ? buildResourceFromSchema(editSchema, name, title, url)
      : null;
    let resource = showResource ?? editResource;
    if (!resource) {
      continue;
    }
    if (showResource && editResource) {
      resource = mergeResources(showResource, editResource);
    }

    const putOperation = pathItem.put;
    const patchOperation = pathItem.patch;
    const deleteOperation = pathItem.delete;
    const pathCollection = document.paths[`/${name}`];
    const listOperation = pathCollection && pathCollection.get;
    const createOperation = pathCollection && pathCollection.post;
    resource.operations = [
      ...(showOperation
        ? [buildOperationFromPathItem("get", "show", showOperation)]
        : []),
      ...(putOperation
        ? [buildOperationFromPathItem("put", "edit", putOperation)]
        : []),
      ...(patchOperation
        ? [buildOperationFromPathItem("patch", "edit", patchOperation)]
        : []),
      ...(deleteOperation
        ? [buildOperationFromPathItem("delete", "delete", deleteOperation)]
        : []),
      ...(listOperation
        ? [buildOperationFromPathItem("get", "list", listOperation)]
        : []),
      ...(createOperation
        ? [buildOperationFromPathItem("post", "create", createOperation)]
        : []),
    ];

    if (listOperation && listOperation.parameters) {
      resource.parameters = listOperation.parameters
        .filter(isParameter)
        .map(
          (parameter) =>
            new Parameter(
              parameter.name,
              parameter.schema &&
              isSchema(parameter.schema) &&
              parameter.schema.type
                ? getType(parameter.schema.type)
                : null,
              parameter.required || false,
              parameter.description || "",
              parameter.deprecated,
            ),
        );
    }

    resources.push(resource);
  }

  // Guess embeddeds and references from property names
  for (const resource of resources) {
    for (const field of resource.fields ?? []) {
      const name = inflection.camelize(field.name).replace(/Ids?$/, "");

      const guessedResource = resources.find(
        (res) => res.title === inflection.classify(name),
      );
      if (!guessedResource) {
        continue;
      }
      field.maxCardinality = field.type === "array" ? null : 1;
      if (field.type === "object" || field.arrayType === "object") {
        field.embedded = guessedResource;
      } else {
        field.reference = guessedResource;
      }
    }
  }

  return resources;
}
