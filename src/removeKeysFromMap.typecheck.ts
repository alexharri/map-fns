import removeKeysFromMap from "./removeKeysFromMap";

/** Keys should match the object type */

// @ts-expect-error
removeKeysFromMap({ a: 1 }, [1]);

// @ts-expect-error
removeKeysFromMap({ 1: "a" }, ["a"]);

// No error
removeKeysFromMap({ a: 1 } as Record<string | number, number>, [1]);

/** Non-map objects are not supported */

// @ts-expect-error
removeKeysFromMap("a", ["a"]);

// @ts-expect-error
removeKeysFromMap(5, [1]);

/** Empty maps have no keys */

// @ts-expect-error
removeKeysFromMap({}, ["a"]);

// @ts-expect-error
removeKeysFromMap({}, [1]);

// Unless they have a type
removeKeysFromMap({} as Record<number, number>, [1]);
