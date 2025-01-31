import handleJson from "./handleJson.js";
import parsedJsonReplacer from "../utils/parsedJsonReplacer.js";
import type { OpenAPIV3 } from "openapi-types";

const openApi3Definition: OpenAPIV3.Document = {
  openapi: "3.0.2",
  info: {
    title: "",
    version: "0.0.0",
  },
  paths: {
    "/books": {
      get: {
        tags: ["Book"],
        operationId: "getBookCollection",
        summary: "Retrieves the collection of Book resources.",
        responses: {
          "200": {
            description: "Book collection response",
            content: {
              "application/ld+json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Book-book.read",
                  },
                },
              },
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Book-book.read",
                  },
                },
              },
              "text/html": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Book-book.read",
                  },
                },
              },
            },
          },
        },
        parameters: [
          {
            name: "page",
            in: "query",
            required: false,
            description: "The collection page number",
            schema: {
              type: "integer",
            },
          },
        ],
      },
      post: {
        tags: ["Book"],
        operationId: "postBookCollection",
        summary: "Creates a Book resource.",
        responses: {
          "201": {
            description: "Book resource created",
            content: {
              "application/ld+json": {
                schema: {
                  $ref: "#/components/schemas/Book-book.read",
                },
              },
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Book-book.read",
                },
              },
              "text/html": {
                schema: {
                  $ref: "#/components/schemas/Book-book.read",
                },
              },
            },
            links: {
              GetBookItem: {
                parameters: {
                  id: "$response.body#/id",
                },
                operationId: "getBookItem",
                description:
                  "The `id` value returned in the response can be used as the `id` parameter in `GET /books/{id}`.",
              },
            },
          },
          "400": {
            description: "Invalid input",
          },
          "404": {
            description: "Resource not found",
          },
        },
        requestBody: {
          content: {
            "application/ld+json": {
              schema: {
                $ref: "#/components/schemas/Book",
              },
            },
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Book",
              },
            },
            "text/html": {
              schema: {
                $ref: "#/components/schemas/Book",
              },
            },
          },
          description: "The new Book resource",
        },
      },
    },
    "/books/{id}": {
      get: {
        tags: ["Book"],
        operationId: "getBookItem",
        summary: "Retrieves a Book resource.",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "Book resource response",
            content: {
              "application/ld+json": {
                schema: {
                  $ref: "#/components/schemas/Book-book.read",
                },
              },
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Book-book.read",
                },
              },
              "text/html": {
                schema: {
                  $ref: "#/components/schemas/Book-book.read",
                },
              },
            },
          },
          "404": {
            description: "Resource not found",
          },
        },
      },
      delete: {
        tags: ["Book"],
        operationId: "deleteBookItem",
        summary: "Removes the Book resource.",
        responses: {
          "204": {
            description: "Book resource deleted",
          },
          "404": {
            description: "Resource not found",
          },
        },
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
      },
      put: {
        tags: ["Book"],
        operationId: "putBookItem",
        summary: "Replaces the Book resource.",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "Book resource updated",
            content: {
              "application/ld+json": {
                schema: {
                  $ref: "#/components/schemas/Book-book.read",
                },
              },
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Book-book.read",
                },
              },
              "text/html": {
                schema: {
                  $ref: "#/components/schemas/Book-book.read",
                },
              },
            },
          },
          "400": {
            description: "Invalid input",
          },
          "404": {
            description: "Resource not found",
          },
        },
        requestBody: {
          content: {
            "application/ld+json": {
              schema: {
                $ref: "#/components/schemas/Book",
              },
            },
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Book",
              },
            },
            "text/html": {
              schema: {
                $ref: "#/components/schemas/Book",
              },
            },
          },
          description: "The updated Book resource",
        },
      },
    },
    "/reviews": {
      get: {
        tags: ["Review"],
        operationId: "getReviewCollection",
        summary: "Retrieves the collection of Review resources.",
        responses: {
          "200": {
            description: "Review collection response",
            content: {
              "application/ld+json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Review",
                  },
                },
              },
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Review",
                  },
                },
              },
              "text/html": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Review",
                  },
                },
              },
            },
          },
        },
        parameters: [
          {
            name: "page",
            in: "query",
            required: false,
            description: "The collection page number",
            schema: {
              type: "integer",
            },
          },
        ],
      },
      post: {
        tags: ["Review"],
        operationId: "postReviewCollection",
        summary: "Creates a Review resource.",
        responses: {
          "201": {
            description: "Review resource created",
            content: {
              "application/ld+json": {
                schema: {
                  $ref: "#/components/schemas/Review",
                },
              },
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Review",
                },
              },
              "text/html": {
                schema: {
                  $ref: "#/components/schemas/Review",
                },
              },
            },
            links: {
              GetReviewItem: {
                parameters: {
                  id: "$response.body#/id",
                },
                operationId: "getReviewItem",
                description:
                  "The `id` value returned in the response can be used as the `id` parameter in `GET /reviews/{id}`.",
              },
            },
          },
          "400": {
            description: "Invalid input",
          },
          "404": {
            description: "Resource not found",
          },
        },
        requestBody: {
          content: {
            "application/ld+json": {
              schema: {
                $ref: "#/components/schemas/Review",
              },
            },
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Review",
              },
            },
            "text/html": {
              schema: {
                $ref: "#/components/schemas/Review",
              },
            },
          },
          description: "The new Review resource",
        },
      },
    },
    "/reviews/{id}": {
      get: {
        tags: ["Review"],
        operationId: "getReviewItem",
        summary: "Retrieves a Review resource.",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "Review resource response",
            content: {
              "application/ld+json": {
                schema: {
                  $ref: "#/components/schemas/Review",
                },
              },
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Review",
                },
              },
              "text/html": {
                schema: {
                  $ref: "#/components/schemas/Review",
                },
              },
            },
          },
          "404": {
            description: "Resource not found",
          },
        },
      },
      delete: {
        tags: ["Review"],
        operationId: "deleteReviewItem",
        summary: "Removes the Review resource.",
        responses: {
          "204": {
            description: "Review resource deleted",
          },
          "404": {
            description: "Resource not found",
          },
        },
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
      },
      put: {
        tags: ["Review"],
        operationId: "putReviewItem",
        summary: "Replaces the Review resource.",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "Review resource updated",
            content: {
              "application/ld+json": {
                schema: {
                  $ref: "#/components/schemas/Review",
                },
              },
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Review",
                },
              },
              "text/html": {
                schema: {
                  $ref: "#/components/schemas/Review",
                },
              },
            },
          },
          "400": {
            description: "Invalid input",
          },
          "404": {
            description: "Resource not found",
          },
        },
        requestBody: {
          content: {
            "application/ld+json": {
              schema: {
                $ref: "#/components/schemas/Review",
              },
            },
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Review",
              },
            },
            "text/html": {
              schema: {
                $ref: "#/components/schemas/Review",
              },
            },
          },
          description: "The updated Review resource",
        },
      },
    },
  },
  components: {
    schemas: {
      Book: {
        type: "object",
        description: "",
        properties: {
          isbn: {
            type: "string",
            description: "The ISBN of the book",
          },
          description: {
            type: "string",
            description: "A description of the item",
          },
          author: {
            type: "string",
            description:
              "The author of this content or rating. Please note that author is special in that HTML 5 provides a special mechanism for indicating authorship via the rel tag. That is equivalent to this and may be used interchangeably",
          },
          title: {
            type: "string",
            description: "The title of the book",
          },
          bookFormat: {
            type: "string",
            description: "The publication format of the book.",
            enum: ["AUDIOBOOK_FORMAT", "E_BOOK", "PAPERBACK", "HARDCOVER"],
          },
          publicationDate: {
            type: "string",
            format: "date-time",
            description:
              "The date on which the CreativeWork was created or the item was added to a DataFeed",
          },
          reviews: {
            type: "array",
            items: {
              type: "string",
            },
          },
          archivedAt: {
            writeOnly: true,
            type: "string",
            format: "date-time",
            nullable: true,
          },
        },
        required: [
          "description",
          "author",
          "title",
          "bookFormat",
          "publicationDate",
        ],
      },
      "Book-book.read": {
        type: "object",
        description: "",
        properties: {
          id: {
            readOnly: true,
            type: "integer",
          },
          isbn: {
            type: "string",
            description: "The ISBN of the book",
          },
          description: {
            type: "string",
            description: "A description of the item",
          },
          author: {
            type: "string",
            description:
              "The author of this content or rating. Please note that author is special in that HTML 5 provides a special mechanism for indicating authorship via the rel tag. That is equivalent to this and may be used interchangeably",
          },
          title: {
            type: "string",
            description: "The title of the book",
          },
          bookFormat: {
            type: "string",
            description: "The publication format of the book.",
            enum: ["AUDIOBOOK_FORMAT", "E_BOOK", "PAPERBACK", "HARDCOVER"],
          },
          publicationDate: {
            type: "string",
            format: "date-time",
            description:
              "The date on which the CreativeWork was created or the item was added to a DataFeed",
          },
          reviews: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },
        required: [
          "description",
          "author",
          "title",
          "bookFormat",
          "publicationDate",
        ],
      },
      Review: {
        type: "object",
        description: "",
        properties: {
          id: {
            readOnly: true,
            type: "integer",
          },
          rating: {
            type: "integer",
          },
          body: {
            type: "string",
          },
          book: {
            type: "string",
          },
          author: {
            type: "string",
          },
          publicationDate: {
            type: "string",
            format: "date-time",
          },
        },
      },
    },
  },
};
const parsed = [
  {
    name: "books",
    url: "https://demo.api-platform.com/books",
    id: null,
    title: "Book",
    description: "",
    fields: [
      {
        name: "id",
        id: null,
        range: null,
        type: "integer",
        arrayType: null,
        enum: null,
        reference: null,
        embedded: null,
        nullable: false,
        required: false,
        description: "",
      },
      {
        name: "isbn",
        id: null,
        range: null,
        type: "string",
        arrayType: null,
        enum: null,
        reference: null,
        embedded: null,
        nullable: false,
        required: false,
        description: "The ISBN of the book",
      },
      {
        name: "description",
        id: null,
        range: null,
        type: "string",
        arrayType: null,
        enum: null,
        reference: null,
        embedded: null,
        nullable: false,
        required: true,
        description: "A description of the item",
      },
      {
        name: "author",
        id: null,
        range: null,
        type: "string",
        arrayType: null,
        enum: null,
        reference: null,
        embedded: null,
        nullable: false,
        required: true,
        description:
          "The author of this content or rating. Please note that author is special in that HTML 5 provides a special mechanism for indicating authorship via the rel tag. That is equivalent to this and may be used interchangeably",
      },
      {
        name: "title",
        id: null,
        range: null,
        type: "string",
        arrayType: null,
        enum: null,
        reference: null,
        embedded: null,
        nullable: false,
        required: true,
        description: "The title of the book",
      },
      {
        name: "bookFormat",
        id: null,
        range: null,
        type: "string",
        arrayType: null,
        enum: {
          "Audiobook format": "AUDIOBOOK_FORMAT",
          "E book": "E_BOOK",
          Paperback: "PAPERBACK",
          Hardcover: "HARDCOVER",
        },
        reference: null,
        embedded: null,
        nullable: false,
        required: true,
        description: "The publication format of the book.",
      },
      {
        name: "publicationDate",
        id: null,
        range: null,
        type: "dateTime",
        arrayType: null,
        enum: null,
        reference: null,
        embedded: null,
        nullable: false,
        required: true,
        description:
          "The date on which the CreativeWork was created or the item was added to a DataFeed",
      },
      {
        name: "reviews",
        id: null,
        range: null,
        type: "array",
        arrayType: "string",
        enum: null,
        reference: {
          title: "Review",
        },
        embedded: null,
        nullable: false,
        required: false,
        description: "",
        maxCardinality: null,
      },
      {
        name: "archivedAt",
        id: null,
        range: null,
        type: "dateTime",
        arrayType: null,
        enum: null,
        reference: null,
        embedded: null,
        nullable: true,
        required: false,
        description: "",
      },
    ],
    readableFields: [
      {
        name: "id",
        id: null,
        range: null,
        type: "integer",
        arrayType: null,
        enum: null,
        reference: null,
        embedded: null,
        nullable: false,
        required: false,
        description: "",
      },
      {
        name: "isbn",
        id: null,
        range: null,
        type: "string",
        arrayType: null,
        enum: null,
        reference: null,
        embedded: null,
        nullable: false,
        required: false,
        description: "The ISBN of the book",
      },
      {
        name: "description",
        id: null,
        range: null,
        type: "string",
        arrayType: null,
        enum: null,
        reference: null,
        embedded: null,
        nullable: false,
        required: true,
        description: "A description of the item",
      },
      {
        name: "author",
        id: null,
        range: null,
        type: "string",
        arrayType: null,
        enum: null,
        reference: null,
        embedded: null,
        nullable: false,
        required: true,
        description:
          "The author of this content or rating. Please note that author is special in that HTML 5 provides a special mechanism for indicating authorship via the rel tag. That is equivalent to this and may be used interchangeably",
      },
      {
        name: "title",
        id: null,
        range: null,
        type: "string",
        arrayType: null,
        enum: null,
        reference: null,
        embedded: null,
        nullable: false,
        required: true,
        description: "The title of the book",
      },
      {
        name: "bookFormat",
        id: null,
        range: null,
        type: "string",
        arrayType: null,
        enum: {
          "Audiobook format": "AUDIOBOOK_FORMAT",
          "E book": "E_BOOK",
          Paperback: "PAPERBACK",
          Hardcover: "HARDCOVER",
        },
        reference: null,
        embedded: null,
        nullable: false,
        required: true,
        description: "The publication format of the book.",
      },
      {
        name: "publicationDate",
        id: null,
        range: null,
        type: "dateTime",
        arrayType: null,
        enum: null,
        reference: null,
        embedded: null,
        nullable: false,
        required: true,
        description:
          "The date on which the CreativeWork was created or the item was added to a DataFeed",
      },
      {
        name: "reviews",
        id: null,
        range: null,
        type: "array",
        arrayType: "string",
        enum: null,
        reference: {
          title: "Review",
        },
        embedded: null,
        nullable: false,
        required: false,
        description: "",
        maxCardinality: null,
      },
    ],
    writableFields: [
      {
        name: "isbn",
        id: null,
        range: null,
        type: "string",
        arrayType: null,
        enum: null,
        reference: null,
        embedded: null,
        nullable: false,
        required: false,
        description: "The ISBN of the book",
      },
      {
        name: "description",
        id: null,
        range: null,
        type: "string",
        arrayType: null,
        enum: null,
        reference: null,
        embedded: null,
        nullable: false,
        required: true,
        description: "A description of the item",
      },
      {
        name: "author",
        id: null,
        range: null,
        type: "string",
        arrayType: null,
        enum: null,
        reference: null,
        embedded: null,
        nullable: false,
        required: true,
        description:
          "The author of this content or rating. Please note that author is special in that HTML 5 provides a special mechanism for indicating authorship via the rel tag. That is equivalent to this and may be used interchangeably",
      },
      {
        name: "title",
        id: null,
        range: null,
        type: "string",
        arrayType: null,
        enum: null,
        reference: null,
        embedded: null,
        nullable: false,
        required: true,
        description: "The title of the book",
      },
      {
        name: "bookFormat",
        id: null,
        range: null,
        type: "string",
        arrayType: null,
        enum: {
          "Audiobook format": "AUDIOBOOK_FORMAT",
          "E book": "E_BOOK",
          Paperback: "PAPERBACK",
          Hardcover: "HARDCOVER",
        },
        reference: null,
        embedded: null,
        nullable: false,
        required: true,
        description: "The publication format of the book.",
      },
      {
        name: "publicationDate",
        id: null,
        range: null,
        type: "dateTime",
        arrayType: null,
        enum: null,
        reference: null,
        embedded: null,
        nullable: false,
        required: true,
        description:
          "The date on which the CreativeWork was created or the item was added to a DataFeed",
      },
      {
        name: "reviews",
        id: null,
        range: null,
        type: "array",
        arrayType: "string",
        enum: null,
        reference: {
          title: "Review",
        },
        embedded: null,
        nullable: false,
        required: false,
        description: "",
        maxCardinality: null,
      },
      {
        name: "archivedAt",
        id: null,
        range: null,
        type: "dateTime",
        arrayType: null,
        enum: null,
        reference: null,
        embedded: null,
        nullable: true,
        required: false,
        description: "",
      },
    ],
    parameters: [
      {
        variable: "page",
        range: "integer",
        required: false,
        description: "The collection page number",
      },
    ],
    operations: [
      {
        name: "Retrieves a Book resource.",
        type: "show",
        method: "GET",
        deprecated: false,
      },
      {
        name: "Replaces the Book resource.",
        type: "edit",
        method: "PUT",
        deprecated: false,
      },
      {
        name: "Removes the Book resource.",
        type: "delete",
        method: "DELETE",
        deprecated: false,
      },
      {
        name: "Retrieves the collection of Book resources.",
        type: "list",
        method: "GET",
        deprecated: false,
      },
      {
        name: "Creates a Book resource.",
        type: "create",
        method: "POST",
        deprecated: false,
      },
    ],
  },
  {
    name: "reviews",
    url: "https://demo.api-platform.com/reviews",
    id: null,
    title: "Review",
    description: "",
    fields: [
      {
        name: "id",
        id: null,
        range: null,
        type: "integer",
        arrayType: null,
        enum: null,
        reference: null,
        embedded: null,
        nullable: false,
        required: false,
        description: "",
      },
      {
        name: "rating",
        id: null,
        range: null,
        type: "integer",
        arrayType: null,
        enum: null,
        reference: null,
        embedded: null,
        nullable: false,
        required: false,
        description: "",
      },
      {
        name: "body",
        id: null,
        range: null,
        type: "string",
        arrayType: null,
        enum: null,
        reference: null,
        embedded: null,
        nullable: false,
        required: false,
        description: "",
      },
      {
        name: "book",
        id: null,
        range: null,
        type: "string",
        arrayType: null,
        enum: null,
        reference: {
          title: "Book",
        },
        embedded: null,
        nullable: false,
        required: false,
        description: "",
        maxCardinality: 1,
      },
      {
        name: "author",
        id: null,
        range: null,
        type: "string",
        arrayType: null,
        enum: null,
        reference: null,
        embedded: null,
        nullable: false,
        required: false,
        description: "",
      },
      {
        name: "publicationDate",
        id: null,
        range: null,
        type: "dateTime",
        arrayType: null,
        enum: null,
        reference: null,
        embedded: null,
        nullable: false,
        required: false,
        description: "",
      },
    ],
    readableFields: [
      {
        name: "id",
        id: null,
        range: null,
        type: "integer",
        arrayType: null,
        enum: null,
        reference: null,
        embedded: null,
        nullable: false,
        required: false,
        description: "",
      },
      {
        name: "rating",
        id: null,
        range: null,
        type: "integer",
        arrayType: null,
        enum: null,
        reference: null,
        embedded: null,
        nullable: false,
        required: false,
        description: "",
      },
      {
        name: "body",
        id: null,
        range: null,
        type: "string",
        arrayType: null,
        enum: null,
        reference: null,
        embedded: null,
        nullable: false,
        required: false,
        description: "",
      },
      {
        name: "book",
        id: null,
        range: null,
        type: "string",
        arrayType: null,
        enum: null,
        reference: {
          title: "Book",
        },
        embedded: null,
        nullable: false,
        required: false,
        description: "",
        maxCardinality: 1,
      },
      {
        name: "author",
        id: null,
        range: null,
        type: "string",
        arrayType: null,
        enum: null,
        reference: null,
        embedded: null,
        nullable: false,
        required: false,
        description: "",
      },
      {
        name: "publicationDate",
        id: null,
        range: null,
        type: "dateTime",
        arrayType: null,
        enum: null,
        reference: null,
        embedded: null,
        nullable: false,
        required: false,
        description: "",
      },
    ],
    writableFields: [
      {
        name: "rating",
        id: null,
        range: null,
        type: "integer",
        arrayType: null,
        enum: null,
        reference: null,
        embedded: null,
        nullable: false,
        required: false,
        description: "",
      },
      {
        name: "body",
        id: null,
        range: null,
        type: "string",
        arrayType: null,
        enum: null,
        reference: null,
        embedded: null,
        nullable: false,
        required: false,
        description: "",
      },
      {
        name: "book",
        id: null,
        range: null,
        type: "string",
        arrayType: null,
        enum: null,
        reference: {
          title: "Book",
        },
        embedded: null,
        nullable: false,
        required: false,
        description: "",
        maxCardinality: 1,
      },
      {
        name: "author",
        id: null,
        range: null,
        type: "string",
        arrayType: null,
        enum: null,
        reference: null,
        embedded: null,
        nullable: false,
        required: false,
        description: "",
      },
      {
        name: "publicationDate",
        id: null,
        range: null,
        type: "dateTime",
        arrayType: null,
        enum: null,
        reference: null,
        embedded: null,
        nullable: false,
        required: false,
        description: "",
      },
    ],
    parameters: [
      {
        variable: "page",
        range: "integer",
        required: false,
        description: "The collection page number",
      },
    ],
    operations: [
      {
        name: "Retrieves a Review resource.",
        type: "show",
        method: "GET",
        deprecated: false,
      },
      {
        name: "Replaces the Review resource.",
        type: "edit",
        method: "PUT",
        deprecated: false,
      },
      {
        name: "Removes the Review resource.",
        type: "delete",
        method: "DELETE",
        deprecated: false,
      },
      {
        name: "Retrieves the collection of Review resources.",
        type: "list",
        method: "GET",
        deprecated: false,
      },
      {
        name: "Creates a Review resource.",
        type: "create",
        method: "POST",
        deprecated: false,
      },
    ],
  },
];

test(`Parse OpenApi v3 Documentation from Json`, async () => {
  const toBeParsed = await handleJson(
    openApi3Definition,
    "https://demo.api-platform.com",
  );

  expect(JSON.stringify(toBeParsed, parsedJsonReplacer)).toEqual(
    JSON.stringify(parsed, parsedJsonReplacer),
  );
});
