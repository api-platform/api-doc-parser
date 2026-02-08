import { http } from "msw/core/http";
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
      Response.json(httpResponse, {
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

test("fetch a non JSON-LD document with 2xx returns empty response", async () => {
  server.use(
    http.get(
      "http://localhost/foo.jsonld",
      () =>
        new Response(`<body>Hello</body>`, {
          headers: { "Content-Type": "text/html" },
          status: 200,
          statusText: "OK",
        }),
    ),
  );

  const data = await fetchJsonLd("http://localhost/foo.jsonld");
  expect(data.response.ok).toBe(true);
  expect(data).not.toHaveProperty("body");
});

test("fetch a non JSON-LD document with non-2xx rejects", async () => {
  server.use(
    http.get(
      "http://localhost/foo.jsonld",
      () =>
        new Response(`<body>Not Found</body>`, {
          headers: { "Content-Type": "text/html" },
          status: 404,
          statusText: "Not Found",
        }),
    ),
  );

  const promise = fetchJsonLd("http://localhost/foo.jsonld");

  await expect(promise).rejects.toHaveProperty("response.ok", false);
  await expect(promise).rejects.not.toHaveProperty("body");
});

test("fetch a 202 Accepted with non JSON-LD content type returns empty response", async () => {
  server.use(
    http.post(
      "http://localhost/foo.jsonld",
      () =>
        new Response(null, {
          status: 202,
          statusText: "Accepted",
        }),
    ),
  );

  const data = await fetchJsonLd("http://localhost/foo.jsonld", {
    method: "POST",
  });
  expect(data.response.ok).toBe(true);
  expect(data.response.status).toBe(202);
  expect(data).not.toHaveProperty("body");
});

test("fetch a 202 Accepted with JSON-LD content type parses body", async () => {
  server.use(
    http.post("http://localhost/foo.jsonld", () =>
      Response.json(httpResponse, {
        headers: { "Content-Type": "application/ld+json" },
        status: 202,
        statusText: "Accepted",
      }),
    ),
  );

  const data = await fetchJsonLd("http://localhost/foo.jsonld", {
    method: "POST",
  });
  expect(data.response.ok).toBe(true);
  expect(data.response.status).toBe(202);
  assert("body" in data, "Response should have a body property");
  assert(data.body !== null, "Body should not be null");
  assert("name" in data.body, "Body should have a name property");
  expect(data.body["name"]).toBe("John Lennon");
});

test("fetch an error with Content-Type application/ld+json", async () => {
  server.use(
    http.get("http://localhost/foo.jsonld", () =>
      Response.json(httpResponse, {
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
      Response.json(httpResponse, {
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
        new Response(null, {
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
