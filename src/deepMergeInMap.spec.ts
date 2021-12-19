import deepMergeInMap from "./deepMergeInMap";

describe("mergeInMapDeep", () => {
  it("merges items in the map deeply", () => {
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

  it("accepts an object to merge instead of a function", () => {
    const map = { x: { value: 10 }, y: { value: 20 } };
    const out = deepMergeInMap(map, "x", { value: 11 });
    expect(out).toEqual({ x: { value: 11 }, y: { value: 20 } });
  });

  it("does not modify objects not specified", () => {
    const map = { x: { value: 1 }, y: { value: 2 } };
    const out = deepMergeInMap(map, "x", { value: 3 });
    expect(out.x).not.toEqual(map.x);
    expect(out.y).toEqual(map.y);
  });

  it("does not modify the original map", () => {
    const map = { x: { value: 1 }, y: { value: 2 } };
    const out = deepMergeInMap(map, "x", { value: 3 });
    expect(map).toEqual({ x: { value: 1 }, y: { value: 2 } });
    expect(out).toEqual({ x: { value: 3 }, y: { value: 2 } });
  });

  it("supports compute functions that return objects to merge", () => {
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
    const out = deepMergeInMap(map, "x", () => ({
      y: { z: ({ zNum }) => ({ zNum: zNum + 1 }) },
    }));
    expect(out).toEqual({
      x: {
        xStr: "foo",
        xNum: 1,
        y: {
          yStr: "bar",
          yNum: 2,
          z: {
            zStr: "baz",
            zNum: 4,
          },
        },
      },
    });
  });

  it("supports compute functions that return primitives", () => {
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
    const out = deepMergeInMap(map, "x", () => ({
      y: { z: { zNum: (n) => n + 1 } },
    }));
    expect(out).toEqual({
      x: {
        xStr: "foo",
        xNum: 1,
        y: {
          yStr: "bar",
          yNum: 2,
          z: {
            zStr: "baz",
            zNum: 4,
          },
        },
      },
    });
  });

  it("works as expected with null", () => {
    const map: Record<string, { p: { value: number } | null }> = {
      x: { p: { value: 1 } },
      y: { p: { value: 2 } },
    };
    const out = deepMergeInMap(map, "x", () => ({ p: null }));
    expect(out).toEqual({
      x: { p: null },
      y: { p: { value: 2 } },
    });
  });

  it("work as expected with undefined", () => {
    const map: Record<string, { p?: { value: number } }> = {
      x: { p: { value: 1 } },
      y: { p: { value: 2 } },
    };
    const out = deepMergeInMap(map, "x", () => ({ p: undefined }));
    expect(out).toEqual({
      x: { p: undefined },
      y: { p: { value: 2 } },
    });
    expect(typeof out.x.p).toEqual("undefined");
    expect(new Set(Object.keys(out.x)).has("p")).toEqual(true);
  });

  it("always returns a new object reference", () => {
    const map: Record<string, { p?: { value: number } }> = {
      x: { p: { value: 1 } },
      y: { p: { value: 2 } },
    };
    const out = deepMergeInMap(map, "x", () => ({}));
    expect(out.x === map.x).toEqual(false);
    expect(out.y === map.y).toEqual(true);
  });

  it("replaces arrays instead of attempting to merge them", () => {
    const map: Record<string, { value: number[] }> = {
      x: { value: [1, 2, 3] },
      y: { value: [4, 5, 6] },
    };
    const out = deepMergeInMap(map, "x", () => ({ value: [7, 8, 9] }));
    expect(out.x.value).toEqual([7, 8, 9]);
  });

  it("replaces sets instead of attempting to merge them", () => {
    const map: Record<string, { value: Set<number> }> = {
      x: { value: new Set([1, 2, 3]) },
      y: { value: new Set([4, 5, 6]) },
    };
    const out = deepMergeInMap(map, "x", () => ({ value: new Set([7, 8, 9]) }));
    expect(out.x.value).toEqual(new Set([7, 8, 9]));
  });
});
