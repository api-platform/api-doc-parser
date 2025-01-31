import { assignSealed } from "./utils/assignSealed.js";
import type { Nullable } from "./types.js";

export type OperationType = "show" | "edit" | "delete" | "list" | "create";

export interface OperationOptions
  extends Nullable<{
    method?: string;
    expects?: any;
    returns?: string;
    types?: string[];
    deprecated?: boolean;
  }> {}

export interface Operation extends OperationOptions {}
export class Operation {
  constructor(
    public name: string,
    public type: OperationType,
    options: OperationOptions = {},
  ) {
    assignSealed(this, options);
  }
}
