# Return Ascent — Acceptance and Review

Status: design checks only; runtime acceptance pending.

## Source-preservation gate

- Keep current required knowledge: return-order, elian-return.
- Keep current required item: none.
- Keep current primary reward: none.
- Preserve departure IDs: leave, help.

## Encounter walkthroughs

### [RA-01 — Identify the Surviving Route](identify-the-surviving-route.md)

1. Enter return-ascent with its source-valid incoming state and the stated prerequisites. Before acting, confirm that none of this encounter’s unearned effects are already granted.
2. Locate the named controls from the wide view, then expose these clues: Reverse plates read empty circle, closed eye, mouth, open eye. If Elian stayed remote, the line identifies her protected station; if released, she remains on the physical route.
3. Use the wrong or cancelled action described here: A misleading branch returns to shelter and exposes its unmatched plate; no ending removes the mandatory route. Confirm required items, evidence and prior choices remain unchanged.
4. Perform: Inspect the permanent return plate, using chalk as assistance if present. Verify this response before continuing; a text-only success flag is insufficient for runtime acceptance.
5. Perform: Check the emergency line for Elian’s current position. Verify this response before continuing; a text-only success flag is insufficient for runtime acceptance.
6. Perform: Select the verified upper route without requiring power, a working voice or optional chalk. Verify this response before continuing; a text-only success flag is insufficient for runtime acceptance.
7. Check the owner result: return-order and elian-return learned for the actual relationship state. Discovery mapping: return-order, elian-return. Compare against the exact mapping section; do not grant an entire room’s clues automatically.
8. Repeat the final accepted input twice, then save and restore at every stable step from 0 through 3. Confirm one reward/choice only, and reconstruct the same logical control state.
9. Cancel during the first uncommitted manipulation and lose window focus during a hold. Return to the last confirmed state; the documented shelter remains available.
10. Repeat with audio muted, shape labels instead of color, keyboard-only controls, largest supported text, assisted timing and Canvas fallback. Each required clue and action must still be available.
11. Skip all optional lore and prove the encounter is still solvable using its visible clues and caption alternatives.

### [RA-02 — Release the Escape Gates](release-the-escape-gates.md)

1. Enter return-ascent with its source-valid incoming state and the stated prerequisites. Before acting, confirm that none of this encounter’s unearned effects are already granted.
2. Locate the named controls from the wide view, then expose these clues: Mechanical cables, not electrical lamps, connect the handles to the gate. Each correct handle exposes the next shaped detent.
3. Use the wrong or cancelled action described here: A wrong handle returns only the local detents to neutral; the core decision and collected evidence are unchanged. Confirm required items, evidence and prior choices remain unchanged.
4. Perform: Operate empty circle, closed eye, mouth and open eye handles in order. Verify this response before continuing; a text-only success flag is insufficient for runtime acceptance.
5. Perform: Secure the gate latch and verify the upper stair is open. Verify this response before continuing; a text-only success flag is insufficient for runtime acceptance.
6. Perform: Continue to the square after resolving or skipping the optional line assistance. Verify this response before continuing; a text-only success flag is insufficient for runtime acceptance.
7. Check the owner result: Escape gate secured for Witness, Silence and Vessel, including broken-relay and unmarked-route variants. Discovery mapping: no new required clue. Compare against the exact mapping section; do not grant an entire room’s clues automatically.
8. Repeat the final accepted input twice, then save and restore at every stable step from 0 through 3. Confirm one reward/choice only, and reconstruct the same logical control state.
9. Cancel during the first uncommitted manipulation and lose window focus during a hold. Return to the last confirmed state; the documented shelter remains available.
10. Repeat with audio muted, shape labels instead of color, keyboard-only controls, largest supported text, assisted timing and Canvas fallback. Each required clue and action must still be available.
11. Skip all optional lore and prove the encounter is still solvable using its visible clues and caption alternatives.

### [RA-03 — Retrieve the Endangered Evidence](retrieve-the-endangered-evidence.md)

1. Enter return-ascent with its source-valid incoming state and the stated prerequisites. Before acting, confirm that none of this encounter’s unearned effects are already granted.
2. Locate the named controls from the wide view, then expose these clues: The pouch is explicitly a duplicate; required evidence is never removed from Inventory. Elian’s confirmation comes from the station or stair matching the earlier choice.
3. Use the wrong or cancelled action described here: Releasing early pauses assistance rather than erasing proof; the upper gate stays open. Confirm required items, evidence and prior choices remain unchanged.
4. Perform: Preview optional assistance without threatening the safe upper exit. Verify this response before continuing; a text-only success flag is insufficient for runtime acceptance.
5. Perform: Keep the line open and pull the duplicate pouch onto its shelf. Verify this response before continuing; a text-only success flag is insufficient for runtime acceptance.
6. Perform: Wait for the matching route confirmation, then release the line; or skip and continue safely. Verify this response before continuing; a text-only success flag is insufficient for runtime acceptance.
7. Check the owner result: Optional elianHelped recorded; no retroactive change to the already-committed ending. Discovery mapping: no new required clue. Compare against the exact mapping section; do not grant an entire room’s clues automatically.
8. Repeat the final accepted input twice, then save and restore at every stable step from 0 through 3. Confirm one reward/choice only, and reconstruct the same logical control state.
9. Cancel during the first uncommitted manipulation and lose window focus during a hold. Return to the last confirmed state; the documented shelter remains available.
10. Repeat with audio muted, shape labels instead of color, keyboard-only controls, largest supported text, assisted timing and Canvas fallback. Each required clue and action must still be available.
11. Skip the encounter completely and prove the following required encounter and at least one ending remain reachable.
12. Preview each available option and cancel. Confirm that neither Narrative nor Campaign changes before the final commit. Check each existing departure from the route matrix, including disabled-option feedback where relevant.

## Cross-cutting gate

Use the minimal route without optional lore; then the enriched route. Repeat with muted audio, high text scale, keyboard focus, timing assistance and Canvas fallback. Save and restore after each confirmed action, during a modal preview and immediately after a reward. Duplicate clicks cannot duplicate rewards or change a committed choice. Compare outgoing domain snapshots to the specified source-compatible outcomes. Runtime gates remain pending until implemented evidence is attached.

## Evidence and ownership

Design reviewer: automated assistant review, not final creative approval. Implementation, art, audio and unfamiliar-player reviewers: unassigned. Attach exact revision, steps, observations and pass/fail results. Duration, fear, physical-device usability and final visual quality require actual play and cannot be approved by document linting.
