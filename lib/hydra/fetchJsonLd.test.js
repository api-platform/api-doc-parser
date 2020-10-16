"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fetchJsonLd_1 = tslib_1.__importDefault(require("./fetchJsonLd"));
var fetchMock = fetch;
test("fetch a JSON-LD document", function () {
    fetchMock.mockResponseOnce("{\n    \"@context\": \"http://json-ld.org/contexts/person.jsonld\",\n    \"@id\": \"http://dbpedia.org/resource/John_Lennon\",\n    \"name\": \"John Lennon\",\n    \"born\": \"1940-10-09\",\n    \"spouse\": \"http://dbpedia.org/resource/Cynthia_Lennon\"\n}", {
        status: 200,
        statusText: "OK",
        headers: { "Content-Type": "application/ld+json" }
    });
    return fetchJsonLd_1.default("/foo.jsonld").then(function (data) {
        expect(data.response.ok).toBe(true);
        expect(data.body.name).toBe("John Lennon");
    });
});
test("fetch a non JSON-LD document", function () {
    fetchMock.mockResponseOnce("<body>Hello</body>", {
        status: 200,
        statusText: "OK",
        headers: { "Content-Type": "text/html" }
    });
    return fetchJsonLd_1.default("/foo.jsonld").catch(function (data) {
        expect(data.response.ok).toBe(true);
        expect(typeof data.body).toBe("undefined");
    });
});
test("fetch an error", function () {
    fetchMock.mockResponseOnce("{\n    \"@context\": \"http://json-ld.org/contexts/person.jsonld\",\n    \"@id\": \"http://dbpedia.org/resource/John_Lennon\",\n    \"name\": \"John Lennon\",\n    \"born\": \"1940-10-09\",\n    \"spouse\": \"http://dbpedia.org/resource/Cynthia_Lennon\"\n}", {
        status: 400,
        statusText: "Bad Request",
        headers: { "Content-Type": "application/ld+json" }
    });
    return fetchJsonLd_1.default("/foo.jsonld").catch(function (_a) {
        var response = _a.response;
        response.json().then(function (body) {
            expect(response.ok).toBe(false);
            expect(body.born).toBe("1940-10-09");
        });
    });
});
test("fetch an empty document", function () {
    fetchMock.mockResponseOnce("", {
        status: 204,
        statusText: "No Content",
        headers: { "Content-Type": "text/html" }
    });
    return fetchJsonLd_1.default("/foo.jsonld").then(function (data) {
        expect(data.response.ok).toBe(true);
        expect(data.body).toBe(undefined);
    });
});
//# sourceMappingURL=fetchJsonLd.test.js.map