interface ResourceValue {
  id?: string;
  title: string;
}

type ParsedJsonReplacerResult = ResourceValue | string | null;

export function parsedJsonReplacer(
  key: string,
  value: null | ResourceValue,
): ParsedJsonReplacerResult {
  if (
    ["reference", "embedded"].includes(key) &&
    typeof value === "object" &&
    value !== null
  ) {
    return `Object ${value.id || value.title}`;
  }

  return value;
}
