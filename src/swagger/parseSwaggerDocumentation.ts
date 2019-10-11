import { OpenAPIV2 } from "openapi-types";
import { Api } from "../Api";
import handleJson, { removeTrailingSlash } from "./handleJson";

export interface ParsedSwaggerDocumentation {
  api: Api;
  response: OpenAPIV2.Document;
  status: string;
}

export default function parseSwaggerDocumentation(
  entrypointUrl: string
): Promise<ParsedSwaggerDocumentation> {
  entrypointUrl = removeTrailingSlash(entrypointUrl);
  return fetch(entrypointUrl)
    .then(res => res.json())
    .then(
      response => {
        const title = response.info.title;
        const resources = handleJson(response, entrypointUrl);

        return Promise.resolve({
          api: new Api(entrypointUrl, { title, resources }),
          response,
          status: response.status
        });
      },
      ({ response }) =>
        Promise.reject({
          api: new Api(entrypointUrl, { resources: [] }),
          response,
          status: response.status
        })
    );
}
