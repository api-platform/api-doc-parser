import { get, uniq } from "lodash";
import { OpenAPIV2 } from "openapi-types";
import { Field } from "../Field";
import { Resource } from "../Resource";

export const removeTrailingSlash = (url: string): string => {
  if (url.endsWith("/")) {
    url = url.slice(0, -1);
  }
  return url;
};

export default function(
  response: OpenAPIV2.Document,
  entrypointUrl: string
): Resource[] {
  const paths = uniq(
    Object.keys(response.paths).map(item => item.replace(`/{id}`, ``))
  );

  const resources = paths.map(item => {
    const name = item.replace(`/`, ``);
    const url = removeTrailingSlash(entrypointUrl) + item;
    const firstMethod = Object.keys(response.paths[item])[0];
    const title = response.paths[item][firstMethod]["tags"][0];

    if (!response.definitions) {
      throw new Error(); // @TODO
    }

    const definition = response.definitions[title];

    if (!definition) {
      throw new Error(); // @TODO
    }

    const properties = definition.properties;

    if (!properties) {
      throw new Error(); // @TODO
    }

    const fieldNames = Object.keys(properties);
    const requiredFields: string[] = get(
      response,
      ["definitions", title, "required"],
      []
    );

    const fields = fieldNames.map(
      fieldName =>
        new Field(fieldName, {
          id: null,
          range: null,
          reference: null,
          required: !!requiredFields.find(value => value === fieldName),
          description: get(properties[fieldName], `description`, ``)
        })
    );

    return new Resource(name, url, {
      id: null,
      title,
      fields,
      readableFields: fields,
      writableFields: fields
    });
  });

  return resources;
}
