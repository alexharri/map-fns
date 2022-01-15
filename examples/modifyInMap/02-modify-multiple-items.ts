import { modifyInMap } from "map-fns";

const map = {
  a: 1,
  b: 2,
  c: 3,
};

modifyInMap(map, ["a", "c"], (n) => n * 10);
//=> {
//     a: 10,
//     b: 2,
//     c: 30,
//   }
