export class Parameter {
  variable: string;
  range: string | null;
  required: boolean;
  description: string;
  deprecated?: boolean | undefined;

  constructor(
    variable: string,
    range: string | null,
    required: boolean,
    description: string,
    deprecated?: boolean,
  ) {
    this.variable = variable;
    this.range = range;
    this.required = required;
    this.description = description;
    this.deprecated = deprecated;
  }
}
