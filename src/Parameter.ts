export class Parameter {
  constructor(
    public variable: string,
    public range: string | null,
    public required: boolean,
    public description: string,
    public deprecated?: boolean,
  ) {}
}
