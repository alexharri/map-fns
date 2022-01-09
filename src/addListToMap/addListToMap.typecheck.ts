import addListToMap from "./addListToMap";

/** The `keyProperty` must be a string or number */

addListToMap({ a: { id: "a", value: 1 } }, [], "id");

addListToMap({ a: { id: "a", value: 1 } }, [], "value");

addListToMap(
  { a: { id: "a", value: [1, 2, 3] } },
  [],
  // @ts-expect-error
  "value"
);

addListToMap(
  { a: { id: "a", value: 1 } },
  [],
  // @ts-expect-error
  "doesnotexist"
);

/** Allow `keyProperty` to be a string or a number, even if the key type does not match */

addListToMap(
  { a: { id: "a", value: 1 } } as Record<string, { id: string; value: number }>,
  [],
  "value"
);

addListToMap(
  { a: { id: "a", value: 1 } } as Record<number, { id: string; value: number }>,
  [],
  "id"
);
