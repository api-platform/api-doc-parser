# API Doc Parser

`api-doc-parser` is a JavaScript (ES6) library to parse [Hydra](http://hydra-cg.com) API documentations and transform them
in an intermediate representation. This data structure can then be used for various tasks such as creating smart API clients,
scaffolding code or building administration interfaces.

It plays well with the [API Platform](https://api-platform.com) framework.

[![Build Status](https://travis-ci.org/dunglas/api-doc-parser.svg?branch=master)](https://travis-ci.org/dunglas/api-doc-parser)

## Install

With [Yarn](https://yarnpkg.com/):

    yarn add api-doc-parser

Using [NPM](https://www.npmjs.com/):

    npm install api-doc-parser

## Usage

```javascript
import parseHydraDocumentation from 'api-doc-parser/hydra';

parseHydraDocumentation('https://demo.api-platform.com').then(api => console.log(api));
```

## Support for other formats (Swagger/OpenAPI, API Blueprint, JSONAPI...)

API Doc Parser is designed to parse any API documentation format and convert it in the same intermediate representation.
For now, only Hydra is supported but if you develop a parser for another format, please [open a Pull Request](https://github.com/dunglas/api-doc-parser/pulls)
to include it in the library.

## Run tests

    yarn test
    yarn lint

## Credits

Created by [Kévin Dunglas](https://dunglas.fr). Sponsored by [Les-Tilleuls.coop](https://les-tilleuls.coop).
