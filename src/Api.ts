import Resource from "./Resource";

type ApiOptions = {
  title?: string;
  resources?: Resource[];
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
        writable: true,
        enumerable: true,
        value: options[key as keyof ApiOptions]
      });
    });
  }
}
