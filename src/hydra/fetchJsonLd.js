/**
 * Sends a JSON-LD request to the API.
 *
 * @param {string} url
 * @param {object} options
 * @return {Promise.<object>} An object with a response key (the original HTTP response) and an optional body key (the parsed JSON-LD body)
 */
export default function fetchJsonLd(url, options = {}) {
  const jsonLdMimeType = "application/ld+json";

  if ("undefined" === typeof options.headers) {
    options.headers = new Headers();
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

  return fetch(url, options).then(response => {
    const { headers, status } = response;
    if (204 === status) {
      return Promise.resolve({ response });
    }
    if (
      500 <= status ||
      !headers.has("Content-Type") ||
      !headers.get("Content-Type").includes(jsonLdMimeType)
    ) {
      return Promise.reject({ response });
    }

    return Promise.resolve(
      response.json().then(body => ({ response, body, document: body }))
    );
  });
}
