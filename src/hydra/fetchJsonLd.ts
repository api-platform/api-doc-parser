const jsonLdMimeType = "application/ld+json";

/**
 * Sends a JSON-LD request to the API.
 */
export default async function fetchJsonLd(
  url: string,
  options: RequestInitExtended = {}
): Promise<{
  response: Response;
  body?: any;
  document?: any;
}> {
  const response = await fetch(url, setHeaders(options));
  const { headers, status } = response;
  const contentType = headers.get("Content-Type");

  if (204 === status) {
    return Promise.resolve({ response });
  }
  if (500 <= status || !contentType || !contentType.includes(jsonLdMimeType)) {
    return Promise.reject({ response });
  }

  return response.json().then(body => ({ response, body, document: body }));
}

function setHeaders(options: RequestInitExtended): RequestInit {
  const result = { ...options };

  if (typeof result.headers === "function") {
    result.headers = result.headers();
  }

  if (!(result.headers instanceof Headers)) {
    result.headers = new Headers(result.headers as HeadersInit);
  }

  if (null === result.headers.get("Accept")) {
    result.headers.set("Accept", jsonLdMimeType);
  }

  if (
    "undefined" !== result.body &&
    !(typeof FormData !== "undefined" && result.body instanceof FormData) &&
    null === result.headers.get("Content-Type")
  ) {
    result.headers.set("Content-Type", jsonLdMimeType);
  }

  return result as RequestInit;
}
