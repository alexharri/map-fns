import mapPartialMap from "./mapPartialMap";

describe("mapPartialMap", () => {
  it("transforms a map as expected", () => {
    const map = { a: 1, b: 2, c: 3 };
    const keys = Object.keys(map) as Array<keyof typeof map>;
    const out = mapPartialMap(map, keys, (n) => n * 2);
    expect(out).toEqual({ a: 2, b: 4, c: 6 });
  });

  it("does not modify the original map", () => {
    const map = { a: 1, b: 2, c: 3 };
    const keys = Object.keys(map) as Array<keyof typeof map>;
    const out = mapPartialMap(map, keys, (n) => n * 2);
    expect(map).toEqual({ a: 1, b: 2, c: 3 });
    expect(out).toEqual({ a: 2, b: 4, c: 6 });
  });

  it("does not modify object references in the original map", () => {
    const a = { value: 1 };
    const b = { value: 2 };
    const c = { value: 3 };
    const map = { a, b, c };
    const keys = Object.keys(map) as Array<keyof typeof map>;
    const out = mapPartialMap(map, keys, (item) => ({ value: item.value * 2 }));
    expect(map).toEqual({ a: { value: 1 }, b: { value: 2 }, c: { value: 3 } });
    expect(out).toEqual({ a: { value: 2 }, b: { value: 4 }, c: { value: 6 } });
    expect(map.a === a).toBe(true);
    expect(map.b === b).toBe(true);
    expect(map.c === c).toBe(true);
    expect(out.a === a).toBe(false);
    expect(out.b === b).toBe(false);
    expect(out.c === c).toBe(false);
  });

  it("returns a partial map", () => {
    const map = { a: 1, b: 2, c: 3 };
    expect(mapPartialMap(map, ["a", "c"], (n) => n * 10)).toEqual({
      a: 10,
      c: 30,
    });
  });

  it("returns an empty object if no keys are provided", () => {
    const map = { a: 1, b: 2, c: 3 };
    expect(mapPartialMap(map, [], (n) => n * 1)).toEqual({});
  });

  it("throws an error if a key that does not exist in the map is provided", () => {
    const map: Record<string, number> = { a: 1, b: 2, c: 3 };
    expect(() => mapPartialMap(map, ["d"], (n) => n * 10)).toThrow(
      "Key 'd' does not exist in map."
    );
  });
});
