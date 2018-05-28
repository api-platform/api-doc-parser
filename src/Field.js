// @flow

type FieldOptions = {
  id?: string,
  range?: string,
  reference?: string,
  required?: boolean,
  description?: string,
  maxCardinality?: number,
  deprecated?: boolean
};

/**
 * @property {string} name - The name of this field
 */
export default class Field {
  name: string;

  /**
   * @param {string}        name
   * @param {?FieldOptions}  options
   */
  constructor(name: string, options: FieldOptions = {}) {
    this.name = name;

    Object.keys(options).forEach(key => {
      Object.defineProperty(this, key, {
        readable: true,
        writable: true,
        enumerable: true,
        value: options[key]
      });
    });
  }
}
