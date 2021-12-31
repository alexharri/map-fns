import mapEntries from "./mapEntries";
import { AnyMap } from "./types";

describe("mapEntries", () => {
  it("returns the entries of a map", () => {
    const entries = mapEntries({ x: 1, y: 2 });
    expect(entries).toEqual([
      ["x", 1],
      ["y", 2],
    ]);
  });

  it("filters the entries if the second keys argument is provided", () => {
    const entries = mapEntries({ x: 1, y: 2, z: 3 }, ["y", "z"]);
    expect(entries).toEqual([
      ["y", 2],
      ["z", 3],
    ]);
  });

  it("returns the entries in the order of the provided keys", () => {
    const map = { x: 1, y: 2, z: 3 };

    expect(mapEntries(map, ["y", "z", "x"])).toEqual([
      ["y", 2],
      ["z", 3],
      ["x", 1],
    ]);
    expect(mapEntries(map, ["z", "y", "x"])).toEqual([
      ["z", 3],
      ["y", 2],
      ["x", 1],
    ]);
  });

  it("returns an empty array if an empty array of keys is provided", () => {
    expect(mapEntries({ x: 1, y: 2, z: 3 }, [])).toEqual([]);
  });

  it("returns an empty array if the map contains no entries", () => {
    expect(mapEntries({})).toEqual([]);
  });

  it("throws an error if a keys contains a key not present in the map", () => {
    const map: Record<string, number> = { x: 1, y: 2 };
    expect(() => mapEntries(map, ["z"])).toThrow(
      "Key 'z' does not exist in map."
    );
  });

  it("retains object references correctly", () => {
    const x = { value: 1 };
    const y = { value: 2 };
    const map = { x, y };
    const out = mapEntries(map);
    expect(out[0][0]).toEqual("x");
    expect(out[0][1] === x).toBe(true);
    expect(out[1][0]).toEqual("y");
    expect(out[1][1] === y).toBe(true);

    // Sanity checks
    expect(out[0][1] === { ...x }).toBe(false);
    expect(out[1][1] === { ...y }).toBe(false);
  });
});
