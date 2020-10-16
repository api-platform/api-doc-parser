"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api = void 0;
var assignSealed_1 = require("./utils/assignSealed");
var Api = /** @class */ (function () {
    function Api(entrypoint, options) {
        if (options === void 0) { options = {}; }
        this.entrypoint = entrypoint;
        assignSealed_1.assignSealed(this, options);
    }
    return Api;
}());
exports.Api = Api;
//# sourceMappingURL=Api.js.map