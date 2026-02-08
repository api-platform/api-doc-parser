import type { Document, JsonLd, RemoteDocument } from "jsonld/jsonld-spec.js";
import type { RequestInitExtended } from "../core/types.js";

const jsonLdMimeType = "application/ld+json";
const jsonProblemMimeType = "application/problem+json";

interface RejectedResponseDocument {
  response: Response;
}

interface EmptyResponseDocument {
  response: Response;
}

interface ResponseDocument extends RemoteDocument {
  response: Response;
  body: Document;
}

/**
 * Sends a JSON-LD request to the API.
 * @param {string} url The URL to request.
 * @param {RequestInitExtended} [options] Optional fetch options.
 * @returns {Promise<ResponseDocument | EmptyResponseDocument>} The response document or an empty response document.
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

  const isJsonContent =
    contentType !== null &&
    (contentType.includes(jsonLdMimeType) ||
      contentType.includes(jsonProblemMimeType));

  if (status >= 500 || (!isJsonContent && !response.ok)) {
    const reason: RejectedResponseDocument = { response };
    // oxlint-disable-next-line no-throw-literal
    throw reason;
  }

  // 2xx response with a content type different from JSON-LD: return empty response
  if (!isJsonContent) {
    return { response };
  }

  const body = (await response.json()) as JsonLd;
  return {
    response,
    body,
    document: body,
    documentUrl: url,
  };
}

function setHeaders(options: RequestInitExtended): RequestInit {
  if (!options.headers) {
    return { ...options, headers: {} };
  }

  let headers =
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
