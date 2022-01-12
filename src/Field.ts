import { assignSealed } from "./utils/assignSealed";
import { Resource } from "./Resource";
import { Nullable } from "./types";

export interface FieldOptions
  extends Nullable<{
    id?: string;
    range?: string;
    reference?: string | Resource;
    embedded?: Resource;
    required?: boolean;
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
