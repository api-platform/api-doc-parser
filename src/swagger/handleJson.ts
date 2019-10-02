import { get, uniq } from "lodash";
import Field from "../Field";
import Resource from "../Resource";

export const removeTrailingSlash = (url: string): string => {
  if (url.endsWith("/")) {
    url = url.slice(0, -1);
  }
  return url;
};

export default function(
  response: any, // @TODO is this externally typed somewhere
  entrypointUrl: string
) {
  const paths = uniq(
    Object.keys(response.paths).map(item => item.replace(`/{id}`, ``))
  );

  const resources = paths.map(item => {
    const name = item.replace(`/`, ``);
    const url = removeTrailingSlash(entrypointUrl) + item;
    const firstMethod = Object.keys(response.paths[item])[0];
    const title = response.paths[item][firstMethod]["tags"][0];
    const fieldNames = Object.keys(response.definitions[title].properties);
    const requiredFields = get(
      response,
      ["definitions", title, "required"],
      []
    );

    const fields = fieldNames.map(
      fieldName =>
        new Field(fieldName, {
          // @TODO double check this. if these are required, type def should be
          // changed from optional (?) to `string | null`
          //
          // id: null,
          // range: null,
          // reference: null,
          required: !!requiredFields.find(value => value === fieldName),
          description: get(
            response.definitions[title].properties[fieldName],
            `description`,
            ``
          )
        })
    );

    return new Resource(name, url, {
      // @TODO see above
      //
      // id: null,
      title,
      fields,
      readableFields: fields,
      writableFields: fields
    });
  });

  return resources;
}
