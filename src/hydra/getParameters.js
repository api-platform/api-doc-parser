import Parameter from "../Parameter";
import fetchResource from "./fetchResource";

export default (resource, options = {}, doNotFetchAgain = false) =>
  doNotFetchAgain
    ? resource.parameters
    : fetchResource(resource.url, options).then(({ parameters = [] }) => {
        const resourceParameters = [];
        parameters.forEach(({ property = null, required, variable }) => {
          if (null === property) {
            return;
          }

          const { range = null } =
            resource.fields.find(({ name }) => property === name) || {};

          resourceParameters.push(new Parameter(variable, range, required, ""));
        });

        return resourceParameters;
      });
