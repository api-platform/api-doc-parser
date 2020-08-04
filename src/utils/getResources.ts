export const getResources = (paths: any) => {
  const resources: string[] = [];

  Object.keys(paths).forEach((item, index, array) => {
    if (item.includes("/{id}")) return;
    if (resources.find(path => path.startsWith("/" + item.split("/")[1])))
      return;
    resources.push(item);
  });

  return resources;
};
