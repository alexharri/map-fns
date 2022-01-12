import { mapEntries } from "map-fns";

const map = { a: 1, b: 2, c: 3 };

// The order of the keys determines the order of the entries

mapEntries(map, ["c", "b"]);
//=> [
//     ["c", 3]
//     ["b", 2],
//   ]
