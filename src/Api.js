/**
 * @property {string} entrypoint                - The URL of the API's entrypoint
 * @property {string} title                     - The title
 * @property {Map.<string, Resource>} resources - Resources of this API
 */
export default class Api {
  constructor(entrypoint, title = '', resources = new Map()) {
    this.entrypoint = entrypoint;
    this.title = title;
    this.resources = resources;
  }
}
