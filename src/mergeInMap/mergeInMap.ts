import { AnyMap, MapOf } from "../types";

type DeepMergable<T> =
  | ((item: T) => DeepMergable<T>)
  | {
      [K in keyof T]?:
        | DeepMergable<T[K]>
        | ((item: T[K]) => DeepMergable<T[K]>);
    };

function isNotMergable(value: unknown): boolean {
  return (
    typeof value !== "object" || // Primitives
    !value || // null
    value.constructor !== Object // Arrays, Sets, etc
  );
}

function deepMerge<T, K extends keyof T = keyof T>(
  target: T,
  toMerge: DeepMergable<T>
): T {
  if (typeof toMerge === "function") {
    return deepMerge(target, toMerge(target));
  }

  const out = { ...target };

  const kList = Object.keys(toMerge) as K[];
  for (const k of kList) {
    let valueToMerge = toMerge[k];

    if (typeof valueToMerge === "function" && typeof out[k] !== "function") {
      // The value to merge is a function, but the target is not a function.
      //
      // The value is a function that returns the actual value to merge.
      valueToMerge = valueToMerge(out[k]);
    }

    if (isNotMergable(valueToMerge)) {
      out[k] = valueToMerge as T[K];
      continue;
    }

    out[k] = deepMerge(out[k], valueToMerge!);
  }

  return out;
}

/**
 * Creates a new `map` populated with every key in the original `map` where the
 * value behind each `k` in `keys` is the value `map[k]` shallowly merged with
 * the return value of `fn(map[k])`.
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
  K extends keyof M = keyof M
>(
  map: M,
  keys: K | K[],
  /**
   * Expects a partial value of `map[key]`.
   *
   * Supports returning functions to compute properties like so:
   *
   * ```tsx
   *  const map = { key: { count: 1 } };
   *
   *  // "Normal" syntax
   *  mergeInMap(map, "key", (item) => ({
   *    count: item.count + 1,
   *  }));
   *
   *  // Compute function
   *  mergeInMap(map, "key", () => ({
   *    count: (count) => count + 1,
   *  }));
   * ```
   */
  toMerge: DeepMergable<M[K]>
): M {
  const obj: M = { ...map };
  const keyList = (Array.isArray(keys) ? keys : [keys]) as K[];

  for (const key of keyList) {
    if (!obj.hasOwnProperty(key)) {
      throw new Error(`Key '${key}' does not exist in map.`);
    }
    obj[key] = deepMerge(obj[key], toMerge);
  }

  return obj;
}
