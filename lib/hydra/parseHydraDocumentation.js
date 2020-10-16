"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDocumentationUrlFromHeaders = void 0;
var tslib_1 = require("tslib");
var jsonld_1 = tslib_1.__importDefault(require("jsonld"));
var lodash_get_1 = tslib_1.__importDefault(require("lodash.get"));
var Api_1 = require("../Api");
var Field_1 = require("../Field");
var Resource_1 = require("../Resource");
var Operation_1 = require("../Operation");
var fetchJsonLd_1 = tslib_1.__importDefault(require("./fetchJsonLd"));
var getParameters_1 = tslib_1.__importDefault(require("./getParameters"));
/**
 * Extracts the short name of a resource.
 */
function guessNameFromUrl(url, entrypointUrl) {
    return url.substr(entrypointUrl.length + 1);
}
/**
 * Finds the description of the class with the given id.
 */
function findSupportedClass(docs, classToFind) {
    var supportedClasses = lodash_get_1.default(docs, '[0]["http://www.w3.org/ns/hydra/core#supportedClass"]');
    if (!Array.isArray(supportedClasses)) {
        throw new Error('The API documentation has no "http://www.w3.org/ns/hydra/core#supportedClass" key or its value is not an array.');
    }
    for (var _i = 0, supportedClasses_1 = supportedClasses; _i < supportedClasses_1.length; _i++) {
        var supportedClass = supportedClasses_1[_i];
        if (supportedClass["@id"] === classToFind) {
            return supportedClass;
        }
    }
    throw new Error("The class \"" + classToFind + "\" is not defined in the API documentation.");
}
function getDocumentationUrlFromHeaders(headers) {
    var linkHeader = headers.get("Link");
    if (!linkHeader) {
        throw new Error('The response has no "Link" HTTP header.');
    }
    var matches = /<(.+)>; rel="http:\/\/www.w3.org\/ns\/hydra\/core#apiDocumentation"/.exec(linkHeader);
    if (matches === null) {
        throw new Error('The "Link" HTTP header is not of the type "http://www.w3.org/ns/hydra/core#apiDocumentation".');
    }
    return matches[1];
}
exports.getDocumentationUrlFromHeaders = getDocumentationUrlFromHeaders;
/**
 * Retrieves Hydra's entrypoint and API docs.
 */
function fetchEntrypointAndDocs(entrypointUrl, options) {
    if (options === void 0) { options = {}; }
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var d, docsUrl, documentLoader, docsJsonLd, _a, docs, entrypoint;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, fetchJsonLd_1.default(entrypointUrl, options)];
                case 1:
                    d = _b.sent();
                    docsUrl = getDocumentationUrlFromHeaders(d.response.headers);
                    documentLoader = function (input) {
                        return fetchJsonLd_1.default(input, options);
                    };
                    return [4 /*yield*/, fetchJsonLd_1.default(docsUrl, options)];
                case 2:
                    docsJsonLd = (_b.sent()).body;
                    return [4 /*yield*/, Promise.all([
                            jsonld_1.default.expand(docsJsonLd, {
                                base: docsUrl,
                                documentLoader: documentLoader
                            }),
                            jsonld_1.default.expand(d.body, {
                                base: entrypointUrl,
                                documentLoader: documentLoader
                            })
                        ])];
                case 3:
                    _a = _b.sent(), docs = _a[0], entrypoint = _a[1];
                    return [2 /*return*/, {
                            entrypointUrl: entrypointUrl,
                            docsUrl: docsUrl,
                            entrypoint: entrypoint,
                            response: d.response,
                            docs: docs
                        }];
            }
        });
    });
}
function removeTrailingSlash(url) {
    if (url.endsWith("/")) {
        url = url.slice(0, -1);
    }
    return url;
}
function findRelatedClass(docs, property) {
    // Use the entrypoint property's owl:equivalentClass if available
    if (Array.isArray(property["http://www.w3.org/2000/01/rdf-schema#range"])) {
        for (var _i = 0, _a = property["http://www.w3.org/2000/01/rdf-schema#range"]; _i < _a.length; _i++) {
            var range = _a[_i];
            var onProperty = lodash_get_1.default(range, '["http://www.w3.org/2002/07/owl#equivalentClass"][0]["http://www.w3.org/2002/07/owl#onProperty"][0]["@id"]');
            var allValuesFrom = lodash_get_1.default(range, '["http://www.w3.org/2002/07/owl#equivalentClass"][0]["http://www.w3.org/2002/07/owl#allValuesFrom"][0]["@id"]');
            if (allValuesFrom &&
                "http://www.w3.org/ns/hydra/core#member" === onProperty) {
                return findSupportedClass(docs, allValuesFrom);
            }
        }
    }
    // As a fallback, find an operation available on the property of the entrypoint returning the searched type (usually POST)
    for (var _b = 0, _c = property["http://www.w3.org/ns/hydra/core#supportedOperation"]; _b < _c.length; _b++) {
        var entrypointSupportedOperation = _c[_b];
        if (!entrypointSupportedOperation["http://www.w3.org/ns/hydra/core#returns"]) {
            continue;
        }
        var returns = lodash_get_1.default(entrypointSupportedOperation, '["http://www.w3.org/ns/hydra/core#returns"][0]["@id"]');
        if ("string" === typeof returns &&
            0 !== returns.indexOf("http://www.w3.org/ns/hydra/core")) {
            return findSupportedClass(docs, returns);
        }
    }
    throw new Error("Cannot find the class related to " + property["@id"] + ".");
}
/**
 * Parses Hydra documentation and converts it to an intermediate representation.
 */
