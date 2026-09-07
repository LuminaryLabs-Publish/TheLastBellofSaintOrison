# Town Gate — Acceptance and Review

Status: design checks only; runtime acceptance pending.

## Source-preservation gate

- Keep current required knowledge: crossing-rule, blank-record.
- Keep current required item: none.
- Keep current primary reward: key.
- Preserve departure IDs: shelter, passage.

## Encounter walkthroughs

### [TG-01 — Read the Crossing Signal](read-the-crossing-signal.md)

1. Enter town-gate with its source-valid incoming state and the stated prerequisites. Before acting, confirm that none of this encounter’s unearned effects are already granted.
2. Locate the named controls from the wide view, then expose these clues: The trolley remains stopped during two bell strokes and moves only when the lamp shutter closes. A two-notch drum and a walking trolley symbol mirror the sounds; darkness alone is not the clue.
3. Use the wrong or cancelled action described here: Selecting an earlier phase leaves the stop bar down; replay remains available. Confirm required items, evidence and prior choices remain unchanged.
4. Perform: Enter the stone recess; the demonstration cannot harm Mara. Verify this response before continuing; a text-only success flag is insufficient for runtime acceptance.
5. Perform: Replay the cycle; notch one and notch two rise with the two bells. Verify this response before continuing; a text-only success flag is insufficient for runtime acceptance.
6. Perform: Select the walking-trolley symbol after notch two, while the lamp shutter is closed. Verify this response before continuing; a text-only success flag is insufficient for runtime acceptance.
7. Perform: The safe phase stays pinned on the drum beside the exit. Verify this response before continuing; a text-only success flag is insufficient for runtime acceptance.
8. Check the owner result: The player identifies the safe phase after seeing or stepping through one complete cycle. Discovery mapping: crossing-rule. Compare against the exact mapping section; do not grant an entire room’s clues automatically.
9. Repeat the final accepted input twice, then save and restore at every stable step from 0 through 4. Confirm one reward/choice only, and reconstruct the same logical control state.
10. Cancel during the first uncommitted manipulation and lose window focus during a hold. Return to the last confirmed state; the documented shelter remains available.
11. Repeat with audio muted, shape labels instead of color, keyboard-only controls, largest supported text, assisted timing and Canvas fallback. Each required clue and action must still be available.
12. Skip all optional lore and prove the encounter is still solvable using its visible clues and caption alternatives.

### [TG-02 — Release the Gate Latch](release-the-gate-latch.md)

1. Enter town-gate with its source-valid incoming state and the stated prerequisites. Before acting, confirm that none of this encounter’s unearned effects are already granted.
2. Locate the named controls from the wide view, then expose these clues: A cutaway test track shows named badges trapped under a speaking-mouth jaw. The blank badge passes under that jaw and bears the same notch as the intake-key drawer.
3. Use the wrong or cancelled action described here: A named badge springs back before transmission; a loaded catch cannot lift. No identity is committed by an exploratory click. Confirm required items, evidence and prior choices remain unchanged.
4. Perform: Slide the blank badge through the cutaway; the mouth jaw stays closed. Verify this response before continuing; a text-only success flag is insufficient for runtime acceptance.
5. Perform: Seat that badge in the real slot; a latch tooth withdraws. Verify this response before continuing; a text-only success flag is insufficient for runtime acceptance.
6. Perform: Pull the tension handle to its physical stop, then lift the catch. Verify this response before continuing; a text-only success flag is insufficient for runtime acceptance.
7. Perform: The gate unlocks and the drawer dispenses the existing intake key once. Verify this response before continuing; a text-only success flag is insufficient for runtime acceptance.
8. Check the owner result: Blank entry selected, latch released and intake key granted once; crossing remains subject to TG-01. Discovery mapping: blank-record. Compare against the exact mapping section; do not grant an entire room’s clues automatically.
9. Repeat the final accepted input twice, then save and restore at every stable step from 0 through 4. Confirm one reward/choice only, and reconstruct the same logical control state.
10. Cancel during the first uncommitted manipulation and lose window focus during a hold. Return to the last confirmed state; the documented shelter remains available.
11. Repeat with audio muted, shape labels instead of color, keyboard-only controls, largest supported text, assisted timing and Canvas fallback. Each required clue and action must still be available.
12. Skip all optional lore and prove the encounter is still solvable using its visible clues and caption alternatives.

### [TG-03 — Answer the Callbox](answer-the-callbox.md)

1. Enter town-gate with its source-valid incoming state and the stated prerequisites. Before acting, confirm that none of this encounter’s unearned effects are already granted.
2. Locate the named controls from the wide view, then expose these clues: The same hesitation repeats at the same spool mark. Arrows in the shelter point toward a maintenance passage and back to the road.
3. Use the wrong or cancelled action described here: Opening the cover does not force Mara to speak; closing it always cancels the interaction. Confirm required items, evidence and prior choices remain unchanged.
4. Perform: Close the microphone cover and replay the recorded query. Verify this response before continuing; a text-only success flag is insufficient for runtime acceptance.
5. Perform: Compare the spool mark with the repeated hesitation; the voice repeats unchanged. Verify this response before continuing; a text-only success flag is insufficient for runtime acceptance.
6. Perform: Trace the carved return arrow to record the existing maintenance route. Verify this response before continuing; a text-only success flag is insufficient for runtime acceptance.
7. Check the owner result: Optional route marks recorded; no required gate clue is exclusive to this encounter. Discovery mapping: no new required clue. Compare against the exact mapping section; do not grant an entire room’s clues automatically.
8. Repeat the final accepted input twice, then save and restore at every stable step from 0 through 3. Confirm one reward/choice only, and reconstruct the same logical control state.
9. Cancel during the first uncommitted manipulation and lose window focus during a hold. Return to the last confirmed state; the documented shelter remains available.
10. Repeat with audio muted, shape labels instead of color, keyboard-only controls, largest supported text, assisted timing and Canvas fallback. Each required clue and action must still be available.
11. Skip the encounter completely and prove the following required encounter and at least one ending remain reachable.

## Cross-cutting gate

Use the minimal route without optional lore; then the enriched route. Repeat with muted audio, high text scale, keyboard focus, timing assistance and Canvas fallback. Save and restore after each confirmed action, during a modal preview and immediately after a reward. Duplicate clicks cannot duplicate rewards or change a committed choice. Compare outgoing domain snapshots to the specified source-compatible outcomes. Runtime gates remain pending until implemented evidence is attached.

## Evidence and ownership

Design reviewer: automated assistant review, not final creative approval. Implementation, art, audio and unfamiliar-player reviewers: unassigned. Attach exact revision, steps, observations and pass/fail results. Duration, fear, physical-device usability and final visual quality require actual play and cannot be approved by document linting.
