import type { Field } from "./Field.js";
import type { Operation } from "./Operation.js";
import type { Parameter } from "./Parameter.js";
import type { Nullable } from "./types.js";
import { assignSealed } from "./utils/index.js";

export interface ResourceOptions
  extends Nullable<{
    id?: string;
    title?: string;
    description?: string;
    fields?: Field[];
    readableFields?: Field[];
    writableFields?: Field[];
    getParameters?: () => Promise<Parameter[]>;
    operations?: Operation[];
    deprecated?: boolean;
    parameters?: Parameter[];
  }> {}

export class Resource implements ResourceOptions {
  name: string;
  url: string;

  id?: string | null;
  title?: string | null;
  description?: string | null;
  fields?: Field[] | null;
  readableFields?: Field[] | null;
  writableFields?: Field[] | null;
  getParameters?: (() => Promise<Parameter[]>) | null;
  operations?: Operation[] | null;
  deprecated?: boolean | null;
  parameters?: Parameter[] | null;

  constructor(name: string, url: string, options: ResourceOptions = {}) {
    this.name = name;
    this.url = url;
    assignSealed(this, options);
  }
}
