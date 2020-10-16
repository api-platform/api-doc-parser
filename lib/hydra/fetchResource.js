"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var lodash_get_1 = tslib_1.__importDefault(require("lodash.get"));
var fetchJsonLd_1 = tslib_1.__importDefault(require("./fetchJsonLd"));
exports.default = (function (resourceUrl, options) {
    if (options === void 0) { options = {}; }
    return fetchJsonLd_1.default(resourceUrl, options).then(function (d) { return ({
        parameters: lodash_get_1.default(d, "body.hydra:search.hydra:mapping")
    }); }, function () {
        throw new Error("Unreachable resource");
    });
});
//# sourceMappingURL=fetchResource.js.map