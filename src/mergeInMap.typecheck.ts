import mergeInMap from "./mergeInMap";

/** Keys should match the object type */

// @ts-expect-error
mergeInMap({ a: {} }, 1, (x) => x);

// @ts-expect-error
mergeInMap({ 1: {} }, "1", (x) => x);

// No error
mergeInMap({ a: {} } as Record<string | number, {}>, 1, (x) => x);

/* Expect a return value */

// @ts-expect-error
mergeInMap({ alex: { name: "Alex", age: 24 } }, ["alex"], () => {});

/* Allow an empty object */

mergeInMap({ alex: { name: "Alex", age: 24 } }, ["alex"], () => ({}));

/* Expect properties that exist in the object */

// @ts-expect-error
mergeInMap({ alex: { name: "Alex", age: 24 } }, ["alex"], () => ({
  jobTitle: "Software Engineer",
}));

/** Non-map objects are not supported */

// @ts-expect-error
mergeInMap("a", ["a"], (x) => x);

// @ts-expect-error
mergeInMap(5, [1], (x) => x);

/** Must be MapOf<AnyMap> */

// @ts-expect-error
mergeInMap({ a: 1, b: 2 }, [1], (x) => x);

/** Empty maps have no keys */

// @ts-expect-error
mergeInMap({}, ["a"], (x) => x);

// Unless they have a type
mergeInMap({} as Record<string, {}>, ["a"], (x) => x);
