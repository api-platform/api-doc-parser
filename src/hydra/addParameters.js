import Parameter from "../Parameter";
import fetchResource from "./fetchResource";

export default (api, options = {}) => {
  const promises = [];

  for (const resource of api.resources) {
    const promise = fetchResource(resource.url, options).then(
      ({ parameters = [] }) => {
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
      }
    );

    promises.push(promise);
  }

  return Promise.all(promises).then(values => {
    api.resources.map((resource, index) => {
      resource.parameters = values[index];
    });

    return api;
  });
};
