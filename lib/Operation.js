"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Operation = void 0;
var assignSealed_1 = require("./utils/assignSealed");
var Operation = /** @class */ (function () {
    function Operation(name, options) {
        if (options === void 0) { options = {}; }
        this.name = name;
        assignSealed_1.assignSealed(this, options);
    }
    return Operation;
}());
exports.Operation = Operation;
//# sourceMappingURL=Operation.js.map