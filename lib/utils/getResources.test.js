"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getResources_1 = require("./getResources");
test("should get resources", function () {
    var paths = {
        "/test": {},
        "/test/{id}": {},
        "/test/{id}/subpath": {},
        "/foo": {},
        "/test/bar": {}
    };
    var resources = getResources_1.getResources(paths);
    expect(resources).toEqual(["/test", "/foo"]);
});
//# sourceMappingURL=getResources.test.js.map