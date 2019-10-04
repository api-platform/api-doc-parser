const jsonLdMimeType = "application/ld+json";

/**
 * Sends a JSON-LD request to the API.
 *
 * @param {string} url
 * @param {object} options
 * @return {Promise.<object>} An object with a response key (the original HTTP response) and an optional body key (the parsed JSON-LD body)
 */
export default async function fetchJsonLd(
  url: string,
  options: RequestInit = {}
): Promise<any> {
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

function setHeaders(options: RequestInit): RequestInit {
  if (!(options.headers instanceof Headers)) {
    options.headers = new Headers(options.headers);
  }

  if (null === options.headers.get("Accept")) {
    options.headers.set("Accept", jsonLdMimeType);
  }

  if (
    "undefined" !== options.body &&
    !(typeof FormData !== "undefined" && options.body instanceof FormData) &&
    null === options.headers.get("Content-Type")
  ) {
    options.headers.set("Content-Type", jsonLdMimeType);
  }

  return options;
}
