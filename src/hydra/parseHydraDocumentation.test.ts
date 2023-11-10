import parseHydraDocumentation from "./parseHydraDocumentation.js";
import parsedJsonReplacer from "../utils/parsedJsonReplacer.js";
import type { FetchMock, MockParams } from "jest-fetch-mock";
import type { Api } from "../Api.js";

const fetchMock = fetch as FetchMock;

const entrypoint = `{
  "@context": {
    "@vocab": "http://localhost/docs.jsonld#",
    "hydra": "http://www.w3.org/ns/hydra/core#",
    "book": {
      "@id": "Entrypoint/book",
      "@type": "@id"
    },
    "review": {
      "@id": "Entrypoint/review",
      "@type": "@id"
    },
    "customResource": {
      "@id": "Entrypoint/customResource",
      "@type": "@id"
    },
    "deprecatedResource": {
      "@id": "Entrypoint/deprecatedResource",
      "@type": "@id"
    }
  },
  "@id": "/",
  "@type": "Entrypoint",
  "book": "/books",
  "review": "/reviews",
  "customResource": "/customResources",
  "deprecatedResource": "/deprecated_resources"
}`;

const docs = `{
"@context": {
  "@vocab": "http://localhost/docs.jsonld#",
  "hydra": "http://www.w3.org/ns/hydra/core#",
  "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
  "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
  "xmls": "http://www.w3.org/2001/XMLSchema#",
  "owl": "http://www.w3.org/2002/07/owl#",
  "domain": {
    "@id": "rdfs:domain",
    "@type": "@id"
  },
  "range": {
    "@id": "rdfs:range",
    "@type": "@id"
  },
  "subClassOf": {
    "@id": "rdfs:subClassOf",
    "@type": "@id"
  },
  "expects": {
    "@id": "hydra:expects",
    "@type": "@id"
  },
  "returns": {
    "@id": "hydra:returns",
    "@type": "@id"
  }
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
          "domain": "http://schema.org/Book",
          "range": "xmls:string"
        },
        "hydra:title": "isbn",
        "hydra:required": true,
        "hydra:readable": true,
        "hydra:writeable": true,
        "hydra:description": "The ISBN of the book"
      },
      {
        "@type": "hydra:SupportedProperty",
        "hydra:property": {
          "@id": "http://schema.org/name",
          "@type": "rdf:Property",
          "rdfs:label": "name",
          "domain": "http://schema.org/Book",
          "range": "xmls:string"
        },
        "hydra:title": "name",
        "hydra:required": true,
        "hydra:readable": true,
        "hydra:writeable": true,
        "hydra:description": "The name of the item"
      },
      {
        "@type": "hydra:SupportedProperty",
        "hydra:property": {
          "@id": "http://schema.org/description",
          "@type": "rdf:Property",
          "rdfs:label": "description",
          "domain": "http://schema.org/Book",
          "range": "xmls:string"
        },
        "hydra:title": "description",
        "hydra:required": false,
        "hydra:readable": true,
        "hydra:writeable": true,
        "hydra:description": "A description of the item"
      },
      {
        "@type": "hydra:SupportedProperty",
        "hydra:property": {
          "@id": "http://schema.org/author",
          "@type": "rdf:Property",
          "rdfs:label": "author",
          "domain": "http://schema.org/Book",
          "range": "xmls:string"
        },
        "hydra:title": "author",
        "hydra:required": true,
        "hydra:readable": true,
        "hydra:writeable": true,
        "hydra:description": "The author of this content or rating. Please note that author is special in that HTML 5 provides a special mechanism for indicating authorship via the rel tag. That is equivalent to this and may be used interchangeably"
      },
      {
        "@type": "hydra:SupportedProperty",
        "hydra:property": {
          "@id": "http://schema.org/dateCreated",
          "@type": "rdf:Property",
          "rdfs:label": "dateCreated",
          "domain": "http://schema.org/Book",
          "range": "xmls:dateTime"
        },
        "hydra:title": "dateCreated",
        "hydra:required": true,
        "hydra:readable": true,
        "hydra:writeable": true,
        "hydra:description": "The date on which the CreativeWork was created or the item was added to a DataFeed"
      },
      {
        "@type": "hydra:SupportedProperty",
        "hydra:property": {
          "@id": "http://schema.org/reviews",
          "@type": "hydra:Link",
          "rdfs:label": "reviews",
          "domain": "http://schema.org/Book",
          "range": "http://schema.org/Review"
        },
        "hydra:title": "reviews",
        "hydra:required": false,
        "hydra:readable": true,
        "hydra:writable": true,
        "hydra:description": "The book's reviews"
      },
      {
        "@type": "hydra:SupportedProperty",
        "hydra:property": {
          "@id": "http://schema.org/reviews",
          "@type": "rdf:Property",
          "rdfs:label": "embeddedReviews",
          "domain": "http://schema.org/Book",
          "range": "http://schema.org/Review"
        },
        "hydra:title": "embeddedReviews",
        "hydra:required": false,
        "hydra:readable": true,
        "hydra:writable": true,
        "hydra:description": "The book's reviews"
      }
    ],
    "hydra:supportedOperation": [
      {
        "@type": "hydra:Operation",
        "hydra:method": "GET",
        "hydra:title": "Retrieves Book resource.",
        "rdfs:label": "Retrieves Book resource.",
        "returns": "http://schema.org/Book"
      },
      {
        "@type": "hydra:ReplaceResourceOperation",
        "expects": "http://schema.org/Book",
        "hydra:method": "PUT",
        "hydra:title": "Replaces the Book resource.",
        "rdfs:label": "Replaces the Book resource.",
        "returns": "http://schema.org/Book"
      },
      {
        "@type": "hydra:Operation",
        "hydra:method": "DELETE",
        "hydra:title": "Deletes the Book resource.",
        "rdfs:label": "Deletes the Book resource.",
        "returns": "owl:Nothing"
      },
      {
        "@type": "hydra:Operation",
        "hydra:method": "GET"
      }
    ]
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
          "domain": "http://schema.org/Review",
          "range": "xmls:string"
        },
        "hydra:title": "reviewBody",
        "hydra:required": false,
        "hydra:readable": true,
        "hydra:writeable": true,
        "hydra:description": "The actual body of the review"
      },
      {
        "@type": "hydra:SupportedProperty",
        "hydra:property": {
          "@id": "#Review/rating",
          "@type": "rdf:Property",
          "rdfs:label": "rating",
          "domain": "http://schema.org/Review",
          "range": "xmls:integer"
        },
        "hydra:title": "rating",
        "hydra:required": false,
        "hydra:readable": true,
        "hydra:writeable": true
      },
      {
        "@type": "hydra:SupportedProperty",
        "hydra:property": {
          "@id": "http://schema.org/itemReviewed",
          "@type": "hydra:Link",
          "rdfs:label": "itemReviewed",
          "domain": "http://schema.org/Review",
          "owl:maxCardinality": 1,
          "range": "http://schema.org/Book"
        },
        "hydra:title": "itemReviewed",
        "hydra:required": true,
        "hydra:readable": true,
        "hydra:writeable": true,
        "hydra:description": "The item that is being reviewed/rated"
      }
    ],
    "hydra:supportedOperation": [
      {
        "@type": "hydra:Operation",
        "hydra:method": "GET",
        "hydra:title": "Retrieves Review resource.",
        "rdfs:label": "Retrieves Review resource.",
        "returns": "http://schema.org/Review"
      },
      {
        "@type": "hydra:ReplaceResourceOperation",
        "expects": "http://schema.org/Review",
        "hydra:method": "PUT",
        "hydra:title": "Replaces the Review resource.",
        "rdfs:label": "Replaces the Review resource.",
        "returns": "http://schema.org/Review"
      },
      {
        "@type": "hydra:Operation",
        "hydra:method": "DELETE",
        "hydra:title": "Deletes the Review resource.",
        "rdfs:label": "Deletes the Review resource.",
        "returns": "owl:Nothing"
      }
    ]
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
          "domain": "#CustomResource",
          "range": "xmls:string"
        },
        "hydra:title": "label",
        "hydra:required": true,
        "hydra:readable": true,
        "hydra:writeable": true
      },
      {
        "@type": "hydra:SupportedProperty",
        "hydra:property": {
          "@id": "#CustomResource/description",
          "@type": "rdf:Property",
          "rdfs:label": "description",
          "domain": "#CustomResource",
          "range": "xmls:string"
        },
        "hydra:title": "description",
        "hydra:required": true,
        "hydra:readable": true,
        "hydra:writeable": true
      },
      {
        "@type": "hydra:SupportedProperty",
        "hydra:property": {
          "@id": "#CustomResource/sanitizedDescription",
          "@type": "rdf:Property",
          "rdfs:label": "sanitizedDescription",
          "domain": "#CustomResource"
        },
        "hydra:title": "sanitizedDescription",
        "hydra:required": false,
        "hydra:readable": true,
        "hydra:writeable": false
      }
    ],
    "hydra:supportedOperation": [
      {
        "@type": "hydra:Operation",
        "hydra:method": "GET",
        "hydra:title": "Retrieves custom resources.",
        "rdfs:label": "Retrieves custom resources.",
        "returns": "#CustomResource"
      },
      {
        "@type": "hydra:CreateResourceOperation",
        "expects": "#CustomResource",
        "hydra:method": "POST",
        "hydra:title": "Creates a custom resource.",
        "rdfs:label": "Creates a custom resource.",
        "returns": "#CustomResource"
      }
    ]
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
          "domain": "#DeprecatedResource",
          "range": "xmls:string"
        },
        "hydra:title": "deprecatedField",
        "hydra:required": true,
        "hydra:readable": true,
        "hydra:writeable": true,
        "hydra:description": "",
        "owl:deprecated": true
      }
    ],
    "hydra:supportedOperation": [
      {
        "@type": [
          "hydra:Operation",
          "schema:FindAction"
        ],
        "hydra:method": "GET",
        "hydra:title": "Retrieves DeprecatedResource resource.",
        "owl:deprecated": true,
        "rdfs:label": "Retrieves DeprecatedResource resource.",
        "returns": "#DeprecatedResource"
      }
    ],
    "hydra:description": "This is a dummy entity. Remove it!",
    "owl:deprecated": true
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
          "domain": "#Entrypoint",
          "rdfs:label": "The collection of Book resources",
          "rdfs:range": [
            {"@id": "hydra:PagedCollection"},
            {
              "owl:equivalentClass": {
                "owl:onProperty": {"@id": "hydra:member"},
                "owl:allValuesFrom": {"@id": "http://schema.org/Book"}
              }
            }
          ]
        },
        "hydra:title": "The collection of Book resources",
        "hydra:readable": true,
        "hydra:writeable": false
      },
      {
        "@type": "hydra:SupportedProperty",
        "hydra:property": {
          "@id": "#Entrypoint/review",
          "@type": "hydra:Link",
          "domain": "#Entrypoint",
          "rdfs:label": "The collection of Review resources",
          "range": "hydra:PagedCollection",
          "hydra:supportedOperation": [
            {
              "@type": "hydra:Operation",
              "hydra:method": "GET",
              "hydra:title": "Retrieves the collection of Review resources.",
              "rdfs:label": "Retrieves the collection of Review resources.",
              "returns": "hydra:PagedCollection"
            },
            {
              "@type": "hydra:CreateResourceOperation",
              "expects": "http://schema.org/Review",
              "hydra:method": "POST",
              "hydra:title": "Creates a Review resource.",
              "rdfs:label": "Creates a Review resource.",
              "returns": "http://schema.org/Review"
            }
          ]
        },
        "hydra:title": "The collection of Review resources",
        "hydra:readable": true,
        "hydra:writeable": false
      },
      {
        "@type": "hydra:SupportedProperty",
        "hydra:property": {
          "@id": "#Entrypoint/customResource",
          "@type": "hydra:Link",
          "domain": "#Entrypoint",
          "rdfs:label": "The collection of custom resources",
          "range": "hydra:PagedCollection",
          "hydra:supportedOperation": [
            {
              "@type": "hydra:Operation",
              "hydra:method": "GET",
              "hydra:title": "Retrieves the collection of custom resources.",
              "rdfs:label": "Retrieves the collection of custom resources.",
              "returns": "hydra:PagedCollection"
            },
            {
              "@type": "hydra:CreateResourceOperation",
              "expects": "#CustomResource",
              "hydra:method": "POST",
              "hydra:title": "Creates a custom resource.",
              "rdfs:label": "Creates a custom resource.",
              "returns": "#CustomResource"
            }
          ]
        },
        "hydra:title": "The collection of custom resources",
        "hydra:readable": true,
        "hydra:writeable": false
      },
      {
        "@type": "hydra:SupportedProperty",
        "hydra:property": {
            "@id": "#Entrypoint/deprecatedResource",
            "@type": "hydra:Link",
            "domain": "#Entrypoint",
            "rdfs:label": "The collection of DeprecatedResource resources",
            "rdfs:range": [
              {
                "@id": "hydra:Collection"
              },
              {
                "owl:equivalentClass": {
                  "owl:onProperty": {
                    "@id": "hydra:member"
                  },
                  "owl:allValuesFrom": {
                    "@id": "#DeprecatedResource"
                  }
                }
              }
            ],
            "hydra:supportedOperation": [
              {
                "@type": [
                  "hydra:Operation",
                  "schema:FindAction"
                ],
                "hydra:method": "GET",
                "hydra:title": "Retrieves the collection of DeprecatedResource resources.",
                "owl:deprecated": true,
                "rdfs:label": "Retrieves the collection of DeprecatedResource resources.",
                "returns": "hydra:Collection"
              }
            ]
        },
        "hydra:title": "The collection of DeprecatedResource resources",
        "hydra:readable": true,
        "hydra:writeable": false,
        "owl:deprecated": true
    }
    ],
    "hydra:supportedOperation": {
      "@type": "hydra:Operation",
      "hydra:method": "GET",
      "rdfs:label": "The API entrypoint.",
      "returns": "#EntryPoint"
    }
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
          "domain": "#ConstraintViolation",
          "range": "xmls:string"
        },
        "hydra:title": "propertyPath",
        "hydra:description": "The property path of the violation",
        "hydra:readable": true,
        "hydra:writeable": false
      },
      {
        "@type": "hydra:SupportedProperty",
        "hydra:property": {
          "@id": "#ConstraintViolation/message",
          "@type": "rdf:Property",
          "rdfs:label": "message",
          "domain": "#ConstraintViolation",
          "range": "xmls:string"
        },
        "hydra:title": "message",
        "hydra:description": "The message associated with the violation",
        "hydra:readable": true,
        "hydra:writeable": false
      }
    ]
  },
  {
    "@id": "#ConstraintViolationList",
    "@type": "hydra:Class",
    "subClassOf": "hydra:Error",
    "hydra:title": "A constraint violation list",
    "hydra:supportedProperty": [
      {
        "@type": "hydra:SupportedProperty",
        "hydra:property": {
          "@id": "#ConstraintViolationList/violation",
          "@type": "rdf:Property",
          "rdfs:label": "violation",
          "domain": "#ConstraintViolationList",
          "range": "#ConstraintViolation"
        },
        "hydra:title": "violation",
        "hydra:description": "The violations",
        "hydra:readable": true,
        "hydra:writeable": false
      }
    ]
  }
]
}`;

