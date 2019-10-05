import { assignSealed } from "./utils/assignSealed";

export interface FieldOptions {
  id?: string;
  range?: string;
  reference?: string;
  required?: boolean;
  description?: string;
  maxCardinality?: number;
  deprecated?: boolean;
}

/**
 * @property {string} name - The name of this field
 */
export interface Field extends FieldOptions {}
export class Field {
  /**
   * @param {string}        name
   * @param {?FieldOptions}  options
   */
  constructor(public name: string, options: FieldOptions = {}) {
    assignSealed(this, options);
  }
}
