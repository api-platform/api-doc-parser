import { camelize } from "inflection";
import { FieldType } from "../Field";

const getType = (openApiType: string, format?: string): FieldType => {
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
};

export default getType;
