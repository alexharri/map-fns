import mapMap from "./mapMap";

/** Types are correctly inferred */

mapMap({ a: 1 }, (n) => n * 2);

// @ts-expect-error
mapMap({ a: "1" }, (n) => n * 2);
