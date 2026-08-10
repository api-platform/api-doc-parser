import type { Resource } from "../core/index.js";
import { Parameter } from "../core/index.js";
import type { RequestInitExtended } from "../core/types.js";
import fetchResource from "./fetchResource.js";

const parametersPromises = new WeakMap<Resource, Promise<Parameter[]>>();

/**
 * Gets and caches parameters for the lifetime of a Resource instance.
 * Rejected requests are not cached and can be retried.
 * @param {Resource} resource The resource whose parameters should be loaded.
 * @param {RequestInitExtended} [options] Optional fetch options.
 * @returns {Promise<Parameter[]>} The cached or newly loaded parameters.
 */
export default function getParameters(
  resource: Resource,
  options: RequestInitExtended = {},
): Promise<Parameter[]> {
  const cachedPromise = parametersPromises.get(resource);
  if (cachedPromise !== undefined) {
    return cachedPromise;
  }

  const parametersPromise = loadParameters(resource, options);
  parametersPromises.set(resource, parametersPromise);

  return parametersPromise;
}

async function loadParameters(
  resource: Resource,
  options: RequestInitExtended,
): Promise<Parameter[]> {
  try {
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
  } catch (error: unknown) {
    parametersPromises.delete(resource);
    throw error;
  }
}
