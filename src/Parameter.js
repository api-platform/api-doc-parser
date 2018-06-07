// @flow

/**
 * @property {string} variable - The variable of this field
 */
export default class Parameter {
  variable: string;
  range: string;
  required: boolean;
  description: string;

  /**
   * @param {string} variable
   * @param {string} range
   * @param {boolean} required
   * @param {string} description
   */
  constructor(
    variable: string,
    range: string,
    required: boolean,
    description: string
  ) {
    this.variable = variable;
    this.range = range;
    this.required = required;
    this.description = description;
  }
}
