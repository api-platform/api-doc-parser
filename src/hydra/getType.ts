import type { FieldType } from "../Field.js";

const getType = (id: string, range: string): FieldType => {
  switch (id) {
    case "http://schema.org/email":
    case "https://schema.org/email":
      return "email";
    case "http://schema.org/url":
    case "https://schema.org/url":
      return "url";
    default:
  }

  switch (range) {
    case "http://www.w3.org/2001/XMLSchema#array":
      return "array";
    case "http://www.w3.org/2001/XMLSchema#integer":
    case "http://www.w3.org/2001/XMLSchema#int":
    case "http://www.w3.org/2001/XMLSchema#long":
    case "http://www.w3.org/2001/XMLSchema#short":
    case "https://schema.org/Integer":
      return "integer";
    case "http://www.w3.org/2001/XMLSchema#negativeInteger":
      return "negativeInteger";
    case "http://www.w3.org/2001/XMLSchema#nonNegativeInteger":
    case "http://www.w3.org/2001/XMLSchema#unsignedInt":
    case "http://www.w3.org/2001/XMLSchema#unsignedLong":
    case "http://www.w3.org/2001/XMLSchema#unsignedShort":
      return "nonNegativeInteger";
    case "http://www.w3.org/2001/XMLSchema#positiveInteger":
      return "positiveInteger";
    case "http://www.w3.org/2001/XMLSchema#nonPositiveInteger":
      return "nonPositiveInteger";
    case "http://www.w3.org/2001/XMLSchema#decimal":
      return "decimal";
    case "http://www.w3.org/2001/XMLSchema#double":
      return "double";
    case "http://www.w3.org/2001/XMLSchema#float":
    case "https://schema.org/Float":
      return "float";
    case "http://www.w3.org/2001/XMLSchema#boolean":
    case "https://schema.org/Boolean":
      return "boolean";
    case "http://www.w3.org/2001/XMLSchema#date":
    case "http://www.w3.org/2001/XMLSchema#gYear":
    case "http://www.w3.org/2001/XMLSchema#gYearMonth":
    case "http://www.w3.org/2001/XMLSchema#gMonth":
    case "http://www.w3.org/2001/XMLSchema#gMonthDay":
    case "http://www.w3.org/2001/XMLSchema#gDay":
    case "https://schema.org/Date":
      return "date";
    case "http://www.w3.org/2001/XMLSchema#dateTime":
    case "https://schema.org/DateTime":
      return "dateTime";
    case "http://www.w3.org/2001/XMLSchema#duration":
      return "duration";
    case "http://www.w3.org/2001/XMLSchema#time":
    case "https://schema.org/Time":
      return "time";
    case "http://www.w3.org/2001/XMLSchema#byte":
    case "http://www.w3.org/2001/XMLSchema#unsignedByte":
      return "byte";
    case "http://www.w3.org/2001/XMLSchema#hexBinary":
      return "hexBinary";
    case "http://www.w3.org/2001/XMLSchema#base64Binary":
      return "base64Binary";
    default:
      return "string";
  }
};

export default getType;
