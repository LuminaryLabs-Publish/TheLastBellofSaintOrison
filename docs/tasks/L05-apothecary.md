# L05 — Complete production review of Apothecary

**Status:** First-pass room implemented; production quality and browser/hardware acceptance remain open. **Owner:** game room production. **Dependencies:** SYS-01, SYS-02, SYS-03; preceding room Market Street.

## Start with these inputs

1. [Location design](../../content/locations/apothecary/location-design.md).
2. [Exact puzzle and hint contract](../../content/locations/apothecary/investigations-and-puzzles.md).
3. [Actual scene writing](../../content/locations/apothecary/scenes-and-dialogue.md).
4. [Pressure and branch effects](../../content/locations/apothecary/pressure-and-outcomes.md).
5. [Asset inventory](../../content/locations/apothecary/assets.md).
6. [Architecture](../architecture/nexus.md) and [review protocol](../validation/protocol.md).

## Desired player result

Test the resin, then prepare the lantern. The player understands enough to choose among “Carry the treated lantern to the tower”, “Take the clinical note as well” and reaches Bell Tower Base with the recorded state intact.

## Exact implementation anchors

Content: `content/campaign.js` room `apothecary`. Rules: `src/game/kits/orison-kit.js`. Output: `src/presentation/environment.js` and `projection.js`. Provider: `src/providers/three-scene.js`. Do not edit another room's facts to make this room pass.

## Execute in this order

1. Read the incoming route and list currently obtainable items and clues. Trace the current implementation before changing it.
2. Play the current room using ordinary visible controls. Required knowledge: resin-test, lantern-limits. Record where the goal or clue is unclear.
3. Verify the exact solution Triangular blue seal · dry. Try a plausible incorrect input; inspect the stated feedback and recover without reloading.
4. Review each local alternative, including street, clinical. Trace outgoing state into the next room; do not substitute branch count for cross-room proof.
5. Produce final scene/prop assets and tactile operations to support the authored interaction. Preserve stable IDs and public ownership. Match visual details to the clues rather than inventing decorative contradictions.
6. Capture wide and all close views. Inspect text at the largest supported scale, warning and critical pressure, every puzzle step, branch confirmation and selected-item feedback.
7. Add or revise narrative beats only when they resolve a specific pacing/comprehension finding. Obtainable clues must precede deductions. Update the source and regenerate documentation.
8. Save/reload before and after completion, revisit while permitted, and repeat the same action. Verify no duplicated rewards, rewritten choices or persistent resource growth.
9. Update the evidence record with source identity, input boundary, expected/observed state, screenshot/clip and remaining blockers. Mark only demonstrated checks complete.

## Allowed inference and questions

Choose decorative wear, incidental props and noncritical lighting within the room palette. Do not change Mara/Elian's identity, the thirteenth-vessel explanation, required evidence or ending gates as an art choice. If new writing changes those facts, record the conflict in a narrative task before implementation.

## Deliverables

Updated room source and registered assets; refreshed five-document room package; focused regression checks for actual defects; representative captures; timing observations from an unfamiliar player; reviewed outgoing-state handoff.

## Definition of done

A player can enter, understand, inspect, solve, make every local choice, retreat, save, reload and leave through ordinary input. Art and audio match the story. Essential information remains readable. No required route depends on an unavailable item. The next room observes the expected consequences. A qualified reviewer has inspected the evidence; a task cannot approve its own uninspected quality merely because the script exited successfully.

## Handoff format

Record: source revision; changed paths; resolved finding; tested route and input device; before/after state; remaining issue; next exact action. Link this task from the tracker and link its evidence back here.
