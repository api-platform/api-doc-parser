/**
 * @property {string} variable - The variable of this field
 */
export class Parameter {
  /**
   * @param {string} variable
   * @param {string} range
   * @param {boolean} required
   * @param {string} description
   */
  constructor(
    public variable: string,
    public range: string,
    public required: boolean,
    public description: string
  ) {}
}
