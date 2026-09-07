# Apothecary — Acceptance and Review

Status: design checks only; runtime acceptance pending.

## Source-preservation gate

- Keep current required knowledge: resin-test, lantern-limits.
- Keep current required item: none.
- Keep current primary reward: resin.
- Preserve departure IDs: street, clinical.

## Encounter walkthroughs

### [AP-01 — Test the Protective Mixture](test-the-protective-mixture.md)

1. Enter apothecary with its source-valid incoming state and the stated prerequisites. Before acting, confirm that none of this encounter’s unearned effects are already granted.
2. Locate the named controls from the wide view, then expose these clues: Only the dry triangular/blue sample burns with a clean chimney. Condensation and soot panels expose the other samples’ failures without relying on flame color. The enclosed test burner stays steady while a recorded false voice continues; a short caption says protection cannot prove a voice truthful.
3. Use the wrong or cancelled action described here: Wrong selection points to the dirty chimney and reopens the test; essential resin cannot run out. Confirm required items, evidence and prior choices remain unchanged.
4. Perform: Place one sample in each test well; the fixture replenishes test quantities. Verify this response before continuing; a text-only success flag is insufficient for runtime acceptance.
5. Perform: Run the enclosed burner; compare chimney soot and condensation. Verify this response before continuing; a text-only success flag is insufficient for runtime acceptance.
6. Perform: Observe the steady test flame beside the continuing false voice to establish lantern-limits before resin is granted. Verify this response before continuing; a text-only success flag is insufficient for runtime acceptance.
7. Perform: Select the dry triangular/blue sample and retain the tested resin. Verify this response before continuing; a text-only success flag is insufficient for runtime acceptance.
8. Check the owner result: Tested resin granted once and resin-test knowledge recorded. Discovery mapping: resin-test, lantern-limits. Compare against the exact mapping section; do not grant an entire room’s clues automatically.
9. Repeat the final accepted input twice, then save and restore at every stable step from 0 through 4. Confirm one reward/choice only, and reconstruct the same logical control state.
10. Cancel during the first uncommitted manipulation and lose window focus during a hold. Return to the last confirmed state; the documented shelter remains available.
11. Repeat with audio muted, shape labels instead of color, keyboard-only controls, largest supported text, assisted timing and Canvas fallback. Each required clue and action must still be available.
12. Skip all optional lore and prove the encounter is still solvable using its visible clues and caption alternatives.

### [AP-02 — Prepare the Lantern Wick](prepare-the-lantern-wick.md)

1. Enter apothecary with its source-valid incoming state and the stated prerequisites. Before acting, confirm that none of this encounter’s unearned effects are already granted.
2. Locate the named controls from the wide view, then expose these clues: The reservoir and resin nozzle share a triangular fitting. The treated flame stays steady in the draft while the false voice continues.
3. Use the wrong or cancelled action described here: An untreated lantern sputters in the test box but remains usable for preparation; no required resource is lost. Confirm required items, evidence and prior choices remain unchanged.
4. Perform: Fit the tested resin to the service lantern and close the reservoir. Verify this response before continuing; a text-only success flag is insufficient for runtime acceptance.
5. Perform: Set the wick to its etched stop and open the alcove shutter. Verify this response before continuing; a text-only success flag is insufficient for runtime acceptance.
6. Perform: Observe the steady flame and the unchanged false voice. Verify this response before continuing; a text-only success flag is insufficient for runtime acceptance.
7. Perform: Store the treated lantern; it reduces exposure but proves no voice truthful. Verify this response before continuing; a text-only success flag is insufficient for runtime acceptance.
8. Check the owner result: protectedLantern produced through the existing combination rule; lantern-limits learned. Discovery mapping: no new required clue. Compare against the exact mapping section; do not grant an entire room’s clues automatically.
9. Repeat the final accepted input twice, then save and restore at every stable step from 0 through 4. Confirm one reward/choice only, and reconstruct the same logical control state.
10. Cancel during the first uncommitted manipulation and lose window focus during a hold. Return to the last confirmed state; the documented shelter remains available.
11. Repeat with audio muted, shape labels instead of color, keyboard-only controls, largest supported text, assisted timing and Canvas fallback. Each required clue and action must still be available.
12. Skip all optional lore and prove the encounter is still solvable using its visible clues and caption alternatives.

### [AP-03 — Examine the Failed Batch](examine-the-failed-batch.md)

1. Enter apothecary with its source-valid incoming state and the stated prerequisites. Before acting, confirm that none of this encounter’s unearned effects are already granted.
2. Locate the named controls from the wide view, then expose these clues: Identical batch marks connect the discarded samples with the clinical drawer. A short annotation points to oxygen treatment, not a magical cure.
3. Use the wrong or cancelled action described here: A mismatched pair shows different batch marks; comparison is reversible. Confirm required items, evidence and prior choices remain unchanged.
4. Perform: Align the two batch marks under the drawer’s clear window. Verify this response before continuing; a text-only success flag is insufficient for runtime acceptance.
5. Perform: Inspect the soot-stained sample beside the clinical note. Verify this response before continuing; a text-only success flag is insufficient for runtime acceptance.
6. Perform: Record the note as optional clinical evidence without claiming it proves the entire crime. Verify this response before continuing; a text-only success flag is insufficient for runtime acceptance.
7. Check the owner result: clinicalEvidence may be recorded; preparation succeeds without reading the long note. Discovery mapping: no new required clue. Compare against the exact mapping section; do not grant an entire room’s clues automatically.
8. Repeat the final accepted input twice, then save and restore at every stable step from 0 through 3. Confirm one reward/choice only, and reconstruct the same logical control state.
9. Cancel during the first uncommitted manipulation and lose window focus during a hold. Return to the last confirmed state; the documented shelter remains available.
10. Repeat with audio muted, shape labels instead of color, keyboard-only controls, largest supported text, assisted timing and Canvas fallback. Each required clue and action must still be available.
11. Skip the encounter completely and prove the following required encounter and at least one ending remain reachable.

## Cross-cutting gate

Use the minimal route without optional lore; then the enriched route. Repeat with muted audio, high text scale, keyboard focus, timing assistance and Canvas fallback. Save and restore after each confirmed action, during a modal preview and immediately after a reward. Duplicate clicks cannot duplicate rewards or change a committed choice. Compare outgoing domain snapshots to the specified source-compatible outcomes. Runtime gates remain pending until implemented evidence is attached.

## Evidence and ownership

Design reviewer: automated assistant review, not final creative approval. Implementation, art, audio and unfamiliar-player reviewers: unassigned. Attach exact revision, steps, observations and pass/fail results. Duration, fear, physical-device usability and final visual quality require actual play and cannot be approved by document linting.
