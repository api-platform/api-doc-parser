import { http } from "msw/core/http";
import { assert, expect, test, vi } from "vitest";
import { server } from "../../vitest.setup.js";
import { parsedJsonReplacer } from "../core/utils/index.js";
import parseHydraDocumentation from "./parseHydraDocumentation.js";

const entrypoint = {
  "@context": {
    "@vocab": "http://localhost/docs.jsonld#",
    hydra: "http://www.w3.org/ns/hydra/core#",
    book: {
      "@id": "Entrypoint/book",
      "@type": "@id",
    },
    review: {
      "@id": "Entrypoint/review",
      "@type": "@id",
    },
    customResource: {
      "@id": "Entrypoint/customResource",
      "@type": "@id",
    },
    deprecatedResource: {
      "@id": "Entrypoint/deprecatedResource",
      "@type": "@id",
    },
  },
  "@id": "/",
  "@type": "Entrypoint",
  book: "/books",
  review: "/reviews",
  customResource: "/customResources",
  deprecatedResource: "/deprecated_resources",
};

const docs = {
  "@context": {
    "@vocab": "http://localhost/docs.jsonld#",
    hydra: "http://www.w3.org/ns/hydra/core#",
    rdf: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
    rdfs: "http://www.w3.org/2000/01/rdf-schema#",
    xmls: "http://www.w3.org/2001/XMLSchema#",
    owl: "http://www.w3.org/2002/07/owl#",
    domain: {
      "@id": "rdfs:domain",
      "@type": "@id",
    },
    range: {
      "@id": "rdfs:range",
      "@type": "@id",
    },
    subClassOf: {
      "@id": "rdfs:subClassOf",
      "@type": "@id",
    },
    expects: {
      "@id": "hydra:expects",
      "@type": "@id",
    },
    returns: {
      "@id": "hydra:returns",
      "@type": "@id",
    },
  },
  "@id": "/docs.jsonld",
  "hydra:title": "API Platform's demo",
  "hydra:description": "A test",
  "hydra:entrypoint": "/",
  "hydra:supportedClass": [
    {
      "@id": "http://schema.org/Book",
      "@type": "hydra:Class",
      "rdfs:label": "Book",
      "hydra:title": "Book",
      "hydra:supportedProperty": [
        {
          "@type": "hydra:SupportedProperty",
          "hydra:property": {
            "@id": "http://schema.org/isbn",
            "@type": "rdf:Property",
            "rdfs:label": "isbn",
            domain: "http://schema.org/Book",
            range: "xmls:string",
          },
          "hydra:title": "isbn",
          "hydra:required": true,
          "hydra:readable": true,
          "hydra:writeable": true,
          "hydra:description": "The ISBN of the book",
        },
        {
          "@type": "hydra:SupportedProperty",
          "hydra:property": {
            "@id": "http://schema.org/name",
            "@type": "rdf:Property",
            "rdfs:label": "name",
            domain: "http://schema.org/Book",
            range: "xmls:string",
          },
          "hydra:title": "name",
          "hydra:required": true,
          "hydra:readable": true,
          "hydra:writeable": true,
          "hydra:description": "The name of the item",
        },
        {
          "@type": "hydra:SupportedProperty",
          "hydra:property": {
            "@id": "http://schema.org/description",
            "@type": "rdf:Property",
            "rdfs:label": "description",
            domain: "http://schema.org/Book",
            range: "xmls:string",
          },
          "hydra:title": "description",
          "hydra:required": false,
          "hydra:readable": true,
          "hydra:writeable": true,
          "hydra:description": "A description of the item",
        },
        {
          "@type": "hydra:SupportedProperty",
          "hydra:property": {
            "@id": "http://schema.org/author",
            "@type": "rdf:Property",
            "rdfs:label": "author",
            domain: "http://schema.org/Book",
            range: "xmls:string",
          },
          "hydra:title": "author",
          "hydra:required": true,
          "hydra:readable": true,
          "hydra:writeable": true,
          "hydra:description":
            "The author of this content or rating. Please note that author is special in that HTML 5 provides a special mechanism for indicating authorship via the rel tag. That is equivalent to this and may be used interchangeably",
        },
        {
          "@type": "hydra:SupportedProperty",
          "hydra:property": {
            "@id": "http://schema.org/dateCreated",
            "@type": "rdf:Property",
            "rdfs:label": "dateCreated",
            domain: "http://schema.org/Book",
            range: "xmls:dateTime",
          },
          "hydra:title": "dateCreated",
          "hydra:required": true,
          "hydra:readable": true,
          "hydra:writeable": true,
          "hydra:description":
            "The date on which the CreativeWork was created or the item was added to a DataFeed",
        },
        {
          "@type": "hydra:SupportedProperty",
          "hydra:property": {
            "@id": "http://schema.org/reviews",
            "@type": "hydra:Link",
            "rdfs:label": "reviews",
            domain: "http://schema.org/Book",
            range: "http://schema.org/Review",
          },
          "hydra:title": "reviews",
          "hydra:required": false,
          "hydra:readable": true,
          "hydra:writable": true,
          "hydra:description": "The book's reviews",
        },
        {
          "@type": "hydra:SupportedProperty",
          "hydra:property": {
            "@id": "http://schema.org/reviews",
            "@type": "rdf:Property",
            "rdfs:label": "embeddedReviews",
            domain: "http://schema.org/Book",
            range: "http://schema.org/Review",
          },
          "hydra:title": "embeddedReviews",
          "hydra:required": false,
          "hydra:readable": true,
          "hydra:writable": true,
          "hydra:description": "The book's reviews",
        },
      ],
      "hydra:supportedOperation": [
        {
          "@type": "hydra:Operation",
          "hydra:method": "GET",
          "hydra:title": "Retrieves Book resource.",
          "rdfs:label": "Retrieves Book resource.",
          returns: "http://schema.org/Book",
        },
        {
          "@type": "hydra:ReplaceResourceOperation",
          expects: "http://schema.org/Book",
          "hydra:method": "PUT",
          "hydra:title": "Replaces the Book resource.",
          "rdfs:label": "Replaces the Book resource.",
          returns: "http://schema.org/Book",
        },
        {
          "@type": "hydra:Operation",
          "hydra:method": "DELETE",
          "hydra:title": "Deletes the Book resource.",
          "rdfs:label": "Deletes the Book resource.",
          returns: "owl:Nothing",
        },
        {
          "@type": "hydra:Operation",
          "hydra:method": "GET",
        },
      ],
    },
    {
      "@id": "http://schema.org/Review",
      "@type": "hydra:Class",
      "rdfs:label": "Review",
      "hydra:title": "Review",
      "hydra:supportedProperty": [
        {
          "@type": "hydra:SupportedProperty",
          "hydra:property": {
            "@id": "http://schema.org/reviewBody",
            "@type": "rdf:Property",
            "rdfs:label": "reviewBody",
            domain: "http://schema.org/Review",
            range: "xmls:string",
          },
          "hydra:title": "reviewBody",
          "hydra:required": false,
          "hydra:readable": true,
          "hydra:writeable": true,
          "hydra:description": "The actual body of the review",
        },
        {
          "@type": "hydra:SupportedProperty",
          "hydra:property": {
            "@id": "#Review/rating",
            "@type": "rdf:Property",
            "rdfs:label": "rating",
            domain: "http://schema.org/Review",
            range: "xmls:integer",
          },
          "hydra:title": "rating",
          "hydra:required": false,
          "hydra:readable": true,
          "hydra:writeable": true,
        },
        {
          "@type": "hydra:SupportedProperty",
          "hydra:property": {
            "@id": "http://schema.org/itemReviewed",
            "@type": "hydra:Link",
            "rdfs:label": "itemReviewed",
            domain: "http://schema.org/Review",
            "owl:maxCardinality": 1,
            range: "http://schema.org/Book",
          },
          "hydra:title": "itemReviewed",
          "hydra:required": true,
          "hydra:readable": true,
          "hydra:writeable": true,
          "hydra:description": "The item that is being reviewed/rated",
        },
      ],
      "hydra:supportedOperation": [
        {
          "@type": "hydra:Operation",
          "hydra:method": "GET",
          "hydra:title": "Retrieves Review resource.",
          "rdfs:label": "Retrieves Review resource.",
          returns: "http://schema.org/Review",
        },
        {
          "@type": "hydra:ReplaceResourceOperation",
          expects: "http://schema.org/Review",
          "hydra:method": "PUT",
          "hydra:title": "Replaces the Review resource.",
          "rdfs:label": "Replaces the Review resource.",
          returns: "http://schema.org/Review",
        },
        {
          "@type": "hydra:Operation",
          "hydra:method": "DELETE",
          "hydra:title": "Deletes the Review resource.",
          "rdfs:label": "Deletes the Review resource.",
          returns: "owl:Nothing",
        },
      ],
    },
    {
      "@id": "#CustomResource",
      "@type": "hydra:Class",
      "rdfs:label": "CustomResource",
      "hydra:title": "CustomResource",
      "hydra:description": "A custom resource.",
      "hydra:supportedProperty": [
        {
          "@type": "hydra:SupportedProperty",
          "hydra:property": {
            "@id": "#CustomResource/label",
            "@type": "rdf:Property",
            "rdfs:label": "label",
            domain: "#CustomResource",
            range: "xmls:string",
          },
          "hydra:title": "label",
          "hydra:required": true,
          "hydra:readable": true,
          "hydra:writeable": true,
        },
        {
          "@type": "hydra:SupportedProperty",
          "hydra:property": {
            "@id": "#CustomResource/description",
            "@type": "rdf:Property",
            "rdfs:label": "description",
            domain: "#CustomResource",
            range: "xmls:string",
          },
          "hydra:title": "description",
          "hydra:required": true,
          "hydra:readable": true,
          "hydra:writeable": true,
        },
        {
          "@type": "hydra:SupportedProperty",
          "hydra:property": {
            "@id": "#CustomResource/sanitizedDescription",
            "@type": "rdf:Property",
            "rdfs:label": "sanitizedDescription",
            domain: "#CustomResource",
          },
          "hydra:title": "sanitizedDescription",
          "hydra:required": false,
          "hydra:readable": true,
          "hydra:writeable": false,
        },
      ],
      "hydra:supportedOperation": [
        {
          "@type": "hydra:Operation",
          "hydra:method": "GET",
          "hydra:title": "Retrieves custom resources.",
          "rdfs:label": "Retrieves custom resources.",
          returns: "#CustomResource",
        },
        {
          "@type": "hydra:CreateResourceOperation",
          expects: "#CustomResource",
          "hydra:method": "POST",
          "hydra:title": "Creates a custom resource.",
          "rdfs:label": "Creates a custom resource.",
          returns: "#CustomResource",
        },
      ],
    },
    {
      "@id": "#DeprecatedResource",
      "@type": "hydra:Class",
      "rdfs:label": "DeprecatedResource",
      "hydra:title": "DeprecatedResource",
      "hydra:supportedProperty": [
        {
          "@type": "hydra:SupportedProperty",
          "hydra:property": {
            "@id": "#DeprecatedResource/deprecatedField",
            "@type": "rdf:Property",
            "rdfs:label": "deprecatedField",
            domain: "#DeprecatedResource",
            range: "xmls:string",
          },
          "hydra:title": "deprecatedField",
          "hydra:required": true,
          "hydra:readable": true,
          "hydra:writeable": true,
          "hydra:description": "",
          "owl:deprecated": true,
        },
      ],
      "hydra:supportedOperation": [
        {
          "@type": ["hydra:Operation", "schema:FindAction"],
          "hydra:method": "GET",
          "hydra:title": "Retrieves DeprecatedResource resource.",
          "owl:deprecated": true,
          "rdfs:label": "Retrieves DeprecatedResource resource.",
          returns: "#DeprecatedResource",
        },
      ],
      "hydra:description": "This is a dummy entity. Remove it!",
      "owl:deprecated": true,
    },
    {
      "@id": "#Entrypoint",
      "@type": "hydra:Class",
      "hydra:title": "The API entrypoint",
      "hydra:supportedProperty": [
        {
          "@type": "hydra:SupportedProperty",
          "hydra:property": {
            "@id": "#Entrypoint/book",
            "@type": "hydra:Link",
            domain: "#Entrypoint",
            "rdfs:label": "The collection of Book resources",
            "rdfs:range": [
              { "@id": "hydra:PagedCollection" },
              {
                "owl:equivalentClass": {
                  "owl:onProperty": { "@id": "hydra:member" },
                  "owl:allValuesFrom": { "@id": "http://schema.org/Book" },
                },
              },
            ],
          },
          "hydra:title": "The collection of Book resources",
          "hydra:readable": true,
          "hydra:writeable": false,
        },
        {
          "@type": "hydra:SupportedProperty",
          "hydra:property": {
            "@id": "#Entrypoint/review",
            "@type": "hydra:Link",
            domain: "#Entrypoint",
            "rdfs:label": "The collection of Review resources",
            range: "hydra:PagedCollection",
            "hydra:supportedOperation": [
              {
                "@type": "hydra:Operation",
                "hydra:method": "GET",
                "hydra:title": "Retrieves the collection of Review resources.",
                "rdfs:label": "Retrieves the collection of Review resources.",
                returns: "hydra:PagedCollection",
              },
              {
                "@type": "hydra:CreateResourceOperation",
                expects: "http://schema.org/Review",
                "hydra:method": "POST",
                "hydra:title": "Creates a Review resource.",
                "rdfs:label": "Creates a Review resource.",
                returns: "http://schema.org/Review",
              },
            ],
          },
          "hydra:title": "The collection of Review resources",
          "hydra:readable": true,
          "hydra:writeable": false,
        },
        {
          "@type": "hydra:SupportedProperty",
          "hydra:property": {
            "@id": "#Entrypoint/customResource",
            "@type": "hydra:Link",
            domain: "#Entrypoint",
            "rdfs:label": "The collection of custom resources",
            range: "hydra:PagedCollection",
            "hydra:supportedOperation": [
              {
                "@type": "hydra:Operation",
                "hydra:method": "GET",
                "hydra:title": "Retrieves the collection of custom resources.",
                "rdfs:label": "Retrieves the collection of custom resources.",
                returns: "hydra:PagedCollection",
              },
              {
                "@type": "hydra:CreateResourceOperation",
                expects: "#CustomResource",
                "hydra:method": "POST",
                "hydra:title": "Creates a custom resource.",
                "rdfs:label": "Creates a custom resource.",
                returns: "#CustomResource",
              },
            ],
          },
          "hydra:title": "The collection of custom resources",
          "hydra:readable": true,
          "hydra:writeable": false,
        },
        {
          "@type": "hydra:SupportedProperty",
          "hydra:property": {
            "@id": "#Entrypoint/deprecatedResource",
            "@type": "hydra:Link",
            domain: "#Entrypoint",
            "rdfs:label": "The collection of DeprecatedResource resources",
            "rdfs:range": [
              {
                "@id": "hydra:Collection",
              },
              {
                "owl:equivalentClass": {
                  "owl:onProperty": {
                    "@id": "hydra:member",
                  },
                  "owl:allValuesFrom": {
                    "@id": "#DeprecatedResource",
                  },
                },
              },
            ],
            "hydra:supportedOperation": [
              {
                "@type": ["hydra:Operation", "schema:FindAction"],
                "hydra:method": "GET",
                "hydra:title":
                  "Retrieves the collection of DeprecatedResource resources.",
                "owl:deprecated": true,
                "rdfs:label":
                  "Retrieves the collection of DeprecatedResource resources.",
                returns: "hydra:Collection",
              },
            ],
          },
          "hydra:title": "The collection of DeprecatedResource resources",
          "hydra:readable": true,
          "hydra:writeable": false,
          "owl:deprecated": true,
        },
      ],
      "hydra:supportedOperation": {
        "@type": "hydra:Operation",
        "hydra:method": "GET",
        "rdfs:label": "The API entrypoint.",
        returns: "#EntryPoint",
      },
    },
    {
      "@id": "#ConstraintViolation",
      "@type": "hydra:Class",
      "hydra:title": "A constraint violation",
      "hydra:supportedProperty": [
        {
          "@type": "hydra:SupportedProperty",
          "hydra:property": {
            "@id": "#ConstraintViolation/propertyPath",
            "@type": "rdf:Property",
            "rdfs:label": "propertyPath",
            domain: "#ConstraintViolation",
            range: "xmls:string",
          },
          "hydra:title": "propertyPath",
          "hydra:description": "The property path of the violation",
          "hydra:readable": true,
          "hydra:writeable": false,
        },
        {
          "@type": "hydra:SupportedProperty",
          "hydra:property": {
            "@id": "#ConstraintViolation/message",
            "@type": "rdf:Property",
            "rdfs:label": "message",
            domain: "#ConstraintViolation",
            range: "xmls:string",
          },
          "hydra:title": "message",
          "hydra:description": "The message associated with the violation",
          "hydra:readable": true,
          "hydra:writeable": false,
        },
      ],
    },
    {
      "@id": "#ConstraintViolationList",
      "@type": "hydra:Class",
      subClassOf: "hydra:Error",
      "hydra:title": "A constraint violation list",
      "hydra:supportedProperty": [
        {
          "@type": "hydra:SupportedProperty",
          "hydra:property": {
            "@id": "#ConstraintViolationList/violation",
            "@type": "rdf:Property",
            "rdfs:label": "violation",
            domain: "#ConstraintViolationList",
            range: "#ConstraintViolation",
          },
          "hydra:title": "violation",
          "hydra:description": "The violations",
          "hydra:readable": true,
          "hydra:writeable": false,
        },
      ],
    },
  ],
};