const resourceCollectionWithParameters = `{
  "hydra:search": {
    "hydra:mapping": [
      {
        "property": "isbn",
        "variable": "isbn",
        "range": "http://www.w3.org/2001/XMLSchema#string",
        "required": false
      }
    ]
  }
}`;

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

const init: MockParams = {
  status: 200,
  statusText: "OK",
  headers: {
    Link: '<http://example.com/docs>; rel="http://example.com",<http://localhost/docs.jsonld>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation"',
    "Content-Type": "application/ld+json",
  },
};

test("parse a Hydra documentation", async () => {
  fetchMock.mockResponses([entrypoint, init], [docs, init]);

  const options = { headers: new Headers({ CustomHeader: "customValue" }) };

  await parseHydraDocumentation("http://localhost", options).then((data) => {
    expect(JSON.stringify(data.api, parsedJsonReplacer, 2)).toBe(
      JSON.stringify(expectedApi, null, 2)
    );
    expect(data.response).toBeDefined();
    expect(data.status).toBe(200);

    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenNthCalledWith(2, "http://localhost/docs.jsonld", {
      headers: new Headers({
        Accept: "application/ld+json",
        "Content-Type": "application/ld+json",
        CustomHeader: "customValue",
      }),
    });
  });
});

test("parse a Hydra documentation using dynamic headers", async () => {
  fetchMock.mockResponses([entrypoint, init], [docs, init]);

  const getHeaders = (): Headers =>
    new Headers({ CustomHeader: "customValue" });

  await parseHydraDocumentation("http://localhost", {
    headers: getHeaders,
  }).then((data) => {
    expect(JSON.stringify(data.api, parsedJsonReplacer, 2)).toBe(
      JSON.stringify(expectedApi, null, 2)
    );
    expect(data.response).toBeDefined();
    expect(data.status).toBe(200);

    expect(fetch).toHaveBeenCalledTimes(4);
    expect(fetch).toHaveBeenNthCalledWith(2, "http://localhost/docs.jsonld", {
      headers: new Headers({
        CustomHeader: "customValue",
        Accept: "application/ld+json",
        "Content-Type": "application/ld+json",
      }),
    });
  });
});

