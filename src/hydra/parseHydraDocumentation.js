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
 * @param {string} supportedClass
 * @return {object}
 */
function findSupportedClass(docs, supportedClass) {
  const supportedClasses = docs[0]['http://www.w3.org/ns/hydra/core#supportedClass'];

  for (let i = 0; i < supportedClasses.length; i++) {
    if (supportedClasses[i]['@id'] === supportedClass) {
      return supportedClasses[i];
    }
  }

  throw new Error(`The class ${supportedClass} doesn't exist.`);
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
      entrypoint: d.body
    }
  }).then(data =>
    fetchJsonLd(data.docsUrl, options).then(d => {
      data.docs = d.body;

      return data;
    }).then(data =>
      promises.expand(data.docs, { base: data.docsUrl }).then(docs => {
        data.docs = docs;

        return data;
      })
    ).then(data =>
      promises.expand(data.entrypoint, { base: data.entrypointUrl }).then(entrypoint => {
        data.entrypoint = entrypoint;

        return data;
      })
    )
  );
}

/**
 * Parses a Hydra documentation and converts it to an intermediate representation.
 *
 * @param {string} entrypointUrl
 * @param {object} options
 * @return {Promise.<Api>}
 */
export default function parseHydraDocumentation(entrypointUrl, options = {}) {
  return fetchEntrypointAndDocs(entrypointUrl, options).then(({ entrypoint, docs }) => {
    const title = 'undefined' === typeof docs[0]['http://www.w3.org/ns/hydra/core#title'] ? 'API Platform' : docs[0]['http://www.w3.org/ns/hydra/core#title'][0]['@value'];
    const entrypointSupportedClass = findSupportedClass(docs, entrypoint[0]['@type'][0]);

    let resources = [];
    let fields = [];

    // Add resources
    for (let properties of entrypointSupportedClass['http://www.w3.org/ns/hydra/core#supportedProperty']) {
      const property = properties['http://www.w3.org/ns/hydra/core#property'][0];
      const entrypointSupportedOperations = property['http://www.w3.org/ns/hydra/core#supportedOperation'];

      let readableFields = [];
      let writableFields = [];

      // Add fields
      for (let j = 0; j < entrypointSupportedOperations.length; j++) {
        const className = entrypointSupportedOperations[j]['http://www.w3.org/ns/hydra/core#returns'][0]['@id'];
        if (0 === className.indexOf('http://www.w3.org/ns/hydra/core')) {
          continue;
        }

        const supportedClass = findSupportedClass(docs, className);
        for (let supportedProperty of supportedClass['http://www.w3.org/ns/hydra/core#supportedProperty']) {
          const range = supportedProperty['http://www.w3.org/ns/hydra/core#property'][0]['http://www.w3.org/2000/01/rdf-schema#range'][0]['@id'];

          const field = new Field(
            supportedProperty['http://www.w3.org/ns/hydra/core#property'][0]['http://www.w3.org/2000/01/rdf-schema#label'][0]['@value'],
            {
              id: supportedProperty['http://www.w3.org/ns/hydra/core#property'][0]['@id'],
              range,
              reference: 'http://www.w3.org/ns/hydra/core#Link' === supportedProperty['http://www.w3.org/ns/hydra/core#property'][0]['@type'][0] ? range : null, // Will be updated in a subsequent pass
              required: supportedProperty['http://www.w3.org/ns/hydra/core#required'] ? supportedProperty['http://www.w3.org/ns/hydra/core#required'][0]['@value'] : false,
              description: supportedProperty['http://www.w3.org/ns/hydra/core#description'] ? supportedProperty['http://www.w3.org/ns/hydra/core#description'][0]['@value'] : ''
            },
          );

          fields.push(field);

          if (supportedProperty['http://www.w3.org/ns/hydra/core#readable'][0]['@value']) {
            readableFields.push(field);
          }

          if (supportedProperty['http://www.w3.org/ns/hydra/core#writable'][0]['@value']) {
            writableFields.push(field);
          }
        }

        resources.push(new Resource(
          guessNameFromUrl(entrypoint[0][property['@id']][0]['@id'], entrypointUrl),
          entrypoint[0][property['@id']][0]['@id'],
          {
            id: supportedClass['@id'],
            title: supportedClass['http://www.w3.org/ns/hydra/core#title'][0]['@value'],
            readableFields,
            writableFields
          }
        ));

        break;
      }
    }

    // Resolve references
    for (let field of fields) {
      if (null !== field.reference) {
        field.reference = resources.find(resource => resource.id === field.reference);
      }
    }

    return new Api(entrypointUrl, {title, resources});
  });
}
