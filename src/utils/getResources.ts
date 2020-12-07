export const getResources = (paths: { [key: string]: any }): string[] => {
  const resources: string[] = [];

  Object.keys(paths).forEach((item) => {
    if (item.includes("/{id}")) return;
    if (resources.find((path) => path.startsWith("/" + item.split("/")[1])))
      return;
    resources.push(item);
  });

  return resources;
};
