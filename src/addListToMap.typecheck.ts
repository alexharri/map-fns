import addListToMap from "./addListToMap";

/** The `keyProperty` must be a string or number */

addListToMap(
  { a: { id: "a", value: 1 } } as Record<
    string | number,
    { id: string; value: number }
  >,
  [],
  "id"
);

addListToMap(
  { a: { id: "a", value: 1 } } as Record<
    string | number,
    { id: string; value: number }
  >,
  [],
  "value"
);

addListToMap(
  { a: { id: "a", value: [1, 2, 3] } } as Record<
    string,
    { id: string; value: number[] }
  >,
  [],
  // @ts-expect-error
  "value"
);

/** The `keyProperty` must resolve to the same key type as the map */

addListToMap(
  { a: { id: "a", value: 1 } } as Record<string, { id: string; value: number }>,
  [],
  // @ts-expect-error
  "value"
);

addListToMap(
  { a: { id: "a", value: 1 } } as Record<number, { id: string; value: number }>,
  [],
  // @ts-expect-error
  "id"
);
