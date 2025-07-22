import type { Resource } from "./Resource.js";
import type { Nullable } from "./types.js";
import { assignSealed } from "./utils/index.js";

export type FieldType =
  | "string"
  | "integer"
  | "negativeInteger"
  | "nonNegativeInteger"
  | "positiveInteger"
  | "nonPositiveInteger"
  | "number"
  | "decimal"
  | "double"
  | "float"
  | "boolean"
  | "date"
  | "dateTime"
  | "duration"
  | "time"
  | "byte"
  | "binary"
  | "hexBinary"
  | "base64Binary"
  | "array"
  | "object"
  | "email"
  | "url"
  | "uuid"
  | "password"
  // oxlint-disable-next-line ban-types
  | ({} & string); // Allow any other string type

export interface FieldOptions
  extends Nullable<{
    id?: string;
    range?: string;
    type?: FieldType;
    arrayType?: FieldType;
    enum?: { [key: string | number]: string | number };
    reference?: string | Resource;
    embedded?: Resource;
    required?: boolean;
    nullable?: boolean;
    description?: string;
    maxCardinality?: number;
    deprecated?: boolean;
  }> {}

export interface Field extends FieldOptions {}
export class Field {
  name: string;
  constructor(name: string, options: FieldOptions = {}) {
    this.name = name;
    assignSealed(this, options);
  }
}
