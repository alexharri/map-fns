import addListToMap from "./addListToMap";

describe("addListToMap", () => {
  it("adds keys as expected", () => {
    const map: Record<string, { id: string }> = { a: { id: "a" } };
    const out = addListToMap(map, [{ id: "b" }], "id");
    expect(out).toEqual({ a: { id: "a" }, b: { id: "b" } });
  });

  it("overrides existing keys", () => {
    const map: Record<string, { id: string; value: number }> = {
      a: { id: "a", value: 1 },
      b: { id: "b", value: 2 },
    };
    const out = addListToMap(map, [{ id: "b", value: 3 }], "id");
    expect(out).toEqual({
      a: { id: "a", value: 1 },
      b: { id: "b", value: 3 },
    });
  });
});
