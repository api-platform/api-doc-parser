import { OpenAPIV3 } from "openapi-types";
import { Api } from "../Api";
import handleJson, { removeTrailingSlash } from "./handleJson";

export interface ParsedOpenApi3Documentation {
  api: Api;
  response: OpenAPIV3.Document;
  status: string;
}

export function parseOpenApi3Documentation(
  entrypointUrl: string
): Promise<ParsedOpenApi3Documentation> {
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
