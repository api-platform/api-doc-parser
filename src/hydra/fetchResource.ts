import get from "lodash.get";
import type { EmptyResponseDocument, ResponseDocument } from "./fetchJsonLd.js";
import fetchJsonLd from "./fetchJsonLd.js";
import type { IriTemplateMapping, RequestInitExtended } from "./types.js";

export default (
  resourceUrl: string,
  options: RequestInitExtended = {}
): Promise<{ parameters: IriTemplateMapping[] }> => {
  return fetchJsonLd(
    resourceUrl,
    Object.assign({ itemsPerPage: 0 }, options)
  ).then((d: ResponseDocument | EmptyResponseDocument) => {
    let hasPrefix = true;
    if ((d as ResponseDocument).body) {
      hasPrefix = "hydra:search" in (d as ResponseDocument).body;
    }
    return {
      parameters: get(
        d,
        hasPrefix ? "body.hydra:search.hydra:mapping" : "body.search.mapping"
      ) as unknown as IriTemplateMapping[],
    };
  });
};
