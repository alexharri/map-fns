import { addListToMap } from "map-fns";

const map = {
  a: { id: "a", value: 1 },
  b: { id: "b", value: 2 },
  c: { id: "c", value: 3 },
};

addListToMap(
  map,
  [
    { id: "d", value: 4 },
    { id: "e", value: 5 },
  ],
  "id"
);

//=> {
//     a: { id: "a", value: 1 },
//     b: { id: "b", value: 2 },
//     c: { id: "c", value: 3 },
//     d: { id: "d", value: 4 },
//     e: { id: "e", value: 5 },
//   }
