import removeKeysFromMap from "./removeKeysFromMap";

describe("removeKeysFromMap", () => {
  it("removes keys as expected", () => {
    const out = removeKeysFromMap({ a: 1, b: 2 }, "b");
    expect(out).toEqual({ a: 1 });
  });

  it("does not modify the original object", () => {
    const original = { a: 1, b: 2 };
    const out = removeKeysFromMap(original, "b");
    expect(original).toEqual({ a: 1, b: 2 });
    expect(out).toEqual({ a: 1 });
  });

  it("works on number keys", () => {
    const out = removeKeysFromMap({ 1: "a", 2: "b" }, 2);
    expect(out).toEqual({ 1: "a" });
  });

  it("works with arrays of keys", () => {
    const out = removeKeysFromMap({ a: 1, b: 2, c: 3 }, ["a", "c"]);
    expect(out).toEqual({ b: 2 });
  });

  it("works with arrays of number keys", () => {
    const out = removeKeysFromMap({ 1: "a", 2: "b", 3: "c" }, [1, 3]);
    expect(out).toEqual({ 2: "b" });
  });
});