const resourceCollectionWithParameters = {
  "hydra:search": {
    "hydra:mapping": [
      {
        property: "isbn",
        variable: "isbn",
        range: "http://www.w3.org/2001/XMLSchema#string",
        required: false,
      },
    ],
  },
};

const book = {
  name: "books",
  url: "http://localhost/books",
  id: "http://schema.org/Book",
  title: "Book",
  fields: [
    {
      name: "isbn",
      id: "http://schema.org/isbn",
      range: "http://www.w3.org/2001/XMLSchema#string",
      type: "string",
      reference: null,
      embedded: null,
      required: true,
      description: "The ISBN of the book",
      maxCardinality: null,
      deprecated: false,
    },
    {
      name: "name",
      id: "http://schema.org/name",
      range: "http://www.w3.org/2001/XMLSchema#string",
      type: "string",
      reference: null,
      embedded: null,
      required: true,
      description: "The name of the item",
      maxCardinality: null,
      deprecated: false,
    },
    {
      name: "description",
      id: "http://schema.org/description",
      range: "http://www.w3.org/2001/XMLSchema#string",
      type: "string",
      reference: null,
      embedded: null,
      required: false,
      description: "A description of the item",
      maxCardinality: null,
      deprecated: false,
    },
    {
      name: "author",
      id: "http://schema.org/author",
      range: "http://www.w3.org/2001/XMLSchema#string",
      type: "string",
      reference: null,
      embedded: null,
      required: true,
      description:
        "The author of this content or rating. Please note that author is special in that HTML 5 provides a special mechanism for indicating authorship via the rel tag. That is equivalent to this and may be used interchangeably",
      maxCardinality: null,
      deprecated: false,
    },
    {
      name: "dateCreated",
      id: "http://schema.org/dateCreated",
      range: "http://www.w3.org/2001/XMLSchema#dateTime",
      type: "dateTime",
      reference: null,
      embedded: null,
      required: true,
      description:
        "The date on which the CreativeWork was created or the item was added to a DataFeed",
      maxCardinality: null,
      deprecated: false,
    },
    {
      name: "reviews",
      id: "http://schema.org/reviews",
      range: "http://schema.org/Review",
      type: "string",
      reference: "Object http://schema.org/Review",
      embedded: null,
      required: false,
      description: "The book's reviews",
      maxCardinality: null,
      deprecated: false,
    },
    {
      name: "embeddedReviews",
      id: "http://schema.org/reviews",
      range: "http://schema.org/Review",
      type: "string",
      reference: null,
      embedded: "Object http://schema.org/Review",
      required: false,
      description: "The book's reviews",
      maxCardinality: null,
      deprecated: false,
    },
  ],
  readableFields: [
    {
      name: "isbn",
      id: "http://schema.org/isbn",
      range: "http://www.w3.org/2001/XMLSchema#string",
      type: "string",
      reference: null,
      embedded: null,
      required: true,
      description: "The ISBN of the book",
      maxCardinality: null,
      deprecated: false,
    },
    {
      name: "name",
      id: "http://schema.org/name",
      range: "http://www.w3.org/2001/XMLSchema#string",
      type: "string",
      reference: null,
      embedded: null,
      required: true,
      description: "The name of the item",
      maxCardinality: null,
      deprecated: false,
    },
    {
      name: "description",
      id: "http://schema.org/description",
      range: "http://www.w3.org/2001/XMLSchema#string",
      type: "string",
      reference: null,
      embedded: null,
      required: false,
      description: "A description of the item",
      maxCardinality: null,
      deprecated: false,
    },
    {
      name: "author",
      id: "http://schema.org/author",
      range: "http://www.w3.org/2001/XMLSchema#string",
      type: "string",
      reference: null,
      embedded: null,
      required: true,
      description:
        "The author of this content or rating. Please note that author is special in that HTML 5 provides a special mechanism for indicating authorship via the rel tag. That is equivalent to this and may be used interchangeably",
      maxCardinality: null,
      deprecated: false,
    },
    {
      name: "dateCreated",
      id: "http://schema.org/dateCreated",
      range: "http://www.w3.org/2001/XMLSchema#dateTime",
      type: "dateTime",
      reference: null,
      embedded: null,
      required: true,
      description:
        "The date on which the CreativeWork was created or the item was added to a DataFeed",
      maxCardinality: null,
      deprecated: false,
    },
    {
      name: "reviews",
      id: "http://schema.org/reviews",
      range: "http://schema.org/Review",
      type: "string",
      reference: "Object http://schema.org/Review",
      embedded: null,
      required: false,
      description: "The book's reviews",
      maxCardinality: null,
      deprecated: false,
    },
    {
      name: "embeddedReviews",
      id: "http://schema.org/reviews",
      range: "http://schema.org/Review",
      type: "string",
      reference: null,
      embedded: "Object http://schema.org/Review",
      required: false,
      description: "The book's reviews",
      maxCardinality: null,
      deprecated: false,
    },
  ],
  writableFields: [
    {
      name: "isbn",
      id: "http://schema.org/isbn",
      range: "http://www.w3.org/2001/XMLSchema#string",
      type: "string",
      reference: null,
      embedded: null,
      required: true,
      description: "The ISBN of the book",
      maxCardinality: null,
      deprecated: false,
    },
    {
      name: "name",
      id: "http://schema.org/name",
      range: "http://www.w3.org/2001/XMLSchema#string",
      type: "string",
      reference: null,
      embedded: null,
      required: true,
      description: "The name of the item",
      maxCardinality: null,
      deprecated: false,
    },
    {
      name: "description",
      id: "http://schema.org/description",
      range: "http://www.w3.org/2001/XMLSchema#string",
      type: "string",
      reference: null,
      embedded: null,
      required: false,
      description: "A description of the item",
      maxCardinality: null,
      deprecated: false,
    },
    {
      name: "author",
      id: "http://schema.org/author",
      range: "http://www.w3.org/2001/XMLSchema#string",
      type: "string",
      reference: null,
      embedded: null,
      required: true,
      description:
        "The author of this content or rating. Please note that author is special in that HTML 5 provides a special mechanism for indicating authorship via the rel tag. That is equivalent to this and may be used interchangeably",
      maxCardinality: null,
      deprecated: false,
    },
    {
      name: "dateCreated",
      id: "http://schema.org/dateCreated",
      range: "http://www.w3.org/2001/XMLSchema#dateTime",
      type: "dateTime",
      reference: null,
      embedded: null,
      required: true,
      description:
        "The date on which the CreativeWork was created or the item was added to a DataFeed",
      maxCardinality: null,
      deprecated: false,
    },
    {
      name: "reviews",
      id: "http://schema.org/reviews",
      range: "http://schema.org/Review",
      type: "string",
      reference: "Object http://schema.org/Review",
      embedded: null,
      required: false,
      description: "The book's reviews",
      maxCardinality: null,
      deprecated: false,
    },
    {
      name: "embeddedReviews",
      id: "http://schema.org/reviews",
      range: "http://schema.org/Review",
      type: "string",
      reference: null,
      embedded: "Object http://schema.org/Review",
      required: false,
      description: "The book's reviews",
      maxCardinality: null,
      deprecated: false,
    },
  ],
  operations: [
    {
      name: "Retrieves Book resource.",
      type: "show",
      method: "GET",
      returns: "http://schema.org/Book",
      types: ["http://www.w3.org/ns/hydra/core#Operation"],
      deprecated: false,
    },
    {
      name: "Replaces the Book resource.",
      type: "edit",
      method: "PUT",
      expects: "http://schema.org/Book",
      returns: "http://schema.org/Book",
      types: ["http://www.w3.org/ns/hydra/core#ReplaceResourceOperation"],
      deprecated: false,
    },
    {
      name: "Deletes the Book resource.",
      type: "delete",
      method: "DELETE",
      returns: "http://www.w3.org/2002/07/owl#Nothing",
      types: ["http://www.w3.org/ns/hydra/core#Operation"],
      deprecated: false,
    },
  ],
  deprecated: false,
  parameters: [],
};

