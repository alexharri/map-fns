import areMapsShallowEqual from "./areMapsShallowEqual";

describe("areMapsShallowEqual", () => {
  it("returns true for the same map", () => {
    const map = { x: { value: 1 }, y: { value: 2 } };
    expect(areMapsShallowEqual(map, map)).toEqual(true);
  });

  it("returns false for maps with no overlap", () => {
    const a: Record<string, { value: number }> = { y: { value: 2 } };
    const b: Record<string, { value: number }> = { x: { value: 1 } };
    expect(areMapsShallowEqual(a, b)).toEqual(false);
  });

  it("returns false for maps with partial overlap", () => {
    const a: Record<string, { value: number }> = {
      y: { value: 2 },
      z: { value: 3 },
    };
    const b: Record<string, { value: number }> = {
      x: { value: 1 },
      y: { value: 2 },
    };
    expect(areMapsShallowEqual(a, b)).toEqual(false);
  });

  it("returns true, even if the maps are different object references", () => {
    const a = { x: { value: 1 }, y: { value: 2 } };
    const b = { ...a };
    expect(areMapsShallowEqual(a, b)).toEqual(true);
  });

  it("returns false when an item in the map is a different object reference", () => {
    const a = { x: { value: 1 }, y: { value: 2 } };
    const b = { ...a, x: { ...a.x } };
    expect(a).toEqual(b);
    expect(areMapsShallowEqual(a, b)).toEqual(false);
  });

  it("correctly compares primitive maps", () => {
    const a = { x: 1, y: 2 };
    const b = { x: 1, y: 2 };
    const c = { y: 2 };
    const d = { x: 1, y: 3 };
    expect(areMapsShallowEqual(a, b)).toEqual(true);
    expect(areMapsShallowEqual(a, c)).toEqual(false);
    expect(areMapsShallowEqual(a, d)).toEqual(false);
  });
});
