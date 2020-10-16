"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignSealed = void 0;
function assignSealed(target, src) {
    Object.keys(src).forEach(function (key) {
        return Object.defineProperty(target, key, {
            writable: true,
            enumerable: true,
            configurable: false,
            value: src[key]
        });
    });
}
exports.assignSealed = assignSealed;
//# sourceMappingURL=assignSealed.js.map