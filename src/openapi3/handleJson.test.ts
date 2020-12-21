import { OpenAPIV3 } from "openapi-types";
import { Field } from "../Field";
import handleJson from "./handleJson";

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
                    $ref: "#/components/schemas/Book",
                  },
                },
              },
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Book",
                  },
                },
              },
              "text/html": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Book",
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
          id: {
            readOnly: true,
            type: "integer",
          },
          isbn: {
            type: "string",
          },
          description: {
            type: "string",
          },
          author: {
            type: "string",
          },
          title: {
            type: "string",
          },
          publicationDate: {
            type: "string",
            format: "date-time",
          },
          reviews: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },
        required: ["description", "author", "title", "publicationDate"],
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
    fields: [
      {
        name: "id",
        id: null,
        range: null,
        reference: null,
        required: false,
        embedded: null,
        description: "",
      },
      {
        name: "isbn",
        id: null,
        range: null,
        reference: null,
        required: false,
        embedded: null,
        description: "The ISBN of the book",
      },
      {
        name: "description",
        id: null,
        range: null,
        reference: null,
        required: true,
        embedded: null,
        description: "A description of the item",
      },
      {
        name: "author",
        id: null,
        range: null,
        reference: null,
        required: true,
        embedded: null,
        description:
          "The author of this content or rating. Please note that author is special in that HTML 5 provides a special mechanism for indicating authorship via the rel tag. That is equivalent to this and may be used interchangeably",
      },
      {
        name: "title",
        id: null,
        range: null,
        reference: null,
        required: true,
        embedded: null,
        description: "The title of the book",
      },
      {
        name: "publicationDate",
        id: null,
        range: null,
        reference: null,
        required: true,
        embedded: null,
        description:
          "The date on which the CreativeWork was created or the item was added to a DataFeed",
      },
    ],
    readableFields: [
      {
        name: "id",
        id: null,
        range: null,
        reference: null,
        required: false,
        embedded: null,
        description: "",
      },
      {
        name: "isbn",
        id: null,
        range: null,
        reference: null,
        required: false,
        embedded: null,
        description: "The ISBN of the book",
      },
      {
        name: "description",
        id: null,
        range: null,
        reference: null,
        required: true,
        embedded: null,
        description: "A description of the item",
      },
      {
        name: "author",
        id: null,
        range: null,
        reference: null,
        required: true,
        embedded: null,
        description:
          "The author of this content or rating. Please note that author is special in that HTML 5 provides a special mechanism for indicating authorship via the rel tag. That is equivalent to this and may be used interchangeably",
      },
      {
        name: "title",
        id: null,
        range: null,
        reference: null,
        required: true,
        embedded: null,
        description: "The title of the book",
      },
      {
        name: "publicationDate",
        id: null,
        range: null,
        reference: null,
        required: true,
        embedded: null,
        description:
          "The date on which the CreativeWork was created or the item was added to a DataFeed",
      },
    ],
    writableFields: [
      {
        name: "id",
        id: null,
        range: null,
        reference: null,
        required: false,
        embedded: null,
        description: "",
      },
      {
        name: "isbn",
        id: null,
        range: null,
        reference: null,
        required: false,
        embedded: null,
        description: "The ISBN of the book",
      },
      {
        name: "description",
        id: null,
        range: null,
        reference: null,
        required: true,
        embedded: null,
        description: "A description of the item",
      },
      {
        name: "author",
        id: null,
        range: null,
        reference: null,
        required: true,
        embedded: null,
        description:
          "The author of this content or rating. Please note that author is special in that HTML 5 provides a special mechanism for indicating authorship via the rel tag. That is equivalent to this and may be used interchangeably",
      },
      {
        name: "title",
        id: null,
        range: null,
        reference: null,
        required: true,
        embedded: null,
        description: "The title of the book",
      },
      {
        name: "publicationDate",
        id: null,
        range: null,
        reference: null,
        required: true,
        embedded: null,
        description:
          "The date on which the CreativeWork was created or the item was added to a DataFeed",
      },
    ],
  },
  {
    name: "reviews",
    url: "https://demo.api-platform.com/reviews",
    id: null,
    title: "Review",
    fields: [
      {
        name: "id",
        id: null,
        range: null,
        reference: null,
        required: false,
        embedded: null,
        description: "",
      },
      {
        name: "rating",
        id: null,
        range: null,
        reference: null,
        required: false,
        embedded: null,
        description: "",
      },
      {
        name: "body",
        id: null,
        range: null,
        reference: null,
        required: false,
        embedded: null,
        description: "The actual body of the review",
      },
      {
        name: "book",
        id: null,
        range: null,
        reference: {
          name: "books",
          url: "https://demo.api-platform.com/books",
          id: null,
          title: "Book",
          fields: [
            {
              name: "id",
              id: null,
              range: null,
              reference: null,
              required: false,
              embedded: null,
              description: "",
            },
            {
              name: "isbn",
              id: null,
              range: null,
              reference: null,
              required: false,
              embedded: null,
              description: "The ISBN of the book",
            },
            {
              name: "description",
              id: null,
              range: null,
              reference: null,
              required: true,
              embedded: null,
              description: "A description of the item",
            },
            {
              name: "author",
              id: null,
              range: null,
              reference: null,
              required: true,
              embedded: null,
              description:
                "The author of this content or rating. Please note that author is special in that HTML 5 provides a special mechanism for indicating authorship via the rel tag. That is equivalent to this and may be used interchangeably",
            },
            {
              name: "title",
              id: null,
              range: null,
              reference: null,
              required: true,
              embedded: null,
              description: "The title of the book",
            },
            {
              name: "publicationDate",
              id: null,
              range: null,
              reference: null,
              required: true,
              embedded: null,
              description:
                "The date on which the CreativeWork was created or the item was added to a DataFeed",
            },
          ],
          readableFields: [
            {
              name: "id",
              id: null,
              range: null,
              reference: null,
              required: false,
              embedded: null,
              description: "",
            },
            {
              name: "isbn",
              id: null,
              range: null,
              reference: null,
              required: false,
              embedded: null,
              description: "The ISBN of the book",
            },
            {
              name: "description",
              id: null,
              range: null,
              reference: null,
              required: true,
              embedded: null,
              description: "A description of the item",
            },
            {
              name: "author",
              id: null,
              range: null,
              reference: null,
              required: true,
              embedded: null,
              description:
                "The author of this content or rating. Please note that author is special in that HTML 5 provides a special mechanism for indicating authorship via the rel tag. That is equivalent to this and may be used interchangeably",
            },
            {
              name: "title",
              id: null,
              range: null,
              reference: null,
              required: true,
              embedded: null,
              description: "The title of the book",
            },
            {
              name: "publicationDate",
              id: null,
              range: null,
              reference: null,
              required: true,
              embedded: null,
              description:
                "The date on which the CreativeWork was created or the item was added to a DataFeed",
            },
          ],
          writableFields: [
            {
              name: "id",
              id: null,
              range: null,
              reference: null,
              required: false,
              embedded: null,
              description: "",
            },
            {
              name: "isbn",
              id: null,
              range: null,
              reference: null,
              required: false,
              embedded: null,
              description: "The ISBN of the book",
            },
            {
              name: "description",
              id: null,
              range: null,
              reference: null,
              required: true,
              embedded: null,
              description: "A description of the item",
            },
            {
              name: "author",
              id: null,
              range: null,
              reference: null,
              required: true,
              embedded: null,
              description:
                "The author of this content or rating. Please note that author is special in that HTML 5 provides a special mechanism for indicating authorship via the rel tag. That is equivalent to this and may be used interchangeably",
            },
            {
              name: "title",
              id: null,
              range: null,
              reference: null,
              required: true,
              embedded: null,
              description: "The title of the book",
            },
            {
              name: "publicationDate",
              id: null,
              range: null,
              reference: null,
              required: true,
              embedded: null,
              description:
                "The date on which the CreativeWork was created or the item was added to a DataFeed",
            },
          ],
        },
        required: true,
        description: "The item that is being reviewed/rated",
      },
      {
        name: "author",
        id: null,
        range: null,
        reference: null,
        required: false,
        embedded: null,
        description: "Author the author of the review",
      },
      {
        name: "publicationDate",
        id: null,
        range: null,
        reference: null,
        required: false,
        embedded: null,
        description: "Author the author of the review",
      },
    ],
    readableFields: [
      {
        name: "id",
        id: null,
        range: null,
        reference: null,
        required: false,
        embedded: null,
        description: "",
      },
      {
        name: "rating",
        id: null,
        range: null,
        reference: null,
        required: false,
        embedded: null,
        description: "",
      },
      {
        name: "body",
        id: null,
        range: null,
        reference: null,
        required: false,
        embedded: null,
        description: "The actual body of the review",
      },
      {
        name: "book",
        id: null,
        range: null,
        reference: {
          name: "books",
          url: "https://demo.api-platform.com/books",
          id: null,
          title: "Book",
          fields: [
            {
              name: "id",
              id: null,
              range: null,
              reference: null,
              required: false,
              embedded: null,
              description: "",
            },
            {
              name: "isbn",
              id: null,
              range: null,
              reference: null,
              required: false,
              embedded: null,
              description: "The ISBN of the book",
            },
            {
              name: "description",
              id: null,
              range: null,
              reference: null,
              required: true,
              embedded: null,
              description: "A description of the item",
            },
            {
              name: "author",
              id: null,
              range: null,
              reference: null,
              required: true,
              embedded: null,
              description:
                "The author of this content or rating. Please note that author is special in that HTML 5 provides a special mechanism for indicating authorship via the rel tag. That is equivalent to this and may be used interchangeably",
            },
            {
              name: "title",
              id: null,
              range: null,
              reference: null,
              required: true,
              embedded: null,
              description: "The title of the book",
            },
            {
              name: "publicationDate",
              id: null,
              range: null,
              reference: null,
              required: true,
              embedded: null,
              description:
                "The date on which the CreativeWork was created or the item was added to a DataFeed",
            },
          ],
          readableFields: [
            {
              name: "id",
              id: null,
              range: null,
              reference: null,
              required: false,
              embedded: null,
              description: "",
            },
            {
              name: "isbn",
              id: null,
              range: null,
              reference: null,
              required: false,
              embedded: null,
              description: "The ISBN of the book",
            },
            {
              name: "description",
              id: null,
              range: null,
              reference: null,
              required: true,
              embedded: null,
              description: "A description of the item",
            },
            {
              name: "author",
              id: null,
              range: null,
              reference: null,
              required: true,
              embedded: null,
              description:
                "The author of this content or rating. Please note that author is special in that HTML 5 provides a special mechanism for indicating authorship via the rel tag. That is equivalent to this and may be used interchangeably",
            },
            {
              name: "title",
              id: null,
              range: null,
              reference: null,
              required: true,
              embedded: null,
              description: "The title of the book",
            },
            {
              name: "publicationDate",
              id: null,
              range: null,
              reference: null,
              required: true,
              embedded: null,
              description:
                "The date on which the CreativeWork was created or the item was added to a DataFeed",
            },
          ],
          writableFields: [
            {
              name: "id",
              id: null,
              range: null,
              reference: null,
              required: false,
              embedded: null,
              description: "",
            },
            {
              name: "isbn",
              id: null,
              range: null,
              reference: null,
              required: false,
              embedded: null,
              description: "The ISBN of the book",
            },
            {
              name: "description",
              id: null,
              range: null,
              reference: null,
              required: true,
              embedded: null,
              description: "A description of the item",
            },
            {
              name: "author",
              id: null,
              range: null,
              reference: null,
              required: true,
              embedded: null,
              description:
                "The author of this content or rating. Please note that author is special in that HTML 5 provides a special mechanism for indicating authorship via the rel tag. That is equivalent to this and may be used interchangeably",
            },
            {
              name: "title",
              id: null,
              range: null,
              reference: null,
              required: true,
              embedded: null,
              description: "The title of the book",
            },
            {
              name: "publicationDate",
              id: null,
              range: null,
              reference: null,
              required: true,
              embedded: null,
              description:
                "The date on which the CreativeWork was created or the item was added to a DataFeed",
            },
          ],
        },
        required: true,
        description: "The item that is being reviewed/rated",
      },
      {
        name: "author",
        id: null,
        range: null,
        reference: null,
        required: false,
        embedded: null,
        description: "Author the author of the review",
      },
      {
        name: "publicationDate",
        id: null,
        range: null,
        reference: null,
        required: false,
        embedded: null,
        description: "Author the author of the review",
      },
    ],
    writableFields: [
      {
        name: "id",
        id: null,
        range: null,
        reference: null,
        required: false,
        embedded: null,
        description: "",
      },
      {
        name: "rating",
        id: null,
        range: null,
        reference: null,
        required: false,
        embedded: null,
        description: "",
      },
      {
        name: "body",
        id: null,
        range: null,
        reference: null,
        required: false,
        embedded: null,
        description: "The actual body of the review",
      },
      {
        name: "book",
        id: null,
        range: null,
        reference: {
          name: "books",
          url: "https://demo.api-platform.com/books",
          id: null,
          title: "Book",
          fields: [
            {
              name: "id",
              id: null,
              range: null,
              reference: null,
              required: false,
              embedded: null,
              description: "",
            },
            {
              name: "isbn",
              id: null,
              range: null,
              reference: null,
              required: false,
              embedded: null,
              description: "The ISBN of the book",
            },
            {
              name: "description",
              id: null,
              range: null,
              reference: null,
              required: true,
              embedded: null,
              description: "A description of the item",
            },
            {
              name: "author",
              id: null,
              range: null,
              reference: null,
              required: true,
              embedded: null,
              description:
                "The author of this content or rating. Please note that author is special in that HTML 5 provides a special mechanism for indicating authorship via the rel tag. That is equivalent to this and may be used interchangeably",
            },
            {
              name: "title",
              id: null,
              range: null,
              reference: null,
              required: true,
              embedded: null,
              description: "The title of the book",
            },
            {
              name: "publicationDate",
              id: null,
              range: null,
              reference: null,
              required: true,
              embedded: null,
              description:
                "The date on which the CreativeWork was created or the item was added to a DataFeed",
            },
          ],
          readableFields: [
            {
              name: "id",
              id: null,
              range: null,
              reference: null,
              required: false,
              embedded: null,
              description: "",
            },
            {
              name: "isbn",
              id: null,
              range: null,
              reference: null,
              required: false,
              embedded: null,
              description: "The ISBN of the book",
            },
            {
              name: "description",
              id: null,
              range: null,
              reference: null,
              required: true,
              embedded: null,
              description: "A description of the item",
            },
            {
              name: "author",
              id: null,
              range: null,
              reference: null,
              required: true,
              embedded: null,
              description:
                "The author of this content or rating. Please note that author is special in that HTML 5 provides a special mechanism for indicating authorship via the rel tag. That is equivalent to this and may be used interchangeably",
            },
            {
              name: "title",
              id: null,
              range: null,
              reference: null,
              required: true,
              embedded: null,
              description: "The title of the book",
            },
            {
              name: "publicationDate",
              id: null,
              range: null,
              reference: null,
              required: true,
              embedded: null,
              description:
                "The date on which the CreativeWork was created or the item was added to a DataFeed",
            },
          ],
          writableFields: [
            {
              name: "id",
              id: null,
              range: null,
              reference: null,
              required: false,
              embedded: null,
              description: "",
            },
            {
              name: "isbn",
              id: null,
              range: null,
              reference: null,
              required: false,
              embedded: null,
              description: "The ISBN of the book",
            },
            {
              name: "description",
              id: null,
              range: null,
              reference: null,
              required: true,
              embedded: null,
              description: "A description of the item",
            },
            {
              name: "author",
              id: null,
              range: null,
              reference: null,
              required: true,
              embedded: null,
              description:
                "The author of this content or rating. Please note that author is special in that HTML 5 provides a special mechanism for indicating authorship via the rel tag. That is equivalent to this and may be used interchangeably",
            },
            {
              name: "title",
              id: null,
              range: null,
              reference: null,
              required: true,
              embedded: null,
              description: "The title of the book",
            },
            {
              name: "publicationDate",
              id: null,
              range: null,
              reference: null,
              required: true,
              embedded: null,
              description:
                "The date on which the CreativeWork was created or the item was added to a DataFeed",
            },
          ],
        },
        required: true,
        description: "The item that is being reviewed/rated",
      },
      {
        name: "author",
        id: null,
        range: null,
        reference: null,
        required: false,
        embedded: null,
        description: "Author the author of the review",
      },
      {
        name: "publicationDate",
        id: null,
        range: null,
        reference: null,
        required: false,
        embedded: null,
        description: "Author the author of the review",
      },
    ],
  },
];

describe(`Parse OpenApi v3 Documentation from Json`, () => {
  test(`Properties to be equal`, async () => {
    const toBeParsed = await handleJson(
      openApi3Definition,
      "https://demo.api-platform.com"
    );

    expect(toBeParsed[0].name).toBe(parsed[0].name);
    expect(toBeParsed[0].url).toBe(parsed[0].url);
    expect(toBeParsed[0].id).toBe(parsed[0].id);

    expect((toBeParsed[0].fields as Field[])[0]).toEqual(parsed[0].fields[0]);

    expect(toBeParsed[1].name).toBe(parsed[1].name);
    expect(toBeParsed[1].url).toBe(parsed[1].url);
    expect(toBeParsed[1].id).toBe(parsed[1].id);

    expect((toBeParsed[1].fields as Field[])[0]).toEqual(parsed[1].fields[0]);
  });
});
