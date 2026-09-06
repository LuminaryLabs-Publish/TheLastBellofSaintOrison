import {
  readFileSync,
  existsSync,
  mkdirSync,
  renameSync,
  rmSync,
} from "node:fs";
import { resolve, dirname, relative } from "node:path";
import { root, read, write, files, slug, validate } from "./support.mjs";
export function inputFile(options) {
  if (!options.input) throw new Error("Required --input <JSON specification>");
  return JSON.parse(readFileSync(resolve(options.input), "utf8"));
}
export function createPackage(kind, spec) {
  slug(spec.id);
  const target =
    kind === "domain"
      ? "src/domains/" + spec.id
      : kind === "service"
        ? "src/domains/" + slug(spec.domain) + "/kits/" + spec.id + "-kit"
        : "src/kits/locations/" + spec.id;
  if (existsSync(resolve(root, target)))
    throw new Error("Refusing to overwrite " + target);
  if (
    kind === "service" &&
    !existsSync(resolve(root, "src/domains/" + spec.domain + "/manifest.js"))
  )
    throw new Error("Owning domain must exist");
  const template = "tools/authoring/templates/" + kind;
  const temp = target + ".creating";
  if (existsSync(resolve(root, temp)))
    throw new Error("Unfinished creation exists: " + temp);
  const replacements = {
    OWNERAPI:
      "orison" +
      (spec.domain ?? spec.id)
        .split("-")
        .map((s) => s[0].toUpperCase() + s.slice(1))
        .join(""),
    LOCAPI: spec.id
      .split("-")
      .map((s) => s[0].toUpperCase() + s.slice(1))
      .join(""),
    ID: spec.id,
    API:
      "orison" +
      spec.id
        .split("-")
        .map((s) => s[0].toUpperCase() + s.slice(1))
        .join(""),
    DOMAIN: spec.domain ?? spec.id,
    DESCRIPTION:
      spec.description ??
      "Implementation scope must be completed before activation.",
    INITIAL: JSON.stringify(spec.initialState ?? {}),
  };
  try {
    for (const path of files(template)) {
      const rel = path.slice(template.length + 1).replace(/\.tmpl$/, "");
      let body = readFileSync(resolve(root, path), "utf8");
      body = body.replace(/\{\{([A-Z]+)\}\}/g, (_, k) => {
        if (!(k in replacements))
          throw new Error("Unknown template token " + k);
        return replacements[k];
      });
      write(temp + "/" + rel, body);
    }
    if (kind === "location") {
      for (const [key, value] of Object.entries(spec.content ?? {})) {
        if (
          ![
            "location",
            "objects",
            "investigations",
            "puzzles",
            "dialogue",
            "observations",
            "choices",
            "pressure",
            "presentation",
          ].includes(key)
        )
          throw new Error("Unknown location content field");
        write(temp + "/content/" + key + ".json", value);
      }
      const required = [
        "location",
        "objects",
        "investigations",
        "puzzles",
        "dialogue",
        "observations",
        "choices",
        "pressure",
        "presentation",
      ];
      for (const key of required) {
        if (!spec.content?.[key]) throw new Error("Missing authored " + key);
        validate(
          {
            objects: "object",
            investigations: "investigation",
            puzzles: "puzzle",
            observations: "observation",
            choices: "choice",
          }[key] ?? key,
          spec.content[key],
          key,
        );
      }
      if (spec.content.location.id !== spec.id)
        throw new Error("Location ID mismatch");
    }
    mkdirSync(dirname(resolve(root, target)), { recursive: true });
    renameSync(resolve(root, temp), resolve(root, target));
  } catch (error) {
    rmSync(resolve(root, temp), { recursive: true, force: true });
    throw error;
  }
  return {
    created: target,
    status: "scaffold",
    next: "Complete declared behavior and acceptance, then mark manifest implemented and run build-catalog/content:build. Location activation also requires adding its ID to campaign.json.",
  };
}
