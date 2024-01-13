import {isEqual} from "./isEqual";

export function trackedObjectChanged(original: Record<string, any>, updated: Record<string, any>, tracked: string[]) {
  for (const p of tracked) {
    const paths = p.split('.');

    let oldValue = original;
    let newValue = updated;

    paths.forEach(path => {
      if (oldValue) oldValue = oldValue[path];
      if (newValue) newValue = newValue[path];
    });

    if (!isEqual(oldValue, newValue)) return true;
  }

  return false;
}