test("parse a Hydra documentation (http://localhost/)", async () => {
  fetchMock.mockResponses([entrypoint, init], [docs, init]);

  await parseHydraDocumentation("http://localhost/").then((data) => {
    expect(JSON.stringify(data.api, parsedJsonReplacer, 2)).toBe(
      JSON.stringify(expectedApi, null, 2)
    );
    expect(data.response).toBeDefined();
    expect(data.status).toBe(200);
  });
});

test("parse a Hydra documentation without authorization", () => {
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

  fetchMock.mockResponses([JSON.stringify(expectedResponse), init]);

  return parseHydraDocumentation("http://localhost").catch(
    async (data: { api: Api; response: Response; status: number }) => {
      expect(data.api).toEqual(expectedApi);
      expect(data.response).toBeDefined();
      await expect(data.response.json()).resolves.toEqual(expectedResponse);
      expect(data.status).toBe(401);
    }
  );
});

test('Parse entrypoint without "@type" key', async () => {
  const entrypoint = `{
  "@context": {
    "@vocab": "http://localhost/docs.jsonld#",
    "hydra": "http://www.w3.org/ns/hydra/core#",
    "book": {
      "@id": "Entrypoint/book",
      "@type": "@id"
    },
    "review": {
      "@id": "Entrypoint/review",
      "@type": "@id"
    },
    "customResource": {
      "@id": "Entrypoint/customResource",
      "@type": "@id"
    }
  },
  "@id": "/",
  "book": "/books",
  "review": "/reviews",
  "customResource": "/customResources"
}`;

  fetchMock.mockResponses([entrypoint, init], [docs, init]);

  const expectedError = { message: "" };

  try {
    await parseHydraDocumentation("http://localhost/");
  } catch (error) {
    expectedError.message = (error as Error).message;
  }

  expect(expectedError.message).toBe('The API entrypoint has no "@type" key.');
});

