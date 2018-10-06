import fetchJsonLd from "./fetchJsonLd";
import get from "lodash.get";

export default async resourceUrl => {
  return await fetchJsonLd(resourceUrl, { itemsPerPage: 0 }).then(
    d => ({
      parameters: get(d, "body.hydra:search.hydra:mapping")
    }),
    () => {
      throw new Error("Unreachable resource");
    }
  );
};
