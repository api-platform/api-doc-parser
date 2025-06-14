import inflection from "inflection";
import type { FieldType } from "../Field.js";

export default function getType(
  openApiType: string,
  format?: string,
): FieldType {
  if (format) {
    switch (format) {
      case "int32":
      case "int64":
        return "integer";
      default:
        return inflection.camelize(format.replace("-", "_"), true);
    }
  }

  return openApiType;
}
