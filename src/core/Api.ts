import type { Resource } from "./Resource.js";
import type { Nullable } from "./types.js";
import { assignSealed } from "./utils/index.js";

export interface ApiOptions
  extends Nullable<{
    title?: string;
    resources?: Resource[];
  }> {}

export interface Api extends ApiOptions {}
export class Api {
  entrypoint: string;
  constructor(entrypoint: string, options: ApiOptions = {}) {
    this.entrypoint = entrypoint;
    assignSealed(this, options);
  }
}
