import { AnyMap, ItemInMap } from "../types";

/**
 * Creates a new `map` populated with every key in the original `map` where the
 * value of each key `k` in the new map is the return value of `fn(map[k])`.
 *
 * @param map The original map.
 * @param fn A function that takes a single argument `map[k]` and returns the value of `newMap[k]`.
 * @returns A new `map` where `map[k]` is the result of `fn(map[k])`.
 */
export default function mapMap<M extends AnyMap, T>(
  map: M,
  fn: (item: ItemInMap<M>) => T
) {
  const obj = {} as Record<keyof M, T>;
  const keys = Object.keys(map) as Array<keyof M>;

  for (const key of keys) {
    obj[key] = fn(map[key]);
  }

  return obj;
}
