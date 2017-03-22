/**
 * @property {string} name         - The name of this field
 * @property {?string} id          - The IRI identifying this field (e.g. http://schema.org/email)
 * @property {?string} range       - The range of this field (e.g. http://www.w3.org/2001/XMLSchema#string or http://schema.org/Book)
 * @property {?string} reference   - The name of the referenced resource
 * @property {boolean} required    - Is this field mandatory?
 * @property {string} description  - A description of this field
 */
export default class Field {
  constructor(name, id = null, range = null, reference = null, required = false, description = '') {
    this.name = name;
    this.id = id;
    this.range = range;
    this.reference = reference;
    this.required = required;
    this.description = description;
  }
}
