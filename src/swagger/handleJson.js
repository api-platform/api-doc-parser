import { get } from "lodash";
import Field from "../Field";
import Resource from "../Resource";

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

const onlyUnique = (value, index, self) => self.indexOf(value) === index;

export const removeTrailingSlash = url => {
  if (/\/$/.test(url)) {
    url = url.slice(0, -1);
  }
  return url;
};

export default function(response, entrypointUrl) {
  const paths = Object.keys(response.paths)
    .map(item => item.replace(`/{id}`, ``))
    .filter(onlyUnique);

  const resources = paths.map(item => {
    const name = item.replace(`/`, ``);
    const url = removeTrailingSlash(entrypointUrl) + item;
    const firstMethod = Object.keys(response.paths[item])[0];
    const title = response.paths[item][firstMethod]["tags"][0];
    const fieldNames = Object.keys(response.definitions[title].properties);

    const fields = fieldNames.map(
      fieldName =>
        new Field(fieldName, {
          id: `http://schema.org/${fieldName}`,
          range: null,
          reference: null,
          required: !!response.definitions[title].required.find(
            value => value === fieldName
          ),
          description: get(
            response.definitions[title].properties[fieldName],
            `description`,
            ``
          )
        })
    );

    return new Resource(name, url, {
      id: `http://schema.org/` + title,
      title,
      fields,
      readableFields: fields,
      writableFields: fields
    });
  });

  return resources;
}
