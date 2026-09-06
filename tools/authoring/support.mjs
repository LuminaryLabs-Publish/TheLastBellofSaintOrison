import {
  readFileSync,
  writeFileSync,
  readdirSync,
  existsSync,
  mkdirSync,
} from "node:fs";
import { resolve, dirname } from "node:path";
import { pathToFileURL } from "node:url";
import Ajv from "ajv";
export const root = resolve(
  process.env.ORISON_AUTHOR_ROOT ?? new URL("../..", import.meta.url).pathname,
);
export const read = (p) => JSON.parse(readFileSync(resolve(root, p), "utf8"));
export function write(p, value) {
  const file = resolve(root, p);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(
    file,
    typeof value === "string" ? value : JSON.stringify(value, null, 2) + "\n",
  );
}
export function files(dir) {
  if (!existsSync(resolve(root, dir))) return [];
  return readdirSync(resolve(root, dir), { withFileTypes: true }).flatMap(
    (e) => (e.isDirectory() ? files(dir + "/" + e.name) : [dir + "/" + e.name]),
  );
}
export function validate(schema, value, label) {
  const fn = new Ajv({ allErrors: true, strict: false }).compile(
    read("schemas/" + schema + ".schema.json"),
  );
  if (!fn(value)) throw new Error(label + ": " + JSON.stringify(fn.errors));
}
export async function manifests() {
  const found = [];
  for (const p of files("src").filter((p) => p.endsWith("/manifest.js"))) {
    const { manifest } = await import(pathToFileURL(resolve(root, p)));
    if (manifest) found.push({ ...manifest, path: p.slice(0, -12) });
  }
  return found.sort((a, b) => a.id.localeCompare(b.id));
}
export function args(argv) {
  const result = {};
  for (let i = 0; i < argv.length; i++) {
    if (
      !argv[i].startsWith("--") ||
      !argv[i + 1] ||
      argv[i + 1].startsWith("--")
    )
      throw new Error("Expected --name value");
    result[argv[i].slice(2)] = argv[++i];
  }
  return result;
}
export function slug(id) {
  if (typeof id !== "string" || !/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(id))
    throw new Error("Use a stable lowercase hyphenated ID");
  return id;
}
