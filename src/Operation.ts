import { BaseClass } from "./_BaseClass";

export interface OperationOptions {
  method?: string;
  expects?: any;
  returns?: string;
  types?: string[];
  deprecated?: boolean;
}

/**
 * @property {string} name - The name of this operation
 */
export interface Operation extends OperationOptions {}
export class Operation extends BaseClass<OperationOptions> {
  /**
   * @param {string}            name
   * @param {?OperationOptions} options
   */
  constructor(public name: string, options?: OperationOptions) {
    super(options);
  }
}
