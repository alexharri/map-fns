import typescript from "@rollup/plugin-typescript";

const items = [];
const modules = ["index", "removeKeysFromMap"];

for (const module of modules) {
  items.push({
    input: `src/${module}.ts`,
    external: [],
    output: [{ file: `dist/${module}.js`, format: "cjs" }],
    plugins: [
      typescript({
        tsconfig: "./tsconfig.json",

        // Only generate declarations once
        declaration: module === "index",
        declarationDir: module === "index" ? "." : undefined,
      }),
    ],
  });
}

export default items;