const review = {
  name: "reviews",
  url: "http://localhost/reviews",
  id: "http://schema.org/Review",
  title: "Review",
  fields: [
    {
      name: "reviewBody",
      id: "http://schema.org/reviewBody",
      range: "http://www.w3.org/2001/XMLSchema#string",
      type: "string",
      reference: null,
      embedded: null,
      required: false,
      description: "The actual body of the review",
      maxCardinality: null,
      deprecated: false,
    },
    {
      name: "rating",
      id: "http://localhost/docs.jsonld#Review/rating",
      range: "http://www.w3.org/2001/XMLSchema#integer",
      type: "integer",
      reference: null,
      embedded: null,
      required: false,
      description: "",
      maxCardinality: null,
      deprecated: false,
    },
    {
      name: "itemReviewed",
      id: "http://schema.org/itemReviewed",
      range: "http://schema.org/Book",
      type: "string",
      reference: "Object http://schema.org/Book",
      embedded: null,
      required: true,
      description: "The item that is being reviewed/rated",
      maxCardinality: 1,
      deprecated: false,
    },
  ],
  readableFields: [
    {
      name: "reviewBody",
      id: "http://schema.org/reviewBody",
      range: "http://www.w3.org/2001/XMLSchema#string",
      type: "string",
      reference: null,
      embedded: null,
      required: false,
      description: "The actual body of the review",
      maxCardinality: null,
      deprecated: false,
    },
    {
      name: "rating",
      id: "http://localhost/docs.jsonld#Review/rating",
      range: "http://www.w3.org/2001/XMLSchema#integer",
      type: "integer",
      reference: null,
      embedded: null,
      required: false,
      description: "",
      maxCardinality: null,
      deprecated: false,
    },
    {
      name: "itemReviewed",
      id: "http://schema.org/itemReviewed",
      range: "http://schema.org/Book",
      type: "string",
      reference: "Object http://schema.org/Book",
      embedded: null,
      required: true,
      description: "The item that is being reviewed/rated",
      maxCardinality: 1,
      deprecated: false,
    },
  ],
  writableFields: [
    {
      name: "reviewBody",
      id: "http://schema.org/reviewBody",
      range: "http://www.w3.org/2001/XMLSchema#string",
      type: "string",
      reference: null,
      embedded: null,
      required: false,
      description: "The actual body of the review",
      maxCardinality: null,
      deprecated: false,
    },
    {
      name: "rating",
      id: "http://localhost/docs.jsonld#Review/rating",
      range: "http://www.w3.org/2001/XMLSchema#integer",
      type: "integer",
      reference: null,
      embedded: null,
      required: false,
      description: "",
      maxCardinality: null,
      deprecated: false,
    },
    {
      name: "itemReviewed",
      id: "http://schema.org/itemReviewed",
      range: "http://schema.org/Book",
      type: "string",
      reference: "Object http://schema.org/Book",
      embedded: null,
      required: true,
      description: "The item that is being reviewed/rated",
      maxCardinality: 1,
      deprecated: false,
    },
  ],
  operations: [
    {
      name: "Retrieves the collection of Review resources.",
      type: "list",
      method: "GET",
      returns: "http://www.w3.org/ns/hydra/core#PagedCollection",
      types: ["http://www.w3.org/ns/hydra/core#Operation"],
      deprecated: false,
    },
    {
      name: "Creates a Review resource.",
      type: "create",
      method: "POST",
      expects: "http://schema.org/Review",
      returns: "http://schema.org/Review",
      types: ["http://www.w3.org/ns/hydra/core#CreateResourceOperation"],
      deprecated: false,
    },
    {
      name: "Retrieves Review resource.",
      type: "show",
      method: "GET",
      returns: "http://schema.org/Review",
      types: ["http://www.w3.org/ns/hydra/core#Operation"],
      deprecated: false,
    },
    {
      name: "Replaces the Review resource.",
      type: "edit",
      method: "PUT",
      expects: "http://schema.org/Review",
      returns: "http://schema.org/Review",
      types: ["http://www.w3.org/ns/hydra/core#ReplaceResourceOperation"],
      deprecated: false,
    },
    {
      name: "Deletes the Review resource.",
      type: "delete",
      method: "DELETE",
      returns: "http://www.w3.org/2002/07/owl#Nothing",
      types: ["http://www.w3.org/ns/hydra/core#Operation"],
      deprecated: false,
    },
  ],
  deprecated: false,
  parameters: [],
};