test('Parse entrypoint class without "supportedClass" key', async () => {
  const docs = `{
"@context": {
  "@vocab": "http://localhost/docs.jsonld#",
  "hydra": "http://www.w3.org/ns/hydra/core#",
  "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
  "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
  "xmls": "http://www.w3.org/2001/XMLSchema#",
  "owl": "http://www.w3.org/2002/07/owl#",
  "domain": {
    "@id": "rdfs:domain",
    "@type": "@id"
  },
  "range": {
    "@id": "rdfs:range",
    "@type": "@id"
  },
  "subClassOf": {
    "@id": "rdfs:subClassOf",
    "@type": "@id"
  },
  "expects": {
    "@id": "hydra:expects",
    "@type": "@id"
  },
  "returns": {
    "@id": "hydra:returns",
    "@type": "@id"
  }
},
"@id": "/docs.jsonld",
"hydra:title": "API Platform's demo",
"hydra:description": "A test",
"hydra:entrypoint": "/"
}`;

  fetchMock.mockResponses([entrypoint, init], [docs, init]);

  const expectedError = { message: "" };

  try {
    await parseHydraDocumentation("http://localhost/");
  } catch (error) {
    expectedError.message = (error as Error).message;
  }

  expect(expectedError.message).toBe(
    'The API documentation has no "http://www.w3.org/ns/hydra/core#supportedClass" key or its value is not an array.'
  );
});

