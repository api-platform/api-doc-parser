/**
 * Sends a JSON-LD request to the API.
 *
 * @param {string} url
 * @param {object} options
 * @return {Promise.<object>} An object with a response key (the original HTTP response) and an optional body key (the parsed JSON-LD body)
 */
export default function fetchJsonLd(url, options = {}) {
  const jsonLdMimeType = 'application/ld+json';

  if ('undefined' === typeof options.headers) {
    options.headers = new Headers();
  }

  if (null === options.headers.get('Accept')) {
    options.headers.set('Accept', jsonLdMimeType);
  }

  if (null === options.headers.get('Authorization')) {
     const token = localStorage.getItem('token');
      if (undefined !== token || null !== token) options.headers.set('Authorization', `Bearer ${token}`);
  }

  if ('undefined' !== options.body && !(typeof FormData !== 'undefined' && options.body instanceof FormData) && null === options.headers.get('Content-Type')) {
    options.headers.set('Content-Type', jsonLdMimeType);
  }

  return fetch(url, options)
    .then(response => {
      if (!response.headers.has('Content-Type') || !response.headers.get('Content-Type').includes(jsonLdMimeType)) {
        return {response: response};
      }

      return response.json().then(body => { return { response, body, document: body }});
    });
}
