import BaseClass from "./_BaseClass";

interface FieldOptions {
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
export default interface Field extends FieldOptions {}
export default class Field extends BaseClass<FieldOptions> {
  /**
   * @param {string}        name
   * @param {?FieldOptions}  options
   */
  constructor(public name: string, options?: FieldOptions) {
    super(options);
  }
}
