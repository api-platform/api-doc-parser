"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Api_1 = require("../Api");
var handleJson_1 = tslib_1.__importStar(require("./handleJson"));
function parseSwaggerDocumentation(entrypointUrl) {
    entrypointUrl = handleJson_1.removeTrailingSlash(entrypointUrl);
    return fetch(entrypointUrl)
        .then(function (res) { return res.json(); })
        .then(function (response) {
        var title = response.info.title;
        var resources = handleJson_1.default(response, entrypointUrl);
        return Promise.resolve({
            api: new Api_1.Api(entrypointUrl, { title: title, resources: resources }),
            response: response,
            status: response.status
        });
    }, function (_a) {
        var response = _a.response;
        return Promise.reject({
            api: new Api_1.Api(entrypointUrl, { resources: [] }),
            response: response,
            status: response.status
        });
    });
}
exports.default = parseSwaggerDocumentation;
//# sourceMappingURL=parseSwaggerDocumentation.js.map