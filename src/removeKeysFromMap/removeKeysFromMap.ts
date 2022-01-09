import { AnyMap } from "../types";

/**
 * Creates a new `map` populated with every key in the original `map` except the
 * keys that exist in the `keys` array.
 *
 * ```tsx
 * const out = removeKeysFromMap({ a: 1, b: 2 }, ["b"]);
 * console.log(out); // { a: 1 }
 * ```
 *
 * @param map - The map to remove keys from.
 * @param keys - The keys to remove from the map.
 * @returns A new map with the removed.
 */
export default function removeKeysFromMap<
  T extends AnyMap,
  K extends keyof T = keyof T
>(map: T, keys: K | K[]): T {
  const mapKeys = Object.keys(map) as Array<K & string>;

  const originalKeyList = Array.isArray(keys) ? keys : [keys];
  const stringifiedKeyList = originalKeyList.map(String);

  const removeKeySet = new Set(stringifiedKeyList);
  return mapKeys.reduce((newMap, key) => {
    if (!removeKeySet.has(key)) {
      newMap[key] = map[key];
    }
    return newMap;
  }, {} as T);
}
