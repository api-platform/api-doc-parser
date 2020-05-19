# API Doc Parser

[![Build Status](https://travis-ci.org/api-platform/api-doc-parser.svg?branch=master)](https://travis-ci.org/api-platform/api-doc-parser)
[![npm version](https://badge.fury.io/js/%40api-platform%2Fapi-doc-parser.svg)](https://badge.fury.io/js/%40api-platform%2Fapi-doc-parser)

`api-doc-parser` is a standalone TypeScript library to parse [Hydra](http://hydra-cg.com), [Swagger](https://swagger.io/specification/v2/), [OpenAPI](https://github.com/OAI/OpenAPI-Specification#the-openapi-specification) and [GraphQL](https://graphql.org/) documentations
and transform them in an intermediate representation.
This data structure can then be used for various tasks such as creating smart API clients,
scaffolding code or building administration interfaces.

It plays well with the [API Platform](https://api-platform.com) framework.

## Install

With [Yarn](https://yarnpkg.com/):

    yarn add @api-platform/api-doc-parser

Using [NPM](https://www.npmjs.com/):

    npm install @api-platform/api-doc-parser

If you plan to use the library with Node, you also need a polyfill for the `fetch` function:

    yarn add isomorphic-fetch

## Usage

**Hydra**
```javascript
import parseHydraDocumentation from '@api-platform/api-doc-parser/lib/hydra/parseHydraDocumentation';

parseHydraDocumentation('https://demo.api-platform.com').then(({api}) => console.log(api));
```

**OpenAPI v2 (formerly known as Swagger)**
```javascript
import parseSwaggerDocumentation from '@api-platform/api-doc-parser/lib/swagger/parseSwaggerDocumentation';

parseSwaggerDocumentation('https://demo.api-platform.com/docs.json').then(({api}) => console.log(api));
```

**OpenAPI v3**
```javascript
import parseOpenApi3Documentation from '@api-platform/api-doc-parser/lib/openapi3/parseOpenApi3Documentation';

parseOpenApi3Documentation('https://demo.api-platform.com/docs.json?spec_version=3').then(({api}) => console.log(api));
```

**GraphQL**
```javascript
import { parseGraphQl } from '@api-platform/api-doc-parser';

parseGraphQl('https://demo.api-platform.com/graphql').then(({api}) => console.log(api));
```

## Support for other formats (JSON:API...)

API Doc Parser is designed to parse any API documentation format and convert it in the same intermediate representation.
If you develop a parser for another format, please [open a Pull Request](https://github.com/api-platform/api-doc-parser/pulls)
to include it in the library.

## Run tests

    yarn test
    yarn lint

## Credits

Created by [Kévin Dunglas](https://dunglas.fr). Sponsored by [Les-Tilleuls.coop](https://les-tilleuls.coop).
