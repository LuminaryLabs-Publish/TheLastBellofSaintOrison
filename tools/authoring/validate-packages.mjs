import { manifests, files, read, validate, root } from "./support.mjs";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
export async function run() {
  const catalog = await manifests();
  const ids = new Set();
  for (const m of catalog) {
    validate("package", m, m.id);
    if (ids.has(m.id)) throw new Error("Duplicate package " + m.id);
    ids.add(m.id);
    const expected =
      m.kind === "domain"
        ? [
            "README.md",
            "manifest.js",
            "index.js",
            "domain-kit.js",
            "contracts.js",
            "state.js",
            "validation.js",
            "lifecycle.js",
            "snapshot.js",
            "tests/contracts.test.mjs",
            "tests/acceptance.json",
          ]
        : m.kind === "service"
          ? [
              "README.md",
              "manifest.js",
              "index.js",
              "kit.js",
              "service.js",
              "operations.js",
              "tests/acceptance.json",
            ]
          : m.kind === "location"
            ? [
                "README.md",
                "manifest.js",
                "index.js",
                "kit.js",
                "bindings.js",
                "lifecycle.js",
                ...[
                  "location",
                  "objects",
                  "investigations",
                  "puzzles",
                  "dialogue",
                  "observations",
                  "choices",
                  "pressure",
                  "presentation",
                ].map((x) => "content/" + x + ".json"),
                ...["entry", "investigations", "exit", "recovery"].map(
                  (x) => "sequences/" + x + ".json",
                ),
                "assets/manifest.json",
                "assets/bindings.json",
                "assets/README.md",
                "tests/fixtures.json",
                "tests/acceptance.json",
                "tests/location.test.mjs",
                ...[
                  "design",
                  "writing",
                  "assets",
                  "implementation",
                  "validation",
                ].map((x) => "tasks/" + x + ".md"),
              ]
            : [
                "README.md",
                "manifest.js",
                "index.js",
                "kit.js",
                "bindings.js",
                "tests/acceptance.json",
              ];
    for (const p of expected)
      if (!existsSync(resolve(root, m.path, p)))
        throw new Error("Missing package file " + m.path + "/" + p);
  }
  for (const path of files("src/kits/locations").filter((p) =>
    /\/content\/.*\.json$/.test(p),
  )) {
    const name = path.split("/").at(-1).slice(0, -5);
    validate(
      {
        objects: "object",
        investigations: "investigation",
        puzzles: "puzzle",
        observations: "observation",
        choices: "choice",
      }[name] ?? name,
      read(path),
      path,
    );
  }
  for (const path of files("src/kits/locations").filter((p) =>
    /\/sequences\/.*\.json$/.test(p),
  ))
    validate("sequence", read(path), path);
  for (const path of files("src/kits/locations").filter((p) =>
    p.endsWith("/assets/manifest.json"),
  ))
    validate("asset", read(path), path);
  validate("campaign", read("content/progression/campaign.json"), "campaign");
  return {
    packages: catalog.length,
    scaffolds: catalog.filter((m) => m.status === "scaffold").length,
  };
}
