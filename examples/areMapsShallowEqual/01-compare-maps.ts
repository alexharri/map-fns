import { areMapsShallowEqual } from "map-fns";

const a1 = { a: 1, b: 2, c: 3 };
const b1 = { a: 1, b: 2, c: 3 };

areMapsShallowEqual(a1, b1);
//=> true

const a2 = { a: 1, b: 2, c: 3 };
const b2 = { a: 1, b: 2 };

areMapsShallowEqual(a2, b2);
//=> false

const a3 = { a: 1, b: 2, c: 3 };
const b3 = { a: 1, b: 2, c: 30 };

areMapsShallowEqual(a3, b3);
//=> false
