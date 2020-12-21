import get from "lodash.get";
import { OpenAPIV3 } from "openapi-types";
import { Field } from "../Field";
import { Resource } from "../Resource";
import { getResources } from "../utils/getResources";
import jsonRefs, { ResolvedRefsResults } from "json-refs";

export const removeTrailingSlash = (url: string): string => {
  if (url.endsWith("/")) {
    url = url.slice(0, -1);
  }
  return url;
};

/* Assumptions:
  RESTful APIs typically have two paths per resources -  a `/noun` path and a 
  `/noun/{id}` path. `getResources` strips out the latter, allowing us to focus
  on the former.

  In OpenAPI3, the `/noun` path will typically have a `get` action, that 
  probably accepts parameters and would respond with a array of objects, 
  described in the `items` field.
*/

export default async function (
  response: OpenAPIV3.Document,
  entrypointUrl: string
): Promise<Resource[]> {
  const results: ResolvedRefsResults = await jsonRefs.resolveRefs(response);
  const document: OpenAPIV3.Document = results.resolved as OpenAPIV3.Document;

  const paths = getResources(document.paths);

  let serverUrlOrRelative = "/";
  if (document.servers) {
    serverUrlOrRelative = document.servers[0].url;
  }

  const serverUrl = new URL(serverUrlOrRelative, entrypointUrl).href;

  const resources: Resource[] = [];

  paths.forEach((item) => {
    const name = item.replace(`/`, ``);
    const url = removeTrailingSlash(serverUrl) + item;

    const method = document.paths[item].get as OpenAPIV3.OperationObject;

    if (!method) return;

    const schema = get(
      method,
      "responses.200.content.application/json.schema"
    ) as OpenAPIV3.ArraySchemaObject;

    if (!schema) return;

    const items = schema.items as OpenAPIV3.ArraySchemaObject;

    const properties = items.properties;

    if (!properties) {
      throw new Error(); // @TODO
    }

    const fieldNames = Object.keys(properties);
    const requiredFields = get(schema, "items.required", []) as string[];

    const fields = fieldNames.map(
      (fieldName) =>
        new Field(fieldName, {
          id: null,
          range: null,
          reference: null,
          embedded: null,
          required: !!requiredFields.find((value) => value === fieldName),
          description: get(properties[fieldName], `description`, ``) as string,
        })
    );

    resources.push(
      new Resource(name, url, {
        id: null,
        title: "title",
        fields,
        readableFields: fields,
        writableFields: fields,
        parameters: [],
        getParameters: () => Promise.resolve([]),
      })
    );
  });

  return resources;
}
