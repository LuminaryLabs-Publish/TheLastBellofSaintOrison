import { read, write, slug, validate } from "./support.mjs";
import { inputFile } from "./generate.mjs";
export async function run(options) {
  const spec = inputFile(options);
  slug(spec.location);
  slug(spec.id);
  const p = "src/kits/locations/" + spec.location;
  const investigations = read(p + "/content/investigations.json"),
    puzzles = read(p + "/content/puzzles.json"),
    objects = read(p + "/content/objects.json"),
    observations = read(p + "/content/observations.json"),
    bindings = read(p + "/assets/bindings.json");
  if (
    investigations.some((i) => i.id === spec.id) ||
    puzzles.some((i) => i.id === spec.puzzle?.id) ||
    objects.some((i) => i.id === spec.object?.id)
  )
    throw new Error("Refusing duplicate investigation, puzzle or object");
  const investigation = {
    id: spec.id,
    goal: spec.goal,
    required: spec.required,
    puzzleId: spec.puzzle?.id,
    ...(spec.reward ? { reward: spec.reward } : {}),
  };
  const object = { ...spec.object, kind: "puzzle", investigationId: spec.id };
  validate("investigation", [investigation], "investigation");
  validate("puzzle", [spec.puzzle], "puzzle");
  validate("object", [object], "object");
  validate("observation", [{ id: object.id, text: spec.text }], "observation");
  if (!spec.puzzle.answer.every((i) => spec.puzzle.options[i]))
    throw new Error("Invalid answer");
  const updates = {
    "content/investigations.json": [...investigations, investigation],
    "content/puzzles.json": [...puzzles, spec.puzzle],
    "content/objects.json": [...objects, object],
    "content/observations.json": [
      ...observations,
      { id: object.id, text: spec.text },
    ],
    "assets/bindings.json": {
      ...bindings,
      objects: {
        ...bindings.objects,
        [object.id]: {
          assetId: bindings.sceneAsset,
          scale: [1, 1, 1],
          pivot: [0, 0, 0],
          interaction: "object-registry",
        },
      },
    },
  };
  for (const [file, value] of Object.entries(updates))
    write(p + "/" + file, value);
  return {
    added: spec.id,
    location: spec.location,
    next: "npm run content:build; npm run content:check; play the new object before and after the primary puzzle",
  };
}
