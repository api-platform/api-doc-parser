import { humanize } from "inflection";

/**
 * Builds an object from an array of enum values.
 * The keys of the object are the humanized versions of the enum values,
 * and the values are the original enum values.
 *
 * @param {any[] | undefined} enumArray - An array of enum values.
 * @returns {Record<string, string | number> | null} An object mapping humanized enum names to their original values, or null if the input is empty.
 */
export function buildEnumObject(
  enumArray: any[] | undefined,
): Record<string, string | number> | null {
  if (!enumArray || enumArray.length === 0) {
    return null;
  }

  return Object.fromEntries(
    // Object.values is used because the array is annotated: it contains the __meta symbol used by jsonref.
    Object.values(enumArray).map((enumValue: string | number) => [
      typeof enumValue === "string" ? humanize(enumValue) : enumValue,
      enumValue,
    ]),
  );
}
