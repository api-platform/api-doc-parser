"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var utilities_1 = require("graphql/utilities");
var fetchQuery_1 = tslib_1.__importDefault(require("./fetchQuery"));
var Api_1 = require("../Api");
var Field_1 = require("../Field");
var Resource_1 = require("../Resource");
var getRangeFromGraphQlType = function (type) {
    if (type.kind === "NON_NULL") {
        if (type.ofType.kind === "LIST") {
            return "Array<" + getRangeFromGraphQlType(type.ofType.ofType) + ">";
        }
        return type.ofType.name;
    }
    if (type.kind === "LIST") {
        return "Array<" + getRangeFromGraphQlType(type.ofType) + ">";
    }
    return type.name;
};
var getReferenceFromGraphQlType = function (type) {
    if (type.kind === "OBJECT" && type.name.endsWith("Connection")) {
        return type.name.slice(0, type.name.lastIndexOf("Connection"));
    }
    return null;
};
exports.default = (function (entrypointUrl, options) {
    if (options === void 0) { options = {}; }
    return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var introspectionQuery, _a, response, schema, typeResources, resources;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    introspectionQuery = utilities_1.getIntrospectionQuery();
                    return [4 /*yield*/, fetchQuery_1.default(entrypointUrl, introspectionQuery, options)];
                case 1:
                    _a = _b.sent(), response = _a.response, schema = _a.body.data.__schema;
                    typeResources = schema.types.filter(function (type) {
                        var _a, _b;
                        return type.kind === "OBJECT" &&
                            type.name !== schema.queryType.name &&
                            type.name !== ((_a = schema.mutationType) === null || _a === void 0 ? void 0 : _a.name) &&
                            type.name !== ((_b = schema.subscriptionType) === null || _b === void 0 ? void 0 : _b.name) &&
                            !type.name.startsWith("__") &&
                            // mutation
                            !type.name.startsWith(type.name[0].toLowerCase()) &&
                            !type.name.endsWith("Connection") &&
                            !type.name.endsWith("Edge") &&
                            !type.name.endsWith("PageInfo");
                    });
                    resources = [];
                    typeResources.forEach(function (typeResource) {
                        var fields = [];
                        var readableFields = [];
                        var writableFields = [];
                        typeResource.fields.forEach(function (resourceFieldType) {
                            var field = new Field_1.Field(resourceFieldType.name, {
                                range: getRangeFromGraphQlType(resourceFieldType.type),
                                reference: getReferenceFromGraphQlType(resourceFieldType.type),
                                required: resourceFieldType.type.kind === "NON_NULL",
                                description: resourceFieldType.description,
                                deprecated: resourceFieldType.isDeprecated
                            });
                            fields.push(field);
                            readableFields.push(field);
                            writableFields.push(field);
                        });
                        resources.push(new Resource_1.Resource(typeResource.name, "", {
                            fields: fields,
                            readableFields: readableFields,
                            writableFields: writableFields
                        }));
                    });
                    resources.forEach(function (resource) {
                        var _a;
                        (_a = resource.fields) === null || _a === void 0 ? void 0 : _a.forEach(function (field) {
                            if (null !== field.reference) {
                                field.reference =
                                    resources.find(function (resource) { return resource.name === field.reference; }) || null;
                            }
                            else if (null !== field.range) {
                                field.reference =
                                    resources.find(function (resource) { return resource.name === field.range; }) || null;
                            }
                        });
                    });
                    return [2 /*return*/, {
                            api: new Api_1.Api(entrypointUrl, { resources: resources }),
                            response: response
                        }];
            }
        });
    });
});
//# sourceMappingURL=parseGraphQl.js.map