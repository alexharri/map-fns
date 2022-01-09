import fs from "fs";
import path from "path";

const srcDir = path.resolve(__dirname, "../src");
const distDir = path.resolve(__dirname, "../dist");

const allFileNames = fs.readdirSync(srcDir);
const allFileNamesSet = new Set(allFileNames);

const fnFileNames = allFileNames.filter((fileName) => {
  if (fileName.endsWith(".spec.ts") || fileName.endsWith(".typecheck.ts")) {
    return false;
  }

  if (!fileName.endsWith(".ts")) {
    return false;
  }

  const withoutDotTs = fileName.split(".ts")[0];

  const hasSpecTs = allFileNamesSet.has(`${withoutDotTs}.spec.ts`);
  const hasTypecheckTs = allFileNamesSet.has(`${withoutDotTs}.typecheck.ts`);

  if (!hasSpecTs || !hasTypecheckTs) {
    return false;
  }

  return true;
});

console.log("Found source .ts files for the following functions:\n");
console.log(
  fnFileNames.map((fileName) => `\t${fileName.split(".ts")[0]}`).join("\n")
);
console.log(
  "\nChecking that .js, .esm.js and .d.ts files were emitted to ~/dist for each function (and index).\n"
);

const fileNamesToCheck = ["index.ts", ...fnFileNames];

for (const fileName of fileNamesToCheck) {
  const withoutDotTs = fileName.split(".ts")[0];

  for (const ext of [".js", ".esm.js", ".d.ts"]) {
    const filePath = path.resolve(distDir, `./${withoutDotTs}${ext}`);

    if (!fs.existsSync(filePath)) {
      throw new Error(`Expected '${ext}' file for function '${withoutDotTs}'.`);
    }
  }

  console.log(`\t✔ ${withoutDotTs}`);
}

console.log("\nEnsuring that the index.js file exports every function.\n");

const indexCjsFilePath = path.resolve(distDir, "./index.js");
const indexEsmFilePath = path.resolve(distDir, "./index.esm.js");
const indexDtsFilePath = path.resolve(distDir, "./index.d.ts");

const indexCjsContent = fs.readFileSync(indexCjsFilePath, "utf8");
const indexCjsExportStatementSet = new Set(
  indexCjsContent.split("\n").filter((line) => line.startsWith("exports."))
);
const indexEsmContent = fs.readFileSync(indexEsmFilePath, "utf8");

for (const fileName of fnFileNames) {
  const withoutDotTs = fileName.split(".ts")[0];
  if (
    !indexCjsExportStatementSet.has(
      `exports.${withoutDotTs} = ${withoutDotTs};`
    )
  ) {
    throw new Error(
      `Did not find export statement in index.js bundle for '${withoutDotTs}'.`
    );
  }

  console.log(`\t✔ ${withoutDotTs}`);
}

console.log("\nEnsuring that the index.esm.js file exports every function.\n");

{
  // Check that index.esm.js contains every export that it should
  const line = indexEsmContent
    .split("\n")
    .find((line) => line.startsWith("export {"));
  const exports = new Set(
    line
      .split("export {")[1]
      .split("}")[0]
      .split(",")
      .map((str) => str.trim())
      .filter(Boolean)
  );

  for (const fileName of fnFileNames) {
    const withoutDotTs = fileName.split(".ts")[0];
    if (!exports.has(withoutDotTs)) {
      throw new Error(
        `Expected index.esm.js to export function '${withoutDotTs}'.`
      );
    }

    console.log(`\t✔ ${withoutDotTs}`);
  }
}

console.log("\nEnsuring that the index.d.ts file exports every function.\n");

const indexDtsContent = fs.readFileSync(indexDtsFilePath, "utf8");
const indexDtsExportStatementSet = new Set(
  indexDtsContent
    .split("\n")
    .filter((line) => line.startsWith("export { default as "))
);

for (const fileName of fnFileNames) {
  const withoutDotTs = fileName.split(".ts")[0];
  if (
    !indexDtsExportStatementSet.has(
      `export { default as ${withoutDotTs} } from "./${withoutDotTs}";`
    )
  ) {
    throw new Error(
      `Did not find export statement in index.d.ts bundle for '${withoutDotTs}'.`
    );
  }

  console.log(`\t✔ ${withoutDotTs}`);
}
