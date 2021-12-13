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
 * @param map - The map to copy and modify.
 * @param keys - The keys to modify within the map.
 * @returns A new map with modified values.
 */
export const modifyInMap = <
  M extends AnyMap,
  T extends M[keyof M] = M[keyof M]
>(
  map: M,
  keys: string | string[],
  fn: (item: T) => T
): M => {
  const obj: M = { ...map };
  const keyList = (Array.isArray(keys) ? keys : keys) as Array<keyof M>;

  for (const key of keyList) {
    if (!obj.hasOwnProperty(key)) {
      throw new Error(`Key '${key}' does not exist in map.`);
    }
    obj[key] = fn(obj[key]);
  }

  return obj;
};
