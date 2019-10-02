import fetchJsonLd from "./fetchJsonLd";

test("fetch a JSON-LD document", () => {
  fetch.mockResponseOnce(
    `{
    "@context": "http://json-ld.org/contexts/person.jsonld",
    "@id": "http://dbpedia.org/resource/John_Lennon",
    "name": "John Lennon",
    "born": "1940-10-09",
    "spouse": "http://dbpedia.org/resource/Cynthia_Lennon"
}`,
    {
      status: 200,
      statusText: "OK",
      headers: new Headers({ "Content-Type": "application/ld+json" })
    }
  );

  return fetchJsonLd("/foo.jsonld").then(data => {
    expect(data.response.ok).toBe(true);
    expect(data.body.name).toBe("John Lennon");
  });
});

test("fetch a non JSON-LD document", () => {
  fetch.mockResponseOnce(`<body>Hello</body>`, {
    status: 200,
    statusText: "OK",
    headers: new Headers({ "Content-Type": "text/html" })
  });

  return fetchJsonLd("/foo.jsonld").catch(data => {
    expect(data.response.ok).toBe(true);
    expect(typeof data.body).toBe("undefined");
  });
});

test("fetch an error", () => {
  fetch.mockResponseOnce(
    `{
    "@context": "http://json-ld.org/contexts/person.jsonld",
    "@id": "http://dbpedia.org/resource/John_Lennon",
    "name": "John Lennon",
    "born": "1940-10-09",
    "spouse": "http://dbpedia.org/resource/Cynthia_Lennon"
}`,
    {
      status: 400,
      statusText: "Bad Request",
      headers: new Headers({ "Content-Type": "application/ld+json" })
    }
  );

  return fetchJsonLd("/foo.jsonld").catch(({ response }) => {
    response.json().then(body => {
      expect(response.ok).toBe(false);
      expect(body.born).toBe("1940-10-09");
    });
  });
});

test("fetch an empty document", () => {
  fetch.mockResponseOnce("", {
    status: 204,
    statusText: "No Content",
    headers: new Headers({ "Content-Type": "text/html" })
  });

  return fetchJsonLd("/foo.jsonld").then(data => {
    expect(data.response.ok).toBe(true);
    expect(data.body).toBe(undefined);
  });
});
