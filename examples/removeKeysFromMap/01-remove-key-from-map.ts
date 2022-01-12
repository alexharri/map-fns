import { removeKeysFromMap } from "map-fns";

const map = {
  a: 1,
  b: 2,
  c: 3,
};

removeKeysFromMap(map, "c");
//=> {
//     a: 1,
//     b: 2,
//   }
