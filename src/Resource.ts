import { Field } from "./Field";
import { Operation } from "./Operation";
import { Parameter } from "./Parameter";
import { assignSealed } from "./utils/assignSealed";

export interface ResourceOptions {
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
export interface Resource extends ResourceOptions {}
export class Resource {
  /**
   * @param {string}          name
   * @param {string}          url
   * @param {ResourceOptions} options
   */
  constructor(
    public name: string,
    public url: string,
    options: ResourceOptions = {}
  ) {
    assignSealed(this, options);
  }
}
