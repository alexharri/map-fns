import { mergeInMap } from "map-fns";

const map: Record<string, { curr: number; prev: number[] }> = {
  a: { prev: [20, 18, 15], curr: 12 },
  b: { prev: [15, 24, 24], curr: 20 },
  c: { prev: [79, 70, 68], curr: 64 },
};

// Add entry to c

mergeInMap(map, "c", (item) => {
  return {
    prev: [...item.prev.slice(1), item.curr],
    curr: 60,
  };
});
//=> {
//     a: { prev: [20, 18, 15], curr: 12 },
//     b: { prev: [15, 24, 24], curr: 20 },
//     c: { prev: [70, 68, 64], curr: 60 },
//   }
