import { Parameter } from "../Parameter.js";
import fetchResource from "./fetchResource.js";
import type { Resource } from "../Resource.js";
import type { RequestInitExtended } from "./types.js";

export default function getParameters(
  resource: Resource,
  options: RequestInitExtended = {},
): Promise<Parameter[]> {
  return fetchResource(resource.url, options).then(({ parameters = [] }) => {
    const resourceParameters: Parameter[] = [];
    for (const { property = null, required, variable } of parameters) {
      if (property === null) {
        continue;
      }

      const { range = null } = resource.fields
        ? resource.fields.find(({ name }) => property === name) || {}
        : {};

      resourceParameters.push(new Parameter(variable, range, required, ""));
    }
    resource.parameters = resourceParameters;

    return resourceParameters;
  });
}
