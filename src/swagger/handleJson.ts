import { classify, pluralize } from "inflection";
import type { OpenAPIV2 } from "openapi-types";
import { Field, Resource } from "../core/index.js";
import {
  buildEnumObject,
  getResourcePaths,
  getType,
  removeTrailingSlash,
} from "../core/utils/index.js";

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

    const name = pluralize(baseName);
    const url = `${removeTrailingSlash(entrypointUrl)}/${name}`;

    const title = classify(baseName);

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
          enum: buildEnumObject(property.enum),
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
