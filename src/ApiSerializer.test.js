import Api from "./Api";
import ApiSerializer from "./ApiSerializer";
import Resource from "./Resource";
import Field from "./Field";
import Operation from "./Operation";
import Parameter from "./Parameter";

test("can serialize and deserialize Api", () => {
  const book = new Resource("Books", "http://localhost/books", {
    id: "http://schema.org/Book",
    title: "Book",
    readableFields: [
      new Field("isbn", {
        id: "http://schema.org/isbn",
        range: "http://www.w3.org/2001/XMLSchema#string",
        reference: null,
        required: true,
        description: "The ISBN of the book",
        maxCardinality: null,
        deprecated: false
      }),
      new Field("name", {
        id: "http://schema.org/name",
        range: "http://www.w3.org/2001/XMLSchema#string",
        reference: null,
        required: true,
        description: "The name of the item",
        maxCardinality: null,
        deprecated: false
      })
    ],
    writableFields: [
      new Field("isbn", {
        id: "http://schema.org/isbn",
        range: "http://www.w3.org/2001/XMLSchema#string",
        reference: null,
        required: true,
        description: "The ISBN of the book",
        maxCardinality: null,
        deprecated: false
      }),
      new Field("name", {
        id: "http://schema.org/name",
        range: "http://www.w3.org/2001/XMLSchema#string",
        reference: null,
        required: true,
        description: "The name of the item",
        maxCardinality: null,
        deprecated: false
      })
    ],
    operations: [
      new Operation("Retrieves Book resource.", {
        method: "GET",
        returns: "http://schema.org/Book",
        types: ["http://www.w3.org/ns/hydra/core#Operation"],
        deprecated: false
      }),
      new Operation("Replaces the Book resource.", {
        method: "PUT",
        expects: "http://schema.org/Book",
        returns: "http://schema.org/Book",
        types: ["http://www.w3.org/ns/hydra/core#ReplaceResourceOperation"],
        deprecated: false
      }),
      new Operation("Deletes the Book resource.", {
        method: "DELETE",
        returns: "http://www.w3.org/2002/07/owl#Nothing",
        types: ["http://www.w3.org/ns/hydra/core#Operation"],
        deprecated: false
      })
    ],
    parameters: [
      new Parameter(
        "isbn",
        "http://www.w3.org/2001/XMLSchema#string",
        false,
        ""
      )
    ]
  });

  const review = new Resource("Reviews", "http://localhost/reviews", {
    id: "http://schema.org/Review",
    title: "Book",
    readableFields: [
      new Field("reviewBody", {
        id: "http://schema.org/reviewBody",
        range: "http://www.w3.org/2001/XMLSchema#string",
        reference: null,
        required: false,
        description: "The actual body of the review",
        maxCardinality: null,
        deprecated: false
      }),
      new Field("itemReviewed", {
        id: "http://schema.org/itemReviewed",
        range: "http://schema.org/Book",
        reference: book,
        required: true,
        description: "The name of the item",
        maxCardinality: null,
        deprecated: false
      })
    ],
    writableFields: [
      new Field("reviewBody", {
        id: "http://schema.org/reviewBody",
        range: "http://www.w3.org/2001/XMLSchema#string",
        reference: null,
        required: true,
        description: "The actual body of the review",
        maxCardinality: null,
        deprecated: false
      }),
      new Field("itemReviewed", {
        id: "http://schema.org/itemReviewed",
        range: "http://schema.org/Book",
        reference: book,
        required: true,
        description: "The item that is being reviewed/rated",
        maxCardinality: null,
        deprecated: false
      })
    ]
  });

  const api = new Api("http://localhost", {
    title: "API Platform's demo",
    resources: [book, review]
  });

  const serializer = new ApiSerializer();
  const serialized = serializer.serialize(api);

  // verify that the serialized and stringified versions don't differ
  // this ensures that the serializer does not return stuff that cannot be
  // expressed in json-string notation properly
  expect(JSON.parse(JSON.stringify(serialized))).toEqual(serialized);

  const deserialized = serializer.deserialize(serialized);

  expect(deserialized).toEqual(api);
});
