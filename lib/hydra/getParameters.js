"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Parameter_1 = require("../Parameter");
var fetchResource_1 = tslib_1.__importDefault(require("./fetchResource"));
exports.default = (function (resource, options) {
    if (options === void 0) { options = {}; }
    return fetchResource_1.default(resource.url, options).then(function (_a) {
        var _b = _a.parameters, parameters = _b === void 0 ? [] : _b;
        var resourceParameters = [];
        parameters.forEach(function (_a) {
            var _b = _a.property, property = _b === void 0 ? null : _b, required = _a.required, variable = _a.variable;
            if (null === property) {
                return;
            }
            var _c = (resource.fields
                ? resource.fields.find(function (_a) {
                    var name = _a.name;
                    return property === name;
                }) || {}
                : {}).range, range = _c === void 0 ? null : _c;
            resourceParameters.push(new Parameter_1.Parameter(variable, range, required, ""));
        });
        resource.parameters = resourceParameters;
        return resourceParameters;
    });
});
//# sourceMappingURL=getParameters.js.map