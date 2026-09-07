# Bell Tower Base — Acceptance and Review

Status: design checks only; runtime acceptance pending.

## Source-preservation gate

- Keep current required knowledge: governor-order, silence-method.
- Keep current required item: none.
- Keep current primary reward: none.
- Preserve departure IDs: preserve, break.

## Encounter walkthroughs

### [BT-01 — Balance the Governor](balance-the-governor.md)

1. Enter bell-tower-base with its source-valid incoming state and the stated prerequisites. Before acting, confirm that none of this encounter’s unearned effects are already granted.
2. Locate the named controls from the wide view, then expose these clues: A cutaway pipe exposes load moving away from the governor when bypass opens. The brake lock clears only when the tension gauge falls.
3. Use the wrong or cancelled action described here: The mechanical interlock blocks a loaded brake; reset the handles without breaking the relay. Confirm required items, evidence and prior choices remain unchanged.
4. Perform: Open the bypass wheel; the bypass channel visibly takes the load. Verify this response before continuing; a text-only success flag is insufficient for runtime acceptance.
5. Perform: Release the tension lever until the gauge rests in its notched band. Verify this response before continuing; a text-only success flag is insufficient for runtime acceptance.
6. Perform: Engage the brake; the governor slows and settles. Verify this response before continuing; a text-only success flag is insufficient for runtime acceptance.
7. Check the owner result: Governor delayed non-destructively and governor-order recorded. Discovery mapping: governor-order. Compare against the exact mapping section; do not grant an entire room’s clues automatically.
8. Repeat the final accepted input twice, then save and restore at every stable step from 0 through 3. Confirm one reward/choice only, and reconstruct the same logical control state.
9. Cancel during the first uncommitted manipulation and lose window focus during a hold. Return to the last confirmed state; the documented shelter remains available.
10. Repeat with audio muted, shape labels instead of color, keyboard-only controls, largest supported text, assisted timing and Canvas fallback. Each required clue and action must still be available.
11. Skip all optional lore and prove the encounter is still solvable using its visible clues and caption alternatives.

### [BT-02 — Isolate the Access Mechanism](isolate-the-access-mechanism.md)

1. Enter bell-tower-base with its source-valid incoming state and the stated prerequisites. Before acting, confirm that none of this encounter’s unearned effects are already granted.
2. Locate the named controls from the wide view, then expose these clues: The isolated training brace moves through outer, inner, outer detents. The real relay lies behind a separate guarded control; training cannot sever it.
3. Use the wrong or cancelled action described here: A wrong pad returns the model to its first detent; no real shaft is struck. Confirm required items, evidence and prior choices remain unchanged.
4. Perform: Close the training cover to isolate its acoustic path. Verify this response before continuing; a text-only success flag is insufficient for runtime acceptance.
5. Perform: Strike outer, inner, outer on the harmless brace model; three detents engage. Verify this response before continuing; a text-only success flag is insufficient for runtime acceptance.
6. Perform: Turn the access wheel; the maintenance route opens and the isolation diagram is recorded. Verify this response before continuing; a text-only success flag is insufficient for runtime acceptance.
7. Check the owner result: silence-method learned and access unlocked without committing a relay choice. Discovery mapping: silence-method. Compare against the exact mapping section; do not grant an entire room’s clues automatically.
8. Repeat the final accepted input twice, then save and restore at every stable step from 0 through 3. Confirm one reward/choice only, and reconstruct the same logical control state.
9. Cancel during the first uncommitted manipulation and lose window focus during a hold. Return to the last confirmed state; the documented shelter remains available.
10. Repeat with audio muted, shape labels instead of color, keyboard-only controls, largest supported text, assisted timing and Canvas fallback. Each required clue and action must still be available.
11. Skip all optional lore and prove the encounter is still solvable using its visible clues and caption alternatives.

### [BT-03 — Preserve or Disable the Relay](preserve-or-disable-the-relay.md)

1. Enter bell-tower-base with its source-valid incoming state and the stated prerequisites. Before acting, confirm that none of this encounter’s unearned effects are already granted.
2. Locate the named controls from the wide view, then expose these clues: The indicator shows the Witness channel open while the relay is intact. Lifting the guard previews a crossed-out transmission symbol and the explicit loss of Witness.
3. Use the wrong or cancelled action described here: Preview and cancel make no permanent change; a repeated confirmation cannot toggle the earlier result. Confirm required items, evidence and prior choices remain unchanged.
4. Perform: Inspect both previews with pressure paused. Verify this response before continuing; a text-only success flag is insufficient for runtime acceptance.
5. Perform: Select preserve or break; show a short consequence sentence and a cancel control. Verify this response before continuing; a text-only success flag is insufficient for runtime acceptance.
6. Perform: Confirm once; only then retain or sever the shaft and commit the existing departure choice. Verify this response before continuing; a text-only success flag is insufficient for runtime acceptance.
7. Check the owner result: Exactly one of preserve or break is committed; original ending eligibility remains authoritative. Discovery mapping: no new required clue. Compare against the exact mapping section; do not grant an entire room’s clues automatically.
8. Repeat the final accepted input twice, then save and restore at every stable step from 0 through 3. Confirm one reward/choice only, and reconstruct the same logical control state.
9. Cancel during the first uncommitted manipulation and lose window focus during a hold. Return to the last confirmed state; the documented shelter remains available.
10. Repeat with audio muted, shape labels instead of color, keyboard-only controls, largest supported text, assisted timing and Canvas fallback. Each required clue and action must still be available.
11. Skip all optional lore and prove the encounter is still solvable using its visible clues and caption alternatives.
12. Preview each available option and cancel. Confirm that neither Narrative nor Campaign changes before the final commit. Check each existing departure from the route matrix, including disabled-option feedback where relevant.

## Cross-cutting gate

Use the minimal route without optional lore; then the enriched route. Repeat with muted audio, high text scale, keyboard focus, timing assistance and Canvas fallback. Save and restore after each confirmed action, during a modal preview and immediately after a reward. Duplicate clicks cannot duplicate rewards or change a committed choice. Compare outgoing domain snapshots to the specified source-compatible outcomes. Runtime gates remain pending until implemented evidence is attached.

## Evidence and ownership

Design reviewer: automated assistant review, not final creative approval. Implementation, art, audio and unfamiliar-player reviewers: unassigned. Attach exact revision, steps, observations and pass/fail results. Duration, fear, physical-device usability and final visual quality require actual play and cannot be approved by document linting.
