import { camelize, classify, pluralize } from "inflection";
import type { ParseOptions } from "jsonref";
import { parse } from "jsonref";
import type { OpenAPIV3 } from "openapi-types";
import type { OperationType } from "../core/index.js";
import { Field, Operation, Parameter, Resource } from "../core/index.js";
import {
  buildEnumObject,
  getResourcePaths,
  getType,
  removeTrailingSlash,
} from "../core/utils/index.js";
import type {
  OpenAPIV3DocumentDereferenced,
  OperationObjectDereferenced,
  SchemaObjectDereferenced,
} from "./dereferencedOpenApiv3.js";

/**
 * Assigns relationships between resources based on their fields.
 * Sets the field's `embedded` or `reference` property depending on its type.
 *
 * @param resources - Array of Resource objects to process.
 * @returns The same array of resources with relationships assigned.
 */
function assignResourceRelationships(resources: Resource[]) {
  for (const resource of resources) {
    for (const field of resource.fields ?? []) {
      const name = camelize(field.name).replace(/Ids?$/, "");

      const guessedResource = resources.find(
        (res) => res.title === classify(name),
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

function getArrayType(property: SchemaObjectDereferenced) {
  if (property.type !== "array") {
    return null;
  }
  return getType(property.items.type || "string", property.items.format);
}

function buildResourceFromSchema(
  schema: SchemaObjectDereferenced,
  name: string,
  title: string,
  url: string,
) {
  const { description = "", properties = {} } = schema;
  const requiredFields = schema.required || [];
  const fields: Field[] = [];
  const readableFields: Field[] = [];
  const writableFields: Field[] = [];

  for (const [fieldName, property] of Object.entries(properties)) {
    const field = new Field(fieldName, {
      id: null,
      range: null,
      type: getType(property.type || "string", property.format),
      arrayType: getArrayType(property),
      enum: buildEnumObject(property.enum),
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
    fields.push(field);
  }

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
  pathItem: OperationObjectDereferenced,
): Operation {
  return new Operation(pathItem.summary || operationType, operationType, {
    method: httpMethod.toUpperCase(),
    deprecated: !!pathItem.deprecated,
  });
}

function dereferenceOpenAPIV3(
  response: OpenAPIV3.Document,
  options: ParseOptions,
): Promise<OpenAPIV3DocumentDereferenced> {
  return parse(response, options);
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
  const document = await dereferenceOpenAPIV3(response, {
    scope: entrypointUrl,
  });

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

    const name = pluralize(baseName);
    const url = `${removeTrailingSlash(serverUrl)}/${name}`;
    const pathItem = document.paths[path];
    if (!pathItem) {
      throw new Error();
    }

    const title = classify(baseName);

    const {
      get: showOperation,
      put: putOperation,
      patch: patchOperation,
      delete: deleteOperation,
    } = pathItem;

    const editOperation = putOperation || patchOperation;
    if (!showOperation && !editOperation) {
      continue;
    }
    const showSchema =
      showOperation?.responses?.["200"]?.content?.["application/json"]
        ?.schema || document.components?.schemas?.[title];

    const editSchema =
      editOperation?.requestBody?.content?.["application/json"]?.schema || null;

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

    const pathCollection = document.paths[`/${name}`];
    const { get: listOperation, post: createOperation } = pathCollection ?? {};

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

    if (listOperation?.parameters) {
      resource.parameters = listOperation.parameters.map(
        (parameter) =>
          new Parameter(
            parameter.name,
            parameter.schema?.type ? getType(parameter.schema.type) : null,
            parameter.required || false,
            parameter.description || "",
            parameter.deprecated,
          ),
      );
    }

    resources.push(resource);
  }

  return assignResourceRelationships(resources);
}
