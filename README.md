# API Doc Parser

[![Build Status](https://travis-ci.org/api-platform/api-doc-parser.svg?branch=master)](https://travis-ci.org/api-platform/api-doc-parser)
[![npm version](https://badge.fury.io/js/%40api-platform%2Fapi-doc-parser.svg)](https://badge.fury.io/js/%40api-platform%2Fapi-doc-parser)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)

`api-doc-parser` is a JavaScript (ES6) library to parse [Hydra](http://hydra-cg.com) or Swagger API documentations and transform them
in an intermediate representation. This data structure can then be used for various tasks such as creating smart API clients,
scaffolding code or building administration interfaces.

It plays well with the [API Platform](https://api-platform.com) framework.

## Install

With [Yarn](https://yarnpkg.com/):

    yarn add api-doc-parser

Using [NPM](https://www.npmjs.com/):

    npm install api-doc-parser

If you plan to use the library with Node, you also need a polyfill for the `fetch` function:

    yarn add isomorphic-fetch

## Usage

**Hydra**
```javascript
import parseHydraDocumentation from 'api-doc-parser/lib/hydra/parseHydraDocumentation';

parseHydraDocumentation('https://demo.api-platform.com').then(({api}) => console.log(api));
```

**Swagger**
```javascript
import parseSwaggerDocumentation from 'api-doc-parser/lib/swagger/parseSwaggerDocumentation';

parseSwaggerDocumentation('https://demo.api-platform.com/docs.json').then(({api}) => console.log(api));
```

### Serialization

In order to allow caching (e.g. for performance or offline fallback purpose) you can utilize the `ApiSerializer` which can serialize the `Api` object graph to a plain javascript object tree which can be json-serialized easily (the `Api` object graph may have circular references which means it is in some circumstances not json-serializable as is).

```javascript
import parseHydraDocumentation from 'api-doc-parser/lib/hydra/parseHydraDocumentation';
import ApiSerializer from 'api-doc-parse/lib/ApiSerializer';

parseHydraDocumentation('https://demo.api-platform.com').then(({api}) => {
  const serializer = new ApiSerializer();
  const serialized = serializer.serialize(api);
  
  console.log(JSON.stringify(serialized));
});
```

A scenario where you'd like to utilize some storage (e.g. `localStorage`) for caching you could implement something like this:

```javascript
import parseHydraDocumentation from 'api-doc-parser/lib/hydra/parseHydraDocumentation';
import ApiSerializer from 'api-doc-parse/lib/ApiSerializer';

const getApiSpecs = () => new Promise(resolve => {
  const serializer = new ApiSerializer();
  const serializedSpecs = localStorage.getItem('apiSpecs');
  
  if (!serializedSpecs) {
    parseHydraDocumentation('https://demo.api-platform.com').then(({api}) => {
      localStorage.setItem('apiSpecs', serializer.serialize(api));
      
      resolve(api);
    });    
  } else {
    resolve(serializer.deserialize(serializedSpecs));
  }
});

getApiSpecs().then(specs => console.log(specs));
```

## Support for other formats (GraphQL, JSONAPI...)

API Doc Parser is designed to parse any API documentation format and convert it in the same intermediate representation.
For now, only Hydra and Swagger is supported but if you develop a parser for another format, please [open a Pull Request](https://github.com/dunglas/api-doc-parser/pulls)
to include it in the library.

## Run tests

    yarn test
    yarn lint

## Credits

Created by [Kévin Dunglas](https://dunglas.fr). Sponsored by [Les-Tilleuls.coop](https://les-tilleuls.coop).
