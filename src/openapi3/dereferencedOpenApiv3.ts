// oxlint-disable consistent-indexed-object-style
import type { OpenAPIV3 } from "openapi-types";

interface ArraySchemaObjectDereferenced extends BaseSchemaObjectDereferenced {
  type: OpenAPIV3.ArraySchemaObjectType;
  items: SchemaObjectDereferenced;
}

interface NonArraySchemaObjectDereferenced
  extends BaseSchemaObjectDereferenced {
  type?: OpenAPIV3.NonArraySchemaObjectType;
}

export type SchemaObjectDereferenced =
  | ArraySchemaObjectDereferenced
  | NonArraySchemaObjectDereferenced;

type BaseSchemaObjectDereferenced = Omit<
  OpenAPIV3.BaseSchemaObject,
  "additionalProperties" | "properties" | "allOf" | "oneOf" | "anyOf" | "not"
> & {
  additionalProperties?: boolean | SchemaObjectDereferenced;
  properties?: {
    [name: string]: SchemaObjectDereferenced;
  };
  allOf?: SchemaObjectDereferenced[];
  oneOf?: SchemaObjectDereferenced[];
  anyOf?: SchemaObjectDereferenced[];
  not?: SchemaObjectDereferenced;
};

type EncodingObjectDereferenced = Omit<OpenAPIV3.EncodingObject, "headers"> & {
  headers?: {
    [header: string]: HeaderObjectDereferenced;
  };
};

type MediaTypeObjectDereferenced = Omit<
  OpenAPIV3.MediaTypeObject,
  "schema" | "encoding"
> & {
  schema?: SchemaObjectDereferenced;
  encoding?: {
    [media: string]: EncodingObjectDereferenced;
  };
};

type ParameterBaseObjectDereferenced = Omit<
  OpenAPIV3.ParameterObject,
  "schema" | "content"
> & {
  schema?: SchemaObjectDereferenced;
  content?: {
    [media: string]: MediaTypeObjectDereferenced;
  };
};

interface HeaderObjectDereferenced extends ParameterBaseObjectDereferenced {}

type RequestBodyObjectDereferenced = Omit<
  OpenAPIV3.RequestBodyObject,
  "content"
> & {
  content: {
    [media: string]: MediaTypeObjectDereferenced;
  };
};

type ResponseObjectDereferenced = Omit<
  OpenAPIV3.ResponseObject,
  "headers" | "content"
> & {
  headers?: {
    [header: string]: HeaderObjectDereferenced;
  };
  content?: {
    [media: string]: MediaTypeObjectDereferenced;
  };
};

interface ResponsesObjectDereferenced {
  [code: string]: ResponseObjectDereferenced;
}

interface ParameterObjectDereferenced extends ParameterBaseObjectDereferenced {
  name: string;
  in: string;
}

type PathItemObjectDereferenced<T extends object = object> = Omit<
  OpenAPIV3.PathItemObject,
  "parameters" | `${OpenAPIV3.HttpMethods}`
> & {
  parameters?: ParameterObjectDereferenced[];
} & {
  [method in OpenAPIV3.HttpMethods]?: OperationObjectDereferenced<T>;
};
interface CallbackObjectDereferenced {
  [url: string]: PathItemObjectDereferenced;
}

export type OperationObjectDereferenced<T extends object = object> = Omit<
  OpenAPIV3.OperationObject,
  "parameters" | "requestBody" | "responses" | "callbacks"
> & {
  parameters?: ParameterObjectDereferenced[];
  requestBody?: RequestBodyObjectDereferenced;
  responses: ResponsesObjectDereferenced;
  callbacks?: {
    [callback: string]: CallbackObjectDereferenced;
  };
} & T;

interface PathsObjectDereferenced<
  T extends object = object,
  P extends object = object,
> {
  [pattern: string]: (PathItemObjectDereferenced<T> & P) | undefined;
}

type ComponentsObjectDereferenced = Omit<
  OpenAPIV3.ComponentsObject,
  | "schemas"
  | "responses"
  | "parameters"
  | "requestBodies"
  | "headers"
  | "callbacks"
> & {
  schemas?: {
    [key: string]: SchemaObjectDereferenced;
  };
  responses?: {
    [key: string]: ResponseObjectDereferenced;
  };
  parameters?: {
    [key: string]: ParameterObjectDereferenced;
  };
  requestBodies?: {
    [key: string]: RequestBodyObjectDereferenced;
  };
  headers?: {
    [key: string]: HeaderObjectDereferenced;
  };
  callbacks?: {
    [key: string]: CallbackObjectDereferenced;
  };
};

export type OpenAPIV3DocumentDereferenced<T extends object = object> = Omit<
  OpenAPIV3.Document,
  "paths" | "components"
> & {
  paths: PathsObjectDereferenced<T>;
  components?: ComponentsObjectDereferenced;
};
