import { areMapsShallowEqual } from "map-fns";

const a1 = { a: { id: "a", value: 1 } };
const b1 = { a: { id: "a", value: 1 } };

// Since `a1.a` and `b1.a` are different object references, comparing
// them via `===` returns false.

areMapsShallowEqual(a1, b1);
//=> false

const a = { id: "a", value: 1 };
const a2 = { a };
const b2 = { a };

// Since `a2.a` and `b2.a` are the same object reference, comparing
// them via `===` returns true.

areMapsShallowEqual(a2, b2);
//=> true
