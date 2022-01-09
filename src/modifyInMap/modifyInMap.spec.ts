import modifyInMap from "./modifyInMap";

describe("modifyInMap", () => {
  it("accepts a single key", () => {
    const out = modifyInMap({ a: 1, b: 2 }, "b", (n) => n + 1);
    expect(out).toEqual({ a: 1, b: 3 });
  });

  it("accepts an array of keys", () => {
    const out = modifyInMap({ a: 1, b: 2 }, ["b"], (n) => n + 1);
    expect(out).toEqual({ a: 1, b: 3 });
  });

  it("creates a new map", () => {
    const original: Record<string, string> = {};
    const out = modifyInMap(original, [], (x) => x);
    expect(original === out).toBe(false);
  });

  it("throws if a key does not exist in the map", () => {
    const original: Record<string, number> = { a: 1, b: 2 };
    expect(() => modifyInMap(original, ["c"], (n) => n + 1)).toThrow(
      "Key 'c' does not exist in map."
    );
  });

  it("does not modify the original map", () => {
    const original = { a: 1, b: 2 };
    const out = modifyInMap(original, "b", (n) => n + 1);

    expect(out).toEqual({ a: 1, b: 3 });
    expect(original).toEqual({ a: 1, b: 2 });
  });

  it("allows merging via destructuring", () => {
    const original = {
      alex: {
        person: { name: "Alex", age: 24 },
        job: { title: "Software Engineer" },
      },
      john: {
        person: { name: "John doe", age: 27 },
        job: { title: "UI Designer" },
      },
    };

    const out = modifyInMap(original, "alex", (item) => ({
      ...item,
      person: {
        ...item.person,
        age: item.person.age + 1,
      },
    }));

    expect(out).toEqual({
      alex: {
        person: { name: "Alex", age: 25 },
        job: { title: "Software Engineer" },
      },
      john: {
        person: { name: "John doe", age: 27 },
        job: { title: "UI Designer" },
      },
    });
    expect(out.alex === original.alex).toBe(false);
    expect(out.alex.job === original.alex.job).toBe(true);
    expect(out.john === original.john).toBe(true);
  });

  it("does not modify object references in the original map", () => {
    const original = { a: { value: 1 }, b: { value: 2 } };
    const out = modifyInMap(original, "b", (obj) => ({ value: obj.value + 1 }));

    expect(out.a === original.a).toBe(true);
    expect(out.b === original.b).toBe(false);

    expect(out).toEqual({ a: { value: 1 }, b: { value: 3 } });
    expect(original).toEqual({ a: { value: 1 }, b: { value: 2 } });
  });

  it("modifies a maps' string keys when number keys are provided", () => {
    const original: Record<number, string> = { "1": "foo", "2": "bar" };
    const out = modifyInMap(original, 2, (str) => str + "baz");
    expect(out).toEqual({ "1": "foo", "2": "barbaz" });
  });

  it("modifies a maps' number keys when string keys are provided", () => {
    const original: Record<string, string> = { [1]: "foo", [2]: "bar" };
    const out = modifyInMap(original, "2", (str) => str + "baz");
    expect(out).toEqual({ "1": "foo", "2": "barbaz" });
  });
});
