import mergeInMap from "./mergeInMap";

describe("mergeInMap", () => {
  it("accepts a single key", () => {
    const out = mergeInMap(
      { a: { p0: 1, p2: 1 }, b: { p0: 2, p1: 2 } },
      "b",
      (item) => ({ p0: item.p0 + 1 })
    );
    expect(out).toEqual({ a: { p0: 1, p2: 1 }, b: { p0: 3, p1: 2 } });
  });

  it("accepts an array of keys", () => {
    const out = mergeInMap(
      { a: { p0: 1, p2: 1 }, b: { p0: 2, p1: 2 } },
      ["a", "b"],
      (item) => ({ p0: item.p0 + 1 })
    );
    expect(out).toEqual({ a: { p0: 2, p2: 1 }, b: { p0: 3, p1: 2 } });
  });

  it("creates a new map", () => {
    const original: Record<string, {}> = {};
    const out = mergeInMap(original, [], (x) => x);
    expect(original === out).toBe(false);
  });

  it("throws if a key does not exist in the map", () => {
    const original: Record<string, {}> = { a: {}, b: {} };
    expect(() => mergeInMap(original, ["c"], (x) => x)).toThrow(
      "Key 'c' does not exist in map."
    );
  });

  it("does not modify the original map", () => {
    const original = { a: { value: 1 }, b: { value: 2 } };
    const out = mergeInMap(original, "b", () => ({ value: 3 }));

    expect(out).toEqual({ a: { value: 1 }, b: { value: 3 } });
    expect(original).toEqual({ a: { value: 1 }, b: { value: 2 } });
  });

  it("does not modify object references in the original map that were not specified in keys", () => {
    const original = { a: { value: 1 }, b: { value: 2 } };
    const out = mergeInMap(original, "b", () => ({ value: 3 }));

    expect(out.a === original.a).toBe(true);
    expect(out.b === original.b).toBe(false);

    expect(out).toEqual({ a: { value: 1 }, b: { value: 3 } });
    expect(original).toEqual({ a: { value: 1 }, b: { value: 2 } });
  });

  it("modifies a maps' string keys when number keys are provided", () => {
    const original: Record<number, { text: string }> = {
      "1": { text: "foo" },
      "2": { text: "bar" },
    };
    const out = mergeInMap(original, 2, () => ({ text: "baz" }));
    expect(out).toEqual({
      "1": { text: "foo" },
      "2": { text: "baz" },
    });
  });

  it("modifies a maps' number keys when string keys are provided", () => {
    const original: Record<string, { text: string }> = {
      [1]: { text: "foo" },
      [2]: { text: "bar" },
    };
    const out = mergeInMap(original, "2", () => ({ text: "baz" }));
    expect(out).toEqual({
      [1]: { text: "foo" },
      [2]: { text: "baz" },
    });
  });

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
    const out = mergeInMap(map, "x", (item) => ({
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
    const out = mergeInMap(map, "x", { value: 11 });
    expect(out).toEqual({ x: { value: 11 }, y: { value: 20 } });
  });

  it("does not modify objects not specified", () => {
    const map = { x: { value: 1 }, y: { value: 2 } };
    const out = mergeInMap(map, "x", { value: 3 });
    expect(out.x).not.toEqual(map.x);
    expect(out.y).toEqual(map.y);
  });

  it("does not modify the original map", () => {
    const map = { x: { value: 1 }, y: { value: 2 } };
    const out = mergeInMap(map, "x", { value: 3 });
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
    const out = mergeInMap(map, "x", () => ({
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
    const out = mergeInMap(map, "x", () => ({
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
    const out = mergeInMap(map, "x", () => ({ p: null }));
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
    const out = mergeInMap(map, "x", () => ({ p: undefined }));
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
    const out = mergeInMap(map, "x", () => ({}));
    expect(out.x === map.x).toEqual(false);
    expect(out.y === map.y).toEqual(true);
  });

  it("replaces arrays instead of attempting to merge them", () => {
    const map: Record<string, { value: number[] }> = {
      x: { value: [1, 2, 3] },
      y: { value: [4, 5, 6] },
    };
    const out = mergeInMap(map, "x", () => ({ value: [7, 8, 9] }));
    expect(out.x.value).toEqual([7, 8, 9]);
  });

  it("replaces sets instead of attempting to merge them", () => {
    const map: Record<string, { value: Set<number> }> = {
      x: { value: new Set([1, 2, 3]) },
      y: { value: new Set([4, 5, 6]) },
    };
    const out = mergeInMap(map, "x", () => ({ value: new Set([7, 8, 9]) }));
    expect(out.x.value).toEqual(new Set([7, 8, 9]));
  });

  test("compute functions for objects work as expected when multiple keys are provided", () => {
    const map = { x: { p: { value: 1 } }, y: { p: { value: 2 } } };
    const out = mergeInMap(map, ["x", "y"], {
      p: ({ value }) => ({ value: value + 1 }),
    });
    expect(out).toEqual({ x: { p: { value: 2 } }, y: { p: { value: 3 } } });
  });

  test("compute functions for primitives work as expected when multiple keys are provided", () => {
    const map = { x: { p: { value: 1 } }, y: { p: { value: 2 } } };
    const out = mergeInMap(map, ["x", "y"], {
      p: { value: (value) => value + 1 },
    });
    expect(out).toEqual({ x: { p: { value: 2 } }, y: { p: { value: 3 } } });
  });

  test("WIP: nested compute functions work", () => {
    const map = { x: { p: { value: 1 } }, y: { p: { value: 2 } } };
    const out = mergeInMap(map, ["x", "y"], {
      p: { value: (value) => value + 1 },
    });
    expect(out).toEqual({ x: { p: { value: 2 } }, y: { p: { value: 3 } } });
  });
});
