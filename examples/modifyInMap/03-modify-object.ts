import { modifyInMap } from "map-fns";

const map = {
  a: { id: "a", value: 1 },
  b: { id: "b", value: 2 },
  c: { id: "c", value: 3 },
};

// Note:  When modifying objects, I would recommend using
//        the `mergeInMap` function instead.

modifyInMap(map, ["a", "c"], (item) => ({ ...item, value: item.value * 10 }));
//=> {
//     a: { id: "a", value: 10 },
//     b: { id: "b", value: 2 },
//     c: { id: "c", value: 30 },
//   }
