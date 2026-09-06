import { files, root } from "../authoring/support.mjs";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
export function check() {
  let count = 0;
  for (const path of files("src").filter((p) => p.endsWith(".js"))) {
    const text = readFileSync(resolve(root, path), "utf8");
    if (/nexusengine\/(src|internal)\//.test(text))
      throw new Error("Private Nexus import " + path);
    if (
      path.startsWith("src/domains/") &&
      /from ["'](?:three|.*providers\/)/.test(text)
    )
      throw new Error("Provider import in domain " + path);
    if (path.startsWith("src/domains/")) {
      const owner = path.split("/")[2];
      for (const m of text.matchAll(/from\s+["']([^"']+)["']/g)) {
        if (!m[1].startsWith(".")) continue;
        const target = resolve(root, path, "..", m[1]);
        const other = target.match(/\/src\/domains\/([^/]+)\//)?.[1];
        if (other && other !== owner)
          throw new Error("Private cross-domain import " + path);
      }
    }
    count++;
  }
  return { checked: count };
}
if (process.argv[1]?.endsWith("check-boundaries.mjs")) console.log(check());
