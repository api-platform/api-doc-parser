import { Resource } from "./Resource";
import { assignSealed } from "./utils/assignSealed";

export interface ApiOptions {
  title?: string;
  resources?: Resource[];
}

/**
 * @property {string} entrypoint  - The URL of the API's entrypoint
 */
export interface Api extends ApiOptions {}
export class Api {
  /**
   * @param {string}      entrypoint
   * @param {?ApiOptions} options
   */
  constructor(public entrypoint: string, options: ApiOptions = {}) {
    assignSealed(this, options);
  }
}
