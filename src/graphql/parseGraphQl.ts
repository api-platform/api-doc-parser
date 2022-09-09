import { getIntrospectionQuery } from "graphql/utilities/index.js";
import fetchQuery from "./fetchQuery.js";
import { Api } from "../Api.js";
import { Field } from "../Field.js";
import { Resource } from "../Resource.js";
import type {
  IntrospectionObjectType,
  IntrospectionOutputTypeRef,
  IntrospectionQuery,
} from "graphql/utilities";

const getRangeFromGraphQlType = (type: IntrospectionOutputTypeRef): string => {
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
};

const getReferenceFromGraphQlType = (
  type: IntrospectionOutputTypeRef
): null | string => {
  if (type.kind === "OBJECT" && type.name.endsWith("Connection")) {
    return type.name.slice(0, type.name.lastIndexOf("Connection"));
  }

  return null;
};

export default async (
  entrypointUrl: string,
  options: RequestInit = {}
): Promise<{
  api: Api;
  response: Response;
}> => {
  const introspectionQuery = getIntrospectionQuery();

  const {
    response,
    body: { data },
  } = await fetchQuery<IntrospectionQuery>(
    entrypointUrl,
    introspectionQuery,
    options
  );
  if (!data?.__schema) {
    throw new Error(
      "Schema has not been retrieved from the introspection query."
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
      !type.name.startsWith(type.name[0].toLowerCase()) &&
      !type.name.endsWith("Connection") &&
      !type.name.endsWith("Edge") &&
      !type.name.endsWith("PageInfo")
  ) as IntrospectionObjectType[];

  const resources: Resource[] = [];
  typeResources.forEach((typeResource) => {
    const fields: Field[] = [];
    const readableFields: Field[] = [];
    const writableFields: Field[] = [];

    typeResource.fields.forEach((resourceFieldType) => {
      const field = new Field(resourceFieldType.name, {
        range: getRangeFromGraphQlType(resourceFieldType.type),
        reference: getReferenceFromGraphQlType(resourceFieldType.type),
        required: resourceFieldType.type.kind === "NON_NULL",
        description: resourceFieldType.description,
        deprecated: resourceFieldType.isDeprecated,
      });

      fields.push(field);
      readableFields.push(field);
      writableFields.push(field);
    });

    resources.push(
      new Resource(typeResource.name, "", {
        fields,
        readableFields,
        writableFields,
      })
    );
  });

  resources.forEach((resource) => {
    resource.fields?.forEach((field) => {
      if (null !== field.reference) {
        field.reference =
          resources.find((resource) => resource.name === field.reference) ||
          null;
      } else if (null !== field.range) {
        field.reference =
          resources.find((resource) => resource.name === field.range) || null;
      }
    });
  });

  return {
    api: new Api(entrypointUrl, { resources }),
    response,
  };
};
