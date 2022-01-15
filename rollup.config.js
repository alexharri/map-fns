import typescript from "@rollup/plugin-typescript";

const items = [];
const modules = [
  "index",
  "removeKeysFromMap",
  "mergeInMap",
  "modifyInMap",
  "addListToMap",
  "mapMap",
  "mapEntries",
  "areMapsShallowEqual",
  "partialMap",
  "mapPartialMap",
];

for (const module of modules) {
  const input =
    module === "index" ? `src/${module}.ts` : `src/${module}/index.ts`;
  const output = module === "index" ? `dist/${module}` : `dist/${module}/index`;
  items.push({
    input,
    external: [],
    output: [
      { file: `${output}.js`, format: "cjs", exports: "auto" },
      { file: `${output}.esm.js`, format: "es" },
    ],
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
