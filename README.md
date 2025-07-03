<h1 align="center">
  <br>
API Doc Parser
</h1>

<p align="center">
  <b>
Effortlessly turn Hydra, Swagger/OpenAPI, and GraphQL specs into actionable data for your tools and apps.
  </b>
</p>

<p align="center">
  <a href="https://github.com/api-platform/api-doc-parser/actions/workflows/ci.yml">
    <img src="https://github.com/api-platform/api-doc-parser/actions/workflows/ci.yml/badge.svg" alt="CI">
  </a>
  <a href="https://github.com/api-platform/api-doc-parser/blob/main/LICENSE">
    <img  src="https://img.shields.io/github/license/api-platform/api-doc-parser" alt="GitHub License">
  </a>
  <a href="https://bundlephobia.com/package/@api-platform/api-doc-parser">
    <img src="https://img.shields.io/bundlephobia/minzip/@api-platform/api-doc-parser" alt="npm bundle size">
  </a>
  <a href="https://badge.fury.io/js/%40api-platform%2Fapi-doc-parser">
    <img src="https://badge.fury.io/js/%40api-platform%2Fapi-doc-parser.svg" alt="npm version">
  </a>
  <a href="https://img.shields.io/npm/dw/%40api-platform%2Fapi-doc-parser">
    <img src="https://img.shields.io/npm/dw/%40api-platform%2Fapi-doc-parser" alt="NPM Downloads">
  </a>
</p>

<p align="center">
  <a href="#installation">Installation</a> •
  <a href="#usage">Usage</a> •
  <a href="#type-definitions">Type definitions</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#credits">Credits</a> •
  <a href="#license">License</a>
</p>

---

 <br>
<p align="center">
  <code>api-doc-parser</code> is a standalone TypeScript library that parses
  <a href="https://www.hydra-cg.com/">Hydra</a>,
  <a href="https://swagger.io/specification/v2/">Swagger</a>,
  <a href="https://github.com/OAI/OpenAPI-Specification#the-openapi-specification">OpenAPI</a>,
  and <a href="https://graphql.org/">GraphQL</a> documentation into a unified, intermediate representation.<br>
  This normalized structure enables smart API clients, code generators, admin interfaces, and more.<br>
  It integrates seamlessly with the <a href="https://api-platform.com/">API Platform</a> framework.
</p>

## ✨ Key Features

- **Unified output** – one normalized `Api` object covering resources, fields, operations, parameters, and relations
- **TypeScript-first** – strict typings for every parsed element
- **Embedded & referenced resources** resolved automatically
- **Framework integration** – easily integrates with the API Platform ecosystem
- **Supports all major API formats** – Hydra, Swagger/OpenAPI v2, OpenAPI v3, and GraphQL

## 📦 Installation

