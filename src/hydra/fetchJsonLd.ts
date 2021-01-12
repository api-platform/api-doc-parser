import { Document } from "jsonld/jsonld-spec";
import { RequestInitExtended } from "./types";

const jsonLdMimeType = "application/ld+json";

/**
 * Sends a JSON-LD request to the API.
 */
export default async function fetchJsonLd(
  url: string,
  options: RequestInitExtended = {}
): Promise<{
  response: Response;
  body?: Document;
  document?: Document;
}> {
  const response = await fetch(url, setHeaders(options));
  const { headers, status } = response;
  const contentType = headers.get("Content-Type");

  if ([202, 204].includes(status)) {
    return Promise.resolve({ response });
  }
  if (500 <= status || !contentType || !contentType.includes(jsonLdMimeType)) {
    return Promise.reject({ response });
  }

  return response
    .json()
    .then((body: Document) => ({ response, body, document: body }));
}

function setHeaders(options: RequestInitExtended): RequestInit {
  if (!options.headers) {
    return { ...options, headers: {} };
  }

  let headers: HeadersInit =
    typeof options.headers === "function" ? options.headers() : options.headers;

  headers = new Headers(headers);

  if (null === headers.get("Accept")) {
    headers.set("Accept", jsonLdMimeType);
  }

  const result = { ...options, headers };

  if (
    "undefined" !== result.body &&
    !(typeof FormData !== "undefined" && result.body instanceof FormData) &&
    null === result.headers.get("Content-Type")
  ) {
    result.headers.set("Content-Type", jsonLdMimeType);
  }

  return result;
}
