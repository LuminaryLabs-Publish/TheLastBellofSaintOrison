import fs from "node:fs/promises";
import { ROOMS, ACTS, ITEMS, ENDINGS } from "../../content/campaign.js";
const write = async (path, text) => {
  await fs.mkdir(path.slice(0, path.lastIndexOf("/")), { recursive: true });
  await fs.writeFile(
    path,
    text
      .split("\n")
      .map((line) => line.trimEnd())
      .join("\n")
      .trimEnd() + "\n",
  );
};
const line = (x) => String(x).replaceAll("|", "\\|").replaceAll("\n", "<br>");
let index =
  "# Location packages\n\nGenerated from `content/campaign.js` using `node tools/authoring/document.mjs`. Change the executable source first; these files preserve exact writing and solutions for development. These are current-build specifications, not claims that the larger production ambition is complete.\n\n| Location | Story and design | Task pack |\n|---|---|---|\n";
const tracker = [];
for (const [i, r] of ROOMS.entries()) {
  const dir = "content/locations/" + r.id,
    id = "L" + String(i + 1).padStart(2, "0");
  index += `| ${r.name} | [Package](${r.id}/location-design.md) | [${id}](../../docs/tasks/${id}-${r.id}.md) |\n`;
  const navigation = `${ROOMS[i - 1]?.name ?? "Main menu"} → ${r.name} → ${ROOMS[i + 1]?.name ?? "Ending"}`;
  await write(
    dir + "/location-design.md",
    `# ${r.name}\n\nAct ${i + 1 <= 3 ? "I" : i < 6 ? "II" : i < 9 ? "III" : i < 12 ? "IV" : "V"} — ${ACTS[r.act]}\n\n${r.subtitle}\n\n## Purpose and navigation\n\n${r.goal}\n\n${navigation}\n\nArrival writing is in [Scenes and dialogue](scenes-and-dialogue.md). The canonical scene ID is \`${r.id}\`. A wide authored camera and four close views are implemented; this does not yet provide four independently detailed subrooms.\n\nThe current environment uses the \`${r.theme}\` procedural family, ${r.tint} atmospheric color and ${r.accent} light accents. Unique production meshes, material detail, character performances and staged event animation require the room task's final art pass.\n\n## Interactable objects\n\n| Stable ID | Visible label | Action | Produces |\n|---|---|---|---|\n${r.objects.map((o) => `| ${r.id}.${o.id} | ${line(o.name)} | ${o.kind} | ${[o.clue && "Knowledge: " + o.clue, o.item && "Item: " + o.item, o.flag && "Flag: " + o.flag, o.use && "Requires selected: " + o.use].filter(Boolean).join("; ") || "Mechanism or observation"} |`).join("\n")}\n\n## State boundary\n\nNexus Scene owns location identity. Orison progress owns seen objects, solved state and the committed choice. The active Object registry contains exactly four interaction identities. Re-entry before the final descent restores progress and enables missed observations; it does not re-open committed branch selection. Once the Well has been left, earlier locations cannot be revisited.\n\n## Related specifications\n\n- [Investigations and puzzles](investigations-and-puzzles.md)\n- [Pressure and outcomes](pressure-and-outcomes.md)\n- [Scenes and dialogue](scenes-and-dialogue.md)\n- [Production task](../../../docs/tasks/${id}-${r.id}.md)\n\nPacing allocation: ${r.minutes} minutes, unmeasured. No artificial wait is inserted to achieve it.`,
  );
  await write(
    dir + "/investigations-and-puzzles.md",
    `# ${r.name}: investigation contract\n\n## Entry requirements\n\nEnter through ${ROOMS[i - 1]?.name ?? "the new-game flow"}. Essential clue requirements are ${r.required.map((k) => "`" + k + "`").join(", ")}.${r.requiredItem ? " Collect `" + r.requiredItem + "` before operation." : ""}\n\n## Concrete player route\n\n${r.objects
      .filter((o) => o.clue || o.kind === "collect")
      .map(
        (o, j) =>
          `${j + 1}. Inspect **${o.name}**. Read its actual record in the scene script. ${o.clue ? "The journal receives `" + o.clue + "`." : ""} ${o.item ? "Collect `" + o.item + "` once." : ""}`,
      )
      .join(
        "\n",
      )}\n\nOperate **${r.objects.find((o) => o.kind === "puzzle").name}** after those records are available.\n\n**${r.puzzle.title}:** ${r.puzzle.question}\n\nAvailable controls: ${r.puzzle.options.join(" / ")}.\n\nExact solution: **${r.puzzle.answer.map((i) => r.puzzle.options[i]).join(" → ")}**.\n\nPartial correct answers stay in the current controls. A wrong input clears that attempt and adds up to 12 seconds of exposure within the room's nonnegative limit; it never destroys evidence. Closing/reopening controls restarts an unfinished attempt. Reading the journal freezes pressure; operating controls does not.\n\nWrong response: ${r.puzzle.wrong}\n\nSuccess response: ${r.puzzle.success}\n\n${r.reward ? "Success grants `" + r.reward + "` exactly once." : "Success commits solved state; evidence rewards are described by observations and departures."}\n\n${r.requiredExitItem ? "Before departure, the inventory must contain `" + r.requiredExitItem + "`. Combine the service lantern with tested resin in the satchel; both components are replaced by one treated lantern." : "No additional exit inventory condition is imposed by this room."}\n\n## Optional investigations\n\n${r.objects
      .filter((o) => o.kind === "optional" || o.kind === "use")
      .map(
        (o) =>
          `- **${o.name}:** ${o.text} ${o.requiresSolved ? "Available only after the required mechanism is solved." : ""} ${o.use ? "Select `" + o.use + "` before using this target." : ""}`,
      )
      .join(
        "\n",
      )}\n\n## Hint ladder\n\n${r.puzzle.hints.map((h, i) => `${i + 1}. ${h}`).join("\n")}\n\n## Acceptance\n\nEarly operation must refuse missing records. Wrong inputs must remain recoverable. Repeated inspection or solved operation must not duplicate rewards. Successful operation must finish the Sequence's operate node; a departure without that state is rejected.`,
  );
  await write(
    dir + "/scenes-and-dialogue.md",
    `# ${r.name}: scene writing\n\n## Arrival\n\n${r.arrival}\n\n${r.objects.map((o) => `## ${o.name}\n\n${o.text}`).join("\n\n")}\n\n## Completion\n\n${r.puzzle.success}\n\n## Departures\n\n${r.choices.map((c) => `### ${c.label}\n\n${c.text}`).join("\n\n")}\n\nDialogue currently appears in authored text panels, with persistent evidence available in the journal. Voice performance, lip sync and character animation are not implemented. Do not silently count text-panel completion as performance production.`,
  );
  await write(
    dir + "/pressure-and-outcomes.md",
    `# ${r.name}: pressure and outcomes\n\nBase continuous exposure limit: **${r.pressure ? `${r.pressure} seconds` : "quiet location; no deadline"}**. This is the current loop parameter, not a measured location duration.\n\nWarning above 60%: ${r.warning || "Not applicable: quiet location."}\n\nCritical above 85%: ${r.critical || "Not applicable: quiet location."}\n\nVoluntary or forced retreat: ${r.retreat}\n\nRetreat resets local exposure, increments the setback count and preserves essential evidence. Menus, reading and application suspension freeze exposure. Puzzle controls remain active. Gentle multiplies rate by 0.5; Story makes it zero. A treated lantern multiplies it by 0.8. The retained relay slows School/Archive exposure by 0.9; marked tunnels and stabilized market routes reduce Return Ascent exposure. These are rules in the game Kit, not animation timing.\n\n## Branches\n\n| Choice ID | Player action | Stored effect | Next location |\n|---|---|---|---|\n${r.choices.map((c) => `| ${c.id} | ${line(c.label)} | ${[c.flag && "Flag " + c.flag, c.item && "Item " + c.item, c.ending && "Ending " + c.ending].filter(Boolean).join("; ") || "Recorded local choice and departure narration"} | ${ROOMS[i + 1]?.name ?? "Ending screen"} |`).join("\n")}\n\nAll departures need the required mechanism completed. Breaking the relay and choosing an ending require a second explicit confirmation. Witness additionally needs the register, original order, relay contract, second set of verified names and an unbroken relay. Ineligible Witness choices are disabled and independently rejected by game rules.\n\n## Save and review\n\nSave before operation, after partial attempts, after completion and after each branch. The unfinished input sequence is intentionally transient and restarts on load; logical evidence, completed mechanisms and committed choices persist. Confirm recovery does not consume clues or repeat rewards. Capture warning and critical frames and compare essential UI readability. Hardware audio and perception tests remain distinct from deterministic state checks.`,
  );
  await write(
    dir + "/assets.md",
    `# ${r.name}: asset inventory\n\n## Integrated\n\n- Canonical inline Asset record \`${r.id}\`, authored in the composition.\n- ${r.theme} environment with floor, architecture, lighting and context props generated by Presentation.\n- Four stable interactive props: ${r.objects.map((o) => o.name).join("; ")}.\n- Four close-view cameras plus wide view.\n- Physical labels, portable mesh/material descriptors and original synthesized ambient tone.\n- Canvas interface from Nexus UI descriptors, including visible object cards and sound captions.\n\n## Production replacements and additions\n\nCreate a finished scene package matching the established camera sightlines. Supply a room layout sheet, individually authored hero props, detail/material textures with readable wear, object action animations, coherent light fixtures, locally motivated ambience, and performed character content where the scene script calls for it. Keep essential clues also available as readable text. Provide source/export provenance and import bounds.\n\nDo not replace the whole game provider to upgrade this room. Register new source assets in the Asset contract; Presentation selects and describes them; the graphics/audio adapter realizes them. Shared models belong in a shared family with local references. Return environments should reuse the same base assets with state variations.\n\n## Asset definition of done\n\nStable ID, source rights, runtime export, scale/orientation, usable camera framing, bounded resources, fallback behavior, visible integration, and reviewed evidence. Current procedural shapes establish playable context but are not approved final production art.`,
  );
  await write(
    `docs/tasks/${id}-${r.id}.md`,
    `# ${id} — Complete production review of ${r.name}\n\n**Status:** First-pass room implemented; production quality and browser/hardware acceptance remain open. **Owner:** game room production. **Dependencies:** SYS-01, SYS-02, SYS-03; ${i ? "preceding room " + ROOMS[i - 1].name : "working new-game flow"}.\n\n## Start with these inputs\n\n1. [Location design](../../${dir}/location-design.md).\n2. [Exact puzzle and hint contract](../../${dir}/investigations-and-puzzles.md).\n3. [Actual scene writing](../../${dir}/scenes-and-dialogue.md).\n4. [Pressure and branch effects](../../${dir}/pressure-and-outcomes.md).\n5. [Asset inventory](../../${dir}/assets.md).\n6. [Architecture](../architecture/nexus.md) and [review protocol](../validation/protocol.md).\n\n## Desired player result\n\n${r.goal} The player understands enough to choose among ${r.choices.map((c) => "“" + c.label + "”").join(", ")} and reaches ${ROOMS[i + 1]?.name ?? "the selected ending"} with the recorded state intact.\n\n## Exact implementation anchors\n\nContent: \`src/kits/locations/${r.id}/content/\`. Rules: \`src/kits/interaction/player-actions-kit/kit.js\`. Output: \`src/presentation/environment.js\` and \`projection.js\`. Provider: \`src/providers/three-scene.js\`. Do not edit another room's facts to make this room pass.\n\n## Execute in this order\n\n1. Read the incoming route and list currently obtainable items and clues. Trace the current implementation before changing it.\n2. Play the current room using ordinary visible controls. Required knowledge: ${r.required.join(", ")}. Record where the goal or clue is unclear.\n3. Verify the exact solution ${r.puzzle.answer.map((j) => r.puzzle.options[j]).join(" → ")}. Try a plausible incorrect input; inspect the stated feedback and recover without reloading.\n4. Review each local alternative, including ${r.choices.map((c) => c.id).join(", ")}. Trace outgoing state into the next room; do not substitute branch count for cross-room proof.\n5. Produce final scene/prop assets and tactile operations to support the authored interaction. Preserve stable IDs and public ownership. Match visual details to the clues rather than inventing decorative contradictions.\n6. Capture wide and all close views. Inspect text at the largest supported scale, warning and critical pressure, every puzzle step, branch confirmation and selected-item feedback.\n7. Add or revise narrative beats only when they resolve a specific pacing/comprehension finding. Obtainable clues must precede deductions. Update the source and regenerate documentation.\n8. Save/reload before and after completion, revisit while permitted, and repeat the same action. Verify no duplicated rewards, rewritten choices or persistent resource growth.\n9. Update the evidence record with source identity, input boundary, expected/observed state, screenshot/clip and remaining blockers. Mark only demonstrated checks complete.\n\n## Allowed inference and questions\n\nChoose decorative wear, incidental props and noncritical lighting within the room palette. Do not change Mara/Elian's identity, the thirteenth-vessel explanation, required evidence or ending gates as an art choice. If new writing changes those facts, record the conflict in a narrative task before implementation.\n\n## Deliverables\n\nUpdated room source and registered assets; refreshed five-document room package; focused regression checks for actual defects; representative captures; timing observations from an unfamiliar player; reviewed outgoing-state handoff.\n\n## Definition of done\n\nA player can enter, understand, inspect, solve, make every local choice, retreat, save, reload and leave through ordinary input. Art and audio match the story. Essential information remains readable. No required route depends on an unavailable item. The next room observes the expected consequences. A qualified reviewer has inspected the evidence; a task cannot approve its own uninspected quality merely because the script exited successfully.\n\n## Handoff format\n\nRecord: source revision; changed paths; resolved finding; tested route and input device; before/after state; remaining issue; next exact action. Link this task from the tracker and link its evidence back here.`,
  );
  tracker.push({
    id,
    title: r.name,
    status: "Implemented first pass; production review open",
    file: `${id}-${r.id}.md`,
  });
}
await write("content/locations/index.md", index);
await write(
  "docs/tasks/rooms.md",
  "# Room task index\n\n| ID | Package | Status |\n|---|---|---|\n" +
    tracker
      .map((t) => `| ${t.id} | [${t.title}](${t.file}) | ${t.status} |`)
      .join("\n"),
);
await write(
  "content/story/ending-map.md",
  "# Ending and item map\n\n## Equipment\n\n" +
    Object.entries(ITEMS)
      .map(([id, item]) => `- **${id} — ${item.name}:** ${item.text}`)
      .join("\n") +
    "\n\n## Endings\n\n" +
    Object.entries(ENDINGS)
      .map(([id, e]) => `### ${id}: ${e.title}\n\n${e.subtitle}\n\n${e.text}`)
      .join("\n\n") +
    "\n\nThe ending is selected at the Well and confirmed before departure. The following rooms express it; optional relationship observations remain distinct. All three endings have legal command routes. Branch tests cover each immediate alternative, not every combinatorial playthrough.",
);
console.log(
  "15 complete room packages, 15 task packs and shared indices generated from executable content.",
);
