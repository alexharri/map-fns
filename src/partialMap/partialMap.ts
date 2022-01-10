import { AnyMap } from "../types";

/**
 * Creates a new map populated with every key in `keys` where the value
 * behind each `k` in `keys` is `map[k]`.
 *
 * ```tsx
 * partialMap({ a: 1, b: 2, c: 3 }, ["a", "c"]);
 * //=> {
 * //     a: 1,
 * //     c: 3,
 * //   }
 * ```
 *
 * @param map The original map.
 * @param keys The keys to include in the new map.
 * @returns a new `map` populated with every key in `keys` where the value
 * behind each `k` in `keys` is `map[k]`.
 */
export default function partialMap<M extends AnyMap>(
  map: M,
  keys: Array<keyof M>
): M {
  const obj = {} as M;

  for (const key of keys) {
    if (!map.hasOwnProperty(key)) {
      throw new Error(`Key '${key}' does not exist in map.`);
    }
    obj[key] = map[key];
  }

  return obj;
}