With [Yarn](https://yarnpkg.com/):

    yarn add @api-platform/api-doc-parser

Using [NPM](https://www.npmjs.com/):

    npm install @api-platform/api-doc-parser

Using [Pnpm](https://pnpm.io/):

    pnpm add @api-platform/api-doc-parser

Using [Bun](https://bun.sh/):

    bun add @api-platform/api-doc-parser

## 🚀 Usage

**Hydra**

```javascript
import { parseHydraDocumentation } from "@api-platform/api-doc-parser";

parseHydraDocumentation("https://demo.api-platform.com").then(({ api }) =>
  console.log(api),
);
```

**OpenAPI v2 (formerly known as Swagger)**

```javascript
import { parseSwaggerDocumentation } from "@api-platform/api-doc-parser";

parseSwaggerDocumentation("https://demo.api-platform.com/docs.json").then(
  ({ api }) => console.log(api),
);
```

**OpenAPI v3**

```javascript
import { parseOpenApi3Documentation } from "@api-platform/api-doc-parser";

parseOpenApi3Documentation(
  "https://demo.api-platform.com/docs.jsonopenapi?spec_version=3.0.0",
).then(({ api }) => console.log(api));
```

**GraphQL**

```javascript
import { parseGraphQl } from "@api-platform/api-doc-parser";

parseGraphQl("https://demo.api-platform.com/graphql").then(({ api }) =>
  console.log(api),
);
```

## <img src="https://www.typescriptlang.org/icons/icon-48x48.png" alt="TypeScript" width="24" height="24" style="vertical-align:top; padding-right:4px;" /> Type definitions

Each parse function returns a Promise that resolves to an object containing the normalized API structure, the raw documentation, and the HTTP status code:

#### OpenAPI 3

```typescript
function parseOpenApi3Documentation(
  entrypointUrl: string,
  options?: RequestInitExtended,
): Promise<{
  api: Api;
  response: OpenAPIV3.Document;
  status: number;
}>;
```

#### Swagger

```typescript
function parseSwaggerDocumentation(entrypointUrl: string): Promise<{
  api: Api;
  response: OpenAPIV2.Document;
  status: number;
}>;
```

#### Hydra

```typescript
function parseHydraDocumentation(
  entrypointUrl: string,
  options?: RequestInitExtended,
): Promise<{
  api: Api;
  response: Response;
  status: number;
}>;
```

#### GraphQL

```typescript
function parseGraphQl(
  entrypointUrl: string,
  options?: RequestInit,
): Promise<{
  api: Api;
  response: Response;
}>;
```

### Api

Represents the root of the parsed API, containing the entrypoint URL, an optional title, and a list of resources.

```typescript
interface Api {
  entrypoint: string;
  title?: string;
  resources?: Resource[];
}
```

### Resource

Describes an API resource (such as an entity or collection), including its fields, operations, and metadata.

```typescript
interface Resource {
  name: string | null;
  url: string | null;
  id?: string | null;
  title?: string | null;
  description?: string | null;
  deprecated?: boolean | null;
  fields?: Field[] | null;
  readableFields?: Field[] | null;
  writableFields?: Field[] | null;
  parameters?: Parameter[] | null;
  getParameters?: () => Promise<Parameter[]> | null;
  operations?: Operation[] | null;
}
```

### Field

Represents a property of a resource, including its type, constraints, and metadata.

```typescript
interface Field {
  name: string | null;
  id?: string | null;
  range?: string | null;
  type?: FieldType | null;
  arrayType?: FieldType | null;
  enum?: { [key: string | number]: string | number } | null;
  reference?: string | Resource | null;
  embedded?: Resource | null;
  required?: boolean | null;
  nullable?: boolean | null;
  description?: string | null;
  maxCardinality?: number | null;
  deprecated?: boolean | null;
}
```

### Parameter

Represents a query parameter for a collection/list operation, such as a filter or pagination variable.

```typescript
interface Parameter {
  variable: string;
  range: string | null;
  required: boolean;
  description: string;
  deprecated?: boolean;
}
```

### FieldType

Enumerates the possible types for a field, such as string, integer, date, etc.

```typescript
type FieldType =
  | "string"
  | "integer"
  | "negativeInteger"
  | "nonNegativeInteger"
  | "positiveInteger"
  | "nonPositiveInteger"
  | "number"
  | "decimal"
  | "double"
  | "float"
  | "boolean"
  | "date"
  | "dateTime"
  | "duration"
  | "time"
  | "byte"
  | "binary"
  | "hexBinary"
  | "base64Binary"
  | "array"
  | "object"
  | "email"
  | "url"
  | "uuid"
  | "password"
  | string;
```

### Operation

Represents an operation (such as GET, POST, PUT, PATCH, DELETE) that can be performed on a resource.

```typescript
interface Operation {
  name: string | null;
  type: "show" | "edit" | "delete" | "list" | "create" | null;
  method?: string | null;
  expects?: any | null;
  returns?: string | null;
  types?: string[] | null;
  deprecated?: boolean | null;
}
```

## 📖 OpenAPI Support

`api-doc-parser` applies a predictable set of rules when interpreting an OpenAPI document.  
If a rule is not met, the resource concerned is silently skipped.
| Rule | Details |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Single-item path pattern** | A `GET` (read) or **`PUT`/`PATCH`** (update) endpoint **must** match:<br/>`/books/{id}` (regex&nbsp;`^[^{}]+/{[^{}]+}/?$`).<br/>`books` may be singular (`/book/{id}`). |
| **Schema discovery** | **GET** → first searches `responses → 200 → content → application/json`; if missing, falls back to `components` (component name must be singular, e.g. `Book`).<br/>**PUT/PATCH** → only `requestBody → content → application/json` is considered.<br/>If both GET & PUT/PATCH schemas exist, their fields are **merged**. |
| **Collection paths** | A create (`POST`) or list (`GET`) endpoint **must** be plural:<br/>`/books`. |
| **Deletion path** | `DELETE` must live under the single-item GET path (`/books/{id}`). |
| **Relations & Embeddeds** | Links between resources are inferred from property names and their JSON schema:<br/>• **Plural object/array properties** (e.g. `reviews`, `authors`) become **embedded** resources when their item schema matches an existing resource (`Review`, `Author`).<br/>• **ID-like properties** (e.g. `review_id`, `reviewId`, `review_ids`, `reviewIds`, `authorId`) are treated as **references** to that resource.<br/>• Matching algorithm: `camelize` → strip trailing `Id`/`Ids` → `classify` (singular PascalCase) → exact compare with resource titles. This effectively handles both plural and ID variants, regardless of original casing.<br/>• As a result, fields such as **`reviews`** (object/array) and **`review_ids`** (scalar/array of IDs) each point to the **same** `Review` resource, one flagged _embedded_, the other _reference_. |
| **Parameter extraction** | Parameters are read **only** from the list path (`/books`). |

## 🧩 Support for other formats (JSON:API, AsyncAPI...)

API Doc Parser is designed to parse any API documentation format and convert it in the same intermediate representation.
If you develop a parser for another format, please [open a Pull Request](https://github.com/api-platform/api-doc-parser/pulls)
to include it in the library.

## 🤝 Contributing

Contributions are welcome! To contribute:

1. **Read our [Code of Conduct](https://github.com/api-platform/api-doc-parser?tab=coc-ov-file#contributor-code-of-conduct).**

2. **Fork the repository and create a feature branch.**

3. **Install dependencies**

   ```bash
   pnpm install
   ```

4. **Adhere to the code style**

   ```bash
   pnpm lint:fix
   ```

   ```bash
   pnpm format
   ```

5. **Run tests**

   ```bash
   pnpm test
   ```

6. **Ensure type correctness**

   ```bash
   pnpm typecheck
   ```

7. **Submit a pull request with a clear description of your changes.**

## 👥 Contributors

<a href="https://github.com/api-platform/api-doc-parser/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=api-platform/api-doc-parser" />
</a>

## 🌟 Star History

<a href="https://www.star-history.com/#api-platform/api-doc-parser&Date">
  <picture>
    <source
      media="(prefers-color-scheme: dark)"
      srcset="https://api.star-history.com/svg?repos=api-platform/api-doc-parser&type=Date&theme=dark"
    />
    <source
      media="(prefers-color-scheme: light)"
      srcset="https://api.star-history.com/svg?repos=api-platform/api-doc-parser&type=Date"
    />
    <img
      alt="Star History Chart"
      src="https://api.star-history.com/svg?repos=api-platform/api-doc-parser&type=Date"
    />
  </picture>
</a>

## 🎉 Credits

Created by [Kévin Dunglas](https://dunglas.fr). Sponsored by [Les-Tilleuls.coop](https://les-tilleuls.coop).

## 🔒 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
