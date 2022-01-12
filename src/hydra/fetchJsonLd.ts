import { Document, JsonLd, RemoteDocument } from "jsonld/jsonld-spec";
import { RequestInitExtended } from "./types";

const jsonLdMimeType = "application/ld+json";

export type RejectedResponseDocument = {
  response: Response;
};

interface ResponseDocument extends RemoteDocument {
  response: Response;
  body: Document;
}

/**
 * Sends a JSON-LD request to the API.
 */
export default async function fetchJsonLd(
  url: string,
  options: RequestInitExtended = {}
): Promise<ResponseDocument> {
  const response = await fetch(url, setHeaders(options));
  const { headers, status } = response;
  const contentType = headers.get("Content-Type");

  if (
    204 === status ||
    500 <= status ||
    !contentType ||
    !contentType.includes(jsonLdMimeType)
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