test('Parse entrypoint class without "supportedProperty" key', async () => {
  const docs = `{
"@context": {
  "@vocab": "http://localhost/docs.jsonld#",
  "hydra": "http://www.w3.org/ns/hydra/core#",
  "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
  "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
  "xmls": "http://www.w3.org/2001/XMLSchema#",
  "owl": "http://www.w3.org/2002/07/owl#",
  "domain": {
    "@id": "rdfs:domain",
    "@type": "@id"
  },
  "range": {
    "@id": "rdfs:range",
    "@type": "@id"
  },
  "subClassOf": {
    "@id": "rdfs:subClassOf",
    "@type": "@id"
  },
  "expects": {
    "@id": "hydra:expects",
    "@type": "@id"
  },
  "returns": {
    "@id": "hydra:returns",
    "@type": "@id"
  }
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
      "returns": "#EntryPoint"
    }
  }
]
}`;

  fetchMock.mockResponses([entrypoint, init], [docs, init]);

  const expectedError = { message: "" };

  try {
    await parseHydraDocumentation("http://localhost/");
  } catch (error) {
    expectedError.message = (error as Error).message;
  }

  expect(expectedError.message).toBe(
    'The entrypoint definition has no "http://www.w3.org/ns/hydra/core#supportedProperty" key or it is not an array.'
  );
});

