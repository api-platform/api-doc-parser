// oxlint-disable prefer-await-to-then
import type { OpenAPIV2 } from "openapi-types";
import { Api } from "../core/Api.js";
import { removeTrailingSlash } from "../core/utils/index.js";
import handleJson from "./handleJson.js";

export interface ParsedSwaggerDocumentation {
  api: Api;
  response: OpenAPIV2.Document;
  status: number;
}

export default function parseSwaggerDocumentation(
  entrypointUrl: string,
): Promise<ParsedSwaggerDocumentation> {
  entrypointUrl = removeTrailingSlash(entrypointUrl);
  return fetch(entrypointUrl)
    .then((res) => Promise.all([res, res.json()]))
    .then(
      ([res, response]: [res: Response, response: OpenAPIV2.Document]) => {
        const title = response.info.title;
        const resources = handleJson(response, entrypointUrl);

        return {
          api: new Api(entrypointUrl, { title, resources }),
          response,
          status: res.status,
        };
      },
      ([res, response]: [res: Response, response: OpenAPIV2.Document]) => {
        // oxlint-disable-next-line no-throw-literal
        throw {
          api: new Api(entrypointUrl, { resources: [] }),
          response,
          status: res.status,
        };
      },
    );
}
