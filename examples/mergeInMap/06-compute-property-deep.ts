import { mergeInMap } from "map-fns";

interface Field {
  type: "text" | "number";
  dimensions: {
    width: number;
    height: number;
  };
}

const fieldMap: Record<string, Field> = {
  name: {
    type: "text",
    dimensions: { height: 30, width: 200 },
  },
  age: {
    type: "number",
    dimensions: { height: 30, width: 75 },
  },
};

// Increase field widths by 50

mergeInMap(fieldMap, ["name", "age"], {
  dimensions: {
    width: (width) => width + 50,
  },
});
//=> {
//     name: {
//       type: "text",
//       dimensions: { height: 30, width: 250 },
//     },
//     age: {
//       type: "number",
//       dimensions: { height: 30, width: 125 },
//     },
//   }
