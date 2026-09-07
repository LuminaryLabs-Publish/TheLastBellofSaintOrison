# Visitor Centre — Acceptance and Review

Status: design checks only; runtime acceptance pending.

## Source-preservation gate

- Keep current required knowledge: map-circuit, cafe-lead.
- Keep current required item: none.
- Keep current primary reward: none.
- Preserve departure IDs: front, service.

## Encounter walkthroughs

### [VC-01 — Restore the Map Circuit](restore-the-map-circuit.md)

1. Enter visitor-centre with its source-valid incoming state and the stated prerequisites. Before acting, confirm that none of this encounter’s unearned effects are already granted.
2. Locate the named controls from the wide view, then expose these clues: A transparent diagram exposes the feed from circle through triangle to square. Red/circle, blue/triangle and amber/square labels retain the existing order without color-only dependence.
3. Use the wrong or cancelled action described here: Wrong order trips a resettable map-only breaker; no fuse or inventory item is consumed. Confirm required items, evidence and prior choices remain unchanged.
4. Perform: Examine the transparent diagram and isolate the circle toggle. Verify this response before continuing; a text-only success flag is insufficient for runtime acceptance.
5. Perform: Connect the triangle feed; the first route segment illuminates. Verify this response before continuing; a text-only success flag is insufficient for runtime acceptance.
6. Perform: Connect the square feed; the map lights and its breaker remains closed. Verify this response before continuing; a text-only success flag is insufficient for runtime acceptance.
7. Check the owner result: All three toggles match the isolated, connected, connected configuration. Discovery mapping: map-circuit. Compare against the exact mapping section; do not grant an entire room’s clues automatically.
8. Repeat the final accepted input twice, then save and restore at every stable step from 0 through 3. Confirm one reward/choice only, and reconstruct the same logical control state.
9. Cancel during the first uncommitted manipulation and lose window focus during a hold. Return to the last confirmed state; the documented shelter remains available.
10. Repeat with audio muted, shape labels instead of color, keyboard-only controls, largest supported text, assisted timing and Canvas fallback. Each required clue and action must still be available.
11. Skip all optional lore and prove the encounter is still solvable using its visible clues and caption alternatives.

### [VC-02 — Release the District Key](release-the-district-key.md)

1. Enter visitor-centre with its source-valid incoming state and the stated prerequisites. Before acting, confirm that none of this encounter’s unearned effects are already granted.
2. Locate the named controls from the wide view, then expose these clues: The visitor book has Elian’s wave beside CAFÉ 07:10; this short identification remains readable. The same wave is stamped into the map slider’s café stop.
3. Use the wrong or cancelled action described here: The wrong overlay shows a visibly boarded exit; return the slider freely. Confirm required items, evidence and prior choices remain unchanged.
4. Perform: Use the existing intake key to open the map overlay cabinet. Verify this response before continuing; a text-only success flag is insufficient for runtime acceptance.
5. Perform: Slide the wave marker to the café stop; a sightline opens toward the café street. Verify this response before continuing; a text-only success flag is insufficient for runtime acceptance.
6. Perform: Select either the front street or staff-route preview, without committing departure yet. Verify this response before continuing; a text-only success flag is insufficient for runtime acceptance.
7. Check the owner result: Café lead recorded and a usable route displayed; no second district-key item is created. Discovery mapping: cafe-lead. Compare against the exact mapping section; do not grant an entire room’s clues automatically.
8. Repeat the final accepted input twice, then save and restore at every stable step from 0 through 3. Confirm one reward/choice only, and reconstruct the same logical control state.
9. Cancel during the first uncommitted manipulation and lose window focus during a hold. Return to the last confirmed state; the documented shelter remains available.
10. Repeat with audio muted, shape labels instead of color, keyboard-only controls, largest supported text, assisted timing and Canvas fallback. Each required clue and action must still be available.
11. Skip all optional lore and prove the encounter is still solvable using its visible clues and caption alternatives.

### [VC-03 — Find the Altered Route](find-the-altered-route.md)

1. Enter visitor-centre with its source-valid incoming state and the stated prerequisites. Before acting, confirm that none of this encounter’s unearned effects are already granted.
2. Locate the named controls from the wide view, then expose these clues: Matching punched holes align the two sheets. The same entries move from DEPARTED to RETAINED; neither sheet supplies a new person to follow.
3. Use the wrong or cancelled action described here: Misalignment leaves registration holes visibly offset; rotate back without losing evidence. Confirm required items, evidence and prior choices remain unchanged.
4. Perform: Lift the carbon tab and align both sheets by their punched holes. Verify this response before continuing; a text-only success flag is insufficient for runtime acceptance.
5. Perform: Toggle the staff layer; its route joins the same café. Verify this response before continuing; a text-only success flag is insufficient for runtime acceptance.
6. Perform: Record both sheets together as evidence of selective evacuation. Verify this response before continuing; a text-only success flag is insufficient for runtime acceptance.
7. Check the owner result: Optional selective-evacuation evidence retained; front and staff routes still converge. Discovery mapping: no new required clue. Compare against the exact mapping section; do not grant an entire room’s clues automatically.
8. Repeat the final accepted input twice, then save and restore at every stable step from 0 through 3. Confirm one reward/choice only, and reconstruct the same logical control state.
9. Cancel during the first uncommitted manipulation and lose window focus during a hold. Return to the last confirmed state; the documented shelter remains available.
10. Repeat with audio muted, shape labels instead of color, keyboard-only controls, largest supported text, assisted timing and Canvas fallback. Each required clue and action must still be available.
11. Skip the encounter completely and prove the following required encounter and at least one ending remain reachable.

## Cross-cutting gate

Use the minimal route without optional lore; then the enriched route. Repeat with muted audio, high text scale, keyboard focus, timing assistance and Canvas fallback. Save and restore after each confirmed action, during a modal preview and immediately after a reward. Duplicate clicks cannot duplicate rewards or change a committed choice. Compare outgoing domain snapshots to the specified source-compatible outcomes. Runtime gates remain pending until implemented evidence is attached.

## Evidence and ownership

Design reviewer: automated assistant review, not final creative approval. Implementation, art, audio and unfamiliar-player reviewers: unassigned. Attach exact revision, steps, observations and pass/fail results. Duration, fear, physical-device usability and final visual quality require actual play and cannot be approved by document linting.
