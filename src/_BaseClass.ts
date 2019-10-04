export default abstract class BaseClass<T extends Record<string, any>> {
  constructor(options?: T) {
    if (options) {
      Object.assign(this, options);
    }
    Object.seal(this);
  }
}