const customResource = {
  name: "customResources",
  url: "http://localhost/customResources",
  id: "http://localhost/docs.jsonld#CustomResource",
  title: "CustomResource",
  fields: [
    {
      name: "label",
      id: "http://localhost/docs.jsonld#CustomResource/label",
      range: "http://www.w3.org/2001/XMLSchema#string",
      type: "string",
      reference: null,
      embedded: null,
      required: true,
      description: "",
      maxCardinality: null,
      deprecated: false,
    },
    {
      name: "description",
      id: "http://localhost/docs.jsonld#CustomResource/description",
      range: "http://www.w3.org/2001/XMLSchema#string",
      type: "string",
      reference: null,
      embedded: null,
      required: true,
      description: "",
      maxCardinality: null,
      deprecated: false,
    },
    {
      name: "sanitizedDescription",
      id: "http://localhost/docs.jsonld#CustomResource/sanitizedDescription",
      range: null,
      type: "string",
      reference: null,
      embedded: null,
      required: false,
      description: "",
      maxCardinality: null,
      deprecated: false,
    },
  ],
  readableFields: [
    {
      name: "label",
      id: "http://localhost/docs.jsonld#CustomResource/label",
      range: "http://www.w3.org/2001/XMLSchema#string",
      type: "string",
      reference: null,
      embedded: null,
      required: true,
      description: "",
      maxCardinality: null,
      deprecated: false,
    },
    {
      name: "description",
      id: "http://localhost/docs.jsonld#CustomResource/description",
      range: "http://www.w3.org/2001/XMLSchema#string",
      type: "string",
      reference: null,
      embedded: null,
      required: true,
      description: "",
      maxCardinality: null,
      deprecated: false,
    },
    {
      name: "sanitizedDescription",
      id: "http://localhost/docs.jsonld#CustomResource/sanitizedDescription",
      range: null,
      type: "string",
      reference: null,
      embedded: null,
      required: false,
      description: "",
      maxCardinality: null,
      deprecated: false,
    },
  ],
  writableFields: [
    {
      name: "label",
      id: "http://localhost/docs.jsonld#CustomResource/label",
      range: "http://www.w3.org/2001/XMLSchema#string",
      type: "string",
      reference: null,
      embedded: null,
      required: true,
      description: "",
      maxCardinality: null,
      deprecated: false,
    },
    {
      name: "description",
      id: "http://localhost/docs.jsonld#CustomResource/description",
      range: "http://www.w3.org/2001/XMLSchema#string",
      type: "string",
      reference: null,
      embedded: null,
      required: true,
      description: "",
      maxCardinality: null,
      deprecated: false,
    },
  ],
  operations: [
    {
      name: "Retrieves the collection of custom resources.",
      type: "list",
      method: "GET",
      returns: "http://www.w3.org/ns/hydra/core#PagedCollection",
      types: ["http://www.w3.org/ns/hydra/core#Operation"],
      deprecated: false,
    },
    {
      name: "Creates a custom resource.",
      type: "create",
      method: "POST",
      expects: "http://localhost/docs.jsonld#CustomResource",
      returns: "http://localhost/docs.jsonld#CustomResource",
      types: ["http://www.w3.org/ns/hydra/core#CreateResourceOperation"],
      deprecated: false,
    },
    {
      name: "Retrieves custom resources.",
      type: "show",
      method: "GET",
      returns: "http://localhost/docs.jsonld#CustomResource",
      types: ["http://www.w3.org/ns/hydra/core#Operation"],
      deprecated: false,
    },
    {
      name: "Creates a custom resource.",
      type: "create",
      method: "POST",
      expects: "http://localhost/docs.jsonld#CustomResource",
      returns: "http://localhost/docs.jsonld#CustomResource",
      types: ["http://www.w3.org/ns/hydra/core#CreateResourceOperation"],
      deprecated: false,
    },
  ],
  deprecated: false,
  parameters: [],
};

const deprecatedResource = {
  name: "deprecated_resources",
  url: "http://localhost/deprecated_resources",
  id: "http://localhost/docs.jsonld#DeprecatedResource",
  title: "DeprecatedResource",
  fields: [
    {
      name: "deprecatedField",
      id: "http://localhost/docs.jsonld#DeprecatedResource/deprecatedField",
      range: "http://www.w3.org/2001/XMLSchema#string",
      type: "string",
      reference: null,
      embedded: null,
      required: true,
      description: "",
      maxCardinality: null,
      deprecated: true,
    },
  ],
  readableFields: [
    {
      name: "deprecatedField",
      id: "http://localhost/docs.jsonld#DeprecatedResource/deprecatedField",
      range: "http://www.w3.org/2001/XMLSchema#string",
      type: "string",
      reference: null,
      embedded: null,
      required: true,
      description: "",
      maxCardinality: null,
      deprecated: true,
    },
  ],
  writableFields: [
    {
      name: "deprecatedField",
      id: "http://localhost/docs.jsonld#DeprecatedResource/deprecatedField",
      range: "http://www.w3.org/2001/XMLSchema#string",
      type: "string",
      reference: null,
      embedded: null,
      required: true,
      description: "",
      maxCardinality: null,
      deprecated: true,
    },
  ],
  operations: [
    {
      name: "Retrieves the collection of DeprecatedResource resources.",
      type: "list",
      method: "GET",
      returns: "http://www.w3.org/ns/hydra/core#Collection",
      types: ["http://www.w3.org/ns/hydra/core#Operation", "schema:FindAction"],
      deprecated: true,
    },
    {
      name: "Retrieves DeprecatedResource resource.",
      type: "show",
      method: "GET",
      returns: "http://localhost/docs.jsonld#DeprecatedResource",
      types: ["http://www.w3.org/ns/hydra/core#Operation", "schema:FindAction"],
      deprecated: true,
    },
  ],
  deprecated: true,
  parameters: [],
};

const resources = [book, review, customResource, deprecatedResource];

const expectedApi = {
  entrypoint: "http://localhost",
  title: "API Platform's demo",
  resources: resources,
};

const init = {
  status: 200,
  statusText: "OK",
  headers: {
    Link: '<http://example.com/docs>; rel="http://example.com",<http://localhost/docs.jsonld>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation"',
    "Content-Type": "application/ld+json",
  },
};

test("parse a Hydra documentation", async () => {
  server.use(
    http.get("http://localhost", () => Response.json(entrypoint, init)),
    http.get("http://localhost/docs.jsonld", () => Response.json(docs, init)),
  );

  const fetchSpy = vi.spyOn(globalThis, "fetch");
  const options = { headers: new Headers({ CustomHeader: "customValue" }) };

  const response = await parseHydraDocumentation("http://localhost", options);
  expect(JSON.stringify(response.api, parsedJsonReplacer, 2)).toBe(
    JSON.stringify(expectedApi, null, 2),
  );
  expect(response.response).toBeDefined();
  expect(response.status).toBe(200);

  expect(fetchSpy).toHaveBeenCalledTimes(2);
  expect(fetchSpy).toHaveBeenNthCalledWith(2, "http://localhost/docs.jsonld", {
    headers: new Headers({
      Accept: "application/ld+json",
      "Content-Type": "application/ld+json",
      CustomHeader: "customValue",
    }),
  });
  fetchSpy.mockRestore();
});

function getHeaders(): Headers {
  return new Headers({ CustomHeader: "customValue" });
}

