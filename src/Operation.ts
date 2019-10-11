import { assignSealed } from "./utils/assignSealed";

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
  constructor(public name: string, options: OperationOptions = {}) {
    assignSealed(this, options);
  }
}
