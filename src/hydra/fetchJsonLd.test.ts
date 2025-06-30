import { http, HttpResponse } from "msw";
import { assert, expect, test } from "vitest";
import { server } from "../../vitest.setup.js";
import fetchJsonLd from "./fetchJsonLd.js";

const httpResponse = {
  "@context": "http://json-ld.org/contexts/person.jsonld",
  "@id": "http://dbpedia.org/resource/John_Lennon",
  name: "John Lennon",
  born: "1940-10-09",
  spouse: "http://dbpedia.org/resource/Cynthia_Lennon",
};

test("fetch a JSON-LD document", async () => {
  server.use(
    http.get("http://localhost/foo.jsonld", () =>
      HttpResponse.json(httpResponse, {
        headers: { "Content-Type": "application/ld+json" },
        status: 200,
        statusText: "OK",
      }),
    ),
  );

  const data = await fetchJsonLd("http://localhost/foo.jsonld");
  expect(data.response.ok).toBe(true);

  assert("body" in data, "Response should have a body property");
  assert(data.body !== null, "Body should not be null");
  assert("name" in data.body, "Body should have a name property");
  expect(data.body["name"]).toBe("John Lennon");
});

test("fetch a non JSON-LD document", async () => {
  server.use(
    http.get(
      "http://localhost/foo.jsonld",
      () =>
        new HttpResponse(`<body>Hello</body>`, {
          headers: { "Content-Type": "text/html" },
          status: 200,
          statusText: "OK",
        }),
    ),
  );

  const promise = fetchJsonLd("http://localhost/foo.jsonld");

  await expect(promise).rejects.toHaveProperty("response.ok", true);
  await expect(promise).rejects.not.toHaveProperty("body");
});

test("fetch an error with Content-Type application/ld+json", async () => {
  server.use(
    http.get("http://localhost/foo.jsonld", () =>
      HttpResponse.json(httpResponse, {
        status: 500,
        statusText: "Internal Server Error",
        headers: { "Content-Type": "application/ld+json" },
      }),
    ),
  );

  const rejectedResponse = await fetchJsonLd(
    "http://localhost/foo.jsonld",
  ).catch((error) => error as { response: Response });

  await expect(rejectedResponse).toHaveProperty("response.ok", false);
  await expect(rejectedResponse.response.json()).resolves.toHaveProperty(
    "born",
    "1940-10-09",
  );
});

test("fetch an error with Content-Type application/error+json", async () => {
  server.use(
    http.get("http://localhost/foo.jsonld", () =>
      HttpResponse.json(httpResponse, {
        status: 400,
        statusText: "Bad Request",
        headers: { "Content-Type": "application/error+json" },
      }),
    ),
  );

  const rejectedResponse = await fetchJsonLd(
    "http://localhost/foo.jsonld",
  ).catch((error) => error as { response: Response });

  await expect(rejectedResponse).toHaveProperty("response.ok", false);
  await expect(rejectedResponse.response.json()).resolves.toHaveProperty(
    "born",
    "1940-10-09",
  );
});

test("fetch an empty document", async () => {
  server.use(
    http.get(
      "http://localhost/foo.jsonld",
      () =>
        new HttpResponse(``, {
          status: 204,
          statusText: "No Content",
          headers: { "Content-Type": "text/html" },
        }),
    ),
  );

  const dataPromise = fetchJsonLd("http://localhost/foo.jsonld");

  await expect(dataPromise).resolves.toHaveProperty("response.ok", true);
  await expect(dataPromise).resolves.not.toHaveProperty("body");
});
