import fs from "node:fs/promises";
import { createHash } from "node:crypto";
export async function sourceManifest() {
  const files = [];
  async function walk(path) {
    for (const e of await fs.readdir(path, { withFileTypes: true })) {
      const p = path + "/" + e.name;
      if (e.isDirectory()) await walk(p);
      else if (/\.(js|mjs|cjs|json)$/.test(p)) files.push(p);
    }
  }
  for (const root of ["src", "content", "tests", "tools"]) await walk(root);
  files.push(
    "package.json",
    "package-lock.json",
    "vite.config.js",
    "desktop/main.cjs",
    "desktop/preload.cjs",
    "desktop/package.mjs",
  );
  const hashes = {};
  for (const p of files.sort())
    hashes[p] = createHash("sha256")
      .update(await fs.readFile(p))
      .digest("hex");
  return { algorithm: "sha256", files: hashes };
}
