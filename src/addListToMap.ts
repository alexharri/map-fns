import { AnyMap, ItemInMap, KeysOfFilteredType } from "./types";

/**
 * Creates a new `map` populated with every item in the original `map` with every item in
 * `items` added to the map. The key that items behind are determined by the `keyProperty`.
 *
 * ```tsx
 * const map: Record<string, { id: string, value: number } }> = {
 * 	a: { id: "a", value: 1 },
 * };
 *
 * const result = addListToMap(map, [{ id: "b", value: 2 }], "id");
 *
 * console.log(result); // { a: { id: "a", value: 1 }, b: { id: "b", value: 2 } };
 * ```
 *
 * The original `map` is not modified.
 *
 * @param map - The map to copy and modify.
 * @param items - The items to add to the map
 * @param keyProperty - The property of the items that contains the map key to use (e.g. `id`).
 * @returns A new map with the items added to it.
 */
export default function addListToMap<M extends AnyMap>(
  map: M,
  items: ItemInMap<M>[],
  keyProperty: KeysOfFilteredType<ItemInMap<M>, string | number>
): M {
  const obj: M = { ...map };

  for (const item of items) {
    obj[item[keyProperty]] = item;
  }

  return obj;
}
