import partialMap from "./partialMap";

describe("partialMap", () => {
  it("returns a partial map", () => {
    const map = { a: 1, b: 2, c: 3 };
    expect(partialMap(map, ["a", "c"])).toEqual({ a: 1, c: 3 });
  });

  it("returns an empty object if no keys are provided", () => {
    const map = { a: 1, b: 2, c: 3 };
    expect(partialMap(map, [])).toEqual({});
  });

  it("does not modify the original map", () => {
    const map = { a: 1, b: 2, c: 3 };
    expect(partialMap(map, ["a", "b"])).toEqual({ a: 1, b: 2 });
    expect(map).toEqual({ a: 1, b: 2, c: 3 });
  });

  it("does not modify object references", () => {
    const a = { value: 1 };
    const b = { value: 2 };
    const c = { value: 3 };
    const map = { a, b, c };
    const out = partialMap(map, ["b", "c"]);
    expect(out).toEqual({ b, c });
    expect(map.a === a).toEqual(true);
    expect(map.b === b).toEqual(true);
    expect(map.c === c).toEqual(true);
    expect(map.b === out.b).toEqual(true);
    expect(map.c === out.c).toEqual(true);
    expect(map.a === out.b).toEqual(false); // Sanity check
  });
});
