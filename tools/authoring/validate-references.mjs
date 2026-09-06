import { read } from "./support.mjs";
export async function run() {
  const campaign = read("content/progression/campaign.json"),
    items = read("content/shared/items.json");
  const clues = new Set(),
    pending = [];
  for (const id of campaign.locations) {
    const p = "src/kits/locations/" + id;
    const objects = read(p + "/content/objects.json"),
      observations = read(p + "/content/observations.json"),
      investigations = read(p + "/content/investigations.json"),
      puzzles = read(p + "/content/puzzles.json"),
      choices = read(p + "/content/choices.json");
    for (const records of [
      objects,
      observations,
      investigations,
      puzzles,
      choices,
    ]) {
      const ids = records.map((o) => o.id);
      if (new Set(ids).size !== ids.length)
        throw new Error("Duplicate local ID " + id);
    }
    for (const o of objects) {
      if (!observations.some((x) => x.id === o.id))
        throw new Error("Missing writing " + o.id);
      if (o.clue) {
        if (clues.has(o.clue)) throw new Error("Duplicate clue " + o.clue);
        clues.add(o.clue);
      }
      for (const k of ["item", "use"])
        if (o[k] && !items[o[k]]) throw new Error("Unknown item " + o[k]);
      if (
        o.kind === "puzzle" &&
        !investigations.some((i) => i.id === (o.investigationId ?? "primary"))
      )
        throw new Error("Missing investigation binding " + o.id);
    }
    for (const i of investigations) {
      const puzzle = puzzles.find((p) => p.id === i.puzzleId);
      if (
        !puzzle ||
        !puzzle.answer.every(
          (x) => Number.isInteger(x) && x >= 0 && x < puzzle.options.length,
        )
      )
        throw new Error("Invalid puzzle " + id);
      pending.push(...i.required);
      for (const k of ["requiredItem", "reward"])
        if (i[k] && !items[i[k]]) throw new Error("Unknown investigation item");
    }
    const assets = read(p + "/assets/manifest.json"),
      bindings = read(p + "/assets/bindings.json");
    if (!assets.some((a) => a.id === bindings.sceneAsset))
      throw new Error("Unresolved scene binding " + id);
    for (const [object, b] of Object.entries(bindings.objects)) {
      if (
        !objects.some((o) => o.id === object) ||
        !assets.some((a) => a.id === b.assetId)
      )
        throw new Error("Unresolved object asset " + object);
    }
  }
  for (const c of pending)
    if (!clues.has(c)) throw new Error("Unobtainable clue " + c);
  return { locations: campaign.locations.length, clues: clues.size };
}
