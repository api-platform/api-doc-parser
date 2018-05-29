// @flow

import Field from "./Field";
import Operation from "./Operation";

type ResourceOptions = {
  id?: string,
  title?: string,
  deprecated?: boolean,
  readableFields?: Field[],
  writableFields?: Field[],
  operations?: Operation[]
};

/**
 * @property {string} name            - The name of the resource
 * @property {string} url             - The base URL for this resource
 */
export default class Resource {
  name: string;
  url: string;

  /**
   * @param {string}          name
   * @param {string}          url
   * @param {ResourceOptions} options
   */
  constructor(name: string, url: string, options: ResourceOptions = {}) {
    this.name = name;
    this.url = url;

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
