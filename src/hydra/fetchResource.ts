import fetchJsonLd from "./fetchJsonLd.js";
import type { IriTemplateMapping } from "./types.js";
import type { RequestInitExtended } from "../types.js";

export default async function fetchResource(
  resourceUrl: string,
  options: RequestInitExtended = {},
): Promise<{ parameters: IriTemplateMapping[] }> {
  const response = await fetchJsonLd(
    resourceUrl,
    // oxlint-disable-next-line prefer-object-spread
    Object.assign({ itemsPerPage: 0 }, options),
  );

  let hasPrefix = true;
  if ("body" in response) {
    hasPrefix = "hydra:search" in response.body;
  }
  return {
    parameters: (hasPrefix
      ? (response as any)?.body?.["hydra:search"]?.["hydra:mapping"]
      : (response as any)?.body?.search
          ?.mapping) as unknown as IriTemplateMapping[],
  };
}
