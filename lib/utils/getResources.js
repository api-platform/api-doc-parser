"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResources = void 0;
exports.getResources = function (paths) {
    var resources = [];
    Object.keys(paths).forEach(function (item) {
        if (item.includes("/{id}"))
            return;
        if (resources.find(function (path) { return path.startsWith("/" + item.split("/")[1]); }))
            return;
        resources.push(item);
    });
    return resources;
};
//# sourceMappingURL=getResources.js.map