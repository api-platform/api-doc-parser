import type { OpenAPIV2, OpenAPIV3 } from "openapi-types";

const getResources = (
  paths: OpenAPIV2.PathsObject | OpenAPIV3.PathsObject,
): string[] =>
  Array.from(
    new Set(
      Object.keys(paths).filter((path) => {
        return new RegExp("^[^{}]+/{[^{}]+}/?$").test(path);
      }),
    ),
  );

export default getResources;
