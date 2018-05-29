// @flow

type OperationOptions = {
  method?: string,
  returns?: string,
  types?: Array<string>,
  deprecated?: boolean
};

/**
 * @property {string} name - The name of this operation
 */
export default class Operation {
  name: string;

  /**
   * @param {string}            name
   * @param {?OperationOptions} options
   */
  constructor(name: string, options: OperationOptions = {}) {
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
