// @flow

import Api from "./Api";
import Resource from "./Resource";
import Field from "./Field";
import Operation from "./Operation";
import Parameter from "./Parameter";

export default class ApiSerializer {
  /**
   * @param {Api} api
   * @return {object} a POJO
   */
  serialize(api: Api) {
    const { resources, ...rest } = api;

    return {
      ...rest,
      resources: resources.map(this.serializeResource)
    };
  }

  serializeResource = (resource: Resource) => {
    const {
      readableFields,
      writableFields,
      operations,
      parameters,
      ...rest
    } = resource;
    const result = {
      ...rest
    };

    if (readableFields) {
      result.readableFields = readableFields.map(this.serializeField);
    }
    if (writableFields) {
      result.writableFields = writableFields.map(this.serializeField);
    }
    if (operations) {
      result.operations = operations.map(this.serializeOperation);
    }
    if (parameters) {
      result.parameters = parameters.map(this.serializeParameter);
    }

    return result;
  };

  serializeField = (field: Field) => {
    const { reference, ...rest } = field;
    return {
      ...rest,
      reference:
        reference && reference instanceof Resource ? reference.id : null
    };
  };

  serializeOperation = (operation: Operation) => {
    return {
      ...operation
    };
  };

  serializeParameter = (parameter: Parameter) => {
    return {
      ...parameter
    };
  };

  /**
   * @param {object} data the serialized POJO
   * @return {Api|false}
   */
  deserialize(data) {
    const { resources = [], entrypointUrl, ...rest } = data;
    const preparedResources = [];
    const allFields = [];
    const allOperations = [];
    const allParameters = [];

    if (!resources) return false;

    for (const resourceData of resources) {
      const {
        name,
        url,
        readableFields,
        writableFields,
        operations,
        parameters,
        ...resourceRest
      } = resourceData;
      const resourceOptions = { ...resourceRest };
      const resourceReadableFields = [];
      const resourceWritableFields = [];
      const resourceOperations = [];
      const resourceParameters = [];

      if (readableFields) {
        for (const { fieldName, ...fieldOptions } of readableFields) {
          const field = new Field(fieldName, fieldOptions);
          resourceReadableFields.push(field);
          allFields.push(field);
        }

        resourceOptions.readableFields = resourceReadableFields;
      }

      if (writableFields) {
        for (const { fieldName, ...fieldOptions } of writableFields) {
          const field = new Field(fieldName, fieldOptions);
          resourceWritableFields.push(field);
          allFields.push(field);
        }

        resourceOptions.writableFields = resourceWritableFields;
      }

      if (operations) {
        for (const { operationName, ...operationOptions } of operations) {
          const operation = new Operation(operationName, operationOptions);
          resourceOperations.push(operation);
          allOperations.push(operation);
        }

        resourceOptions.operations = resourceOperations;
      }

      if (parameters) {
        for (const { variable, range, required, description } of parameters) {
          const parameter = new Parameter(
            variable,
            range,
            required,
            description
          );
          resourceParameters.push(parameter);
          allParameters.push(parameter);
        }

        resourceOptions.parameters = resourceParameters;
      }

      preparedResources.push(new Resource(name, url, resourceOptions));
    }

    // Resolve references
    for (const field of allFields) {
      if (null !== field.reference) {
        field.reference =
          preparedResources.find(resource => resource.id === field.reference) ||
          null;
      }
    }

    return new Api(entrypointUrl, {
      ...rest,
      resources: preparedResources
    });
  }
}
