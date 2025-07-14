<h1 align="center">
<img 
  src="https://github.com/user-attachments/assets/4d3bf8ba-8cbf-4673-9e6b-2cd30c9685d0" 
  alt="API doc parser" 
  width="250" 
  height="250">
</h1>

# API Doc Parser

**Effortlessly turn Hydra, Swagger/OpenAPI, and GraphQL specs into actionable data for your tools and apps.**

[![CI](https://github.com/api-platform/api-doc-parser/actions/workflows/ci.yml/badge.svg)](https://github.com/api-platform/api-doc-parser/actions/workflows/ci.yml)
[![GitHub License](https://img.shields.io/github/license/api-platform/api-doc-parser)](https://github.com/api-platform/api-doc-parser/blob/main/LICENSE)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@api-platform/api-doc-parser)](https://bundlephobia.com/package/@api-platform/api-doc-parser)
[![npm version](https://badge.fury.io/js/%40api-platform%2Fapi-doc-parser.svg)](https://badge.fury.io/js/%40api-platform%2Fapi-doc-parser)
[![NPM Downloads](https://img.shields.io/npm/dw/%40api-platform%2Fapi-doc-parser)](https://img.shields.io/npm/dw/%40api-platform%2Fapi-doc-parser)

---

**`api-doc-parser` is a standalone TypeScript library that parses [Hydra](https://www.hydra-cg.com/), [Swagger](https://swagger.io/specification/v2/), [OpenAPI](https://github.com/OAI/OpenAPI-Specification#the-openapi-specification), and [GraphQL](https://graphql.org/) documentation into a unified, intermediate representation.**  
This normalized structure enables smart API clients, code generators, admin interfaces, and more.  
It integrates seamlessly with the [API Platform](https://api-platform.com/) framework.

## ✨ Key Features

- **Unified output** – one normalized `Api` object covering resources, fields, operations, parameters, and relations
- **TypeScript-first** – strict typings for every parsed element
- **Embedded & referenced resources** resolved automatically
- **Framework integration** – easily integrates with the API Platform ecosystem
- **Supports all major API formats** – Hydra, Swagger/OpenAPI v2, OpenAPI v3, and GraphQL

## 📦 Installation

Using [NPM](https://www.npmjs.com/):

    npm install @api-platform/api-doc-parser

Using [Pnpm](https://pnpm.io/):

    pnpm add @api-platform/api-doc-parser

With [Yarn](https://yarnpkg.com/):

    yarn add @api-platform/api-doc-parser

Using [Bun](https://bun.sh/):

    bun add @api-platform/api-doc-parser

## 🚀 Usage

**Hydra**

```javascript
import { parseHydraDocumentation } from "@api-platform/api-doc-parser";

const { api, response, status } = await parseHydraDocumentation(
  "https://demo.api-platform.com",
);
```

**OpenAPI v2 (formerly known as Swagger)**

```javascript
import { parseSwaggerDocumentation } from "@api-platform/api-doc-parser";

const { api, response, status } = await parseSwaggerDocumentation(
  "https://demo.api-platform.com/docs.json",
);
```

**OpenAPI v3**

```javascript
import { parseOpenApi3Documentation } from "@api-platform/api-doc-parser";

const { api, response, status } = await parseOpenApi3Documentation(
  "https://demo.api-platform.com/docs.jsonopenapi?spec_version=3.0.0",
);
```

**GraphQL**

```javascript
import { parseGraphQl } from "@api-platform/api-doc-parser";

const { api, response } = await parseGraphQl(
  "https://demo.api-platform.com/graphql",
);
```

## ![TypeScript](https://api.iconify.design/vscode-icons:file-type-typescript-official.svg?color=%23888888&width=26&height=26) Type definitions

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
| **Relations & Embeddeds** | Links between resources are inferred from property names and their JSON schema:<br/>• **Plural object/array properties** (e.g. `reviews`, `authors`) become **embedded** resources when their item schema matches an existing resource (`Review`, `Author`).<br/>• **ID-like properties** (e.g. `review_id`, `reviewId`, `review_ids`, `reviewIds`, `authorId`) are treated as **references** to that resource.<br/>• As a result, fields such as **`reviews`** (object/array) and **`review_ids`** (scalar/array of IDs) each point to the **same** `Review` resource, one flagged _embedded_, the other _reference_. |
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

[![Contributors](https://contrib.rocks/image?repo=api-platform/api-doc-parser)](https://github.com/api-platform/api-doc-parser/graphs/contributors)

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

## 🙌 Credits

Created by [Kévin Dunglas](https://dunglas.fr). Sponsored by [Les-Tilleuls.coop](https://les-tilleuls.coop).

## 🔒 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
