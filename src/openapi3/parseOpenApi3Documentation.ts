import { Api } from "../Api.js";
import handleJson, { removeTrailingSlash } from "./handleJson.js";
import type { OpenAPIV3 } from "openapi-types";

export interface ParsedOpenApi3Documentation {
  api: Api;
  response: OpenAPIV3.Document;
  status: number;
}

export default function parseOpenApi3Documentation(
  entrypointUrl: string
): Promise<ParsedOpenApi3Documentation> {
  entrypointUrl = removeTrailingSlash(entrypointUrl);
  return fetch(entrypointUrl)
    .then((res) => Promise.all([res, res.json()]))
    .then(
      ([res, response]: [res: Response, response: OpenAPIV3.Document]) => {
        const title = response.info.title;
        return handleJson(response, entrypointUrl).then((resources) => ({
          api: new Api(entrypointUrl, { title, resources }),
          response,
          status: res.status,
        }));
      },
      ([res, response]: [res: Response, response: OpenAPIV3.Document]) =>
        Promise.reject({
          api: new Api(entrypointUrl, { resources: [] }),
          response,
          status: res.status,
        })
    );
}
