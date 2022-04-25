import { assignSealed } from "./utils/assignSealed";
import { Resource } from "./Resource";
import { Nullable } from "./types";

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
  | string;

export interface FieldOptions
  extends Nullable<{
    id?: string;
    range?: string;
    type?: FieldType;
    arrayType?: FieldType;
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
  constructor(public name: string, options: FieldOptions = {}) {
    assignSealed(this, options);
  }
}
