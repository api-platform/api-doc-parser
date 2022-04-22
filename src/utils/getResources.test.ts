import getResourcePaths from "./getResources";

test("should get resource paths", () => {
  const paths = {
    "/test": {},
    "/test/{id}": {},
    "/test/{id}/subpath": {},
    "/foo": {},
    "/test/bar": {},
  };

  const resources = getResourcePaths(paths);
  expect(resources).toEqual(["/test/{id}"]);
});
