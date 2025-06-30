import inflection from "inflection";
import type { OpenAPIV2 } from "openapi-types";
import { Field } from "../Field.js";
import getType from "../openapi3/getType.js";
import { Resource } from "../Resource.js";
import getResourcePaths from "../utils/getResources.js";

export function removeTrailingSlash(url: string): string {
  if (url.endsWith("/")) {
    return url.slice(0, -1);
  }
  return url;
}

export default function handleJson(
  response: OpenAPIV2.Document,
  entrypointUrl: string,
): Resource[] {
  const paths = getResourcePaths(response.paths);

  return paths.map((path) => {
    const splittedPath = removeTrailingSlash(path).split("/");
    const baseName = splittedPath[splittedPath.length - 2];
    if (!baseName) {
      throw new Error("Invalid path: " + path);
    }

    const name = inflection.pluralize(baseName);
    const url = `${removeTrailingSlash(entrypointUrl)}/${name}`;

    const title = inflection.classify(baseName);

    if (!response.definitions) {
      throw new Error(); // @TODO
    }

    const definition = response.definitions[title];

    if (!definition) {
      throw new Error(); // @TODO
    }

    const { description = "", properties } = definition;

    if (!properties) {
      throw new Error(); // @TODO
    }

    const requiredFields = response.definitions?.[title]?.required ?? [];

    const fields = Object.entries(properties).map(
      ([fieldName, property]) =>
        new Field(fieldName, {
          id: null,
          range: null,
          type: getType(
            typeof property?.type === "string" ? property.type : "",
            property?.["format"] ?? "",
          ),
          enum: property.enum
            ? Object.fromEntries(
                property.enum.map((enumValue: string | number) => [
                  typeof enumValue === "string"
                    ? inflection.humanize(enumValue)
                    : enumValue,
                  enumValue,
                ]),
              )
            : null,
          reference: null,
          embedded: null,
          required: requiredFields.some((value) => value === fieldName),
          description: property.description || "",
        }),
    );

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
