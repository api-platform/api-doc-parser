import parseHydraDocumentation from './parseHydraDocumentation';

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
  "@type": "Entrypoint",
  "book": "/books",
  "review": "/reviews",
  "customResource": "/customResources"
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
        "hydra:writable": true,
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
        "hydra:writable": true,
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
        "hydra:writable": true,
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
        "hydra:writable": true,
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
        "hydra:writable": true,
        "hydra:description": "The date on which the CreativeWork was created or the item was added to a DataFeed"
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
        "hydra:writable": true,
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
        "hydra:writable": true
      },
      {
        "@type": "hydra:SupportedProperty",
        "hydra:property": {
          "@id": "http://schema.org/itemReviewed",
          "@type": "hydra:Link",
          "rdfs:label": "itemReviewed",
          "domain": "http://schema.org/Review",
          "range": "http://schema.org/Book"
        },
        "hydra:title": "itemReviewed",
        "hydra:required": true,
        "hydra:readable": true,
        "hydra:writable": true,
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
        "hydra:writable": true
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
        "hydra:writable": true
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
        "hydra:writable": false
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
          "range": "hydra:PagedCollection",
          "hydra:supportedOperation": [
            {
              "@type": "hydra:Operation",
              "hydra:method": "GET",
              "hydra:title": "Retrieves the collection of Book resources.",
              "rdfs:label": "Retrieves the collection of Book resources.",
              "returns": "hydra:PagedCollection"
            },
            {
              "@type": "hydra:CreateResourceOperation",
              "expects": "http://schema.org/Book",
              "hydra:method": "POST",
              "hydra:title": "Creates a Book resource.",
              "rdfs:label": "Creates a Book resource.",
              "returns": "http://schema.org/Book"
            }
          ]
        },
        "hydra:title": "The collection of Book resources",
        "hydra:readable": true,
        "hydra:writable": false
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
        "hydra:writable": false
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
        "hydra:writable": false
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
        "hydra:writable": false
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
        "hydra:writable": false
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
        "hydra:writable": false
      }
    ]
  }
]
}`;

const expectedApi = {
  "entrypoint": "http://localhost",
  "title": "API Platform's demo",
  "resources": [
    {
      "name": "books",
      "url": "http://localhost/books",
      "id": "http://schema.org/Book",
      "title": "Book",
      "fields": [
        {
          "name": "isbn",
          "id": "http://schema.org/isbn",
          "range": "http://www.w3.org/2001/XMLSchema#string",
          "reference": null,
          "required": true,
          "description": "The ISBN of the book"
        },
        {
          "name": "name",
          "id": "http://schema.org/name",
          "range": "http://www.w3.org/2001/XMLSchema#string",
          "reference": null,
          "required": true,
          "description": "The name of the item"
        },
        {
          "name": "description",
          "id": "http://schema.org/description",
          "range": "http://www.w3.org/2001/XMLSchema#string",
          "reference": null,
          "required": false,
          "description": "A description of the item"
        },
        {
          "name": "author",
          "id": "http://schema.org/author",
          "range": "http://www.w3.org/2001/XMLSchema#string",
          "reference": null,
          "required": true,
          "description": "The author of this content or rating. Please note that author is special in that HTML 5 provides a special mechanism for indicating authorship via the rel tag. That is equivalent to this and may be used interchangeably"
        },
        {
          "name": "dateCreated",
          "id": "http://schema.org/dateCreated",
          "range": "http://www.w3.org/2001/XMLSchema#dateTime",
          "reference": null,
          "required": true,
          "description": "The date on which the CreativeWork was created or the item was added to a DataFeed"
        }
      ],
      "readableFields": [
        {
          "name": "isbn",
          "id": "http://schema.org/isbn",
          "range": "http://www.w3.org/2001/XMLSchema#string",
          "reference": null,
          "required": true,
          "description": "The ISBN of the book"
        },
        {
          "name": "name",
          "id": "http://schema.org/name",
          "range": "http://www.w3.org/2001/XMLSchema#string",
          "reference": null,
          "required": true,
          "description": "The name of the item"
        },
        {
          "name": "description",
          "id": "http://schema.org/description",
          "range": "http://www.w3.org/2001/XMLSchema#string",
          "reference": null,
          "required": false,
          "description": "A description of the item"
        },
        {
          "name": "author",
          "id": "http://schema.org/author",
          "range": "http://www.w3.org/2001/XMLSchema#string",
          "reference": null,
          "required": true,
          "description": "The author of this content or rating. Please note that author is special in that HTML 5 provides a special mechanism for indicating authorship via the rel tag. That is equivalent to this and may be used interchangeably"
        },
        {
          "name": "dateCreated",
          "id": "http://schema.org/dateCreated",
          "range": "http://www.w3.org/2001/XMLSchema#dateTime",
          "reference": null,
          "required": true,
          "description": "The date on which the CreativeWork was created or the item was added to a DataFeed"
        }
      ],
      "writableFields": [
        {
          "name": "isbn",
          "id": "http://schema.org/isbn",
          "range": "http://www.w3.org/2001/XMLSchema#string",
          "reference": null,
          "required": true,
          "description": "The ISBN of the book"
        },
        {
          "name": "name",
          "id": "http://schema.org/name",
          "range": "http://www.w3.org/2001/XMLSchema#string",
          "reference": null,
          "required": true,
          "description": "The name of the item"
        },
        {
          "name": "description",
          "id": "http://schema.org/description",
          "range": "http://www.w3.org/2001/XMLSchema#string",
          "reference": null,
          "required": false,
          "description": "A description of the item"
        },
        {
          "name": "author",
          "id": "http://schema.org/author",
          "range": "http://www.w3.org/2001/XMLSchema#string",
          "reference": null,
          "required": true,
          "description": "The author of this content or rating. Please note that author is special in that HTML 5 provides a special mechanism for indicating authorship via the rel tag. That is equivalent to this and may be used interchangeably"
        },
        {
          "name": "dateCreated",
          "id": "http://schema.org/dateCreated",
          "range": "http://www.w3.org/2001/XMLSchema#dateTime",
          "reference": null,
          "required": true,
          "description": "The date on which the CreativeWork was created or the item was added to a DataFeed"
        }
      ]
    },
    {
      "name": "reviews",
      "url": "http://localhost/reviews",
      "id": "http://schema.org/Review",
      "title": "Review",
      "fields": [
        {
          "name": "reviewBody",
          "id": "http://schema.org/reviewBody",
          "range": "http://www.w3.org/2001/XMLSchema#string",
          "reference": null,
          "required": false,
          "description": "The actual body of the review"
        },
        {
          "name": "rating",
          "id": "http://localhost/docs.jsonld#Review/rating",
          "range": "http://www.w3.org/2001/XMLSchema#integer",
          "reference": null,
          "required": false,
          "description": ""
        },
        {
          "name": "itemReviewed",
          "id": "http://schema.org/itemReviewed",
          "range": "http://schema.org/Book",
          "reference": {
            "name": "books",
            "url": "http://localhost/books",
            "id": "http://schema.org/Book",
            "title": "Book",
            "fields": [
              {
                "name": "isbn",
                "id": "http://schema.org/isbn",
                "range": "http://www.w3.org/2001/XMLSchema#string",
                "reference": null,
                "required": true,
                "description": "The ISBN of the book"
              },
              {
                "name": "name",
                "id": "http://schema.org/name",
                "range": "http://www.w3.org/2001/XMLSchema#string",
                "reference": null,
                "required": true,
                "description": "The name of the item"
              },
              {
                "name": "description",
                "id": "http://schema.org/description",
                "range": "http://www.w3.org/2001/XMLSchema#string",
                "reference": null,
                "required": false,
                "description": "A description of the item"
              },
              {
                "name": "author",
                "id": "http://schema.org/author",
                "range": "http://www.w3.org/2001/XMLSchema#string",
                "reference": null,
                "required": true,
                "description": "The author of this content or rating. Please note that author is special in that HTML 5 provides a special mechanism for indicating authorship via the rel tag. That is equivalent to this and may be used interchangeably"
              },
              {
                "name": "dateCreated",
                "id": "http://schema.org/dateCreated",
                "range": "http://www.w3.org/2001/XMLSchema#dateTime",
                "reference": null,
                "required": true,
                "description": "The date on which the CreativeWork was created or the item was added to a DataFeed"
              }
            ],
            "readableFields": [
              {
                "name": "isbn",
                "id": "http://schema.org/isbn",
                "range": "http://www.w3.org/2001/XMLSchema#string",
                "reference": null,
                "required": true,
                "description": "The ISBN of the book"
              },
              {
                "name": "name",
                "id": "http://schema.org/name",
                "range": "http://www.w3.org/2001/XMLSchema#string",
                "reference": null,
                "required": true,
                "description": "The name of the item"
              },
              {
                "name": "description",
                "id": "http://schema.org/description",
                "range": "http://www.w3.org/2001/XMLSchema#string",
                "reference": null,
                "required": false,
                "description": "A description of the item"
              },
              {
                "name": "author",
                "id": "http://schema.org/author",
                "range": "http://www.w3.org/2001/XMLSchema#string",
                "reference": null,
                "required": true,
                "description": "The author of this content or rating. Please note that author is special in that HTML 5 provides a special mechanism for indicating authorship via the rel tag. That is equivalent to this and may be used interchangeably"
              },
              {
                "name": "dateCreated",
                "id": "http://schema.org/dateCreated",
                "range": "http://www.w3.org/2001/XMLSchema#dateTime",
                "reference": null,
                "required": true,
                "description": "The date on which the CreativeWork was created or the item was added to a DataFeed"
              }
            ],
            "writableFields": [
              {
                "name": "isbn",
                "id": "http://schema.org/isbn",
                "range": "http://www.w3.org/2001/XMLSchema#string",
                "reference": null,
                "required": true,
                "description": "The ISBN of the book"
              },
              {
                "name": "name",
                "id": "http://schema.org/name",
                "range": "http://www.w3.org/2001/XMLSchema#string",
                "reference": null,
                "required": true,
                "description": "The name of the item"
              },
              {
                "name": "description",
                "id": "http://schema.org/description",
                "range": "http://www.w3.org/2001/XMLSchema#string",
                "reference": null,
                "required": false,
                "description": "A description of the item"
              },
              {
                "name": "author",
                "id": "http://schema.org/author",
                "range": "http://www.w3.org/2001/XMLSchema#string",
                "reference": null,
                "required": true,
                "description": "The author of this content or rating. Please note that author is special in that HTML 5 provides a special mechanism for indicating authorship via the rel tag. That is equivalent to this and may be used interchangeably"
              },
              {
                "name": "dateCreated",
                "id": "http://schema.org/dateCreated",
                "range": "http://www.w3.org/2001/XMLSchema#dateTime",
                "reference": null,
                "required": true,
                "description": "The date on which the CreativeWork was created or the item was added to a DataFeed"
              }
            ]
          },
          "required": true,
          "description": "The item that is being reviewed/rated"
        }
      ],
      "readableFields": [
        {
          "name": "reviewBody",
          "id": "http://schema.org/reviewBody",
          "range": "http://www.w3.org/2001/XMLSchema#string",
          "reference": null,
          "required": false,
          "description": "The actual body of the review"
        },
        {
          "name": "rating",
          "id": "http://localhost/docs.jsonld#Review/rating",
          "range": "http://www.w3.org/2001/XMLSchema#integer",
          "reference": null,
          "required": false,
          "description": ""
        },
        {
          "name": "itemReviewed",
          "id": "http://schema.org/itemReviewed",
          "range": "http://schema.org/Book",
          "reference": {
            "name": "books",
            "url": "http://localhost/books",
            "id": "http://schema.org/Book",
            "title": "Book",
            "fields": [
              {
                "name": "isbn",
                "id": "http://schema.org/isbn",
                "range": "http://www.w3.org/2001/XMLSchema#string",
                "reference": null,
                "required": true,
                "description": "The ISBN of the book"
              },
              {
                "name": "name",
                "id": "http://schema.org/name",
                "range": "http://www.w3.org/2001/XMLSchema#string",
                "reference": null,
                "required": true,
                "description": "The name of the item"
              },
              {
                "name": "description",
                "id": "http://schema.org/description",
                "range": "http://www.w3.org/2001/XMLSchema#string",
                "reference": null,
                "required": false,
                "description": "A description of the item"
              },
              {
                "name": "author",
                "id": "http://schema.org/author",
                "range": "http://www.w3.org/2001/XMLSchema#string",
                "reference": null,
                "required": true,
                "description": "The author of this content or rating. Please note that author is special in that HTML 5 provides a special mechanism for indicating authorship via the rel tag. That is equivalent to this and may be used interchangeably"
              },
              {
                "name": "dateCreated",
                "id": "http://schema.org/dateCreated",
                "range": "http://www.w3.org/2001/XMLSchema#dateTime",
                "reference": null,
                "required": true,
                "description": "The date on which the CreativeWork was created or the item was added to a DataFeed"
              }
            ],
            "readableFields": [
              {
                "name": "isbn",
                "id": "http://schema.org/isbn",
                "range": "http://www.w3.org/2001/XMLSchema#string",
                "reference": null,
                "required": true,
                "description": "The ISBN of the book"
              },
              {
                "name": "name",
                "id": "http://schema.org/name",
                "range": "http://www.w3.org/2001/XMLSchema#string",
                "reference": null,
                "required": true,
                "description": "The name of the item"
              },
              {
                "name": "description",
                "id": "http://schema.org/description",
                "range": "http://www.w3.org/2001/XMLSchema#string",
                "reference": null,
                "required": false,
                "description": "A description of the item"
              },
              {
                "name": "author",
                "id": "http://schema.org/author",
                "range": "http://www.w3.org/2001/XMLSchema#string",
                "reference": null,
                "required": true,
                "description": "The author of this content or rating. Please note that author is special in that HTML 5 provides a special mechanism for indicating authorship via the rel tag. That is equivalent to this and may be used interchangeably"
              },
              {
                "name": "dateCreated",
                "id": "http://schema.org/dateCreated",
                "range": "http://www.w3.org/2001/XMLSchema#dateTime",
                "reference": null,
                "required": true,
                "description": "The date on which the CreativeWork was created or the item was added to a DataFeed"
              }
            ],
            "writableFields": [
              {
                "name": "isbn",
                "id": "http://schema.org/isbn",
                "range": "http://www.w3.org/2001/XMLSchema#string",
                "reference": null,
                "required": true,
                "description": "The ISBN of the book"
              },
              {
                "name": "name",
                "id": "http://schema.org/name",
                "range": "http://www.w3.org/2001/XMLSchema#string",
                "reference": null,
                "required": true,
                "description": "The name of the item"
              },
              {
                "name": "description",
                "id": "http://schema.org/description",
                "range": "http://www.w3.org/2001/XMLSchema#string",
                "reference": null,
                "required": false,
                "description": "A description of the item"
              },
              {
                "name": "author",
                "id": "http://schema.org/author",
                "range": "http://www.w3.org/2001/XMLSchema#string",
                "reference": null,
                "required": true,
                "description": "The author of this content or rating. Please note that author is special in that HTML 5 provides a special mechanism for indicating authorship via the rel tag. That is equivalent to this and may be used interchangeably"
              },
              {
                "name": "dateCreated",
                "id": "http://schema.org/dateCreated",
                "range": "http://www.w3.org/2001/XMLSchema#dateTime",
                "reference": null,
                "required": true,
                "description": "The date on which the CreativeWork was created or the item was added to a DataFeed"
              }
            ]
          },
          "required": true,
          "description": "The item that is being reviewed/rated"
        }
      ],
      "writableFields": [
        {
          "name": "reviewBody",
          "id": "http://schema.org/reviewBody",
          "range": "http://www.w3.org/2001/XMLSchema#string",
          "reference": null,
          "required": false,
          "description": "The actual body of the review"
        },
        {
          "name": "rating",
          "id": "http://localhost/docs.jsonld#Review/rating",
          "range": "http://www.w3.org/2001/XMLSchema#integer",
          "reference": null,
          "required": false,
          "description": ""
        },
        {
          "name": "itemReviewed",
          "id": "http://schema.org/itemReviewed",
          "range": "http://schema.org/Book",
          "reference": {
            "name": "books",
            "url": "http://localhost/books",
            "id": "http://schema.org/Book",
            "title": "Book",
            "fields": [
              {
                "name": "isbn",
                "id": "http://schema.org/isbn",
                "range": "http://www.w3.org/2001/XMLSchema#string",
                "reference": null,
                "required": true,
                "description": "The ISBN of the book"
              },
              {
                "name": "name",
                "id": "http://schema.org/name",
                "range": "http://www.w3.org/2001/XMLSchema#string",
                "reference": null,
                "required": true,
                "description": "The name of the item"
              },
              {
                "name": "description",
                "id": "http://schema.org/description",
                "range": "http://www.w3.org/2001/XMLSchema#string",
                "reference": null,
                "required": false,
                "description": "A description of the item"
              },
              {
                "name": "author",
                "id": "http://schema.org/author",
                "range": "http://www.w3.org/2001/XMLSchema#string",
                "reference": null,
                "required": true,
                "description": "The author of this content or rating. Please note that author is special in that HTML 5 provides a special mechanism for indicating authorship via the rel tag. That is equivalent to this and may be used interchangeably"
              },
              {
                "name": "dateCreated",
                "id": "http://schema.org/dateCreated",
                "range": "http://www.w3.org/2001/XMLSchema#dateTime",
                "reference": null,
                "required": true,
                "description": "The date on which the CreativeWork was created or the item was added to a DataFeed"
              }
            ],
            "readableFields": [
              {
                "name": "isbn",
                "id": "http://schema.org/isbn",
                "range": "http://www.w3.org/2001/XMLSchema#string",
                "reference": null,
                "required": true,
                "description": "The ISBN of the book"
              },
              {
                "name": "name",
                "id": "http://schema.org/name",
                "range": "http://www.w3.org/2001/XMLSchema#string",
                "reference": null,
                "required": true,
                "description": "The name of the item"
              },
              {
                "name": "description",
                "id": "http://schema.org/description",
                "range": "http://www.w3.org/2001/XMLSchema#string",
                "reference": null,
                "required": false,
                "description": "A description of the item"
              },
              {
                "name": "author",
                "id": "http://schema.org/author",
                "range": "http://www.w3.org/2001/XMLSchema#string",
                "reference": null,
                "required": true,
                "description": "The author of this content or rating. Please note that author is special in that HTML 5 provides a special mechanism for indicating authorship via the rel tag. That is equivalent to this and may be used interchangeably"
              },
              {
                "name": "dateCreated",
                "id": "http://schema.org/dateCreated",
                "range": "http://www.w3.org/2001/XMLSchema#dateTime",
                "reference": null,
                "required": true,
                "description": "The date on which the CreativeWork was created or the item was added to a DataFeed"
              }
            ],
            "writableFields": [
              {
                "name": "isbn",
                "id": "http://schema.org/isbn",
                "range": "http://www.w3.org/2001/XMLSchema#string",
                "reference": null,
                "required": true,
                "description": "The ISBN of the book"
              },
              {
                "name": "name",
                "id": "http://schema.org/name",
                "range": "http://www.w3.org/2001/XMLSchema#string",
                "reference": null,
                "required": true,
                "description": "The name of the item"
              },
              {
                "name": "description",
                "id": "http://schema.org/description",
                "range": "http://www.w3.org/2001/XMLSchema#string",
                "reference": null,
                "required": false,
                "description": "A description of the item"
              },
              {
                "name": "author",
                "id": "http://schema.org/author",
                "range": "http://www.w3.org/2001/XMLSchema#string",
                "reference": null,
                "required": true,
                "description": "The author of this content or rating. Please note that author is special in that HTML 5 provides a special mechanism for indicating authorship via the rel tag. That is equivalent to this and may be used interchangeably"
              },
              {
                "name": "dateCreated",
                "id": "http://schema.org/dateCreated",
                "range": "http://www.w3.org/2001/XMLSchema#dateTime",
                "reference": null,
                "required": true,
                "description": "The date on which the CreativeWork was created or the item was added to a DataFeed"
              }
            ]
          },
          "required": true,
          "description": "The item that is being reviewed/rated"
        }
      ]
    },
    {
      "name": "customResources",
      "url": "http://localhost/customResources",
      "id": "http://localhost/docs.jsonld#CustomResource",
      "title": "CustomResource",
      "fields": [
        {
          "name": "label",
          "id": "http://localhost/docs.jsonld#CustomResource/label",
          "range": "http://www.w3.org/2001/XMLSchema#string",
          "reference": null,
          "required": true,
          "description": ""
        },
        {
          "name": "description",
          "id": "http://localhost/docs.jsonld#CustomResource/description",
          "range": "http://www.w3.org/2001/XMLSchema#string",
          "reference": null,
          "required": true,
          "description": ""
        },
        {
          "name": "sanitizedDescription",
          "id": "http://localhost/docs.jsonld#CustomResource/sanitizedDescription",
          "range": null,
          "reference": null,
          "required": false,
          "description": ""
        }
      ],
      "readableFields": [
        {
          "name": "label",
          "id": "http://localhost/docs.jsonld#CustomResource/label",
          "range": "http://www.w3.org/2001/XMLSchema#string",
          "reference": null,
          "required": true,
          "description": ""
        },
        {
          "name": "description",
          "id": "http://localhost/docs.jsonld#CustomResource/description",
          "range": "http://www.w3.org/2001/XMLSchema#string",
          "reference": null,
          "required": true,
          "description": ""
        },
        {
          "name": "sanitizedDescription",
          "id": "http://localhost/docs.jsonld#CustomResource/sanitizedDescription",
          "range": null,
          "reference": null,
          "required": false,
          "description": ""
        }
      ],
      "writableFields": [
        {
          "name": "label",
          "id": "http://localhost/docs.jsonld#CustomResource/label",
          "range": "http://www.w3.org/2001/XMLSchema#string",
          "reference": null,
          "required": true,
          "description": ""
        },
        {
          "name": "description",
          "id": "http://localhost/docs.jsonld#CustomResource/description",
          "range": "http://www.w3.org/2001/XMLSchema#string",
          "reference": null,
          "required": true,
          "description": ""
        }
      ]
    }
  ]
};

const init = {
  status: 200,
  statusText: 'OK',
  headers: new Headers({
    'Link': '<http://localhost/docs.jsonld>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation"',
    'Content-Type': 'application/ld+json'
  })
};

test('parse a Hydra documentation', () => {
  fetch.mockResponses(
    [entrypoint, init],
    [docs, init],
  );

  const options = {headers: new Headers({'CustomHeader': 'customValue'})};

  return parseHydraDocumentation('http://localhost', options).then(data => {
      // TODO: find some something cleaner ;)
      expect(JSON.stringify(data.api, null, 2)).toBe(JSON.stringify(expectedApi, null, 2));
      expect(data.response).toBeDefined();
      expect(data.status).toBe(200);

      expect(fetch).toHaveBeenCalledTimes(2);
      expect(fetch).toHaveBeenLastCalledWith('http://localhost/docs.jsonld', options);
    }
  );
});

test('parse a Hydra documentation (http://localhost/)', () => {
  fetch.mockResponses(
    [entrypoint, init],
    [docs, init],
  );

  return parseHydraDocumentation('http://localhost/').then(data => {
      // TODO: find some something cleaner ;)
      expect(JSON.stringify(data.api, null, 2)).toBe(JSON.stringify(expectedApi, null, 2));
      expect(data.response).toBeDefined();
      expect(data.status).toBe(200);
    }
  );
});


test('parse a Hydra documentation without authorization', () => {
  const init = {
    status: 401,
    statusText: 'Unauthorized',
  };

  const expectedApi = {
    entrypoint: 'http://localhost',
    resources: [],
  };

  const expectedResponse = {
    code: 401,
    message: 'JWT Token not found'
  };

  fetch.mockResponses(
    [JSON.stringify(expectedResponse), init],
  );

  return parseHydraDocumentation('http://localhost').catch(async data => {
    expect(data.api).toEqual(expectedApi);
    expect(data.response).toBeDefined();
    await expect(data.response.json()).resolves.toEqual(expectedResponse);
    expect(data.status).toBe(401);
  });
});
