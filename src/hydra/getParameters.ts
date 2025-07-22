import type { Resource } from "../core/index.js";
import { Parameter } from "../core/index.js";
import type { RequestInitExtended } from "../core/types.js";
import fetchResource from "./fetchResource.js";

export default async function getParameters(
  resource: Resource,
  options: RequestInitExtended = {},
): Promise<Parameter[]> {
  const { parameters = [] } = await fetchResource(resource.url, options);
  const resourceParameters: Parameter[] = [];
  for (const { property = null, required, variable } of parameters) {
    if (property === null) {
      continue;
    }

    const { range = null } =
      resource.fields?.find(({ name }) => property === name) || {};

    resourceParameters.push(new Parameter(variable, range, required, ""));
  }
  resource.parameters = resourceParameters;

  return resourceParameters;
}
