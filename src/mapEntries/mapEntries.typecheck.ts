import mapEntries from "./mapEntries";

/* The keys to return the entries for can be omitted */

mapEntries({ x: 1 });

/* They can also be provided */

mapEntries({ x: 1 }, ["x"]);

/* It returns errors if keys that don't exist in the map are provided */

// @ts-expect-error
mapEntries({ x: 1 }, ["y"]);

/* But no errors if the keys exist, according to types */

mapEntries({ x: 1 } as Record<string, number>, ["y"]);

/* We currently only allow a list of keys, not a single key */

// @ts-expect-error
mapEntries({ x: 1 }, "x");
