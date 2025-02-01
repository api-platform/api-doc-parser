export function assignSealed<
  TSrc extends { [key: string]: any },
  TTarget extends TSrc,
>(target: TTarget, src: TSrc): void {
  Object.keys(src).forEach((key) => {
    Object.defineProperty(target, key, {
      writable: true,
      enumerable: true,
      configurable: false,

      value: src[key],
    });
  });
}
