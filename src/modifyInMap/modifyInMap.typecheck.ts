import modifyInMap from "./modifyInMap";

/** Keys should match the object type */

// @ts-expect-error
modifyInMap({ a: 1 }, 1, (x) => x);

// @ts-expect-error
modifyInMap({ 1: "a" }, "a", (x) => x);

// No error
modifyInMap({ a: 1 } as Record<string | number, number>, 1, (x) => x);

/* Merging is not automatic deeper than at the top level */

// @ts-expect-error
modifyInMap({ alex: { name: "Alex", age: 24 } }, ["alex"], (person) => ({
  age: person.age + 1,
}));

modifyInMap({ alex: { name: "Alex", age: 24 } }, ["alex"], (person) => ({
  ...person,
  age: person.age + 1,
}));

/** Non-map objects are not supported */

// @ts-expect-error
modifyInMap("a", ["a"], (x) => x);

// @ts-expect-error
modifyInMap(5, [1], (x) => x);

/** Empty maps have no keys */

// @ts-expect-error
modifyInMap({}, ["a"]);

// @ts-expect-error
modifyInMap({}, [1]);

// Unless they have a type
modifyInMap({} as Record<number, number>, [1], (x) => x);