test("parse a Hydra documentation using dynamic headers", async () => {
  server.use(
    http.get("http://localhost", () => Response.json(entrypoint, init)),
    http.get("http://localhost/docs.jsonld", () => Response.json(docs, init)),
  );

  const fetchSpy = vi.spyOn(globalThis, "fetch");

  const data = await parseHydraDocumentation("http://localhost", {
    headers: getHeaders,
  });
  expect(JSON.stringify(data.api, parsedJsonReplacer, 2)).toBe(
    JSON.stringify(expectedApi, null, 2),
  );
  expect(data.response).toBeDefined();
  expect(data.status).toBe(200);

  expect(fetchSpy).toHaveBeenCalledTimes(2);
  expect(fetchSpy).toHaveBeenNthCalledWith(2, "http://localhost/docs.jsonld", {
    headers: new Headers({
      CustomHeader: "customValue",
      Accept: "application/ld+json",
      "Content-Type": "application/ld+json",
    }),
  });
  fetchSpy.mockRestore();
});

test("parse a Hydra documentation (http://localhost/)", async () => {
  server.use(
    http.get("http://localhost", () => Response.json(entrypoint, init)),
    http.get("http://localhost/docs.jsonld", () => Response.json(docs, init)),
  );

  const data = await parseHydraDocumentation("http://localhost/");
  expect(JSON.stringify(data.api, parsedJsonReplacer, 2)).toBe(
    JSON.stringify(expectedApi, null, 2),
  );
  expect(data.response).toBeDefined();
  expect(data.status).toBe(200);
});

test("parse a Hydra documentation without authorization", async () => {
  const init = {
    status: 401,
    statusText: "Unauthorized",
  };

  const expectedApi = {
    entrypoint: "http://localhost",
    resources: [],
  };

  const expectedResponse = {
    code: 401,
    message: "JWT Token not found",
  };

  server.use(
    http.get("http://localhost", () => Response.json(expectedResponse, init)),
  );
  const promise = parseHydraDocumentation("http://localhost");
  await expect(promise).rejects.toMatchObject({
    status: 401,
    api: expectedApi,
    response: expect.any(Response),
  });

  const err = await promise.catch((error) => error);

  await expect(err.response.json()).resolves.toEqual(expectedResponse);
});

test('Parse entrypoint without "@type" key', async () => {
  const entrypoint = {
    "@context": {
      "@vocab": "http://localhost/docs.jsonld#",
      hydra: "http://www.w3.org/ns/hydra/core#",
      book: {
        "@id": "Entrypoint/book",
        "@type": "@id",
      },
      review: {
        "@id": "Entrypoint/review",
        "@type": "@id",
      },
      customResource: {
        "@id": "Entrypoint/customResource",
        "@type": "@id",
      },
    },
    "@id": "/",
    book: "/books",
    review: "/reviews",
    customResource: "/customResources",
  };

  server.use(
    http.get("http://localhost", () => Response.json(entrypoint, init)),
    http.get("http://localhost/docs.jsonld", () => Response.json(docs, init)),
  );

  await expect(parseHydraDocumentation("http://localhost/")).rejects.toThrow(
    'The API entrypoint has no "@type" key.',
  );
});

test('Parse entrypoint class without "supportedClass" key', async () => {
  const docs = {
    "@context": {
      "@vocab": "http://localhost/docs.jsonld#",
      hydra: "http://www.w3.org/ns/hydra/core#",
      rdf: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
      rdfs: "http://www.w3.org/2000/01/rdf-schema#",
      xmls: "http://www.w3.org/2001/XMLSchema#",
      owl: "http://www.w3.org/2002/07/owl#",
      domain: {
        "@id": "rdfs:domain",
        "@type": "@id",
      },
      range: {
        "@id": "rdfs:range",
        "@type": "@id",
      },
      subClassOf: {
        "@id": "rdfs:subClassOf",
        "@type": "@id",
      },
      expects: {
        "@id": "hydra:expects",
        "@type": "@id",
      },
      returns: {
        "@id": "hydra:returns",
        "@type": "@id",
      },
    },
    "@id": "/docs.jsonld",
    "hydra:title": "API Platform's demo",
    "hydra:description": "A test",
    "hydra:entrypoint": "/",
  };

  server.use(
    http.get("http://localhost", () => Response.json(entrypoint, init)),
    http.get("http://localhost/docs.jsonld", () => Response.json(docs, init)),
  );

  await expect(parseHydraDocumentation("http://localhost/")).rejects.toThrow(
    'The API documentation has no "http://www.w3.org/ns/hydra/core#supportedClass" key or its value is not an array.',
  );
});

test('Parse entrypoint class without "supportedProperty" key', async () => {
  const docs = {
    "@context": {
      "@vocab": "http://localhost/docs.jsonld#",
      hydra: "http://www.w3.org/ns/hydra/core#",
      rdf: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
      rdfs: "http://www.w3.org/2000/01/rdf-schema#",
      xmls: "http://www.w3.org/2001/XMLSchema#",
      owl: "http://www.w3.org/2002/07/owl#",
      domain: {
        "@id": "rdfs:domain",
        "@type": "@id",
      },
      range: {
        "@id": "rdfs:range",
        "@type": "@id",
      },
      subClassOf: {
        "@id": "rdfs:subClassOf",
        "@type": "@id",
      },
      expects: {
        "@id": "hydra:expects",
        "@type": "@id",
      },
      returns: {
        "@id": "hydra:returns",
        "@type": "@id",
      },
    },
    "@id": "/docs.jsonld",
    "hydra:title": "API Platform's demo",
    "hydra:description": "A test",
    "hydra:entrypoint": "/",
    "hydra:supportedClass": [
      {
        "@id": "#Entrypoint",
        "@type": "hydra:Class",
        "hydra:title": "The API entrypoint",
        "hydra:supportedOperation": {
          "@type": "hydra:Operation",
          "hydra:method": "GET",
          "rdfs:label": "The API entrypoint.",
          returns: "#EntryPoint",
        },
      },
    ],
  };

  const expectedErrorMessage =
    'The entrypoint definition has no "http://www.w3.org/ns/hydra/core#supportedProperty" key or it is not an array.';

  server.use(
    http.get("http://localhost", () => Response.json(entrypoint, init)),
    http.get("http://localhost/docs.jsonld", () => Response.json(docs, init)),
  );

  await expect(parseHydraDocumentation("http://localhost/")).rejects.toThrow(
    expectedErrorMessage,
  );
});

test("Invalid docs JSON", async () => {
  const docs = `{foo,}`;

  server.use(
    http.get("http://localhost", () => Response.json(entrypoint, init)),
    http.get("http://localhost/docs.jsonld", () => new Response(docs, init)),
  );

  const promise = parseHydraDocumentation("http://localhost/");
  await expect(promise).rejects.toBeDefined();
  await expect(promise).rejects.toHaveProperty("api");
  await expect(promise).rejects.toHaveProperty("response");
  await expect(promise).rejects.toHaveProperty("status");
});

test("Invalid entrypoint JSON", async () => {
  const entrypoint = `{foo,}`;
  server.use(
    http.get("http://localhost", () => new Response(entrypoint, init)),
  );

  const promise = parseHydraDocumentation("http://localhost/");

  await expect(promise).rejects.toHaveProperty("api");
  await expect(promise).rejects.toHaveProperty("response");
  await expect(promise).rejects.toHaveProperty("status");
});

test("Resource parameters can be retrieved", async () => {
  const fetchSpy = vi.spyOn(globalThis, "fetch");
  server.use(
    http.get("http://localhost", () => Response.json(entrypoint, init)),
    http.get("http://localhost/docs.jsonld", () => Response.json(docs, init)),
    http.get("http://localhost/books", () =>
      Response.json(resourceCollectionWithParameters, init),
    ),
  );

  const data = await parseHydraDocumentation("http://localhost");
  const resource = data.api.resources?.[0];

  assert(resource !== undefined);
  assert("getParameters" in resource);
  assert(!!resource.getParameters);

  const parameters = await resource.getParameters();
  expect(fetchSpy).toHaveBeenCalledTimes(3);
  expect(parameters).toEqual([
    {
      description: "",
      range: "http://www.w3.org/2001/XMLSchema#string",
      required: false,
      variable: "isbn",
    },
  ]);
});

