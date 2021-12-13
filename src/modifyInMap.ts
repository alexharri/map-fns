import { AnyMap } from "./types";

/**
 * Creates a new `map` populated with every key in the original `map` where the
 * value behind each `k` in `keys` is the return value of `fn(map[k])`
 *
 * ```tsx
 * const out = modifyInMap({ a: 1, b: 2 }, "b", n => n + 1);
 * console.log(out); // { a: 1, b: 3 }
 * ```
 *
 * The original `map` is not modified.
 *
 * An error is thrown if any key in `keys` does not exist in the map.
 *
 * @param map - The map to copy and modify.
 * @param keys - The keys to modify within the map.
 * @returns A new map with modified values.
 */
export function modifyInMap<
  M extends AnyMap,
  K extends keyof M = keyof M,
  T extends M[K] = M[K]
>(map: M, keys: K | K[], fn: (item: T) => T): M {
  const obj: M = { ...map };
  const keyList = (Array.isArray(keys) ? keys : [keys]) as Array<keyof M>;

  for (const key of keyList) {
    if (!obj.hasOwnProperty(key)) {
      throw new Error(`Key '${key}' does not exist in map.`);
    }
    obj[key] = fn(obj[key]);
  }

  return obj;
}
