# Market Street — Acceptance and Review

Status: design checks only; runtime acceptance pending.

## Source-preservation gate

- Keep current required knowledge: shutter-order.
- Keep current required item: lantern.
- Keep current primary reward: none.
- Preserve departure IDs: direct, secure.

## Encounter walkthroughs

### [MS-01 — Cross the Shutter Cycle](cross-the-shutter-cycle.md)

1. Enter market-street with its source-valid incoming state and the stated prerequisites. Before acting, confirm that none of this encounter’s unearned effects are already granted.
2. Locate the named controls from the wide view, then expose these clues: The counterweight notch becomes visible at the upper stop. A pin silhouette appears only when the load is supported.
3. Use the wrong or cancelled action described here: A selection under load shows the pin hole blocked; the demonstration is harmless and repeatable. Confirm required items, evidence and prior choices remain unchanged.
4. Perform: Turn the protected demonstration crank through one cycle. Verify this response before continuing; a text-only success flag is insufficient for runtime acceptance.
5. Perform: Inspect the weight notch when it aligns with the support shelf. Verify this response before continuing; a text-only success flag is insufficient for runtime acceptance.
6. Perform: Mark that supported position for the real winch. Verify this response before continuing; a text-only success flag is insufficient for runtime acceptance.
7. Check the owner result: Supported counterweight position identified; no timing trial blocks later manipulation. Discovery mapping: shutter-order. Compare against the exact mapping section; do not grant an entire room’s clues automatically.
8. Repeat the final accepted input twice, then save and restore at every stable step from 0 through 3. Confirm one reward/choice only, and reconstruct the same logical control state.
9. Cancel during the first uncommitted manipulation and lose window focus during a hold. Return to the last confirmed state; the documented shelter remains available.
10. Repeat with audio muted, shape labels instead of color, keyboard-only controls, largest supported text, assisted timing and Canvas fallback. Each required clue and action must still be available.
11. Skip all optional lore and prove the encounter is still solvable using its visible clues and caption alternatives.

### [MS-02 — Release the Jammed Winch](release-the-jammed-winch.md)

1. Enter market-street with its source-valid incoming state and the stated prerequisites. Before acting, confirm that none of this encounter’s unearned effects are already granted.
2. Locate the named controls from the wide view, then expose these clues: Pin, raised shutter and catch are embossed left to right on the freight plate. The supported notch from MS-01 is reproduced on the real counterweight.
3. Use the wrong or cancelled action described here: The winch interlock refuses motion without the pin; lowering remains safe until the catch is engaged. Confirm required items, evidence and prior choices remain unchanged.
4. Perform: Seat the pin while the weight rests on its support. Verify this response before continuing; a text-only success flag is insufficient for runtime acceptance.
5. Perform: Turn the winch until the opening clears. Verify this response before continuing; a text-only success flag is insufficient for runtime acceptance.
6. Perform: Engage the catch; its pawl visibly carries the load. Verify this response before continuing; a text-only success flag is insufficient for runtime acceptance.
7. Perform: Take the existing service lantern before leaving. Verify this response before continuing; a text-only success flag is insufficient for runtime acceptance.
8. Check the owner result: Shutter locked open and lantern in Inventory; departure requires both. Discovery mapping: no new required clue. Compare against the exact mapping section; do not grant an entire room’s clues automatically.
9. Repeat the final accepted input twice, then save and restore at every stable step from 0 through 4. Confirm one reward/choice only, and reconstruct the same logical control state.
10. Cancel during the first uncommitted manipulation and lose window focus during a hold. Return to the last confirmed state; the documented shelter remains available.
11. Repeat with audio muted, shape labels instead of color, keyboard-only controls, largest supported text, assisted timing and Canvas fallback. Each required clue and action must still be available.
12. Skip all optional lore and prove the encounter is still solvable using its visible clues and caption alternatives.

### [MS-03 — Recover the Stranded Parcel](recover-the-stranded-parcel.md)

1. Enter market-street with its source-valid incoming state and the stated prerequisites. Before acting, confirm that none of this encounter’s unearned effects are already granted.
2. Locate the named controls from the wide view, then expose these clues: The parcel carries an existing repair-stall marker, not a new quest item. A return arrow on the eyelet points back through the secured shutter.
3. Use the wrong or cancelled action described here: Release of the tether lets the parcel rest on a lower stop, never beyond recovery. Confirm required items, evidence and prior choices remain unchanged.
4. Perform: Pull the parcel along its existing tether from the safe ledge. Verify this response before continuing; a text-only success flag is insufficient for runtime acceptance.
5. Perform: Unfold the pale repair marker and compare its arrow with the return eyelet. Verify this response before continuing; a text-only success flag is insufficient for runtime acceptance.
6. Perform: Tie the marker to that eyelet; the crossing gains a persistent landmark. Verify this response before continuing; a text-only success flag is insufficient for runtime acceptance.
7. Check the owner result: Optional marketSafe outcome recorded; lantern acquisition never depends on the parcel. Discovery mapping: no new required clue. Compare against the exact mapping section; do not grant an entire room’s clues automatically.
8. Repeat the final accepted input twice, then save and restore at every stable step from 0 through 3. Confirm one reward/choice only, and reconstruct the same logical control state.
9. Cancel during the first uncommitted manipulation and lose window focus during a hold. Return to the last confirmed state; the documented shelter remains available.
10. Repeat with audio muted, shape labels instead of color, keyboard-only controls, largest supported text, assisted timing and Canvas fallback. Each required clue and action must still be available.
11. Skip the encounter completely and prove the following required encounter and at least one ending remain reachable.

## Cross-cutting gate

Use the minimal route without optional lore; then the enriched route. Repeat with muted audio, high text scale, keyboard focus, timing assistance and Canvas fallback. Save and restore after each confirmed action, during a modal preview and immediately after a reward. Duplicate clicks cannot duplicate rewards or change a committed choice. Compare outgoing domain snapshots to the specified source-compatible outcomes. Runtime gates remain pending until implemented evidence is attached.

## Evidence and ownership

Design reviewer: automated assistant review, not final creative approval. Implementation, art, audio and unfamiliar-player reviewers: unassigned. Attach exact revision, steps, observations and pass/fail results. Duration, fear, physical-device usability and final visual quality require actual play and cannot be approved by document linting.
