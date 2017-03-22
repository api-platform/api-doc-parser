# API Doc Parser

`api-doc-parser` is a JavaScript (ES6) library to parse [Hydra](http://hydra-cg.com) API documentations and transform them
in an intermediate representation. This data structure can then be used for various tasks such as creating smart API clients,
scaffolding code or building administration interfaces.

It plays well with the [API Platform](https://api-platform.com) framework.

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

## Run tests

   yarn test

## Credits

Created by [Kévin Dunglas](https://dunglas.fr). Sponsored by [Les-Tilleuls.coop](https://les-tilleuls.coop).
