import BaseClass from "./_BaseClass";
import Resource from "./Resource";

interface ApiOptions {
  title?: string;
  resources?: Resource[];
}

/**
 * @property {string} entrypoint  - The URL of the API's entrypoint
 */
export default interface Api extends ApiOptions {}
export default class Api extends BaseClass<ApiOptions> {
  /**
   * @param {string}      entrypoint
   * @param {?ApiOptions} options
   */
  constructor(public entrypoint: string, options?: ApiOptions) {
    super(options);
  }
}
