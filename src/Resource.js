/**
 * @property {string} name            - The name of the resource
 * @property {string} url             - The base URL for this resource
 * @property {?string} id             - The id of the resource (e.g. http://schema.org/Book)
 * @property {Field[]} readableFields - The list of readable fields
 * @property {Field[]} writableFields - The list of writable fields
 */
export default class Resource {
  constructor(name, url, id = null, readableFields = [], writableFields = []) {
    this.name = name;
    this.url = url;
    this.id = id;
    this.readableFields = readableFields;
    this.writableFields = writableFields;
  }
}
