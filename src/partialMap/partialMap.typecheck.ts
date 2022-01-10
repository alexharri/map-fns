import partialMap from "./partialMap";

partialMap({ a: 1, b: 2, c: 3 }, ["a", "c"]);

/* It returns errors for keys are not in the map */

// @ts-expect-error
partialMap({ a: 1, b: 2, c: 3 }, ["d"]);

/* Except when properly typed */

partialMap({ a: 1, b: 2, c: 3 } as Record<string, number>, ["d"]);

/* An array of keys must be provided */

// @ts-expect-error
partialMap({ a: 1, b: 2, c: 3 }, "a");

// @ts-expect-error
partialMap({ a: 1, b: 2, c: 3 });