test("Invalid docs JSON", async () => {
  const docs = `{foo,}`;

  fetchMock.mockResponses([entrypoint, init], [docs, init]);

  let expectedError = {};

  try {
    await parseHydraDocumentation("http://localhost/");
  } catch (error) {
    expectedError = error as Error;
  }

  expect(expectedError).toHaveProperty("api");
  expect(expectedError).toHaveProperty("response");
  expect(expectedError).toHaveProperty("status");
});

test("Invalid entrypoint JSON", async () => {
  const entrypoint = `{foo,}`;

  fetchMock.mockResponses([entrypoint, init]);

  let expectedError = {};

  try {
    await parseHydraDocumentation("http://localhost/");
  } catch (error) {
    expectedError = error as Error;
  }

  expect(expectedError).toHaveProperty("api");
  expect(expectedError).toHaveProperty("response");
  expect(expectedError).toHaveProperty("status");
});

test("Resource parameters can be retrieved", async () => {
  fetchMock.mockResponses(
    [entrypoint, init],
    [docs, init],
    [resourceCollectionWithParameters, init]
  );

  await parseHydraDocumentation("http://localhost").then(
    async (data: { api: Api }) => {
      const resource = data.api.resources?.[0];
      resource &&
        resource.getParameters &&
        (await resource.getParameters().then((parameters: any) => {
          expect(parameters).toEqual([
            {
              description: "",
              range: "http://www.w3.org/2001/XMLSchema#string",
              required: false,
              variable: "isbn",
            },
          ]);
        }));
    }
  );
});
