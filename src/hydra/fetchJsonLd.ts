import type { Document, JsonLd, RemoteDocument } from "jsonld/jsonld-spec.js";
import type { RequestInitExtended } from "./types.js";

const jsonLdMimeType = "application/ld+json";
const jsonProblemMimeType = "application/problem+json";

export type RejectedResponseDocument = {
  response: Response;
};

export type EmptyResponseDocument = {
  response: Response;
};

export interface ResponseDocument extends RemoteDocument {
  response: Response;
  body: Document;
}

/**
 * Sends a JSON-LD request to the API.
 */
export default async function fetchJsonLd(
  url: string,
  options: RequestInitExtended = {},
): Promise<ResponseDocument | EmptyResponseDocument> {
  const response = await fetch(url, setHeaders(options));
  const { headers, status } = response;
  const contentType = headers.get("Content-Type");

  if (status === 204) {
    return { response };
  }

  if (
    status >= 500 ||
    !contentType ||
    (!contentType.includes(jsonLdMimeType) &&
      !contentType.includes(jsonProblemMimeType))
  ) {
    const reason: RejectedResponseDocument = { response };
    return Promise.reject(reason);
  }

  return response.json().then((body: JsonLd) => ({
    response,
    body,
    document: body,
    documentUrl: url,
  }));
}

function setHeaders(options: RequestInitExtended): RequestInit {
  if (!options.headers) {
    return { ...options, headers: {} };
  }

  let headers: HeadersInit =
    typeof options.headers === "function" ? options.headers() : options.headers;

  headers = new Headers(headers);

  if (headers.get("Accept") === null) {
    headers.set("Accept", jsonLdMimeType);
  }

  const result = { ...options, headers };

  if (
    result.body !== "undefined" &&
    !(typeof FormData !== "undefined" && result.body instanceof FormData) &&
    result.headers.get("Content-Type") === null
  ) {
    result.headers.set("Content-Type", jsonLdMimeType);
  }

  return result;
}
