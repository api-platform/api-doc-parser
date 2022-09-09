import { assignSealed } from "./utils/assignSealed.js";
import type { Resource } from "./Resource.js";
import type { Nullable } from "./types.js";

export interface ApiOptions
  extends Nullable<{
    title?: string;
    resources?: Resource[];
  }> {}

export interface Api extends ApiOptions {}
export class Api {
  constructor(public entrypoint: string, options: ApiOptions = {}) {
    assignSealed(this, options);
  }
}
