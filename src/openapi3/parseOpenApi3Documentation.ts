// oxlint-disable prefer-await-to-then
import type { OpenAPIV3 } from "openapi-types";
import { Api } from "../core/index.js";
import type { RequestInitExtended } from "../core/types.js";
import { removeTrailingSlash } from "../core/utils/index.js";
import handleJson from "./handleJson.js";

export interface ParsedOpenApi3Documentation {
  api: Api;
  response: OpenAPIV3.Document;
  status: number;
}

export default function parseOpenApi3Documentation(
  entrypointUrl: string,
  options: RequestInitExtended = {},
): Promise<ParsedOpenApi3Documentation> {
  entrypointUrl = removeTrailingSlash(entrypointUrl);
  let headers: HeadersInit | undefined =
    typeof options.headers === "function" ? options.headers() : options.headers;
  headers = new Headers(headers);
  headers.append("Accept", "application/vnd.openapi+json");

  return fetch(entrypointUrl, { ...options, headers: headers })
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
      ([res, response]: [res: Response, response: OpenAPIV3.Document]) => {
        // oxlint-disable-next-line no-throw-literal
        throw {
          api: new Api(entrypointUrl, { resources: [] }),
          response,
          status: res.status,
        };
      },
    );
}
