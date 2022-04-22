import get from "lodash.get";
import fetchJsonLd from "./fetchJsonLd";
import type { IriTemplateMapping, RequestInitExtended } from "./types";

export default (
  resourceUrl: string,
  options: RequestInitExtended = {}
): Promise<{ parameters: IriTemplateMapping[] }> => {
  return fetchJsonLd(
    resourceUrl,
    Object.assign({ itemsPerPage: 0 }, options)
  ).then((d) => ({
    parameters: get(
      d,
      "body.hydra:search.hydra:mapping"
    ) as IriTemplateMapping[],
  }));
};
