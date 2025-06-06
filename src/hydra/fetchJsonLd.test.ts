import { http, HttpResponse } from "msw";
import { server } from "../../vitest.setup.js";
import fetchJsonLd from "./fetchJsonLd.js";
import { assert, expect, test } from "vitest";

test("fetch a JSON-LD document", async () => {
  server.use(
    http.get("http://localhost/foo.jsonld", () =>
      HttpResponse.json(
        {
          "@context": "http://json-ld.org/contexts/person.jsonld",
          "@id": "http://dbpedia.org/resource/John_Lennon",
          name: "John Lennon",
          born: "1940-10-09",
          spouse: "http://dbpedia.org/resource/Cynthia_Lennon",
        },
        {
          headers: { "Content-Type": "application/ld+json" },
          status: 200,
          statusText: "OK",
        },
      ),
    ),
  );
  try {
    const data = await fetchJsonLd("http://localhost/foo.jsonld");
    expect(data.response.ok).toBe(true);
    expect(data).toHaveProperty("body");
    assert(
      "body" in data && "name" in data.body,
      "Response should contain a body with a name property",
    );
    expect(data.body["name"]).toBe("John Lennon");
  } catch {
    assert.fail("Should not have thrown an error");
  }
});

test("fetch a non JSON-LD document", async () => {
  server.use(
    http.get("http://localhost/foo.jsonld", () => {
      return new HttpResponse(`<body>Hello</body>`, {
        headers: { "Content-Type": "text/html" },
        status: 200,
        statusText: "OK",
      });
    }),
  );

  try {
    await fetchJsonLd("http://localhost/foo.jsonld");
    assert.fail("Should have thrown an error");
  } catch (error) {
    const data = error as unknown as { response: Response; body: undefined };
    expect(data.response.ok).toBe(true);
    expect(typeof data.body).toBe("undefined");
  }
});

test("fetch an error with Content-Type application/ld+json", () => {
  server.use(
    http.get("http://localhost/foo.jsonld", () => {
      return HttpResponse.json(
        {
          "@context": "http://json-ld.org/contexts/person.jsonld",
          "@id": "http://dbpedia.org/resource/John_Lennon",
          name: "John Lennon",
          born: "1940-10-09",
          spouse: "http://dbpedia.org/resource/Cynthia_Lennon",
        },
        {
          status: 400,
          statusText: "Bad Request",
          headers: { "Content-Type": "application/ld+json" },
        },
      );
    }),
  );

  return fetchJsonLd("http://localhost/foo.jsonld").catch(
    ({ response }: { response: Response }) => {
      response
        .json()
        .then((body: { born: string }) => {
          expect(response.ok).toBe(false);
          expect(body.born).toBe("1940-10-09");
        })
        .catch(() => {
          assert.fail("Response should have been JSON parsable");
        });
    },
  );
});

test("fetch an error with Content-Type application/error+json", async () => {
  server.use(
    http.get("http://localhost/foo.jsonld", () => {
      return HttpResponse.json(
        {
          "@context": "http://json-ld.org/contexts/person.jsonld",
          "@id": "http://dbpedia.org/resource/John_Lennon",
          name: "John Lennon",
          born: "1940-10-09",
          spouse: "http://dbpedia.org/resource/Cynthia_Lennon",
        },
        {
          status: 400,
          statusText: "Bad Request",
          headers: { "Content-Type": "application/error+json" },
        },
      );
    }),
  );

  try {
    await fetchJsonLd("http://localhost/foo.jsonld");
    assert.fail("Should have thrown an error");
  } catch (error) {
    const data = error as unknown as { response: Response };
    const body = await data.response.json();
    expect(data.response.ok).toBe(false);
    expect(body.born).toBe("1940-10-09");
  }
});

test("fetch an empty document", async () => {
  server.use(
    http.get("http://localhost/foo.jsonld", () => {
      return new HttpResponse(``, {
        status: 204,
        statusText: "No Content",
        headers: { "Content-Type": "text/html" },
      });
    }),
  );
  try {
    const data = await fetchJsonLd("http://localhost/foo.jsonld");
    expect(data.response.ok).toBe(true);
    expect(data).not.toHaveProperty("body");
  } catch {
    assert.fail("Should not have thrown an error");
  }
});
