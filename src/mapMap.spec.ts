import mapMap from "./mapMap";

describe("mapMap", () => {
  it("transforms a map as expected", () => {
    const map = { a: 1, b: 2, c: 3 };
    const out = mapMap(map, (n) => n * 2);
    expect(out).toEqual({ a: 2, b: 4, c: 6 });
  });

  it("does not modify the original map", () => {
    const map = { a: 1, b: 2, c: 3 };
    const out = mapMap(map, (n) => n * 2);
    expect(map).toEqual({ a: 1, b: 2, c: 3 });
    expect(out).toEqual({ a: 2, b: 4, c: 6 });
  });

  it("does not modify object references in the original map", () => {
    const a = { value: 1 };
    const b = { value: 2 };
    const c = { value: 3 };
    const map = { a, b, c };
    const out = mapMap(map, (item) => ({ value: item.value * 2 }));
    expect(map).toEqual({ a: { value: 1 }, b: { value: 2 }, c: { value: 3 } });
    expect(out).toEqual({ a: { value: 2 }, b: { value: 4 }, c: { value: 6 } });
    expect(map.a === a).toBe(true);
    expect(map.b === b).toBe(true);
    expect(map.c === c).toBe(true);
    expect(out.a === a).toBe(false);
    expect(out.b === b).toBe(false);
    expect(out.c === c).toBe(false);
  });
});
