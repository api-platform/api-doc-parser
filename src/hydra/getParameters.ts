import { Parameter } from "../Parameter";
import { Resource } from "../Resource";
import fetchResource from "./fetchResource";
import { RequestInitExtended } from "./types";

export default (
  resource: Resource,
  options: RequestInitExtended = {}
): Promise<Parameter[]> =>
  fetchResource(resource.url, options).then(({ parameters = [] }) => {
    const resourceParameters: Parameter[] = [];
    parameters.forEach(({ property = null, required, variable }: any) => {
      if (null === property) {
        return;
      }

      const { range = null } = resource.fields
        ? resource.fields.find(({ name }) => property === name) || {}
        : {};

      resourceParameters.push(new Parameter(variable, range, required, ""));
    });
    resource.parameters = resourceParameters;

    return resourceParameters;
  });