test("parse a Hydra documentation with enum/read-only resources (rdfs:range direct @id)", async () => {
  const enumEntrypoint = {
    "@context": {
      "@vocab": "http://localhost/docs.jsonld#",
      hydra: "http://www.w3.org/ns/hydra/core#",
      book: {
        "@id": "Entrypoint/book",
        "@type": "@id",
      },
      bookCondition: {
        "@id": "Entrypoint/bookCondition",
        "@type": "@id",
      },
    },
    "@id": "/",
    "@type": "Entrypoint",
    book: "/books",
    bookCondition: "/book_conditions",
  };

  const enumDocs = {
    "@context": {
      "@vocab": "http://localhost/docs.jsonld#",
      hydra: "http://www.w3.org/ns/hydra/core#",
      rdf: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
      rdfs: "http://www.w3.org/2000/01/rdf-schema#",
      xmls: "http://www.w3.org/2001/XMLSchema#",
      owl: "http://www.w3.org/2002/07/owl#",
      domain: {
        "@id": "rdfs:domain",
        "@type": "@id",
      },
      range: {
        "@id": "rdfs:range",
        "@type": "@id",
      },
      subClassOf: {
        "@id": "rdfs:subClassOf",
        "@type": "@id",
      },
      expects: {
        "@id": "hydra:expects",
        "@type": "@id",
      },
      returns: {
        "@id": "hydra:returns",
        "@type": "@id",
      },
    },
    "@id": "/docs.jsonld",
    "hydra:title": "API with enums",
    "hydra:description": "An API that exposes enum resources",
    "hydra:entrypoint": "/",
    "hydra:supportedClass": [
      {
        "@id": "http://schema.org/Book",
        "@type": "hydra:Class",
        "rdfs:label": "Book",
        "hydra:title": "Book",
        "hydra:supportedProperty": [
          {
            "@type": "hydra:SupportedProperty",
            "hydra:property": {
              "@id": "http://schema.org/name",
              "@type": "rdf:Property",
              "rdfs:label": "name",
              domain: "http://schema.org/Book",
              range: "xmls:string",
            },
            "hydra:title": "name",
            "hydra:required": true,
            "hydra:readable": true,
            "hydra:writeable": true,
          },
        ],
        "hydra:supportedOperation": [
          {
            "@type": "hydra:Operation",
            "hydra:method": "GET",
            "hydra:title": "Retrieves Book resource.",
            "rdfs:label": "Retrieves Book resource.",
            returns: "http://schema.org/Book",
          },
        ],
      },
      {
        "@id": "#BookCondition",
        "@type": "hydra:Class",
        "rdfs:label": "BookCondition",
        "hydra:title": "BookCondition",
        "hydra:description": "The condition of a book (new, used, damaged).",
        "hydra:supportedProperty": [
          {
            "@type": "hydra:SupportedProperty",
            "hydra:property": {
              "@id": "#BookCondition/value",
              "@type": "rdf:Property",
              "rdfs:label": "value",
              domain: "#BookCondition",
              range: "xmls:string",
            },
            "hydra:title": "value",
            "hydra:required": true,
            "hydra:readable": true,
            "hydra:writeable": false,
          },
        ],
        "hydra:supportedOperation": [
          {
            "@type": "hydra:Operation",
            "hydra:method": "GET",
            "hydra:title": "Retrieves BookCondition resource.",
            "rdfs:label": "Retrieves BookCondition resource.",
            returns: "#BookCondition",
          },
        ],
      },
      {
        "@id": "#Entrypoint",
        "@type": "hydra:Class",
        "hydra:title": "The API entrypoint",
        "hydra:supportedProperty": [
          {
            "@type": "hydra:SupportedProperty",
            "hydra:property": {
              "@id": "#Entrypoint/book",
              "@type": "hydra:Link",
              domain: "#Entrypoint",
              "rdfs:label": "The collection of Book resources",
              "rdfs:range": [
                { "@id": "hydra:PagedCollection" },
                {
                  "owl:equivalentClass": {
                    "owl:onProperty": { "@id": "hydra:member" },
                    "owl:allValuesFrom": {
                      "@id": "http://schema.org/Book",
                    },
                  },
                },
              ],
            },
            "hydra:title": "The collection of Book resources",
            "hydra:readable": true,
            "hydra:writeable": false,
          },
          {
            "@type": "hydra:SupportedProperty",
            "hydra:property": {
              "@id": "#Entrypoint/bookCondition",
              "@type": "hydra:Link",
              domain: "#Entrypoint",
              "rdfs:label": "The collection of BookCondition resources",
              "rdfs:range": [{ "@id": "#BookCondition" }],
            },
            "hydra:title": "The collection of BookCondition resources",
            "hydra:readable": true,
            "hydra:writeable": false,
          },
        ],
        "hydra:supportedOperation": {
          "@type": "hydra:Operation",
          "hydra:method": "GET",
          "rdfs:label": "The API entrypoint.",
          returns: "#EntryPoint",
        },
      },
      {
        "@id": "#ConstraintViolation",
        "@type": "hydra:Class",
        "hydra:title": "A constraint violation",
        "hydra:supportedProperty": [],
      },
      {
        "@id": "#ConstraintViolationList",
        "@type": "hydra:Class",
        subClassOf: "hydra:Error",
        "hydra:title": "A constraint violation list",
        "hydra:supportedProperty": [],
      },
    ],
  };

  server.use(
    http.get("http://localhost", () => Response.json(enumEntrypoint, init)),
    http.get("http://localhost/docs.jsonld", () =>
      Response.json(enumDocs, init),
    ),
  );

  const data = await parseHydraDocumentation("http://localhost");
  expect(data.status).toBe(200);

  const bookConditionResource = data.api.resources?.find(
    (r) => r.id === "http://localhost/docs.jsonld#BookCondition",
  );

  expect(bookConditionResource).toBeDefined();
  assert(bookConditionResource !== undefined);

  expect(bookConditionResource.name).toBe("book_conditions");
  expect(bookConditionResource.title).toBe("BookCondition");
  expect(bookConditionResource.url).toBe("http://localhost/book_conditions");

  // Verify the field was parsed correctly
  assert(bookConditionResource.fields !== null);
  assert(bookConditionResource.fields !== undefined);
  expect(bookConditionResource.fields).toHaveLength(1);
  expect(bookConditionResource.fields[0]?.name).toBe("value");
  expect(bookConditionResource.fields[0]?.range).toBe(
    "http://www.w3.org/2001/XMLSchema#string",
  );
  expect(bookConditionResource.fields[0]?.required).toBe(true);

  // Readable but not writable (read-only enum)
  expect(bookConditionResource.readableFields).toHaveLength(1);
  expect(bookConditionResource.writableFields).toHaveLength(0);

  // Verify operations - only GET (item operation from supportedOperation)
  assert(bookConditionResource.operations !== null);
  assert(bookConditionResource.operations !== undefined);
  expect(bookConditionResource.operations).toHaveLength(1);
  expect(bookConditionResource.operations[0]?.method).toBe("GET");

  // Also verify the book resource still works (Strategy 1 still functions)
  const bookResource = data.api.resources?.find(
    (r) => r.id === "http://schema.org/Book",
  );
  expect(bookResource).toBeDefined();
  expect(bookResource?.name).toBe("books");
});

test("parse a Hydra documentation with owl:equivalentClass without onProperty hydra:member", async () => {
  const enumEntrypoint = {
    "@context": {
      "@vocab": "http://localhost/docs.jsonld#",
      hydra: "http://www.w3.org/ns/hydra/core#",
      bookCondition: {
        "@id": "Entrypoint/bookCondition",
        "@type": "@id",
      },
    },
    "@id": "/",
    "@type": "Entrypoint",
    bookCondition: "/book_conditions",
  };

  const enumDocs = {
    "@context": {
      "@vocab": "http://localhost/docs.jsonld#",
      hydra: "http://www.w3.org/ns/hydra/core#",
      rdf: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
      rdfs: "http://www.w3.org/2000/01/rdf-schema#",
      xmls: "http://www.w3.org/2001/XMLSchema#",
      owl: "http://www.w3.org/2002/07/owl#",
      domain: {
        "@id": "rdfs:domain",
        "@type": "@id",
      },
      range: {
        "@id": "rdfs:range",
        "@type": "@id",
      },
      subClassOf: {
        "@id": "rdfs:subClassOf",
        "@type": "@id",
      },
      expects: {
        "@id": "hydra:expects",
        "@type": "@id",
      },
      returns: {
        "@id": "hydra:returns",
        "@type": "@id",
      },
    },
    "@id": "/docs.jsonld",
    "hydra:title": "API with enums",
    "hydra:description": "An API that exposes enum resources",
    "hydra:entrypoint": "/",
    "hydra:supportedClass": [
      {
        "@id": "#BookCondition",
        "@type": "hydra:Class",
        "rdfs:label": "BookCondition",
        "hydra:title": "BookCondition",
        "hydra:supportedProperty": [
          {
            "@type": "hydra:SupportedProperty",
            "hydra:property": {
              "@id": "#BookCondition/value",
              "@type": "rdf:Property",
              "rdfs:label": "value",
              domain: "#BookCondition",
              range: "xmls:string",
            },
            "hydra:title": "value",
            "hydra:required": true,
            "hydra:readable": true,
            "hydra:writeable": false,
          },
        ],
        "hydra:supportedOperation": [
          {
            "@type": "hydra:Operation",
            "hydra:method": "GET",
            "hydra:title": "Retrieves BookCondition resource.",
            "rdfs:label": "Retrieves BookCondition resource.",
            returns: "#BookCondition",
          },
        ],
      },
      {
        "@id": "#Entrypoint",
        "@type": "hydra:Class",
        "hydra:title": "The API entrypoint",
        "hydra:supportedProperty": [
          {
            "@type": "hydra:SupportedProperty",
            "hydra:property": {
              "@id": "#Entrypoint/bookCondition",
              "@type": "hydra:Link",
              domain: "#Entrypoint",
              "rdfs:label": "The collection of BookCondition resources",
              "rdfs:range": [
                { "@id": "hydra:Collection" },
                {
                  "owl:equivalentClass": {
                    "owl:allValuesFrom": {
                      "@id": "#BookCondition",
                    },
                  },
                },
              ],
            },
            "hydra:title": "The collection of BookCondition resources",
            "hydra:readable": true,
            "hydra:writeable": false,
          },
        ],
        "hydra:supportedOperation": {
          "@type": "hydra:Operation",
          "hydra:method": "GET",
          "rdfs:label": "The API entrypoint.",
          returns: "#EntryPoint",
        },
      },
      {
        "@id": "#ConstraintViolation",
        "@type": "hydra:Class",
        "hydra:title": "A constraint violation",
        "hydra:supportedProperty": [],
      },
      {
        "@id": "#ConstraintViolationList",
        "@type": "hydra:Class",
        subClassOf: "hydra:Error",
        "hydra:title": "A constraint violation list",
        "hydra:supportedProperty": [],
      },
    ],
  };

  server.use(
    http.get("http://localhost", () => Response.json(enumEntrypoint, init)),
    http.get("http://localhost/docs.jsonld", () =>
      Response.json(enumDocs, init),
    ),
  );

  const data = await parseHydraDocumentation("http://localhost");
  expect(data.status).toBe(200);

  const bookConditionResource = data.api.resources?.find(
    (r) => r.id === "http://localhost/docs.jsonld#BookCondition",
  );

  expect(bookConditionResource).toBeDefined();
  assert(bookConditionResource !== undefined);
  expect(bookConditionResource.name).toBe("book_conditions");
  expect(bookConditionResource.title).toBe("BookCondition");
});

