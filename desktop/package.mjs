import fs from "node:fs/promises";
import { packager } from "@electron/packager";
import path from "node:path";
const stage = path.resolve("desktop/out/stage");
await fs.mkdir(stage, { recursive: true });
for (const name of ["dist", "desktop/main.cjs", "desktop/preload.cjs"]) {
  await fs.mkdir(path.dirname(path.join(stage, name)), { recursive: true });
  await fs.cp(name, path.join(stage, name), { recursive: true });
}
await fs.writeFile(
  path.join(stage, "package.json"),
  JSON.stringify(
    {
      name: "saint-orison",
      productName: "The Last Bell of Saint Orison",
      version: "0.1.0",
      main: "desktop/main.cjs",
    },
    null,
    2,
  ),
);
const platform = process.argv[2] ?? process.platform;
console.log(
  await packager({
    dir: stage,
    name: "SaintOrison",
    platform,
    arch: "x64",
    electronVersion: "44.2.0",
    out: "desktop/out/packages",
    overwrite: true,
    asar: true,
  }),
);
