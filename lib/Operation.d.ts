export interface OperationOptions extends Nullable<{
    method?: string;
    expects?: any;
    returns?: string;
    types?: string[];
    deprecated?: boolean;
}> {
}
export interface Operation extends OperationOptions {
}
export declare class Operation {
    name: string;
    constructor(name: string, options?: OperationOptions);
}
//# sourceMappingURL=Operation.d.ts.map