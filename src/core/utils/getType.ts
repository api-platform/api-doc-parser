import { camelize } from "inflection";
import type { FieldType } from "../Field.js";

/**
 * Returns the corresponding FieldType for a given OpenAPI type and optional format.
 *
 * If a format is provided, it will map certain formats (e.g., "int32", "int64") to "integer".
 * Otherwise, it will camelize the format string. If no format is provided, it returns the OpenAPI type.
 *
 * @param openApiType - The OpenAPI type string.
 * @param format - An optional format string.
 * @returns The mapped FieldType.
 */
export function getType(openApiType: string, format?: string): FieldType {
  if (format) {
    switch (format) {
      case "int32":
      case "int64":
        return "integer";
      default:
        return camelize(format.replace("-", "_"), true);
    }
  }

  return openApiType;
}
