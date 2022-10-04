import get from "lodash.get";
import inflection from "inflection";
import { Field } from "../Field.js";
import { Resource } from "../Resource.js";
import getResourcePaths from "../utils/getResources.js";
import getType from "../openapi3/getType.js";
import type { OpenAPIV2 } from "openapi-types";

export const removeTrailingSlash = (url: string): string => {
  if (url.endsWith("/")) {
    url = url.slice(0, -1);
  }
  return url;
};

export default function (
  response: OpenAPIV2.Document,
  entrypointUrl: string
): Resource[] {
  const paths = getResourcePaths(response.paths);

  return paths.map((path) => {
    const splittedPath = removeTrailingSlash(path).split("/");
    const name = inflection.pluralize(splittedPath[splittedPath.length - 2]);
    const url = `${removeTrailingSlash(entrypointUrl)}/${name}`;

    const title = inflection.classify(splittedPath[splittedPath.length - 2]);

    if (!response.definitions) {
      throw new Error(); // @TODO
    }

    const definition = response.definitions[title];

    if (!definition) {
      throw new Error(); // @TODO
    }

    const description = definition.description;
    const properties = definition.properties;

    if (!properties) {
      throw new Error(); // @TODO
    }

    const fieldNames = Object.keys(properties);
    const requiredFields = get(
      response,
      ["definitions", title, "required"],
      []
    ) as string[];

    const fields = fieldNames.map((fieldName) => {
      const property = properties[fieldName];

      return new Field(fieldName, {
        id: null,
        range: null,
        type: getType(
          get(property, "type", "") as string,
          get(property, "format", "") as string
        ),
        enum: property.enum
          ? Object.fromEntries(
              property.enum.map((enumValue: string | number) => [
                typeof enumValue === "string"
                  ? inflection.humanize(enumValue)
                  : enumValue,
                enumValue,
              ])
            )
          : null,
        reference: null,
        embedded: null,
        required: !!requiredFields.find((value) => value === fieldName),
        description: property.description || "",
      });
    });

    return new Resource(name, url, {
      id: null,
      title,
      description,
      fields,
      readableFields: fields,
      writableFields: fields,
    });
  });
}
