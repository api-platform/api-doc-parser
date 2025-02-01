export interface RequestInitExtended extends Omit<RequestInit, "headers"> {
  headers?: HeadersInit | (() => HeadersInit);
}

export type IriTemplateMapping = {
  "@type": "IriTemplateMapping";
  variable: "string";
  property: string | null;
  required: boolean;
};

export type ExpandedOperation = {
  "@type": ["http://www.w3.org/ns/hydra/core#Operation"];
  "http://www.w3.org/2000/01/rdf-schema#label": [
    {
      "@value": string;
    },
  ];
  "http://www.w3.org/ns/hydra/core#title": [
    {
      "@value": string;
    },
  ];
  "http://www.w3.org/ns/hydra/core#expects"?: [
    {
      "@id": string;
    },
  ];
  "http://www.w3.org/ns/hydra/core#method": [
    {
      "@value": string;
    },
  ];
  "http://www.w3.org/ns/hydra/core#returns"?: [
    {
      "@id": string;
    },
  ];
  "http://www.w3.org/2002/07/owl#deprecated"?: [
    {
      "@value": boolean;
    },
  ];
};

export type ExpandedRdfProperty = {
  "@id": string;
  "@type": [
    | "http://www.w3.org/1999/02/22-rdf-syntax-ns#Property"
    | "http://www.w3.org/ns/hydra/core#Link",
  ];
  "http://www.w3.org/2000/01/rdf-schema#label": [
    {
      "@value": string;
    },
  ];
  "http://www.w3.org/2000/01/rdf-schema#domain": [
    {
      "@id": string;
    },
  ];
  "http://www.w3.org/2000/01/rdf-schema#range":
    | [
        {
          "@id": string;
        },
      ]
    | [
        {
          "@id": string;
        },
        {
          "http://www.w3.org/2002/07/owl#equivalentClass": [
            {
              "http://www.w3.org/2002/07/owl#allValuesFrom": [
                {
                  "@id": string;
                },
              ];
              "http://www.w3.org/2002/07/owl#onProperty": [
                {
                  "@id": string;
                },
              ];
            },
          ];
        },
      ];
  "http://www.w3.org/ns/hydra/core#supportedOperation"?: ExpandedOperation[];
  "http://www.w3.org/2002/07/owl#maxCardinality": [
    {
      "@value": number;
    },
  ];
};

export type ExpandedSupportedProperty = {
  "@type": ["http://www.w3.org/ns/hydra/core#SupportedProperty"];
  "http://www.w3.org/ns/hydra/core#title": [
    {
      "@value": string;
    },
  ];
  "http://www.w3.org/ns/hydra/core#description": [
    {
      "@value": string;
    },
  ];
  "http://www.w3.org/ns/hydra/core#required"?: [
    {
      "@value": boolean;
    },
  ];
  "http://www.w3.org/ns/hydra/core#readable": [
    {
      "@value": boolean;
    },
  ];
  "http://www.w3.org/ns/hydra/core#writeable": [
    {
      "@value": boolean;
    },
  ];
  "http://www.w3.org/ns/hydra/core#property": [ExpandedRdfProperty];
  "http://www.w3.org/2002/07/owl#deprecated"?: [
    {
      "@value": boolean;
    },
  ];
};

export type ExpandedClass = {
  "@id": string;
  "@type": ["http://www.w3.org/ns/hydra/core#Class"];
  "http://www.w3.org/2000/01/rdf-schema#label"?: [
    {
      "@value": string;
    },
  ];
  "http://www.w3.org/2000/01/rdf-schema#subClassOf"?: [
    {
      "@id": string;
    },
  ];
  "http://www.w3.org/ns/hydra/core#title": [
    {
      "@value": string;
    },
  ];
  "http://www.w3.org/ns/hydra/core#description"?: [
    {
      "@value": string;
    },
  ];
  "http://www.w3.org/ns/hydra/core#supportedProperty": ExpandedSupportedProperty[];
  "http://www.w3.org/ns/hydra/core#supportedOperation"?: ExpandedOperation[];
  "http://www.w3.org/2002/07/owl#deprecated"?: [
    {
      "@value": boolean;
    },
  ];
};

export type ExpandedDoc = {
  "@id": string;
  "@type": ["http://www.w3.org/ns/hydra/core#ApiDocumentation"];
  "http://www.w3.org/ns/hydra/core#title": [
    {
      "@value": string;
    },
  ];
  "http://www.w3.org/ns/hydra/core#description": [
    {
      "@value": string;
    },
  ];
  "http://www.w3.org/ns/hydra/core#entrypoint": [
    {
      "@value": string;
    },
  ];
  "http://www.w3.org/ns/hydra/core#supportedClass": ExpandedClass[];
};

export type Entrypoint = {
  "@id": string;
  "@type": [string];
  [key: string]:
    | [
        {
          "@id": string;
        },
      ]
    | string
    | [string];
};
