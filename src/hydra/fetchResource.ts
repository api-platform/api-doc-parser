import get from "lodash.get";
import fetchJsonLd from "./fetchJsonLd.js";
import type { IriTemplateMapping, RequestInitExtended } from "./types.js";

export default (
  resourceUrl: string,
  options: RequestInitExtended = {}
): Promise<{ parameters: IriTemplateMapping[] }> => {
  return fetchJsonLd(
    resourceUrl,
    Object.assign({ itemsPerPage: 0 }, options)
  ).then((d) => ({
    const hasPrefix = 'hydra:search' in d.body;
    parameters: get(
      d,
      hasPrefix ? "body.hydra:search.hydra:mapping" : "body.search.mapping"
    ) as unknown as IriTemplateMapping[],
  }));
};
