export type Nullable<T extends Record<string, unknown>> = {
  [P in keyof T]: T[P] | null;
};
