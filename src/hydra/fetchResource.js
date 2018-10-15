import fetchJsonLd from "./fetchJsonLd";
import get from "lodash.get";

export default async (resourceUrl, options = {}) => {
  return await fetchJsonLd(
    resourceUrl,
    Object.assign({ itemsPerPage: 0 }, options)
  ).then(
    d => ({
      parameters: get(d, "body.hydra:search.hydra:mapping")
    }),
    () => {
      throw new Error("Unreachable resource");
    }
  );
};
