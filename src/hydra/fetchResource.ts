import get from "lodash.get";
import fetchJsonLd from "./fetchJsonLd";
import { RequestInitExtended } from "./types";
import { Parameter } from "../Parameter";

export default (
  resourceUrl: string,
  options: RequestInitExtended = {}
): Promise<{ parameters: Parameter[] }> => {
  return fetchJsonLd(
    resourceUrl,
    Object.assign({ itemsPerPage: 0 }, options)
  ).then((d) => ({
    parameters: get(d, "body.hydra:search.hydra:mapping") as Parameter[],
  }));
};