function parseHydraDocumentation(entrypointUrl, options) {
    if (options === void 0) { options = {}; }
    entrypointUrl = removeTrailingSlash(entrypointUrl);
    return fetchEntrypointAndDocs(entrypointUrl, options).then(function (_a) {
        var entrypoint = _a.entrypoint, docs = _a.docs, response = _a.response;
        var resources = [], fields = [], operations = [];
        var title = lodash_get_1.default(docs, '[0]["http://www.w3.org/ns/hydra/core#title"][0]["@value"]', "API Platform");
        var entrypointType = lodash_get_1.default(entrypoint, '[0]["@type"][0]');
        if (!entrypointType) {
            throw new Error('The API entrypoint has no "@type" key.');
        }
        var entrypointClass = findSupportedClass(docs, entrypointType);
        if (!Array.isArray(entrypointClass["http://www.w3.org/ns/hydra/core#supportedProperty"])) {
            throw new Error('The entrypoint definition has no "http://www.w3.org/ns/hydra/core#supportedProperty" key or it is not an array.');
        }
        var _loop_1 = function (properties) {
            var readableFields = [], resourceFields = [], writableFields = [], resourceOperations = [];
            var property = lodash_get_1.default(properties, '["http://www.w3.org/ns/hydra/core#property"][0]');
            if (!property) {
                return "continue";
            }
            // Add fields
            var relatedClass = findRelatedClass(docs, property);
            for (var _i = 0, _a = relatedClass["http://www.w3.org/ns/hydra/core#supportedProperty"]; _i < _a.length; _i++) {
                var supportedProperties = _a[_i];
                var supportedProperty = lodash_get_1.default(supportedProperties, '["http://www.w3.org/ns/hydra/core#property"][0]');
                var range = lodash_get_1.default(supportedProperty, '["http://www.w3.org/2000/01/rdf-schema#range"][0]["@id"]', null);
                var field = new Field_1.Field(supportedProperty["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"], {
                    id: supportedProperty["@id"],
                    range: range,
                    reference: "http://www.w3.org/ns/hydra/core#Link" ===
                        lodash_get_1.default(supportedProperty, '["@type"][0]')
                        ? range // Will be updated in a subsequent pass
                        : null,
                    embedded: "http://www.w3.org/ns/hydra/core#Link" !==
                        lodash_get_1.default(supportedProperty, '["@type"][0]')
                        ? range // Will be updated in a subsequent pass
                        : null,
                    required: lodash_get_1.default(supportedProperties, '["http://www.w3.org/ns/hydra/core#required"][0]["@value"]', false),
                    description: lodash_get_1.default(supportedProperties, '["http://www.w3.org/ns/hydra/core#description"][0]["@value"]', ""),
                    maxCardinality: lodash_get_1.default(supportedProperty, '["http://www.w3.org/2002/07/owl#maxCardinality"][0]["@value"]', null),
                    deprecated: lodash_get_1.default(supportedProperties, '["http://www.w3.org/2002/07/owl#deprecated"][0]["@value"]', false)
                });
                fields.push(field);
                resourceFields.push(field);
                if (lodash_get_1.default(supportedProperties, '["http://www.w3.org/ns/hydra/core#readable"][0]["@value"]')) {
                    readableFields.push(field);
                }
                if (lodash_get_1.default(supportedProperties, '["http://www.w3.org/ns/hydra/core#writeable"][0]["@value"]') ||
                    lodash_get_1.default(supportedProperties, '["http://www.w3.org/ns/hydra/core#writable"][0]["@value"]')) {
                    writableFields.push(field);
                }
            }
            // parse entrypoint's operations (a.k.a. collection operations)
            if (property["http://www.w3.org/ns/hydra/core#supportedOperation"]) {
                for (var _b = 0, _c = property["http://www.w3.org/ns/hydra/core#supportedOperation"]; _b < _c.length; _b++) {
                    var entrypointOperation = _c[_b];
                    if (!entrypointOperation["http://www.w3.org/ns/hydra/core#returns"]) {
                        continue;
                    }
                    var range = entrypointOperation["http://www.w3.org/ns/hydra/core#returns"][0]["@id"];
                    var operation = new Operation_1.Operation(entrypointOperation["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"], {
                        method: entrypointOperation["http://www.w3.org/ns/hydra/core#method"][0]["@value"],
                        expects: entrypointOperation["http://www.w3.org/ns/hydra/core#expects"] &&
                            entrypointOperation["http://www.w3.org/ns/hydra/core#expects"][0]["@id"],
                        returns: range,
                        types: entrypointOperation["@type"],
                        deprecated: lodash_get_1.default(entrypointOperation, '["http://www.w3.org/2002/07/owl#deprecated"][0]["@value"]', false)
                    });
                    resourceOperations.push(operation);
                    operations.push(operation);
                }
            }
            // parse resource operations (a.k.a. item operations)
            for (var _d = 0, _e = relatedClass["http://www.w3.org/ns/hydra/core#supportedOperation"]; _d < _e.length; _d++) {
                var supportedOperation = _e[_d];
                if (!supportedOperation["http://www.w3.org/ns/hydra/core#returns"]) {
                    continue;
                }
                var range = supportedOperation["http://www.w3.org/ns/hydra/core#returns"][0]["@id"];
                var operation = new Operation_1.Operation(supportedOperation["http://www.w3.org/2000/01/rdf-schema#label"][0]["@value"], {
                    method: supportedOperation["http://www.w3.org/ns/hydra/core#method"][0]["@value"],
                    expects: supportedOperation["http://www.w3.org/ns/hydra/core#expects"] &&
                        supportedOperation["http://www.w3.org/ns/hydra/core#expects"][0]["@id"],
                    returns: range,
                    types: supportedOperation["@type"],
                    deprecated: lodash_get_1.default(supportedOperation, '["http://www.w3.org/2002/07/owl#deprecated"][0]["@value"]', false)
                });
                resourceOperations.push(operation);
                operations.push(operation);
            }
            var url = lodash_get_1.default(entrypoint, "[0][\"" + property["@id"] + "\"][0][\"@id\"]");
            if (!url) {
                throw new Error("Unable to find the URL for \"" + property["@id"] + "\", make sure your api resource has at least one GET item operation declared.");
            }
            var resource = new Resource_1.Resource(guessNameFromUrl(url, entrypointUrl), url, {
                id: relatedClass["@id"],
                title: lodash_get_1.default(relatedClass, '["http://www.w3.org/ns/hydra/core#title"][0]["@value"]', ""),
                fields: resourceFields,
                readableFields: readableFields,
                writableFields: writableFields,
                operations: resourceOperations,
                deprecated: lodash_get_1.default(relatedClass, '["http://www.w3.org/2002/07/owl#deprecated"][0]["@value"]', false)
            });
            resource.parameters = [];
            resource.getParameters = function () {
                return getParameters_1.default(resource, options);
            };
            resources.push(resource);
        };
        // Add resources
        for (var _i = 0, _b = entrypointClass["http://www.w3.org/ns/hydra/core#supportedProperty"]; _i < _b.length; _i++) {
            var properties = _b[_i];
            _loop_1(properties);
        }
        var _loop_2 = function (field) {
            if (null !== field.reference) {
                field.reference =
                    resources.find(function (resource) { return resource.id === field.reference; }) || null;
            }
            if (null !== field.embedded) {
                field.embedded =
                    resources.find(function (resource) { return resource.id === field.embedded; }) || null;
            }
        };
        // Resolve references and embedded
        for (var _c = 0, fields_1 = fields; _c < fields_1.length; _c++) {
            var field = fields_1[_c];
            _loop_2(field);
        }
        return {
            api: new Api_1.Api(entrypointUrl, { title: title, resources: resources }),
            response: response,
            status: response.status
        };
    }, function (data) {
        return Promise.reject({
            api: new Api_1.Api(entrypointUrl, { resources: [] }),
            error: data,
            response: data.response,
            status: lodash_get_1.default(data.response, "status")
        });
    });
}
exports.default = parseHydraDocumentation;
//# sourceMappingURL=parseHydraDocumentation.js.map