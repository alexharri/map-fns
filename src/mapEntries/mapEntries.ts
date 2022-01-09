import { AnyMap, ItemInMap } from "../types";

/**
 * Returns a new array of key, value entries from the provided map. The keys of the entries
 * to return may be provided via the `keys` argument.
 *
 * ```tsx
 * const entries = mapEntries({ a: 1, b: 2, c: 3 });
 * // > [["a", 1], ["b", 2] ["c", 3]]
 *
 * const entries = mapEntries({ a: 1, b: 2, c: 3 }, ["b", "a"]);
 * // > [["b", 2], ["a", 1]]
 * ```
 *
 * @param map The map to get the entries of.
 * @param keys The keys in the map to return as entries.
 * @returns An array of key, value pairs for every entry in the map. If `keys` is provided, only the entries for those keys are included.
 */
export default function mapEntries<
  M extends AnyMap,
  K extends keyof M = keyof M
>(map: M, keys?: K[]): Array<[K, ItemInMap<M>]> {
  const keysToUse = keys || (Object.keys(map) as K[]);

  const entries: Array<[K, ItemInMap<M>]> = [];

  for (const key of keysToUse) {
    if (!map.hasOwnProperty(key)) {
      throw new Error(`Key '${key}' does not exist in map.`);
    }
    entries.push([key, map[key]]);
  }

  return entries;
}
