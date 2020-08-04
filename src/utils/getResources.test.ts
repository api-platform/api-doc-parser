import { getResources } from "./getResources";

test("should get resources", () => {
  const paths = {
    "/test": {},
    "/test/{id}": {},
    "/test/{id}/subpath": {},
    "/foo": {},
    "/test/bar": {}
  };

  const resources = getResources(paths);
  expect(resources).toEqual(["/test", "/foo"]);
});
