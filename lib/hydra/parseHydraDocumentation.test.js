"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var parseHydraDocumentation_1 = tslib_1.__importDefault(require("./parseHydraDocumentation"));
var fetchMock = fetch;
var entrypoint = "{\n  \"@context\": {\n    \"@vocab\": \"http://localhost/docs.jsonld#\",\n    \"hydra\": \"http://www.w3.org/ns/hydra/core#\",\n    \"book\": {\n      \"@id\": \"Entrypoint/book\",\n      \"@type\": \"@id\"\n    },\n    \"review\": {\n      \"@id\": \"Entrypoint/review\",\n      \"@type\": \"@id\"\n    },\n    \"customResource\": {\n      \"@id\": \"Entrypoint/customResource\",\n      \"@type\": \"@id\"\n    },\n    \"deprecatedResource\": {\n      \"@id\": \"Entrypoint/deprecatedResource\",\n      \"@type\": \"@id\"\n    }\n  },\n  \"@id\": \"/\",\n  \"@type\": \"Entrypoint\",\n  \"book\": \"/books\",\n  \"review\": \"/reviews\",\n  \"customResource\": \"/customResources\",\n  \"deprecatedResource\": \"/deprecated_resources\"\n}";
var docs = "{\n\"@context\": {\n  \"@vocab\": \"http://localhost/docs.jsonld#\",\n  \"hydra\": \"http://www.w3.org/ns/hydra/core#\",\n  \"rdf\": \"http://www.w3.org/1999/02/22-rdf-syntax-ns#\",\n  \"rdfs\": \"http://www.w3.org/2000/01/rdf-schema#\",\n  \"xmls\": \"http://www.w3.org/2001/XMLSchema#\",\n  \"owl\": \"http://www.w3.org/2002/07/owl#\",\n  \"domain\": {\n    \"@id\": \"rdfs:domain\",\n    \"@type\": \"@id\"\n  },\n  \"range\": {\n    \"@id\": \"rdfs:range\",\n    \"@type\": \"@id\"\n  },\n  \"subClassOf\": {\n    \"@id\": \"rdfs:subClassOf\",\n    \"@type\": \"@id\"\n  },\n  \"expects\": {\n    \"@id\": \"hydra:expects\",\n    \"@type\": \"@id\"\n  },\n  \"returns\": {\n    \"@id\": \"hydra:returns\",\n    \"@type\": \"@id\"\n  }\n},\n\"@id\": \"/docs.jsonld\",\n\"hydra:title\": \"API Platform's demo\",\n\"hydra:description\": \"A test\",\n\"hydra:entrypoint\": \"/\",\n\"hydra:supportedClass\": [\n  {\n    \"@id\": \"http://schema.org/Book\",\n    \"@type\": \"hydra:Class\",\n    \"rdfs:label\": \"Book\",\n    \"hydra:title\": \"Book\",\n    \"hydra:supportedProperty\": [\n      {\n        \"@type\": \"hydra:SupportedProperty\",\n        \"hydra:property\": {\n          \"@id\": \"http://schema.org/isbn\",\n          \"@type\": \"rdf:Property\",\n          \"rdfs:label\": \"isbn\",\n          \"domain\": \"http://schema.org/Book\",\n          \"range\": \"xmls:string\"\n        },\n        \"hydra:title\": \"isbn\",\n        \"hydra:required\": true,\n        \"hydra:readable\": true,\n        \"hydra:writeable\": true,\n        \"hydra:description\": \"The ISBN of the book\"\n      },\n      {\n        \"@type\": \"hydra:SupportedProperty\",\n        \"hydra:property\": {\n          \"@id\": \"http://schema.org/name\",\n          \"@type\": \"rdf:Property\",\n          \"rdfs:label\": \"name\",\n          \"domain\": \"http://schema.org/Book\",\n          \"range\": \"xmls:string\"\n        },\n        \"hydra:title\": \"name\",\n        \"hydra:required\": true,\n        \"hydra:readable\": true,\n        \"hydra:writeable\": true,\n        \"hydra:description\": \"The name of the item\"\n      },\n      {\n        \"@type\": \"hydra:SupportedProperty\",\n        \"hydra:property\": {\n          \"@id\": \"http://schema.org/description\",\n          \"@type\": \"rdf:Property\",\n          \"rdfs:label\": \"description\",\n          \"domain\": \"http://schema.org/Book\",\n          \"range\": \"xmls:string\"\n        },\n        \"hydra:title\": \"description\",\n        \"hydra:required\": false,\n        \"hydra:readable\": true,\n        \"hydra:writeable\": true,\n        \"hydra:description\": \"A description of the item\"\n      },\n      {\n        \"@type\": \"hydra:SupportedProperty\",\n        \"hydra:property\": {\n          \"@id\": \"http://schema.org/author\",\n          \"@type\": \"rdf:Property\",\n          \"rdfs:label\": \"author\",\n          \"domain\": \"http://schema.org/Book\",\n          \"range\": \"xmls:string\"\n        },\n        \"hydra:title\": \"author\",\n        \"hydra:required\": true,\n        \"hydra:readable\": true,\n        \"hydra:writeable\": true,\n        \"hydra:description\": \"The author of this content or rating. Please note that author is special in that HTML 5 provides a special mechanism for indicating authorship via the rel tag. That is equivalent to this and may be used interchangeably\"\n      },\n      {\n        \"@type\": \"hydra:SupportedProperty\",\n        \"hydra:property\": {\n          \"@id\": \"http://schema.org/dateCreated\",\n          \"@type\": \"rdf:Property\",\n          \"rdfs:label\": \"dateCreated\",\n          \"domain\": \"http://schema.org/Book\",\n          \"range\": \"xmls:dateTime\"\n        },\n        \"hydra:title\": \"dateCreated\",\n        \"hydra:required\": true,\n        \"hydra:readable\": true,\n        \"hydra:writeable\": true,\n        \"hydra:description\": \"The date on which the CreativeWork was created or the item was added to a DataFeed\"\n      },\n      {\n        \"@type\": \"hydra:SupportedProperty\",\n        \"hydra:property\": {\n          \"@id\": \"http://schema.org/reviews\",\n          \"@type\": \"hydra:Link\",\n          \"rdfs:label\": \"reviews\",\n          \"domain\": \"http://schema.org/Book\",\n          \"range\": \"http://schema.org/Review\"\n        },\n        \"hydra:title\": \"reviews\",\n        \"hydra:required\": false,\n        \"hydra:readable\": true,\n        \"hydra:writable\": true,\n        \"hydra:description\": \"The book's reviews\"\n      },\n      {\n        \"@type\": \"hydra:SupportedProperty\",\n        \"hydra:property\": {\n          \"@id\": \"http://schema.org/reviews\",\n          \"@type\": \"rdf:Property\",\n          \"rdfs:label\": \"embeddedReviews\",\n          \"domain\": \"http://schema.org/Book\",\n          \"range\": \"http://schema.org/Review\"\n        },\n        \"hydra:title\": \"embeddedReviews\",\n        \"hydra:required\": false,\n        \"hydra:readable\": true,\n        \"hydra:writable\": true,\n        \"hydra:description\": \"The book's reviews\"\n      }\n    ],\n    \"hydra:supportedOperation\": [\n      {\n        \"@type\": \"hydra:Operation\",\n        \"hydra:method\": \"GET\",\n        \"hydra:title\": \"Retrieves Book resource.\",\n        \"rdfs:label\": \"Retrieves Book resource.\",\n        \"returns\": \"http://schema.org/Book\"\n      },\n      {\n        \"@type\": \"hydra:ReplaceResourceOperation\",\n        \"expects\": \"http://schema.org/Book\",\n        \"hydra:method\": \"PUT\",\n        \"hydra:title\": \"Replaces the Book resource.\",\n        \"rdfs:label\": \"Replaces the Book resource.\",\n        \"returns\": \"http://schema.org/Book\"\n      },\n      {\n        \"@type\": \"hydra:Operation\",\n        \"hydra:method\": \"DELETE\",\n        \"hydra:title\": \"Deletes the Book resource.\",\n        \"rdfs:label\": \"Deletes the Book resource.\",\n        \"returns\": \"owl:Nothing\"\n      },\n      {\n        \"@type\": \"hydra:Operation\",\n        \"hydra:method\": \"GET\"\n      }\n    ]\n  },\n  {\n    \"@id\": \"http://schema.org/Review\",\n    \"@type\": \"hydra:Class\",\n    \"rdfs:label\": \"Review\",\n    \"hydra:title\": \"Review\",\n    \"hydra:supportedProperty\": [\n      {\n        \"@type\": \"hydra:SupportedProperty\",\n        \"hydra:property\": {\n          \"@id\": \"http://schema.org/reviewBody\",\n          \"@type\": \"rdf:Property\",\n          \"rdfs:label\": \"reviewBody\",\n          \"domain\": \"http://schema.org/Review\",\n          \"range\": \"xmls:string\"\n        },\n        \"hydra:title\": \"reviewBody\",\n        \"hydra:required\": false,\n        \"hydra:readable\": true,\n        \"hydra:writeable\": true,\n        \"hydra:description\": \"The actual body of the review\"\n      },\n      {\n        \"@type\": \"hydra:SupportedProperty\",\n        \"hydra:property\": {\n          \"@id\": \"#Review/rating\",\n          \"@type\": \"rdf:Property\",\n          \"rdfs:label\": \"rating\",\n          \"domain\": \"http://schema.org/Review\",\n          \"range\": \"xmls:integer\"\n        },\n        \"hydra:title\": \"rating\",\n        \"hydra:required\": false,\n        \"hydra:readable\": true,\n        \"hydra:writeable\": true\n      },\n      {\n        \"@type\": \"hydra:SupportedProperty\",\n        \"hydra:property\": {\n          \"@id\": \"http://schema.org/itemReviewed\",\n          \"@type\": \"hydra:Link\",\n          \"rdfs:label\": \"itemReviewed\",\n          \"domain\": \"http://schema.org/Review\",\n          \"owl:maxCardinality\": 1,\n          \"range\": \"http://schema.org/Book\"\n        },\n        \"hydra:title\": \"itemReviewed\",\n        \"hydra:required\": true,\n        \"hydra:readable\": true,\n        \"hydra:writeable\": true,\n        \"hydra:description\": \"The item that is being reviewed/rated\"\n      }\n    ],\n    \"hydra:supportedOperation\": [\n      {\n        \"@type\": \"hydra:Operation\",\n        \"hydra:method\": \"GET\",\n        \"hydra:title\": \"Retrieves Review resource.\",\n        \"rdfs:label\": \"Retrieves Review resource.\",\n        \"returns\": \"http://schema.org/Review\"\n      },\n      {\n        \"@type\": \"hydra:ReplaceResourceOperation\",\n        \"expects\": \"http://schema.org/Review\",\n        \"hydra:method\": \"PUT\",\n        \"hydra:title\": \"Replaces the Review resource.\",\n        \"rdfs:label\": \"Replaces the Review resource.\",\n        \"returns\": \"http://schema.org/Review\"\n      },\n      {\n        \"@type\": \"hydra:Operation\",\n        \"hydra:method\": \"DELETE\",\n        \"hydra:title\": \"Deletes the Review resource.\",\n        \"rdfs:label\": \"Deletes the Review resource.\",\n        \"returns\": \"owl:Nothing\"\n      }\n    ]\n  },\n  {\n    \"@id\": \"#CustomResource\",\n    \"@type\": \"hydra:Class\",\n    \"rdfs:label\": \"CustomResource\",\n    \"hydra:title\": \"CustomResource\",\n    \"hydra:description\": \"A custom resource.\",\n    \"hydra:supportedProperty\": [\n      {\n        \"@type\": \"hydra:SupportedProperty\",\n        \"hydra:property\": {\n          \"@id\": \"#CustomResource/label\",\n          \"@type\": \"rdf:Property\",\n          \"rdfs:label\": \"label\",\n          \"domain\": \"#CustomResource\",\n          \"range\": \"xmls:string\"\n        },\n        \"hydra:title\": \"label\",\n        \"hydra:required\": true,\n        \"hydra:readable\": true,\n        \"hydra:writeable\": true\n      },\n      {\n        \"@type\": \"hydra:SupportedProperty\",\n        \"hydra:property\": {\n          \"@id\": \"#CustomResource/description\",\n          \"@type\": \"rdf:Property\",\n          \"rdfs:label\": \"description\",\n          \"domain\": \"#CustomResource\",\n          \"range\": \"xmls:string\"\n        },\n        \"hydra:title\": \"description\",\n        \"hydra:required\": true,\n        \"hydra:readable\": true,\n        \"hydra:writeable\": true\n      },\n      {\n        \"@type\": \"hydra:SupportedProperty\",\n        \"hydra:property\": {\n          \"@id\": \"#CustomResource/sanitizedDescription\",\n          \"@type\": \"rdf:Property\",\n          \"rdfs:label\": \"sanitizedDescription\",\n          \"domain\": \"#CustomResource\"\n        },\n        \"hydra:title\": \"sanitizedDescription\",\n        \"hydra:required\": false,\n        \"hydra:readable\": true,\n        \"hydra:writeable\": false\n      }\n    ],\n    \"hydra:supportedOperation\": [\n      {\n        \"@type\": \"hydra:Operation\",\n        \"hydra:method\": \"GET\",\n        \"hydra:title\": \"Retrieves custom resources.\",\n        \"rdfs:label\": \"Retrieves custom resources.\",\n        \"returns\": \"#CustomResource\"\n      },\n      {\n        \"@type\": \"hydra:CreateResourceOperation\",\n        \"expects\": \"#CustomResource\",\n        \"hydra:method\": \"POST\",\n        \"hydra:title\": \"Creates a custom resource.\",\n        \"rdfs:label\": \"Creates a custom resource.\",\n        \"returns\": \"#CustomResource\"\n      }\n    ]\n  },\n  {\n    \"@id\": \"#DeprecatedResource\",\n    \"@type\": \"hydra:Class\",\n    \"rdfs:label\": \"DeprecatedResource\",\n    \"hydra:title\": \"DeprecatedResource\",\n    \"hydra:supportedProperty\": [\n      {\n        \"@type\": \"hydra:SupportedProperty\",\n        \"hydra:property\": {\n          \"@id\": \"#DeprecatedResource/deprecatedField\",\n          \"@type\": \"rdf:Property\",\n          \"rdfs:label\": \"deprecatedField\",\n          \"domain\": \"#DeprecatedResource\",\n          \"range\": \"xmls:string\"\n        },\n        \"hydra:title\": \"deprecatedField\",\n        \"hydra:required\": true,\n        \"hydra:readable\": true,\n        \"hydra:writeable\": true,\n        \"hydra:description\": \"\",\n        \"owl:deprecated\": true\n      }\n    ],\n    \"hydra:supportedOperation\": [\n      {\n        \"@type\": [\n          \"hydra:Operation\",\n          \"schema:FindAction\"\n        ],\n        \"hydra:method\": \"GET\",\n        \"hydra:title\": \"Retrieves DeprecatedResource resource.\",\n        \"owl:deprecated\": true,\n        \"rdfs:label\": \"Retrieves DeprecatedResource resource.\",\n        \"returns\": \"#DeprecatedResource\"\n      }\n    ],\n    \"hydra:description\": \"This is a dummy entity. Remove it!\",\n    \"owl:deprecated\": true\n  },\n  {\n    \"@id\": \"#Entrypoint\",\n    \"@type\": \"hydra:Class\",\n    \"hydra:title\": \"The API entrypoint\",\n    \"hydra:supportedProperty\": [\n      {\n        \"@type\": \"hydra:SupportedProperty\",\n        \"hydra:property\": {\n          \"@id\": \"#Entrypoint/book\",\n          \"@type\": \"hydra:Link\",\n          \"domain\": \"#Entrypoint\",\n          \"rdfs:label\": \"The collection of Book resources\",\n          \"rdfs:range\": [\n            {\"@id\": \"hydra:PagedCollection\"},\n            {\n              \"owl:equivalentClass\": {\n                \"owl:onProperty\": {\"@id\": \"hydra:member\"},\n                \"owl:allValuesFrom\": {\"@id\": \"http://schema.org/Book\"}\n              }\n            }\n          ]\n        },\n        \"hydra:title\": \"The collection of Book resources\",\n        \"hydra:readable\": true,\n        \"hydra:writeable\": false\n      },\n      {\n        \"@type\": \"hydra:SupportedProperty\",\n        \"hydra:property\": {\n          \"@id\": \"#Entrypoint/review\",\n          \"@type\": \"hydra:Link\",\n          \"domain\": \"#Entrypoint\",\n          \"rdfs:label\": \"The collection of Review resources\",\n          \"range\": \"hydra:PagedCollection\",\n          \"hydra:supportedOperation\": [\n            {\n              \"@type\": \"hydra:Operation\",\n              \"hydra:method\": \"GET\",\n              \"hydra:title\": \"Retrieves the collection of Review resources.\",\n              \"rdfs:label\": \"Retrieves the collection of Review resources.\",\n              \"returns\": \"hydra:PagedCollection\"\n            },\n            {\n              \"@type\": \"hydra:CreateResourceOperation\",\n              \"expects\": \"http://schema.org/Review\",\n              \"hydra:method\": \"POST\",\n              \"hydra:title\": \"Creates a Review resource.\",\n              \"rdfs:label\": \"Creates a Review resource.\",\n              \"returns\": \"http://schema.org/Review\"\n            }\n          ]\n        },\n        \"hydra:title\": \"The collection of Review resources\",\n        \"hydra:readable\": true,\n        \"hydra:writeable\": false\n      },\n      {\n        \"@type\": \"hydra:SupportedProperty\",\n        \"hydra:property\": {\n          \"@id\": \"#Entrypoint/customResource\",\n          \"@type\": \"hydra:Link\",\n          \"domain\": \"#Entrypoint\",\n          \"rdfs:label\": \"The collection of custom resources\",\n          \"range\": \"hydra:PagedCollection\",\n          \"hydra:supportedOperation\": [\n            {\n              \"@type\": \"hydra:Operation\",\n              \"hydra:method\": \"GET\",\n              \"hydra:title\": \"Retrieves the collection of custom resources.\",\n              \"rdfs:label\": \"Retrieves the collection of custom resources.\",\n              \"returns\": \"hydra:PagedCollection\"\n            },\n            {\n              \"@type\": \"hydra:CreateResourceOperation\",\n              \"expects\": \"#CustomResource\",\n              \"hydra:method\": \"POST\",\n              \"hydra:title\": \"Creates a custom resource.\",\n              \"rdfs:label\": \"Creates a custom resource.\",\n              \"returns\": \"#CustomResource\"\n            }\n          ]\n        },\n        \"hydra:title\": \"The collection of custom resources\",\n        \"hydra:readable\": true,\n        \"hydra:writeable\": false\n      },\n      {\n        \"@type\": \"hydra:SupportedProperty\",\n        \"hydra:property\": {\n            \"@id\": \"#Entrypoint/deprecatedResource\",\n            \"@type\": \"hydra:Link\",\n            \"domain\": \"#Entrypoint\",\n            \"rdfs:label\": \"The collection of DeprecatedResource resources\",\n            \"rdfs:range\": [\n              {\n                \"@id\": \"hydra:Collection\"\n              },\n              {\n                \"owl:equivalentClass\": {\n                  \"owl:onProperty\": {\n                    \"@id\": \"hydra:member\"\n                  },\n                  \"owl:allValuesFrom\": {\n                    \"@id\": \"#DeprecatedResource\"\n                  }\n                }\n              }\n            ],\n            \"hydra:supportedOperation\": [\n              {\n                \"@type\": [\n                  \"hydra:Operation\",\n                  \"schema:FindAction\"\n                ],\n                \"hydra:method\": \"GET\",\n                \"hydra:title\": \"Retrieves the collection of DeprecatedResource resources.\",\n                \"owl:deprecated\": true,\n                \"rdfs:label\": \"Retrieves the collection of DeprecatedResource resources.\",\n                \"returns\": \"hydra:Collection\"\n              }\n            ]\n        },\n        \"hydra:title\": \"The collection of DeprecatedResource resources\",\n        \"hydra:readable\": true,\n        \"hydra:writeable\": false,\n        \"owl:deprecated\": true\n    }\n    ],\n    \"hydra:supportedOperation\": {\n      \"@type\": \"hydra:Operation\",\n      \"hydra:method\": \"GET\",\n      \"rdfs:label\": \"The API entrypoint.\",\n      \"returns\": \"#EntryPoint\"\n    }\n  },\n  {\n    \"@id\": \"#ConstraintViolation\",\n    \"@type\": \"hydra:Class\",\n    \"hydra:title\": \"A constraint violation\",\n    \"hydra:supportedProperty\": [\n      {\n        \"@type\": \"hydra:SupportedProperty\",\n        \"hydra:property\": {\n          \"@id\": \"#ConstraintViolation/propertyPath\",\n          \"@type\": \"rdf:Property\",\n          \"rdfs:label\": \"propertyPath\",\n          \"domain\": \"#ConstraintViolation\",\n          \"range\": \"xmls:string\"\n        },\n        \"hydra:title\": \"propertyPath\",\n        \"hydra:description\": \"The property path of the violation\",\n        \"hydra:readable\": true,\n        \"hydra:writeable\": false\n      },\n      {\n        \"@type\": \"hydra:SupportedProperty\",\n        \"hydra:property\": {\n          \"@id\": \"#ConstraintViolation/message\",\n          \"@type\": \"rdf:Property\",\n          \"rdfs:label\": \"message\",\n          \"domain\": \"#ConstraintViolation\",\n          \"range\": \"xmls:string\"\n        },\n        \"hydra:title\": \"message\",\n        \"hydra:description\": \"The message associated with the violation\",\n        \"hydra:readable\": true,\n        \"hydra:writeable\": false\n      }\n    ]\n  },\n  {\n    \"@id\": \"#ConstraintViolationList\",\n    \"@type\": \"hydra:Class\",\n    \"subClassOf\": \"hydra:Error\",\n    \"hydra:title\": \"A constraint violation list\",\n    \"hydra:supportedProperty\": [\n      {\n        \"@type\": \"hydra:SupportedProperty\",\n        \"hydra:property\": {\n          \"@id\": \"#ConstraintViolationList/violation\",\n          \"@type\": \"rdf:Property\",\n          \"rdfs:label\": \"violation\",\n          \"domain\": \"#ConstraintViolationList\",\n          \"range\": \"#ConstraintViolation\"\n        },\n        \"hydra:title\": \"violation\",\n        \"hydra:description\": \"The violations\",\n        \"hydra:readable\": true,\n        \"hydra:writeable\": false\n      }\n    ]\n  }\n]\n}";
var resourceCollectionWithParameters = "{\n  \"hydra:search\": {\n    \"hydra:mapping\": [\n      {\n        \"property\": \"isbn\",\n        \"variable\": \"isbn\",\n        \"range\": \"http://www.w3.org/2001/XMLSchema#string\",\n        \"required\": false\n      }\n    ]\n  }\n}";
var book = {
    name: "books",
    url: "http://localhost/books",
    id: "http://schema.org/Book",
    title: "Book",
    fields: [
        {
            name: "isbn",
            id: "http://schema.org/isbn",
            range: "http://www.w3.org/2001/XMLSchema#string",
            reference: null,
            embedded: null,
            required: true,
            description: "The ISBN of the book",
            maxCardinality: null,
            deprecated: false
        },
        {
            name: "name",
            id: "http://schema.org/name",
            range: "http://www.w3.org/2001/XMLSchema#string",
            reference: null,
            embedded: null,
            required: true,
            description: "The name of the item",
            maxCardinality: null,
            deprecated: false
        },
        {
            name: "description",
            id: "http://schema.org/description",
            range: "http://www.w3.org/2001/XMLSchema#string",
            reference: null,
            embedded: null,
            required: false,
            description: "A description of the item",
            maxCardinality: null,
            deprecated: false
        },
        {
            name: "author",
            id: "http://schema.org/author",
            range: "http://www.w3.org/2001/XMLSchema#string",
            reference: null,
            embedded: null,
            required: true,
            description: "The author of this content or rating. Please note that author is special in that HTML 5 provides a special mechanism for indicating authorship via the rel tag. That is equivalent to this and may be used interchangeably",
            maxCardinality: null,
            deprecated: false
        },
        {
            name: "dateCreated",
            id: "http://schema.org/dateCreated",
            range: "http://www.w3.org/2001/XMLSchema#dateTime",
            reference: null,
            embedded: null,
            required: true,
            description: "The date on which the CreativeWork was created or the item was added to a DataFeed",
            maxCardinality: null,
            deprecated: false
        },
        {
            name: "reviews",
            id: "http://schema.org/reviews",
            range: "http://schema.org/Review",
            reference: "Object http://schema.org/Review",
            embedded: null,
            required: false,
            description: "The book's reviews",
            maxCardinality: null,
            deprecated: false
        },
        {
            name: "embeddedReviews",
            id: "http://schema.org/reviews",
            range: "http://schema.org/Review",
            reference: null,
            embedded: "Object http://schema.org/Review",
            required: false,
            description: "The book's reviews",
            maxCardinality: null,
            deprecated: false
        }
    ],
    readableFields: [
        {
            name: "isbn",
            id: "http://schema.org/isbn",
            range: "http://www.w3.org/2001/XMLSchema#string",
            reference: null,
            embedded: null,
            required: true,
            description: "The ISBN of the book",
            maxCardinality: null,
            deprecated: false
        },
        {
            name: "name",
            id: "http://schema.org/name",
            range: "http://www.w3.org/2001/XMLSchema#string",
            reference: null,
            embedded: null,
            required: true,
            description: "The name of the item",
            maxCardinality: null,
            deprecated: false
        },
        {
            name: "description",
            id: "http://schema.org/description",
            range: "http://www.w3.org/2001/XMLSchema#string",
            reference: null,
            embedded: null,
            required: false,
            description: "A description of the item",
            maxCardinality: null,
            deprecated: false
        },
        {
            name: "author",
            id: "http://schema.org/author",
            range: "http://www.w3.org/2001/XMLSchema#string",
            reference: null,
            embedded: null,
            required: true,
            description: "The author of this content or rating. Please note that author is special in that HTML 5 provides a special mechanism for indicating authorship via the rel tag. That is equivalent to this and may be used interchangeably",
            maxCardinality: null,
            deprecated: false
        },
        {
            name: "dateCreated",
            id: "http://schema.org/dateCreated",
            range: "http://www.w3.org/2001/XMLSchema#dateTime",
            reference: null,
            embedded: null,
            required: true,
            description: "The date on which the CreativeWork was created or the item was added to a DataFeed",
            maxCardinality: null,
            deprecated: false
        },
        {
            name: "reviews",
            id: "http://schema.org/reviews",
            range: "http://schema.org/Review",
            reference: "Object http://schema.org/Review",
            embedded: null,
            required: false,
            description: "The book's reviews",
            maxCardinality: null,
            deprecated: false
        },
        {
            name: "embeddedReviews",
            id: "http://schema.org/reviews",
            range: "http://schema.org/Review",
            reference: null,
            embedded: "Object http://schema.org/Review",
            required: false,
            description: "The book's reviews",
            maxCardinality: null,
            deprecated: false
        }
    ],
    writableFields: [
        {
            name: "isbn",
            id: "http://schema.org/isbn",
            range: "http://www.w3.org/2001/XMLSchema#string",
            reference: null,
            embedded: null,
            required: true,
            description: "The ISBN of the book",
            maxCardinality: null,
            deprecated: false
        },
        {
            name: "name",
            id: "http://schema.org/name",
            range: "http://www.w3.org/2001/XMLSchema#string",
            reference: null,
            embedded: null,
            required: true,
            description: "The name of the item",
            maxCardinality: null,
            deprecated: false
        },
        {
            name: "description",
            id: "http://schema.org/description",
            range: "http://www.w3.org/2001/XMLSchema#string",
            reference: null,
            embedded: null,
            required: false,
            description: "A description of the item",
            maxCardinality: null,
            deprecated: false
        },
        {
            name: "author",
            id: "http://schema.org/author",
            range: "http://www.w3.org/2001/XMLSchema#string",
            reference: null,
            embedded: null,
            required: true,
            description: "The author of this content or rating. Please note that author is special in that HTML 5 provides a special mechanism for indicating authorship via the rel tag. That is equivalent to this and may be used interchangeably",
            maxCardinality: null,
            deprecated: false
        },
        {
            name: "dateCreated",
            id: "http://schema.org/dateCreated",
            range: "http://www.w3.org/2001/XMLSchema#dateTime",
            reference: null,
            embedded: null,
            required: true,
            description: "The date on which the CreativeWork was created or the item was added to a DataFeed",
            maxCardinality: null,
            deprecated: false
        },
        {
            name: "reviews",
            id: "http://schema.org/reviews",
            range: "http://schema.org/Review",
            reference: "Object http://schema.org/Review",
            embedded: null,
            required: false,
            description: "The book's reviews",
            maxCardinality: null,
            deprecated: false
        },
        {
            name: "embeddedReviews",
            id: "http://schema.org/reviews",
            range: "http://schema.org/Review",
            reference: null,
            embedded: "Object http://schema.org/Review",
            required: false,
            description: "The book's reviews",
            maxCardinality: null,
            deprecated: false
        }
    ],
    operations: [
        {
            name: "Retrieves Book resource.",
            method: "GET",
            returns: "http://schema.org/Book",
            types: ["http://www.w3.org/ns/hydra/core#Operation"],
            deprecated: false
        },
        {
            name: "Replaces the Book resource.",
            method: "PUT",
            expects: "http://schema.org/Book",
            returns: "http://schema.org/Book",
            types: ["http://www.w3.org/ns/hydra/core#ReplaceResourceOperation"],
            deprecated: false
        },
        {
            name: "Deletes the Book resource.",
            method: "DELETE",
            returns: "http://www.w3.org/2002/07/owl#Nothing",
            types: ["http://www.w3.org/ns/hydra/core#Operation"],
            deprecated: false
        }
    ],
    deprecated: false,
    parameters: []
};
var review = {
    name: "reviews",
    url: "http://localhost/reviews",
    id: "http://schema.org/Review",
    title: "Review",
    fields: [
        {
            name: "reviewBody",
            id: "http://schema.org/reviewBody",
            range: "http://www.w3.org/2001/XMLSchema#string",
            reference: null,
            embedded: null,
            required: false,
            description: "The actual body of the review",
            maxCardinality: null,
            deprecated: false
        },
        {
            name: "rating",
            id: "http://localhost/docs.jsonld#Review/rating",
            range: "http://www.w3.org/2001/XMLSchema#integer",
            reference: null,
            embedded: null,
            required: false,
            description: "",
            maxCardinality: null,
            deprecated: false
        },
        {
            name: "itemReviewed",
            id: "http://schema.org/itemReviewed",
            range: "http://schema.org/Book",
            reference: "Object http://schema.org/Book",
            embedded: null,
            required: true,
            description: "The item that is being reviewed/rated",
            maxCardinality: 1,
            deprecated: false
        }
    ],
    readableFields: [
        {
            name: "reviewBody",
            id: "http://schema.org/reviewBody",
            range: "http://www.w3.org/2001/XMLSchema#string",
            reference: null,
            embedded: null,
            required: false,
            description: "The actual body of the review",
            maxCardinality: null,
            deprecated: false
        },
        {
            name: "rating",
            id: "http://localhost/docs.jsonld#Review/rating",
            range: "http://www.w3.org/2001/XMLSchema#integer",
            reference: null,
            embedded: null,
            required: false,
            description: "",
            maxCardinality: null,
            deprecated: false
        },
        {
            name: "itemReviewed",
            id: "http://schema.org/itemReviewed",
            range: "http://schema.org/Book",
            reference: "Object http://schema.org/Book",
            embedded: null,
            required: true,
            description: "The item that is being reviewed/rated",
            maxCardinality: 1,
            deprecated: false
        }
    ],
    writableFields: [
        {
            name: "reviewBody",
            id: "http://schema.org/reviewBody",
            range: "http://www.w3.org/2001/XMLSchema#string",
            reference: null,
            embedded: null,
            required: false,
            description: "The actual body of the review",
            maxCardinality: null,
            deprecated: false
        },
        {
            name: "rating",
            id: "http://localhost/docs.jsonld#Review/rating",
            range: "http://www.w3.org/2001/XMLSchema#integer",
            reference: null,
            embedded: null,
            required: false,
            description: "",
            maxCardinality: null,
            deprecated: false
        },
        {
            name: "itemReviewed",
            id: "http://schema.org/itemReviewed",
            range: "http://schema.org/Book",
            reference: "Object http://schema.org/Book",
            embedded: null,
            required: true,
            description: "The item that is being reviewed/rated",
            maxCardinality: 1,
            deprecated: false
        }
    ],
    operations: [
        {
            name: "Retrieves the collection of Review resources.",
            method: "GET",
            returns: "http://www.w3.org/ns/hydra/core#PagedCollection",
            types: ["http://www.w3.org/ns/hydra/core#Operation"],
            deprecated: false
        },
        {
            name: "Creates a Review resource.",
            method: "POST",
            expects: "http://schema.org/Review",
            returns: "http://schema.org/Review",
            types: ["http://www.w3.org/ns/hydra/core#CreateResourceOperation"],
            deprecated: false
        },
        {
            name: "Retrieves Review resource.",
            method: "GET",
            returns: "http://schema.org/Review",
            types: ["http://www.w3.org/ns/hydra/core#Operation"],
            deprecated: false
        },
        {
            name: "Replaces the Review resource.",
            method: "PUT",
            expects: "http://schema.org/Review",
            returns: "http://schema.org/Review",
            types: ["http://www.w3.org/ns/hydra/core#ReplaceResourceOperation"],
            deprecated: false
        },
        {
            name: "Deletes the Review resource.",
            method: "DELETE",
            returns: "http://www.w3.org/2002/07/owl#Nothing",
            types: ["http://www.w3.org/ns/hydra/core#Operation"],
            deprecated: false
        }
    ],
    deprecated: false,
    parameters: []
};
var customResource = {
    name: "customResources",
    url: "http://localhost/customResources",
    id: "http://localhost/docs.jsonld#CustomResource",
    title: "CustomResource",
    fields: [
        {
            name: "label",
            id: "http://localhost/docs.jsonld#CustomResource/label",
            range: "http://www.w3.org/2001/XMLSchema#string",
            reference: null,
            embedded: null,
            required: true,
            description: "",
            maxCardinality: null,
            deprecated: false
        },
        {
            name: "description",
            id: "http://localhost/docs.jsonld#CustomResource/description",
            range: "http://www.w3.org/2001/XMLSchema#string",
            reference: null,
            embedded: null,
            required: true,
            description: "",
            maxCardinality: null,
            deprecated: false
        },
        {
            name: "sanitizedDescription",
            id: "http://localhost/docs.jsonld#CustomResource/sanitizedDescription",
            range: null,
            reference: null,
            embedded: null,
            required: false,
            description: "",
            maxCardinality: null,
            deprecated: false
        }
    ],
    readableFields: [
        {
            name: "label",
            id: "http://localhost/docs.jsonld#CustomResource/label",
            range: "http://www.w3.org/2001/XMLSchema#string",
            reference: null,
            embedded: null,
            required: true,
            description: "",
            maxCardinality: null,
            deprecated: false
        },
        {
            name: "description",
            id: "http://localhost/docs.jsonld#CustomResource/description",
            range: "http://www.w3.org/2001/XMLSchema#string",
            reference: null,
            embedded: null,
            required: true,
            description: "",
            maxCardinality: null,
            deprecated: false
        },
        {
            name: "sanitizedDescription",
            id: "http://localhost/docs.jsonld#CustomResource/sanitizedDescription",
            range: null,
            reference: null,
            embedded: null,
            required: false,
            description: "",
            maxCardinality: null,
            deprecated: false
        }
    ],
    writableFields: [
        {
            name: "label",
            id: "http://localhost/docs.jsonld#CustomResource/label",
            range: "http://www.w3.org/2001/XMLSchema#string",
            reference: null,
            embedded: null,
            required: true,
            description: "",
            maxCardinality: null,
            deprecated: false
        },
        {
            name: "description",
            id: "http://localhost/docs.jsonld#CustomResource/description",
            range: "http://www.w3.org/2001/XMLSchema#string",
            reference: null,
            embedded: null,
            required: true,
            description: "",
            maxCardinality: null,
            deprecated: false
        }
    ],
    operations: [
        {
            name: "Retrieves the collection of custom resources.",
            method: "GET",
            returns: "http://www.w3.org/ns/hydra/core#PagedCollection",
            types: ["http://www.w3.org/ns/hydra/core#Operation"],
            deprecated: false
        },
        {
            name: "Creates a custom resource.",
            method: "POST",
            expects: "http://localhost/docs.jsonld#CustomResource",
            returns: "http://localhost/docs.jsonld#CustomResource",
            types: ["http://www.w3.org/ns/hydra/core#CreateResourceOperation"],
            deprecated: false
        },
        {
            name: "Retrieves custom resources.",
            method: "GET",
            returns: "http://localhost/docs.jsonld#CustomResource",
            types: ["http://www.w3.org/ns/hydra/core#Operation"],
            deprecated: false
        },
        {
            name: "Creates a custom resource.",
            method: "POST",
            expects: "http://localhost/docs.jsonld#CustomResource",
            returns: "http://localhost/docs.jsonld#CustomResource",
            types: ["http://www.w3.org/ns/hydra/core#CreateResourceOperation"],
            deprecated: false
        }
    ],
    deprecated: false,
    parameters: []
};
var deprecatedResource = {
    name: "deprecated_resources",
    url: "http://localhost/deprecated_resources",
    id: "http://localhost/docs.jsonld#DeprecatedResource",
    title: "DeprecatedResource",
    fields: [
        {
            name: "deprecatedField",
            id: "http://localhost/docs.jsonld#DeprecatedResource/deprecatedField",
            range: "http://www.w3.org/2001/XMLSchema#string",
            reference: null,
            embedded: null,
            required: true,
            description: "",
            maxCardinality: null,
            deprecated: true
        }
    ],
    readableFields: [
        {
            name: "deprecatedField",
            id: "http://localhost/docs.jsonld#DeprecatedResource/deprecatedField",
            range: "http://www.w3.org/2001/XMLSchema#string",
            reference: null,
            embedded: null,
            required: true,
            description: "",
            maxCardinality: null,
            deprecated: true
        }
    ],
    writableFields: [
        {
            name: "deprecatedField",
            id: "http://localhost/docs.jsonld#DeprecatedResource/deprecatedField",
            range: "http://www.w3.org/2001/XMLSchema#string",
            reference: null,
            embedded: null,
            required: true,
            description: "",
            maxCardinality: null,
            deprecated: true
        }
    ],
    operations: [
        {
            name: "Retrieves the collection of DeprecatedResource resources.",
            method: "GET",
            returns: "http://www.w3.org/ns/hydra/core#Collection",
            types: ["http://www.w3.org/ns/hydra/core#Operation", "schema:FindAction"],
            deprecated: true
        },
        {
            name: "Retrieves DeprecatedResource resource.",
            method: "GET",
            returns: "http://localhost/docs.jsonld#DeprecatedResource",
            types: ["http://www.w3.org/ns/hydra/core#Operation", "schema:FindAction"],
            deprecated: true
        }
    ],
    deprecated: true,
    parameters: []
};
var resources = [book, review, customResource, deprecatedResource];
var expectedApi = {
    entrypoint: "http://localhost",
    title: "API Platform's demo",
    resources: resources
};
var init = {
    status: 200,
    statusText: "OK",
    headers: {
        Link: '<http://localhost/docs.jsonld>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation"',
        "Content-Type": "application/ld+json"
    }
};
var apiJsonReplacer = function (key, value) {
    if (["reference", "embedded"].includes(key) &&
        typeof value === "object" &&
        value !== null) {
        return "Object " + value.id;
    }
    return value;
};
test("parse a Hydra documentation", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var options;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fetchMock.mockResponses([entrypoint, init], [docs, init]);
                options = { headers: new Headers({ CustomHeader: "customValue" }) };
                return [4 /*yield*/, parseHydraDocumentation_1.default("http://localhost", options).then(function (data) {
                        expect(JSON.stringify(data.api, apiJsonReplacer, 2)).toBe(JSON.stringify(expectedApi, null, 2));
                        expect(data.response).toBeDefined();
                        expect(data.status).toBe(200);
                        expect(fetch).toHaveBeenCalledTimes(2);
                        expect(fetch).toHaveBeenNthCalledWith(2, "http://localhost/docs.jsonld", options);
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
test("parse a Hydra documentation (http://localhost/)", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fetchMock.mockResponses([entrypoint, init], [docs, init]);
                return [4 /*yield*/, parseHydraDocumentation_1.default("http://localhost/").then(function (data) {
                        expect(JSON.stringify(data.api, apiJsonReplacer, 2)).toBe(JSON.stringify(expectedApi, null, 2));
                        expect(data.response).toBeDefined();
                        expect(data.status).toBe(200);
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
test("parse a Hydra documentation without authorization", function () {
    var init = {
        status: 401,
        statusText: "Unauthorized"
    };
    var expectedApi = {
        entrypoint: "http://localhost",
        resources: []
    };
    var expectedResponse = {
        code: 401,
        message: "JWT Token not found"
    };
    fetchMock.mockResponses([JSON.stringify(expectedResponse), init]);
    return parseHydraDocumentation_1.default("http://localhost").catch(function (data) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    expect(data.api).toEqual(expectedApi);
                    expect(data.response).toBeDefined();
                    return [4 /*yield*/, expect(data.response.json()).resolves.toEqual(expectedResponse)];
                case 1:
                    _a.sent();
                    expect(data.status).toBe(401);
                    return [2 /*return*/];
            }
        });
    }); });
});
test('Parse entrypoint without "@type" key', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var entrypoint, expectedError, error_1;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                entrypoint = "{\n  \"@context\": {\n    \"@vocab\": \"http://localhost/docs.jsonld#\",\n    \"hydra\": \"http://www.w3.org/ns/hydra/core#\",\n    \"book\": {\n      \"@id\": \"Entrypoint/book\",\n      \"@type\": \"@id\"\n    },\n    \"review\": {\n      \"@id\": \"Entrypoint/review\",\n      \"@type\": \"@id\"\n    },\n    \"customResource\": {\n      \"@id\": \"Entrypoint/customResource\",\n      \"@type\": \"@id\"\n    }\n  },\n  \"@id\": \"/\",\n  \"book\": \"/books\",\n  \"review\": \"/reviews\",\n  \"customResource\": \"/customResources\"\n}";
                fetchMock.mockResponses([entrypoint, init], [docs, init]);
                expectedError = { message: "" };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, parseHydraDocumentation_1.default("http://localhost/")];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                expectedError.message = error_1.message;
                return [3 /*break*/, 4];
            case 4:
                expect(expectedError.message).toBe('The API entrypoint has no "@type" key.');
                return [2 /*return*/];
        }
    });
}); });
test('Parse entrypoint class without "supportedClass" key', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var docs, expectedError, error_2;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                docs = "{\n\"@context\": {\n  \"@vocab\": \"http://localhost/docs.jsonld#\",\n  \"hydra\": \"http://www.w3.org/ns/hydra/core#\",\n  \"rdf\": \"http://www.w3.org/1999/02/22-rdf-syntax-ns#\",\n  \"rdfs\": \"http://www.w3.org/2000/01/rdf-schema#\",\n  \"xmls\": \"http://www.w3.org/2001/XMLSchema#\",\n  \"owl\": \"http://www.w3.org/2002/07/owl#\",\n  \"domain\": {\n    \"@id\": \"rdfs:domain\",\n    \"@type\": \"@id\"\n  },\n  \"range\": {\n    \"@id\": \"rdfs:range\",\n    \"@type\": \"@id\"\n  },\n  \"subClassOf\": {\n    \"@id\": \"rdfs:subClassOf\",\n    \"@type\": \"@id\"\n  },\n  \"expects\": {\n    \"@id\": \"hydra:expects\",\n    \"@type\": \"@id\"\n  },\n  \"returns\": {\n    \"@id\": \"hydra:returns\",\n    \"@type\": \"@id\"\n  }\n},\n\"@id\": \"/docs.jsonld\",\n\"hydra:title\": \"API Platform's demo\",\n\"hydra:description\": \"A test\",\n\"hydra:entrypoint\": \"/\"\n}";
                fetchMock.mockResponses([entrypoint, init], [docs, init]);
                expectedError = { message: "" };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, parseHydraDocumentation_1.default("http://localhost/")];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                expectedError.message = error_2.message;
                return [3 /*break*/, 4];
            case 4:
                expect(expectedError.message).toBe('The API documentation has no "http://www.w3.org/ns/hydra/core#supportedClass" key or its value is not an array.');
                return [2 /*return*/];
        }
    });
}); });
test('Parse entrypoint class without "supportedProperty" key', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var docs, expectedError, error_3;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                docs = "{\n\"@context\": {\n  \"@vocab\": \"http://localhost/docs.jsonld#\",\n  \"hydra\": \"http://www.w3.org/ns/hydra/core#\",\n  \"rdf\": \"http://www.w3.org/1999/02/22-rdf-syntax-ns#\",\n  \"rdfs\": \"http://www.w3.org/2000/01/rdf-schema#\",\n  \"xmls\": \"http://www.w3.org/2001/XMLSchema#\",\n  \"owl\": \"http://www.w3.org/2002/07/owl#\",\n  \"domain\": {\n    \"@id\": \"rdfs:domain\",\n    \"@type\": \"@id\"\n  },\n  \"range\": {\n    \"@id\": \"rdfs:range\",\n    \"@type\": \"@id\"\n  },\n  \"subClassOf\": {\n    \"@id\": \"rdfs:subClassOf\",\n    \"@type\": \"@id\"\n  },\n  \"expects\": {\n    \"@id\": \"hydra:expects\",\n    \"@type\": \"@id\"\n  },\n  \"returns\": {\n    \"@id\": \"hydra:returns\",\n    \"@type\": \"@id\"\n  }\n},\n\"@id\": \"/docs.jsonld\",\n\"hydra:title\": \"API Platform's demo\",\n\"hydra:description\": \"A test\",\n\"hydra:entrypoint\": \"/\",\n\"hydra:supportedClass\": [\n  {\n    \"@id\": \"#Entrypoint\",\n    \"@type\": \"hydra:Class\",\n    \"hydra:title\": \"The API entrypoint\",\n    \"hydra:supportedOperation\": {\n      \"@type\": \"hydra:Operation\",\n      \"hydra:method\": \"GET\",\n      \"rdfs:label\": \"The API entrypoint.\",\n      \"returns\": \"#EntryPoint\"\n    }\n  }\n]\n}";
                fetchMock.mockResponses([entrypoint, init], [docs, init]);
                expectedError = { message: "" };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, parseHydraDocumentation_1.default("http://localhost/")];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                expectedError.message = error_3.message;
                return [3 /*break*/, 4];
            case 4:
                expect(expectedError.message).toBe('The entrypoint definition has no "http://www.w3.org/ns/hydra/core#supportedProperty" key or it is not an array.');
                return [2 /*return*/];
        }
    });
}); });
test("Invalid docs JSON", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var docs, expectedError, error_4;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                docs = "{foo,}";
                fetchMock.mockResponses([entrypoint, init], [docs, init]);
                expectedError = {};
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, parseHydraDocumentation_1.default("http://localhost/")];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                expectedError = error_4;
                return [3 /*break*/, 4];
            case 4:
                expect(expectedError).toHaveProperty("api");
                expect(expectedError).toHaveProperty("response");
                expect(expectedError).toHaveProperty("status");
                return [2 /*return*/];
        }
    });
}); });
test("Invalid entrypoint JSON", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var entrypoint, expectedError, error_5;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                entrypoint = "{foo,}";
                fetchMock.mockResponses([entrypoint, init]);
                expectedError = {};
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, parseHydraDocumentation_1.default("http://localhost/")];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_5 = _a.sent();
                expectedError = error_5;
                return [3 /*break*/, 4];
            case 4:
                expect(expectedError).toHaveProperty("api");
                expect(expectedError).toHaveProperty("response");
                expect(expectedError).toHaveProperty("status");
                return [2 /*return*/];
        }
    });
}); });
test("Resource parameters can be retrieved", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fetchMock.mockResponses([entrypoint, init], [docs, init], [resourceCollectionWithParameters, init]);
                return [4 /*yield*/, parseHydraDocumentation_1.default("http://localhost").then(function (data) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, data.api.resources[0].getParameters().then(function (parameters) {
                                        expect(parameters).toEqual([
                                            {
                                                description: "",
                                                range: "http://www.w3.org/2001/XMLSchema#string",
                                                required: false,
                                                variable: "isbn"
                                            }
                                        ]);
                                    })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=parseHydraDocumentation.test.js.map