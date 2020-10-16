"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeTrailingSlash = void 0;
var tslib_1 = require("tslib");
var lodash_get_1 = tslib_1.__importDefault(require("lodash.get"));
var Field_1 = require("../Field");
var Resource_1 = require("../Resource");
var getResources_1 = require("../utils/getResources");
exports.removeTrailingSlash = function (url) {
    if (url.endsWith("/")) {
        url = url.slice(0, -1);
    }
    return url;
};
function default_1(response, entrypointUrl) {
    var paths = getResources_1.getResources(response.paths);
    var resources = paths.map(function (item) {
        var name = item.replace("/", "");
        var url = exports.removeTrailingSlash(entrypointUrl) + item;
        var firstMethod = Object.keys(response.paths[item])[0];
        var responsePathItem = response.paths[item][firstMethod];
        if (!responsePathItem.tags) {
            throw new Error(); // @TODO
        }
        var title = responsePathItem.tags[0];
        if (!response.components) {
            throw new Error(); // @TODO
        }
        if (!response.components.schemas) {
            throw new Error(); // @TODO
        }
        var schema = response.components.schemas[title];
        var properties = schema.properties;
        if (!properties) {
            throw new Error(); // @TODO
        }
        var fieldNames = Object.keys(properties);
        var requiredFields = lodash_get_1.default(response, ["components", "schemas", title, "required"], []);
        var fields = fieldNames.map(function (fieldName) {
            return new Field_1.Field(fieldName, {
                id: null,
                range: null,
                reference: null,
                required: !!requiredFields.find(function (value) { return value === fieldName; }),
                description: lodash_get_1.default(properties[fieldName], "description", "")
            });
        });
        return new Resource_1.Resource(name, url, {
            id: null,
            title: title,
            fields: fields,
            readableFields: fields,
            writableFields: fields
        });
    });
    return resources;
}
exports.default = default_1;
//# sourceMappingURL=handleJson.js.map