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

  it("does not modify objects not specified", () => {
    const map = { x: { value: 1 }, y: { value: 2 } };
    const out = deepMergeInMap(map, "x", () => ({ value: 3 }));
    expect(out.x).not.toEqual(map.x);
    expect(out.y).toEqual(map.y);
  });

  it("does not modify the original map", () => {
    const map = { x: { value: 1 }, y: { value: 2 } };
    const out = deepMergeInMap(map, "x", () => ({ value: 3 }));
    expect(map).toEqual({ x: { value: 1 }, y: { value: 2 } });
    expect(out).toEqual({ x: { value: 3 }, y: { value: 2 } });
  });
});
