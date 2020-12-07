export function assignSealed<
  TSrc extends { [key: string]: any },
  TTarget extends TSrc
>(target: TTarget, src: TSrc): void {
  Object.keys(src).forEach((key) => {
    Object.defineProperty(target, key, {
      writable: true,
      enumerable: true,
      configurable: false,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      value: src[key],
    });
  });
}
