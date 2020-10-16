"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Field = void 0;
var assignSealed_1 = require("./utils/assignSealed");
var Field = /** @class */ (function () {
    function Field(name, options) {
        if (options === void 0) { options = {}; }
        this.name = name;
        assignSealed_1.assignSealed(this, options);
    }
    return Field;
}());
exports.Field = Field;
//# sourceMappingURL=Field.js.map