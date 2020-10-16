import { Resource } from "./Resource";
export interface ApiOptions extends Nullable<{
    title?: string;
    resources?: Resource[];
}> {
}
export interface Api extends ApiOptions {
}
export declare class Api {
    entrypoint: string;
    constructor(entrypoint: string, options?: ApiOptions);
}
//# sourceMappingURL=Api.d.ts.map