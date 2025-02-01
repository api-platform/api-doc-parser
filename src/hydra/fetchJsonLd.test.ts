import fetchJsonLd from "./fetchJsonLd.js";
import type { FetchMock } from "jest-fetch-mock";
import type { ResponseDocument } from "./fetchJsonLd.js";

const fetchMock = fetch as FetchMock;

test("fetch a JSON-LD document", () => {
  fetchMock.mockResponseOnce(
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
      headers: { "Content-Type": "application/ld+json" },
    },
  );

  return fetchJsonLd("/foo.jsonld").then((data) => {
    expect(data.response.ok).toBe(true);
    expect(((data as ResponseDocument).body as { name: string }).name).toBe(
      "John Lennon",
    );
  });
});

test("fetch a non JSON-LD document", () => {
  fetchMock.mockResponseOnce(`<body>Hello</body>`, {
    status: 200,
    statusText: "OK",
    headers: { "Content-Type": "text/html" },
  });

  return fetchJsonLd("/foo.jsonld").catch(
    (data: { response: Response; body: undefined }) => {
      expect(data.response.ok).toBe(true);
      expect(typeof data.body).toBe("undefined");
    },
  );
});

test("fetch an error with Content-Type application/ld+json", () => {
  fetchMock.mockResponseOnce(
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
      headers: { "Content-Type": "application/ld+json" },
    },
  );

  return fetchJsonLd("/foo.jsonld").catch(
    ({ response }: { response: Response }) => {
      void response.json().then((body: { born: string }) => {
        expect(response.ok).toBe(false);
        expect(body.born).toBe("1940-10-09");
      });
    },
  );
});

test("fetch an error with Content-Type application/error+json", () => {
  fetchMock.mockResponseOnce(
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
      headers: { "Content-Type": "application/error+json" },
    },
  );

  return fetchJsonLd("/foo.jsonld").catch(
    ({ response }: { response: Response }) => {
      void response.json().then((body: { born: string }) => {
        expect(response.ok).toBe(false);
        expect(body.born).toBe("1940-10-09");
      });
    },
  );
});

test("fetch an empty document", () => {
  fetchMock.mockResponseOnce("", {
    status: 204,
    statusText: "No Content",
    headers: { "Content-Type": "text/html" },
  });

  return fetchJsonLd("/foo.jsonld").then((data) => {
    expect(data.response.ok).toBe(true);
    expect((data as ResponseDocument).body).toBe(undefined);
  });
});
