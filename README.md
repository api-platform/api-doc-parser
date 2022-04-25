# API Doc Parser

[![GitHub Actions](https://github.com/api-platform/api-doc-parser/workflows/CI/badge.svg?branch=main)](https://github.com/api-platform/api-doc-parser/actions?query=workflow%3ACI+branch%3Amain)
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
import { parseHydraDocumentation } from '@api-platform/api-doc-parser';

parseHydraDocumentation('https://demo.api-platform.com').then(({api}) => console.log(api));
```

**OpenAPI v2 (formerly known as Swagger)**
```javascript
import { parseSwaggerDocumentation } from '@api-platform/api-doc-parser';

parseSwaggerDocumentation('https://demo.api-platform.com/docs.json').then(({api}) => console.log(api));
```

**OpenAPI v3**
```javascript
import { parseOpenApi3Documentation } from '@api-platform/api-doc-parser';

parseOpenApi3Documentation('https://demo.api-platform.com/docs.json?spec_version=3').then(({api}) => console.log(api));
```

**GraphQL**
```javascript
import { parseGraphQl } from '@api-platform/api-doc-parser';

parseGraphQl('https://demo.api-platform.com/graphql').then(({api}) => console.log(api));
```

## OpenAPI Support

In order to support OpenAPI, the library makes some assumptions about how the documentation relates to a corresponding ressource:
- The path to get (`GET`) or edit (`PUT`) one resource looks like `/books/{id}` (regular expression used: `^[^{}]+/{[^{}]+}/?$`).
Note that `books` may be a singular noun (`book`).
If there is no path like this, the library skips the resource.
- The corresponding path schema is retrieved for `get` either in the [`response` / `200` / `content` / `application/json`] path section or in the `components` section of the documentation.
If retrieved from the `components` section, the component name needs to look like `Book` (singular noun).
For `put`, the schema is only retrieved in the [`requestBody` / `content` / `application/json`] path section.
If no schema is found, the resource is skipped.
- If there are two schemas (one for `get` and one for `put`), resource fields are merged.
- The library looks for a creation (`POST`) and list (`GET`) path. They need to look like `/books` (plural noun).
- The deletion (`DELETE`) path needs to be inside the get / edit path.
- In order to reference the resources between themselves (embeddeds or relations), the library guesses embeddeds or references from property names.
For instance if a book schema has a `reviews` property, the library tries to find a `Review` resource.
If there is, a relation or an embedded between `Book` and `Review` resources is made for the `reviews` field.
The property name can also be like `review_id`, `reviewId`, `review_ids` or `reviewIds` for references.
- Parameters are only retrieved in the list path.

## Support for other formats (JSON:API...)

API Doc Parser is designed to parse any API documentation format and convert it in the same intermediate representation.
If you develop a parser for another format, please [open a Pull Request](https://github.com/api-platform/api-doc-parser/pulls)
to include it in the library.

## Run tests

    yarn test
    yarn lint

## Credits

Created by [Kévin Dunglas](https://dunglas.fr). Sponsored by [Les-Tilleuls.coop](https://les-tilleuls.coop).
