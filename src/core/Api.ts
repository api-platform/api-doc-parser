import type { Resource } from "./Resource.js";
import type { Nullable } from "./types.js";

export interface ApiOptions
  extends Nullable<{
    title?: string;
    resources?: Resource[];
  }> {}

export class Api implements ApiOptions {
  entrypoint: string;

  title?: string | null;
  resources?: Resource[] | null;

  constructor(entrypoint: string, options: ApiOptions = {}) {
    this.entrypoint = entrypoint;
    Object.assign(this, options);
  }
}
