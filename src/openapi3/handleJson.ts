import get from "lodash.get";
import { OpenAPIV3 } from "openapi-types";
import { Field } from "../Field";
import { Resource } from "../Resource";
import { getResources } from "../utils/getResources";

export const removeTrailingSlash = (url: string): string => {
  if (url.endsWith("/")) {
    url = url.slice(0, -1);
  }
  return url;
};

export default function (
  response: OpenAPIV3.Document,
  entrypointUrl: string
): Resource[] {
  const paths = getResources(response.paths);

  const resources = paths.map((item) => {
    const name = item.replace(`/`, ``);
    const url = removeTrailingSlash(entrypointUrl) + item;
    const currentItem = response.paths[item];
    if (!currentItem) {
      throw new Error();
    }

    const firstMethod = Object.keys(
      currentItem
    )[0] as keyof OpenAPIV3.PathItemObject;
    const responsePathItem = currentItem[
      firstMethod
    ] as OpenAPIV3.OperationObject;

    if (!responsePathItem.tags) {
      throw new Error(); // @TODO
    }

    const title = responsePathItem.tags[0];

    if (!response.components) {
      throw new Error(); // @TODO
    }

    if (!response.components.schemas) {
      throw new Error(); // @TODO
    }

    const schema = response.components.schemas[title] as OpenAPIV3.SchemaObject;
    const properties = schema.properties;

    if (!properties) {
      throw new Error(); // @TODO
    }

    const fieldNames = Object.keys(properties);
    const requiredFields = get(
      response,
      ["components", "schemas", title, "required"],
      []
    ) as string[];

    const fields = fieldNames.map(
      (fieldName) =>
        new Field(fieldName, {
          id: null,
          range: null,
          reference: null,
          required: !!requiredFields.find((value) => value === fieldName),
          description: get(properties[fieldName], `description`, ``) as string,
        })
    );

    return new Resource(name, url, {
      id: null,
      title,
      fields,
      readableFields: fields,
      writableFields: fields,
    });
  });

  return resources;
}
