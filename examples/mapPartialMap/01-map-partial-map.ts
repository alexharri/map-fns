import { mapPartialMap } from "map-fns";

const map = {
  a: 1,
  b: 2,
  c: 3,
};

mapPartialMap(map, ["a", "c"], (n) => n * 10);
//=> {
//     a: 10,
//     c: 30,
//   }
