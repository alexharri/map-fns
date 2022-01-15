import { AnyMap, ItemInMap } from "../types";

/**
 * Creates a new map populated with every key in `keys` where the value
 * behind each `k` in `keys` is `callback(map[k])`.
 *
 * ```tsx
 * mapPartialMap({ a: 1, b: 2, c: 3 }, ["a", "c"], (n) => n * 2);
 * //=> {
 * //     a: 2,
 * //     c: 6,
 * //   }
 * ```
 *
 * @param map The original map.
 * @param keys The keys to include in the new map.
 * @param callback A function that takes a single argument `map[k]` and returns the value of `newMap[k]`.
 * @returns A new `map` where `map[k]` is the result of `callback(map[k])`.
 */
export default function mapPartialMap<M extends AnyMap, T>(
  map: M,
  keys: Array<keyof M>,
  callback: (item: ItemInMap<M>) => T
) {
  const obj = {} as Record<keyof M, T>;

  for (const key of keys) {
    if (!map.hasOwnProperty(key)) {
      throw new Error(`Key '${key}' does not exist in map.`);
    }
    obj[key] = callback(map[key]);
  }

  return obj;
}
