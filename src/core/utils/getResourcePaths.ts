import type { OpenAPIV2, OpenAPIV3 } from "openapi-types";

export function getResourcePaths(
  paths: OpenAPIV2.PathsObject | OpenAPIV3.PathsObject,
): string[] {
  return [
    ...new Set(
      Object.keys(paths).filter((path) =>
        new RegExp("^[^{}]+/{[^{}]+}/?$").test(path),
      ),
    ),
  ];
}
