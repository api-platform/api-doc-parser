import get from "lodash.get";
import fetchJsonLd from "./fetchJsonLd";

export default (
  resourceUrl: string,
  options: RequestInit = {}
): Promise<any> => {
  return fetchJsonLd(
    resourceUrl,
    Object.assign({ itemsPerPage: 0 }, options)
  ).then(d => ({
    parameters: get(d, "body.hydra:search.hydra:mapping")
  }));
};
