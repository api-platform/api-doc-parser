# API Doc Parser

[![Build Status](https://travis-ci.org/api-platform/api-doc-parser.svg?branch=master)](https://travis-ci.org/api-platform/api-doc-parser)
[![npm version](https://badge.fury.io/js/%40api-platform%2Fapi-doc-parser.svg)](https://badge.fury.io/js/%40api-platform%2Fapi-doc-parser)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)

`api-doc-parser` is a JavaScript (ES6) library to parse [Hydra](http://hydra-cg.com) API documentations and transform them
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

```javascript
import parseHydraDocumentation from 'api-doc-parser/lib/hydra/parseHydraDocumentation';

parseHydraDocumentation('https://demo.api-platform.com').then(({api}) => console.log(api));
```

## Support for other formats (GraphQL, Swagger/OpenAPI, JSONAPI...)

API Doc Parser is designed to parse any API documentation format and convert it in the same intermediate representation.
For now, only Hydra is supported but if you develop a parser for another format, please [open a Pull Request](https://github.com/dunglas/api-doc-parser/pulls)
to include it in the library.

## Run tests

    yarn test
    yarn lint

## Credits

Created by [Kévin Dunglas](https://dunglas.fr). Sponsored by [Les-Tilleuls.coop](https://les-tilleuls.coop).
