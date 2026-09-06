import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { migrateV1 } from "../../src/kits/persistence/save-coordinator-kit/kit.js";
const [input, output] = process.argv.slice(2);
if (!input || !output)
  throw new Error(
    "Usage: node tools/migration/migrate-save-v1.mjs input.json output.json",
  );
if (existsSync(output)) throw new Error("Refusing to overwrite output");
writeFileSync(
  output,
  JSON.stringify(migrateV1(JSON.parse(readFileSync(input, "utf8"))), null, 2) +
    "\n",
);
