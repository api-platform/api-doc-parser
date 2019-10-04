import BaseClass from "./_BaseClass";

interface OperationOptions {
  method?: string;
  returns?: string;
  types?: string[];
  deprecated?: boolean;
}

/**
 * @property {string} name - The name of this operation
 */
export default interface Operation extends OperationOptions {}
export default class Operation extends BaseClass<OperationOptions> {
  /**
   * @param {string}            name
   * @param {?OperationOptions} options
   */
  constructor(public name: string, options?: OperationOptions) {
    super(options);
  }
}
