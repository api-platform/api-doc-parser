"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resource = void 0;
var assignSealed_1 = require("./utils/assignSealed");
var Resource = /** @class */ (function () {
    function Resource(name, url, options) {
        if (options === void 0) { options = {}; }
        this.name = name;
        this.url = url;
        assignSealed_1.assignSealed(this, options);
    }
    return Resource;
}());
exports.Resource = Resource;
//# sourceMappingURL=Resource.js.map