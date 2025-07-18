export type Nullable<T extends Record<string, unknown>> = {
  [P in keyof T]: T[P] | null;
};

export interface RequestInitExtended extends Omit<RequestInit, "headers"> {
  headers?: HeadersInit | (() => HeadersInit);
}
