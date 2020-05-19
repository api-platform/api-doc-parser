const setOptions = (query: string, options: RequestInit): RequestInit => {
  if (!options.method) {
    options.method = "POST";
  }

  if (!(options.headers instanceof Headers)) {
    options.headers = new Headers(options.headers);
  }

  if (null === options.headers.get("Content-Type")) {
    options.headers.set("Content-Type", "application/json");
  }

  if ("GET" !== options.method && !options.body) {
    options.body = JSON.stringify({ query });
  }

  return options;
};

export default async (
  url: string,
  query: string,
  options: RequestInit = {}
): Promise<{
  response: Response;
  body: any;
}> => {
  const response = await fetch(url, setOptions(query, options));
  const body = await response.json();

  if (body?.errors) {
    return Promise.reject({ response, body });
  }

  return Promise.resolve({ response, body });
};
