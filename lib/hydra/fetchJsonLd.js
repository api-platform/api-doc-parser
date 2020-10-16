"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsonLdMimeType = "application/ld+json";
/**
 * Sends a JSON-LD request to the API.
 */
function fetchJsonLd(url, options) {
    if (options === void 0) { options = {}; }
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var response, headers, status, contentType;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(url, setHeaders(options))];
                case 1:
                    response = _a.sent();
                    headers = response.headers, status = response.status;
                    contentType = headers.get("Content-Type");
                    if (204 === status) {
                        return [2 /*return*/, Promise.resolve({ response: response })];
                    }
                    if (500 <= status || !contentType || !contentType.includes(jsonLdMimeType)) {
                        return [2 /*return*/, Promise.reject({ response: response })];
                    }
                    return [2 /*return*/, response.json().then(function (body) { return ({ response: response, body: body, document: body }); })];
            }
        });
    });
}
exports.default = fetchJsonLd;
function setHeaders(options) {
    if (!(options.headers instanceof Headers)) {
        options.headers = new Headers(options.headers);
    }
    if (null === options.headers.get("Accept")) {
        options.headers.set("Accept", jsonLdMimeType);
    }
    if ("undefined" !== options.body &&
        !(typeof FormData !== "undefined" && options.body instanceof FormData) &&
        null === options.headers.get("Content-Type")) {
        options.headers.set("Content-Type", jsonLdMimeType);
    }
    return options;
}
//# sourceMappingURL=fetchJsonLd.js.map