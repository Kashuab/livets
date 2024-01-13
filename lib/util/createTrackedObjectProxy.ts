export function createTrackedObjectProxy<T extends object>(obj: T, cb: (prop: string) => void, parentKey?: string) {
  return new Proxy<T>(obj, {
    get(target: object, p: string): any {
      const value = target[p as keyof object] as unknown;

      const trackedProperty = parentKey ? `${parentKey}.${p}` : p;
      cb(trackedProperty);

      if (value && typeof value === 'object') {
        return createTrackedObjectProxy(value, cb, p);
      }

      return value;
    }
  });
}