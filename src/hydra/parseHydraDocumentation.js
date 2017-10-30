import {promises} from 'jsonld';
import Api from '../Api'
import Field from '../Field'
import Resource from '../Resource'
import fetchJsonLd from './fetchJsonLd';

/**
 * Extracts the short name of a resource.
 *
 * @param {string} url
 * @param {string} entrypointUrl
 * @return {string}
 */
function guessNameFromUrl(url, entrypointUrl) {
  return url.substr(entrypointUrl.length + 1);
}

/**
 * Finds the description of the class with the given id.
 *
 * @param {object[]} docs
 * @param {string} classToFind
 * @return {object}
 */
function findSupportedClass(docs, classToFind) {
  for (const supportedClass of docs[0]['http://www.w3.org/ns/hydra/core#supportedClass']) {
    if (supportedClass['@id'] === classToFind) {
      return supportedClass;
    }
  }

  throw new Error(`The class ${classToFind} doesn't exist.`);
}

export function getDocumentationUrlFromHeaders(headers) {
  const linkHeader = headers.get('Link');
  if (!linkHeader) {
    Promise.reject(new Error('The response has no "Link" HTTP header.'));
  }

  const matches = linkHeader.match(/<(.+)>; rel="http:\/\/www.w3.org\/ns\/hydra\/core#apiDocumentation"/);
  if (!matches[1]) {
    Promise.reject(new Error('The "Link" HTTP header is not of the type "http://www.w3.org/ns/hydra/core#apiDocumentation".'));
  }

  return matches[1];
}

/**
 * Retrieves Hydra's entrypoint and API docs.
 *
 * @param {string} entrypointUrl
 * @param {object} options
 * @return {Promise}
 */
function fetchEntrypointAndDocs(entrypointUrl, options = {}) {
  return fetchJsonLd(entrypointUrl, options).then(d => {
    return {
      entrypointUrl,
      docsUrl: getDocumentationUrlFromHeaders(d.response.headers),
      entrypoint: d.body,
      response: d.response
    }
  }).then(data =>
    fetchJsonLd(data.docsUrl, options).then(d => {
      data.docs = d.body;

      return data;
    }).then(data =>
      promises.expand(data.docs, { base: data.docsUrl, documentLoader: (input) => fetchJsonLd(input, options) }).then(docs => {
        data.docs = docs;

        return data;
      })
    ).then(data =>
        promises.expand(data.entrypoint, { base: data.entrypointUrl, documentLoader: (input) => fetchJsonLd(input, options) }).then(entrypoint => {
            data.entrypoint = entrypoint;

            return data;
        })
    )
  );
}

function removeTrailingSlash(url) {
  if (/\/$/.test(url)) {
    url = url.slice(0, -1)
  }

  return url
}

/**
 * Parses a Hydra documentation and converts it to an intermediate representation.
 *
 * @param {string} entrypointUrl
 * @param {object} options
 * @return {Promise.<Api>}
 */
export default function parseHydraDocumentation(entrypointUrl, options = {}) {
  entrypointUrl = removeTrailingSlash(entrypointUrl);
  return fetchEntrypointAndDocs(entrypointUrl, options).then(
    ({ entrypoint, docs, response }) => {
      const title = 'undefined' === typeof docs[0]['http://www.w3.org/ns/hydra/core#title'] ? 'API Platform' : docs[0]['http://www.w3.org/ns/hydra/core#title'][0]['@value'];
      const resources = [], fields = [];

      // Add resources
      for (const properties of findSupportedClass(docs, entrypoint[0]['@type'][0])['http://www.w3.org/ns/hydra/core#supportedProperty']) {
        const property = properties['http://www.w3.org/ns/hydra/core#property'][0];
        const readableFields = [], resourceFields = [], writableFields = [];

        // Add fields
        for (const entrypointSupportedOperation of property['http://www.w3.org/ns/hydra/core#supportedOperation']) {
          const returns = entrypointSupportedOperation['http://www.w3.org/ns/hydra/core#returns'];

          // Skip operations not having a return type
          if (!returns) {
            continue;
          }

          const className = returns[0]['@id'];
          if (0 === className.indexOf('http://www.w3.org/ns/hydra/core')) {
            continue;
          }

          const supportedClass = findSupportedClass(docs, className);
          for (const supportedProperties of supportedClass['http://www.w3.org/ns/hydra/core#supportedProperty']) {
            const supportedProperty = supportedProperties['http://www.w3.org/ns/hydra/core#property'][0];
            const range = supportedProperty['http://www.w3.org/2000/01/rdf-schema#range'] ? supportedProperty['http://www.w3.org/2000/01/rdf-schema#range'][0]['@id'] : null;

            const field = new Field(
              supportedProperty['http://www.w3.org/2000/01/rdf-schema#label'][0]['@value'],
              {
                id: supportedProperty['@id'],
                range,
                reference: 'http://www.w3.org/ns/hydra/core#Link' === property['@type'][0] ? range : null, // Will be updated in a subsequent pass
                required: supportedProperties['http://www.w3.org/ns/hydra/core#required'] ? supportedProperties['http://www.w3.org/ns/hydra/core#required'][0]['@value'] : false,
                description: supportedProperties['http://www.w3.org/ns/hydra/core#description'] ? supportedProperties['http://www.w3.org/ns/hydra/core#description'][0]['@value'] : ''
              },
            );

            fields.push(field);
            resourceFields.push(field);

            if (supportedProperties['http://www.w3.org/ns/hydra/core#readable'][0]['@value']) {
              readableFields.push(field);
            }

            if (supportedProperties['http://www.w3.org/ns/hydra/core#writable'][0]['@value']) {
              writableFields.push(field);
            }
          }

          resources.push(new Resource(
            guessNameFromUrl(entrypoint[0][property['@id']][0]['@id'], entrypointUrl),
            entrypoint[0][property['@id']][0]['@id'],
            {
              id: supportedClass['@id'],
              title: supportedClass['http://www.w3.org/ns/hydra/core#title'][0]['@value'],
              fields: resourceFields,
              readableFields,
              writableFields
            }
          ));

          break;
        }
      }

      // Resolve references
      for (const field of fields) {
        if (null !== field.reference) {
          field.reference = resources.find(resource => resource.id === field.reference) || null;
        }
      }

      return Promise.resolve({ api: new Api(entrypointUrl, {title, resources}), response , status: response.status });
    },
    ({ response }) => Promise.reject({ api: new Api(entrypointUrl, {resources: []}), response, status: response.status })
  );
}
