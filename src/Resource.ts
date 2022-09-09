import { assignSealed } from "./utils/assignSealed.js";
import type { Field } from "./Field.js";
import type { Operation } from "./Operation.js";
import type { Parameter } from "./Parameter.js";
import type { Nullable } from "./types.js";

export interface ResourceOptions
  extends Nullable<{
    id?: string;
    title?: string;
    description?: string;
    deprecated?: boolean;
    fields?: Field[];
    readableFields?: Field[];
    writableFields?: Field[];
    parameters?: Parameter[];
    getParameters?: () => Promise<Parameter[]>;
    operations?: Operation[];
  }> {}

export interface Resource extends ResourceOptions {}
export class Resource {
  constructor(
    public name: string,
    public url: string,
    options: ResourceOptions = {}
  ) {
    assignSealed(this, options);
  }
}
