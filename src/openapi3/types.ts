export interface RequestInitExtended extends Omit<RequestInit, "headers"> {
  headers?: HeadersInit | (() => HeadersInit);
}
