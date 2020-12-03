interface RequestInitExtended extends Omit<RequestInit, "headers"> {
  headers?: HeadersInit | Function;
}
