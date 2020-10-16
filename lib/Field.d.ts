import { Resource } from "./Resource";
export interface FieldOptions extends Nullable<{
    id?: string;
    range?: string;
    reference?: string | Resource;
    embedded?: Resource;
    required?: boolean;
    description?: string;
    maxCardinality?: number;
    deprecated?: boolean;
}> {
}
export interface Field extends FieldOptions {
}
export declare class Field {
    name: string;
    constructor(name: string, options?: FieldOptions);
}
//# sourceMappingURL=Field.d.ts.map