import BaseClass from "./_BaseClass";
import Field from "./Field";
import Operation from "./Operation";
import Parameter from "./Parameter";

interface ResourceOptions {
  id?: string;
  title?: string;
  deprecated?: boolean;
  fields?: Field[];
  readableFields?: Field[];
  writableFields?: Field[];
  parameters?: Parameter[];
  getParameters?: Function;
  operations?: Operation[];
}

/**
 * @property {string} name            - The name of the resource
 * @property {string} url             - The base URL for this resource
 */
export default interface Resource extends ResourceOptions {}
export default class Resource extends BaseClass<ResourceOptions> {
  /**
   * @param {string}          name
   * @param {string}          url
   * @param {ResourceOptions} options
   */
  constructor(
    public name: string,
    public url: string,
    options?: ResourceOptions
  ) {
    super(options);
  }
}
