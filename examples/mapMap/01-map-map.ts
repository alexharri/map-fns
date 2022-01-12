import { mapMap } from "map-fns";

const map = {
  a: 1,
  b: 2,
  c: 3,
};

mapMap(map, (n) => n * 2);
//=> {
//     a: 2,
//     b: 4,
//     c: 6,
//   }
