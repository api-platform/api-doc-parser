// @flow

import Resource from "./Resource";

type ApiOptions = {
  title?: string,
  resources?: Map<string, Resource>
};

/**
 * @property {string} entrypoint  - The URL of the API's entrypoint
 */
export default class Api {
  entrypoint: string;

  /**
   * @param {string}      entrypoint
   * @param {?ApiOptions} options
   */
  constructor(entrypoint: string, options: ApiOptions = {}) {
    this.entrypoint = entrypoint;

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
