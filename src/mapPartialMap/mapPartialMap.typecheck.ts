import mapPartialMap from "./mapPartialMap";

/** Types are correctly inferred */

mapPartialMap({ a: 1 }, ["a"], (n) => n * 2);

// @ts-expect-error
mapPartialMap({ a: "1" }, ["a"], (n) => n * 2);

/* It returns errors for keys are not in the map */

// @ts-expect-error
mapPartialMap({ a: 1, b: 2, c: 3 }, ["d"], (n) => n * 2);

/* Except when properly typed */

mapPartialMap(
  { a: 1, b: 2, c: 3 } as Record<string, number>,
  ["d"],
  (n) => n * 2
);

/* An array of keys must be provided */

// @ts-expect-error
mapPartialMap({ a: 1, b: 2, c: 3 }, "a", (n) => n * 2);

// @ts-expect-error
mapPartialMap({ a: 1, b: 2, c: 3 }, (n) => n * 2);
