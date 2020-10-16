import { Field } from "./Field";
import { Operation } from "./Operation";
import { Parameter } from "./Parameter";
export interface ResourceOptions extends Nullable<{
    id?: string;
    title?: string;
    deprecated?: boolean;
    fields?: Field[];
    readableFields?: Field[];
    writableFields?: Field[];
    parameters?: Parameter[];
    getParameters?: Function;
    operations?: Operation[];
}> {
}
export interface Resource extends ResourceOptions {
}
export declare class Resource {
    name: string;
    url: string;
    constructor(name: string, url: string, options?: ResourceOptions);
}
//# sourceMappingURL=Resource.d.ts.map