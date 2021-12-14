import { AnyMap, MapOf } from "./types";

/**
 * Creates a new `map` populated with every key in the original `map` where the
 * value behind each `k` in `keys` is the value `map[k]` shallowly merged with
 * the return value of `fn(map[k])`
 *
 * ```tsx
 *  newMap[k] = { ...map[k], ...fn(map[k]) };
 * ```
 *
 * Example usage:
 *
 * ```tsx
 *  const out = modifyInMap(
 *    { alice: { age: 34, gender: "f" }, bob: { age: 42, gender: "m" } },
 *    "alice",
 *    person => ({ age: person.age + 1 }),
 *  );
 *  console.log(out.alice); // { age: 35, gender: "f" }
 *  console.log(out.bob); // { age: 42, gender: "m" }
 * ```
 *
 * The original `map` is not modified.
 *
 * An error is thrown if any key in `keys` does not exist in the map.
 *
 * @param map - The map to copy and modify.
 * @param keys - The keys to merge within the map.
 * @returns A new map with modified values.
 */
export default function mergeInMap<
  M extends MapOf<AnyMap>,
  K extends keyof M = keyof M,
  T extends M[K] = M[K]
>(map: M, keys: K | K[], fn: (item: T) => Partial<T>): M {
  const obj: M = { ...map };
  const keyList = (Array.isArray(keys) ? keys : [keys]) as Array<keyof M>;

  for (const key of keyList) {
    if (!obj.hasOwnProperty(key)) {
      throw new Error(`Key '${key}' does not exist in map.`);
    }
    obj[key] = { ...obj[key], ...fn(obj[key] as T) };
  }

  return obj;
}
