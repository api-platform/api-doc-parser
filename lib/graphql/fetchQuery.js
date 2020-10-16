"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var setOptions = function (query, options) {
    if (!options.method) {
        options.method = "POST";
    }
    if (!(options.headers instanceof Headers)) {
        options.headers = new Headers(options.headers);
    }
    if (null === options.headers.get("Content-Type")) {
        options.headers.set("Content-Type", "application/json");
    }
    if ("GET" !== options.method && !options.body) {
        options.body = JSON.stringify({ query: query });
    }
    return options;
};
exports.default = (function (url, query, options) {
    if (options === void 0) { options = {}; }
    return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var response, body;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(url, setOptions(query, options))];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    body = _a.sent();
                    if (body === null || body === void 0 ? void 0 : body.errors) {
                        return [2 /*return*/, Promise.reject({ response: response, body: body })];
                    }
                    return [2 /*return*/, Promise.resolve({ response: response, body: body })];
            }
        });
    });
});
//# sourceMappingURL=fetchQuery.js.map