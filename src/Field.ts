import { assignSealed } from "./utils/assignSealed";

export interface FieldOptions
  extends Nullable<{
    id?: string;
    range?: string;
    reference?: string;
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