test("parse a Hydra documentation with Post output: false (owl:Nothing returns)", async () => {
  const owlNothingEntrypoint = {
    "@context": {
      "@vocab": "http://localhost/docs.jsonld#",
      hydra: "http://www.w3.org/ns/hydra/core#",
      book: {
        "@id": "Entrypoint/book",
        "@type": "@id",
      },
    },
    "@id": "/",
    "@type": "Entrypoint",
    book: "/books",
  };

  const owlNothingDocs = {
    "@context": {
      "@vocab": "http://localhost/docs.jsonld#",
      hydra: "http://www.w3.org/ns/hydra/core#",
      rdf: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
      rdfs: "http://www.w3.org/2000/01/rdf-schema#",
      xmls: "http://www.w3.org/2001/XMLSchema#",
      owl: "http://www.w3.org/2002/07/owl#",
      domain: {
        "@id": "rdfs:domain",
        "@type": "@id",
      },
      range: {
        "@id": "rdfs:range",
        "@type": "@id",
      },
      subClassOf: {
        "@id": "rdfs:subClassOf",
        "@type": "@id",
      },
      expects: {
        "@id": "hydra:expects",
        "@type": "@id",
      },
      returns: {
        "@id": "hydra:returns",
        "@type": "@id",
      },
    },
    "@id": "/docs.jsonld",
    "hydra:title": "API with owl:Nothing",
    "hydra:description": "An API with Post output: false",
    "hydra:entrypoint": "/",
    "hydra:supportedClass": [
      {
        "@id": "http://schema.org/Book",
        "@type": "hydra:Class",
        "rdfs:label": "Book",
        "hydra:title": "Book",
        "hydra:supportedProperty": [
          {
            "@type": "hydra:SupportedProperty",
            "hydra:property": {
              "@id": "http://schema.org/name",
              "@type": "rdf:Property",
              "rdfs:label": "name",
              domain: "http://schema.org/Book",
              range: "xmls:string",
            },
            "hydra:title": "name",
            "hydra:required": true,
            "hydra:readable": true,
            "hydra:writeable": true,
          },
        ],
        "hydra:supportedOperation": [
          {
            "@type": "hydra:Operation",
            "hydra:method": "GET",
            "hydra:title": "Retrieves Book resource.",
            "rdfs:label": "Retrieves Book resource.",
            returns: "http://schema.org/Book",
          },
          {
            "@type": "hydra:Operation",
            "hydra:method": "DELETE",
            "hydra:title": "Deletes the Book resource.",
            "rdfs:label": "Deletes the Book resource.",
            returns: "owl:Nothing",
          },
        ],
      },
      {
        "@id": "#Entrypoint",
        "@type": "hydra:Class",
        "hydra:title": "The API entrypoint",
        "hydra:supportedProperty": [
          {
            "@type": "hydra:SupportedProperty",
            "hydra:property": {
              "@id": "#Entrypoint/book",
              "@type": "hydra:Link",
              domain: "#Entrypoint",
              "rdfs:label": "The collection of Book resources",
              "rdfs:range": [
                { "@id": "hydra:PagedCollection" },
                {
                  "owl:equivalentClass": {
                    "owl:onProperty": { "@id": "hydra:member" },
                    "owl:allValuesFrom": {
                      "@id": "http://schema.org/Book",
                    },
                  },
                },
              ],
              "hydra:supportedOperation": [
                {
                  "@type": "hydra:Operation",
                  "hydra:method": "GET",
                  "hydra:title": "Retrieves the collection of Book resources.",
                  "rdfs:label": "Retrieves the collection of Book resources.",
                  returns: "hydra:PagedCollection",
                },
                {
                  "@type": "hydra:CreateResourceOperation",
                  expects: "http://schema.org/Book",
                  "hydra:method": "POST",
                  "hydra:title": "Creates a Book resource.",
                  "rdfs:label": "Creates a Book resource.",
                  returns: "owl:Nothing",
                },
              ],
            },
            "hydra:title": "The collection of Book resources",
            "hydra:readable": true,
            "hydra:writeable": false,
          },
        ],
        "hydra:supportedOperation": {
          "@type": "hydra:Operation",
          "hydra:method": "GET",
          "rdfs:label": "The API entrypoint.",
          returns: "#EntryPoint",
        },
      },
      {
        "@id": "#ConstraintViolation",
        "@type": "hydra:Class",
        "hydra:title": "A constraint violation",
        "hydra:supportedProperty": [],
      },
      {
        "@id": "#ConstraintViolationList",
        "@type": "hydra:Class",
        subClassOf: "hydra:Error",
        "hydra:title": "A constraint violation list",
        "hydra:supportedProperty": [],
      },
    ],
  };

  server.use(
    http.get("http://localhost", () =>
      Response.json(owlNothingEntrypoint, init),
    ),
    http.get("http://localhost/docs.jsonld", () =>
      Response.json(owlNothingDocs, init),
    ),
  );

  const data = await parseHydraDocumentation("http://localhost");
  expect(data.status).toBe(200);

  const bookResource = data.api.resources?.find(
    (r) => r.id === "http://schema.org/Book",
  );

  expect(bookResource).toBeDefined();
  assert(bookResource !== undefined);
  expect(bookResource.name).toBe("books");
  expect(bookResource.title).toBe("Book");

  // Verify fields parsed correctly
  assert(bookResource.fields !== null);
  assert(bookResource.fields !== undefined);
  expect(bookResource.fields).toHaveLength(1);
  expect(bookResource.fields[0]?.name).toBe("name");

  // Verify operations include both collection and item operations
  assert(bookResource.operations !== null);
  assert(bookResource.operations !== undefined);

  // The POST operation with owl:Nothing returns should still be listed
  const postOp = bookResource.operations.find((op) => op.method === "POST");
  expect(postOp).toBeDefined();
  assert(postOp !== undefined);
  expect(postOp.returns).toBe("http://www.w3.org/2002/07/owl#Nothing");
});

test("parse a Hydra documentation with read-only resource without hydra prefix (bare member)", async () => {
  const readOnlyEntrypoint = {
    "@context": {
      "@vocab": "http://localhost/docs.jsonld#",
      hydra: "http://www.w3.org/ns/hydra/core#",
      greeting: {
        "@id": "Entrypoint/greeting",
        "@type": "@id",
      },
    },
    "@id": "/",
    "@type": "Entrypoint",
    greeting: "/greetings",
  };

  // Simulate hydra_prefix: false — "member" is NOT prefixed with "hydra:"
  // so jsonld.expand will resolve it via @vocab instead of the hydra context
  const readOnlyDocs = {
    "@context": {
      "@vocab": "http://localhost/docs.jsonld#",
      hydra: "http://www.w3.org/ns/hydra/core#",
      rdf: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
      rdfs: "http://www.w3.org/2000/01/rdf-schema#",
      xmls: "http://www.w3.org/2001/XMLSchema#",
      owl: "http://www.w3.org/2002/07/owl#",
      domain: {
        "@id": "rdfs:domain",
        "@type": "@id",
      },
      range: {
        "@id": "rdfs:range",
        "@type": "@id",
      },
      subClassOf: {
        "@id": "rdfs:subClassOf",
        "@type": "@id",
      },
      expects: {
        "@id": "hydra:expects",
        "@type": "@id",
      },
      returns: {
        "@id": "hydra:returns",
        "@type": "@id",
      },
    },
    "@id": "/docs.jsonld",
    "hydra:title": "API with read-only resource",
    "hydra:description": "An API with a read-only resource and no hydra prefix",
    "hydra:entrypoint": "/",
    "hydra:supportedClass": [
      {
        "@id": "#Greeting",
        "@type": "hydra:Class",
        "rdfs:label": "Greeting",
        "hydra:title": "Greeting",
        "hydra:supportedProperty": [
          {
            "@type": "hydra:SupportedProperty",
            "hydra:property": {
              "@id": "#Greeting/message",
              "@type": "rdf:Property",
              "rdfs:label": "message",
              domain: "#Greeting",
              range: "xmls:string",
            },
            "hydra:title": "message",
            "hydra:required": false,
            "hydra:readable": true,
            "hydra:writeable": false,
          },
        ],
        "hydra:supportedOperation": [
          {
            "@type": "hydra:Operation",
            "hydra:method": "GET",
            "hydra:title": "Retrieves Greeting resource.",
            "rdfs:label": "Retrieves Greeting resource.",
            returns: "#Greeting",
          },
        ],
      },
      {
        "@id": "#Entrypoint",
        "@type": "hydra:Class",
        "hydra:title": "The API entrypoint",
        "hydra:supportedProperty": [
          {
            "@type": "hydra:SupportedProperty",
            "hydra:property": {
              "@id": "#Entrypoint/greeting",
              "@type": "hydra:Link",
              domain: "#Entrypoint",
              "rdfs:label": "The collection of Greeting resources",
              "rdfs:range": [
                { "@id": "hydra:PagedCollection" },
                {
                  "owl:equivalentClass": {
                    // bare "member" without hydra: prefix — this is the bug trigger
                    "owl:onProperty": { "@id": "member" },
                    "owl:allValuesFrom": { "@id": "#Greeting" },
                  },
                },
              ],
              "hydra:supportedOperation": [
                {
                  "@type": "hydra:Operation",
                  "hydra:method": "GET",
                  "hydra:title":
                    "Retrieves the collection of Greeting resources.",
                  "rdfs:label":
                    "Retrieves the collection of Greeting resources.",
                  returns: "hydra:PagedCollection",
                },
              ],
            },
            "hydra:title": "The collection of Greeting resources",
            "hydra:readable": true,
            "hydra:writeable": false,
          },
        ],
        "hydra:supportedOperation": {
          "@type": "hydra:Operation",
          "hydra:method": "GET",
          "rdfs:label": "The API entrypoint.",
          returns: "#EntryPoint",
        },
      },
      {
        "@id": "#ConstraintViolation",
        "@type": "hydra:Class",
        "hydra:title": "A constraint violation",
        "hydra:supportedProperty": [],
      },
      {
        "@id": "#ConstraintViolationList",
        "@type": "hydra:Class",
        subClassOf: "hydra:Error",
        "hydra:title": "A constraint violation list",
        "hydra:supportedProperty": [],
      },
    ],
  };

  server.use(
    http.get("http://localhost", () => Response.json(readOnlyEntrypoint, init)),
    http.get("http://localhost/docs.jsonld", () =>
      Response.json(readOnlyDocs, init),
    ),
  );

  const data = await parseHydraDocumentation("http://localhost");
  expect(data.status).toBe(200);

  const greetingResource = data.api.resources?.find(
    (r) => r.id === "http://localhost/docs.jsonld#Greeting",
  );

  expect(greetingResource).toBeDefined();
  assert(greetingResource !== undefined);
  expect(greetingResource.name).toBe("greetings");
  expect(greetingResource.title).toBe("Greeting");

  // Verify read-only: readable but not writable
  assert(greetingResource.fields !== null);
  assert(greetingResource.fields !== undefined);
  expect(greetingResource.fields).toHaveLength(1);
  expect(greetingResource.fields[0]?.name).toBe("message");
  expect(greetingResource.readableFields).toHaveLength(1);
  expect(greetingResource.writableFields).toHaveLength(0);
});

