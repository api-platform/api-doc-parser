export function assignSealed<
  TSrc extends Record<string, any>,
  TTarget extends TSrc,
>(target: TTarget, src: TSrc): void {
  for (const key of Object.keys(src)) {
    Object.defineProperty(target, key, {
      writable: true,
      enumerable: true,
      configurable: false,
      value: src[key],
    });
  }
}
