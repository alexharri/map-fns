import deepMergeInMap from "./deepMergeInMap";

describe("mergeInMapDeep", () => {
  it("work as expected", () => {
    const map = {
      x: {
        xStr: "foo",
        xNum: 1,
        y: {
          yStr: "bar",
          yNum: 2,
          z: {
            zStr: "baz",
            zNum: 3,
          },
        },
      },
    };
    const out = deepMergeInMap(map, "x", (item) => ({
      y: {
        yStr: item.y.yStr + "bar",
        z: {
          zNum: 4,
        },
      },
    }));
    expect(out).toEqual({
      x: {
        xStr: "foo",
        xNum: 1,
        y: {
          yStr: "barbar",
          yNum: 2,
          z: {
            zStr: "baz",
            zNum: 4,
          },
        },
      },
    });
  });
});
