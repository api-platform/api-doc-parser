import { http } from "msw/core/http";
import { expect, test } from "vitest";
import { server } from "../../vitest.setup.js";
import { Field, Resource } from "../core/index.js";
import getParameters from "./getParameters.js";

const init = {
  headers: { "Content-Type": "application/ld+json" },
  status: 200,
  statusText: "OK",
};

const resourceCollectionWithParameters = {
  "hydra:search": {
    "hydra:mapping": [
      {
        property: "isbn",
        variable: "isbn",
        required: false,
      },
    ],
  },
};

function createResource(): Resource {
  return new Resource("books", "http://localhost/books", {
    fields: [
      new Field("isbn", {
        range: "http://www.w3.org/2001/XMLSchema#string",
      }),
    ],
  });
}

test("Resource parameters are cached and concurrent requests are deduplicated", async () => {
  let discoveryRequests = 0;
  server.use(
    http.get("http://localhost/books", () => {
      discoveryRequests += 1;
      return Response.json(resourceCollectionWithParameters, init);
    }),
  );
  const resource = createResource();

  const firstRequest = getParameters(resource);
  const concurrentRequest = getParameters(resource);

  expect(concurrentRequest).toBe(firstRequest);

  const parameters = await firstRequest;
  const cachedParameters = await getParameters(resource);

  expect(cachedParameters).toBe(parameters);
  expect(resource.parameters).toBe(parameters);
  expect(discoveryRequests).toBe(1);
  expect(parameters).toEqual([
    {
      description: "",
      range: "http://www.w3.org/2001/XMLSchema#string",
      required: false,
      variable: "isbn",
    },
  ]);
});

test("Empty resource parameters are cached", async () => {
  let discoveryRequests = 0;
  server.use(
    http.get("http://localhost/books", () => {
      discoveryRequests += 1;
      return Response.json({}, init);
    }),
  );
  const resource = createResource();

  const parameters = await getParameters(resource);
  const cachedParameters = await getParameters(resource);

  expect(parameters).toEqual([]);
  expect(cachedParameters).toBe(parameters);
  expect(discoveryRequests).toBe(1);
});

test("Resource parameters can be retried after a failed request", async () => {
  let attempts = 0;
  server.use(
    http.get("http://localhost/books", () => {
      attempts += 1;
      return new Response(null, { status: 500 });
    }),
  );
  const resource = createResource();

  await expect(getParameters(resource)).rejects.toBeDefined();

  server.use(
    http.get("http://localhost/books", () => {
      attempts += 1;
      return Response.json(resourceCollectionWithParameters, init);
    }),
  );

  await expect(getParameters(resource)).resolves.toEqual([
    {
      description: "",
      range: "http://www.w3.org/2001/XMLSchema#string",
      required: false,
      variable: "isbn",
    },
  ]);
  expect(attempts).toBe(2);
});

test("Parameter caches are isolated between Resource instances", async () => {
  let discoveryRequests = 0;
  server.use(
    http.get("http://localhost/books", () => {
      discoveryRequests += 1;
      return Response.json(resourceCollectionWithParameters, init);
    }),
  );
  const firstResource = createResource();
  const secondResource = createResource();

  expect(firstResource.url).toBe(secondResource.url);

  await getParameters(firstResource);
  await getParameters(firstResource);
  await getParameters(secondResource);

  expect(discoveryRequests).toBe(2);
});
