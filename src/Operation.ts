type OperationOptions = {
  method?: string;
  returns?: string;
  types?: string[];
  deprecated?: boolean;
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
        writable: true,
        enumerable: true,
        value: options[key as keyof OperationOptions]
      });
    });
  }
}
