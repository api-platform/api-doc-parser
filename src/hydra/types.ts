export interface IriTemplateMapping {
  "@type": "IriTemplateMapping";
  variable: "string";
  property: string | null;
  required: boolean;
}

/** Any absolute IRI */
type Iri = string;

/** A primitive value wrapped in @value */
interface JsonLdValue<T = string | number | boolean | null> {
  "@value": T;
}

/** A node identifier */
interface JsonLdId {
  "@id": Iri;
}

/** Zero‑to‑many rdf:types */
interface JsonLdType {
  "@type"?: Iri | Iri[];
}

export interface ExpandedOperation {
  "@type": ["http://www.w3.org/ns/hydra/core#Operation"];
  "http://www.w3.org/2000/01/rdf-schema#label": [JsonLdValue<string>];
  "http://www.w3.org/ns/hydra/core#title": [JsonLdValue<string>];
  "http://www.w3.org/ns/hydra/core#expects"?: [JsonLdId];
  "http://www.w3.org/ns/hydra/core#method": [JsonLdValue<string>];
  "http://www.w3.org/ns/hydra/core#returns"?: [JsonLdId];
  "http://www.w3.org/2002/07/owl#deprecated"?: [JsonLdValue<boolean>];
}

export interface ExpandedRdfProperty {
  "@id": string;
  "@type": [
    | "http://www.w3.org/1999/02/22-rdf-syntax-ns#Property"
    | "http://www.w3.org/ns/hydra/core#Link",
  ];
  "http://www.w3.org/2000/01/rdf-schema#label": [JsonLdValue<string>];
  "http://www.w3.org/2000/01/rdf-schema#domain": [JsonLdId];
  "http://www.w3.org/2000/01/rdf-schema#range":
    | [JsonLdId]
    | [
        JsonLdId,
        {
          "http://www.w3.org/2002/07/owl#equivalentClass": [
            {
              "http://www.w3.org/2002/07/owl#allValuesFrom": [JsonLdId];
              "http://www.w3.org/2002/07/owl#onProperty": [JsonLdId];
            },
          ];
        },
      ];
  "http://www.w3.org/ns/hydra/core#supportedOperation"?: ExpandedOperation[];
  "http://www.w3.org/2002/07/owl#maxCardinality": [JsonLdValue<number>];
}

interface ExpandedSupportedProperty {
  "@type": ["http://www.w3.org/ns/hydra/core#SupportedProperty"];
  "http://www.w3.org/ns/hydra/core#title": [JsonLdValue<string>];
  "http://www.w3.org/ns/hydra/core#description": [JsonLdValue<string>];
  "http://www.w3.org/ns/hydra/core#required"?: [JsonLdValue<boolean>];
  "http://www.w3.org/ns/hydra/core#readable": [JsonLdValue<boolean>];
  /**
   * @deprecated
   */
  "http://www.w3.org/ns/hydra/core#writeable": [JsonLdValue<boolean>];
  "http://www.w3.org/ns/hydra/core#writable": [JsonLdValue<boolean>];
  "http://www.w3.org/ns/hydra/core#property": [ExpandedRdfProperty];
  "http://www.w3.org/2002/07/owl#deprecated"?: [JsonLdValue<boolean>];
}

export interface ExpandedClass extends JsonLdNode {
  "@id": string;
  "@type": ["http://www.w3.org/ns/hydra/core#Class"];
  "http://www.w3.org/2000/01/rdf-schema#label"?: [JsonLdValue<string>];
  "http://www.w3.org/2000/01/rdf-schema#subClassOf"?: [JsonLdId];
  "http://www.w3.org/ns/hydra/core#title": [JsonLdValue<string>];
  "http://www.w3.org/ns/hydra/core#description"?: [JsonLdValue<string>];
  "http://www.w3.org/ns/hydra/core#supportedProperty": ExpandedSupportedProperty[];
  "http://www.w3.org/ns/hydra/core#supportedOperation"?: ExpandedOperation[];
  "http://www.w3.org/2002/07/owl#deprecated"?: [JsonLdValue<boolean>];
}

export interface ExpandedDoc {
  "@id": string;
  "@type": ["http://www.w3.org/ns/hydra/core#ApiDocumentation"];
  "http://www.w3.org/ns/hydra/core#title": [JsonLdValue<string>];
  "http://www.w3.org/ns/hydra/core#description": [JsonLdValue<string>];
  "http://www.w3.org/ns/hydra/core#entrypoint": [JsonLdValue<string>];
  "http://www.w3.org/ns/hydra/core#supportedClass": ExpandedClass[];
}

export interface Entrypoint {
  "@id": string;
  "@type": [string];
  [key: string]: [JsonLdId] | string | [string];
}