test("parse a Hydra documentation with bare Link @type (without hydra prefix)", async () => {
  const linkEntrypoint = {
    "@context": {
      "@vocab": "http://localhost/docs.jsonld#",
      hydra: "http://www.w3.org/ns/hydra/core#",
      book: {
        "@id": "Entrypoint/book",
        "@type": "@id",
      },
      review: {
        "@id": "Entrypoint/review",
        "@type": "@id",
      },
    },
    "@id": "/",
    "@type": "Entrypoint",
    book: "/books",
    review: "/reviews",
  };

  const linkDocs = {
    "@context": {
      "@vocab": "http://localhost/docs.jsonld#",
      hydra: "http://www.w3.org/ns/hydra/core#",
      rdf: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
      rdfs: "http://www.w3.org/2000/01/rdf-schema#",
      xmls: "http://www.w3.org/2001/XMLSchema#",
      owl: "http://www.w3.org/2002/07/owl#",
      domain: {
        "@id": "rdfs:domain",
        "@type": "@id",
      },
      range: {
        "@id": "rdfs:range",
        "@type": "@id",
      },
      subClassOf: {
        "@id": "rdfs:subClassOf",
        "@type": "@id",
      },
      expects: {
        "@id": "hydra:expects",
        "@type": "@id",
      },
      returns: {
        "@id": "hydra:returns",
        "@type": "@id",
      },
    },
    "@id": "/docs.jsonld",
    "hydra:title": "API with bare Link type",
    "hydra:description": "An API without hydra prefix on Link @type",
    "hydra:entrypoint": "/",
    "hydra:supportedClass": [
      {
        "@id": "http://schema.org/Book",
        "@type": "hydra:Class",
        "rdfs:label": "Book",
        "hydra:title": "Book",
        "hydra:supportedProperty": [
          {
            "@type": "hydra:SupportedProperty",
            "hydra:property": {
              "@id": "http://schema.org/name",
              "@type": "rdf:Property",
              "rdfs:label": "name",
              domain: "http://schema.org/Book",
              range: "xmls:string",
            },
            "hydra:title": "name",
            "hydra:required": true,
            "hydra:readable": true,
            "hydra:writeable": true,
          },
          {
            "@type": "hydra:SupportedProperty",
            "hydra:property": {
              "@id": "#Book/review",
              // bare "Link" without hydra: prefix
              "@type": "Link",
              "rdfs:label": "review",
              domain: "http://schema.org/Book",
              range: "http://schema.org/Review",
            },
            "hydra:title": "review",
            "hydra:required": false,
            "hydra:readable": true,
            "hydra:writeable": true,
          },
        ],
        "hydra:supportedOperation": [
          {
            "@type": "hydra:Operation",
            "hydra:method": "GET",
            "hydra:title": "Retrieves Book resource.",
            "rdfs:label": "Retrieves Book resource.",
            returns: "http://schema.org/Book",
          },
        ],
      },
      {
        "@id": "http://schema.org/Review",
        "@type": "hydra:Class",
        "rdfs:label": "Review",
        "hydra:title": "Review",
        "hydra:supportedProperty": [
          {
            "@type": "hydra:SupportedProperty",
            "hydra:property": {
              "@id": "http://schema.org/reviewBody",
              "@type": "rdf:Property",
              "rdfs:label": "reviewBody",
              domain: "http://schema.org/Review",
              range: "xmls:string",
            },
            "hydra:title": "reviewBody",
            "hydra:required": true,
            "hydra:readable": true,
            "hydra:writeable": true,
          },
        ],
        "hydra:supportedOperation": [
          {
            "@type": "hydra:Operation",
            "hydra:method": "GET",
            "hydra:title": "Retrieves Review resource.",
            "rdfs:label": "Retrieves Review resource.",
            returns: "http://schema.org/Review",
          },
        ],
      },
      {
        "@id": "#Entrypoint",
        "@type": "hydra:Class",
        "hydra:title": "The API entrypoint",
        "hydra:supportedProperty": [
          {
            "@type": "hydra:SupportedProperty",
            "hydra:property": {
              "@id": "#Entrypoint/book",
              "@type": "hydra:Link",
              domain: "#Entrypoint",
              "rdfs:label": "The collection of Book resources",
              "rdfs:range": [
                { "@id": "hydra:PagedCollection" },
                {
                  "owl:equivalentClass": {
                    "owl:onProperty": { "@id": "hydra:member" },
                    "owl:allValuesFrom": {
                      "@id": "http://schema.org/Book",
                    },
                  },
                },
              ],
            },
            "hydra:title": "The collection of Book resources",
            "hydra:readable": true,
            "hydra:writeable": false,
          },
          {
            "@type": "hydra:SupportedProperty",
            "hydra:property": {
              "@id": "#Entrypoint/review",
              "@type": "hydra:Link",
              domain: "#Entrypoint",
              "rdfs:label": "The collection of Review resources",
              "rdfs:range": [
                { "@id": "hydra:PagedCollection" },
                {
                  "owl:equivalentClass": {
                    "owl:onProperty": { "@id": "hydra:member" },
                    "owl:allValuesFrom": {
                      "@id": "http://schema.org/Review",
                    },
                  },
                },
              ],
            },
            "hydra:title": "The collection of Review resources",
            "hydra:readable": true,
            "hydra:writeable": false,
          },
        ],
        "hydra:supportedOperation": {
          "@type": "hydra:Operation",
          "hydra:method": "GET",
          "rdfs:label": "The API entrypoint.",
          returns: "#EntryPoint",
        },
      },
      {
        "@id": "#ConstraintViolation",
        "@type": "hydra:Class",
        "hydra:title": "A constraint violation",
        "hydra:supportedProperty": [],
      },
      {
        "@id": "#ConstraintViolationList",
        "@type": "hydra:Class",
        subClassOf: "hydra:Error",
        "hydra:title": "A constraint violation list",
        "hydra:supportedProperty": [],
      },
    ],
  };

  server.use(
    http.get("http://localhost", () => Response.json(linkEntrypoint, init)),
    http.get("http://localhost/docs.jsonld", () =>
      Response.json(linkDocs, init),
    ),
  );

  const data = await parseHydraDocumentation("http://localhost");
  expect(data.status).toBe(200);

  const bookResource = data.api.resources?.find(
    (r) => r.id === "http://schema.org/Book",
  );
  const reviewResource = data.api.resources?.find(
    (r) => r.id === "http://schema.org/Review",
  );

  expect(bookResource).toBeDefined();
  assert(bookResource !== undefined);
  expect(reviewResource).toBeDefined();
  assert(reviewResource !== undefined);

  // The "review" field should be a reference (Link), not embedded
  const reviewField = bookResource.fields?.find((f) => f.name === "review");
  expect(reviewField).toBeDefined();
  assert(reviewField !== undefined);
  expect(reviewField.reference).toBe(reviewResource);
  expect(reviewField.embedded).toBeNull();
});
