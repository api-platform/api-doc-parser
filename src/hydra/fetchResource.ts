import get from "lodash.get";
import fetchJsonLd from "./fetchJsonLd";

export default (
  resourceUrl: string,
  options: RequestInit = {}
): Promise<any> => {
  return fetchJsonLd(
    resourceUrl,
    options
  ).then(
    d => ({
      parameters: get(d, "body.hydra:search.hydra:mapping")
    }),
    () => {
      throw new Error("Unreachable resource");
    }
  );
};
