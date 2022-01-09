import { AnyMap } from "./types";

/**
 * Takes in two maps and returns true if they contain the same keys and the
 * values behind their keys are shallowly equal. Returns false otherwise.
 *
 * This function can be useful to check if changes have occurred in any of
 * the items in the map.
 *
 * The order that the maps are provided in does not matter.
 *
 * @param a First map to compare
 * @param b Second map to compare
 * @returns True if they are equal, False if they are not
 */
export default function areMapsShallowEqual<M extends AnyMap>(
  a: M,
  b: M
): boolean {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  if (aKeys.length !== bKeys.length) {
    return false;
  }

  for (let i = 0; i < aKeys.length; i += 1) {
    const key = aKeys[i];

    if (!b.hasOwnProperty(key)) {
      return false;
    }

    if (a[key] !== b[key]) {
      return false;
    }
  }

  return true;
}
