import { get } from "lodash";
import fetchJsonLd from "./fetchJsonLd";

export default async (resourceUrl: string, options = {}) => {
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
