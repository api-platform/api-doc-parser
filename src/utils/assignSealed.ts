export function assignSealed<TSrc, TTarget extends TSrc>(
  target: TTarget,
  src: TSrc
): void {
  Object.keys(src).forEach(key =>
    Object.defineProperty(target, key, {
      writable: true,
      enumerable: true,
      configurable: false,
      value: (src as any)[key]
    })
  );
}
