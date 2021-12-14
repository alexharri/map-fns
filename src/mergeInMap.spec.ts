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
});
