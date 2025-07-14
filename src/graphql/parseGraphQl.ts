import type {
  IntrospectionObjectType,
  IntrospectionOutputTypeRef,
  IntrospectionQuery,
} from "graphql/utilities";
import { getIntrospectionQuery } from "graphql/utilities/index.js";
import { Api, Field, Resource } from "../core/index.js";
import fetchQuery from "./fetchQuery.js";

function getRangeFromGraphQlType(type: IntrospectionOutputTypeRef): string {
  if (type.kind === "NON_NULL") {
    if (type.ofType.kind === "LIST") {
      return `Array<${getRangeFromGraphQlType(type.ofType.ofType)}>`;
    }

    return type.ofType.name;
  }

  if (type.kind === "LIST") {
    return `Array<${getRangeFromGraphQlType(type.ofType)}>`;
  }

  return type.name;
}

function getReferenceFromGraphQlType(
  type: IntrospectionOutputTypeRef,
): null | string {
  if (type.kind === "OBJECT" && type.name.endsWith("Connection")) {
    return type.name.slice(0, type.name.lastIndexOf("Connection"));
  }

  return null;
}

export default async function parseGraphQl(
  entrypointUrl: string,
  options: RequestInit = {},
): Promise<{
  api: Api;
  response: Response;
}> {
  const introspectionQuery = getIntrospectionQuery();

  const {
    response,
    body: { data },
  } = await fetchQuery<IntrospectionQuery>(
    entrypointUrl,
    introspectionQuery,
    options,
  );
  if (!data?.__schema) {
    throw new Error(
      "Schema has not been retrieved from the introspection query.",
    );
  }
  const schema = data?.__schema;

  const typeResources = schema.types.filter(
    (type) =>
      type.kind === "OBJECT" &&
      type.name !== schema.queryType.name &&
      type.name !== schema.mutationType?.name &&
      type.name !== schema.subscriptionType?.name &&
      !type.name.startsWith("__") &&
      // mutation
      (!type.name[0] || !type.name.startsWith(type.name[0].toLowerCase())) &&
      !type.name.endsWith("Connection") &&
      !type.name.endsWith("Edge"),
  ) as IntrospectionObjectType[];

  const resources: Resource[] = [];
  for (const typeResource of typeResources) {
    const fields: Field[] = [];
    const readableFields: Field[] = [];
    const writableFields: Field[] = [];

    for (const resourceFieldType of typeResource.fields) {
      const field = new Field(resourceFieldType.name, {
        range: getRangeFromGraphQlType(resourceFieldType.type),
        reference: getReferenceFromGraphQlType(resourceFieldType.type),
        required: resourceFieldType.type.kind === "NON_NULL",
        description: resourceFieldType.description || "",
        deprecated: resourceFieldType.isDeprecated,
      });

      fields.push(field);
      readableFields.push(field);
      writableFields.push(field);
    }

    resources.push(
      new Resource(typeResource.name, "", {
        fields,
        readableFields,
        writableFields,
      }),
    );
  }

  for (const resource of resources) {
    for (const field of resource.fields ?? []) {
      if (field.reference !== null) {
        field.reference =
          resources.find((resource) => resource.name === field.reference) ||
          null;
      } else if (field.range !== null) {
        field.reference =
          resources.find((resource) => resource.name === field.range) || null;
      }
    }
  }

  return {
    api: new Api(entrypointUrl, { resources }),
    response,
  };
}
