import { Field } from "./Field";
import { Operation } from "./Operation";
import { Parameter } from "./Parameter";
import { assignSealed } from "./utils/assignSealed";
import { Nullable } from "./types";

export interface ResourceOptions
  extends Nullable<{
    id?: string;
    title?: string;
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
