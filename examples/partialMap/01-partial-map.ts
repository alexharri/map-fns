import { partialMap } from "map-fns";

const map = {
  a: 1,
  b: 2,
  c: 3,
};

partialMap(map, ["a", "b"]);
//=> {
//     a: 1,
//     b: 2,
//   }
