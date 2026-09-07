# Visitor Centre — Encounter Flow

Status: specified, not implemented.

## Incoming state

Arrive from town-gate. Preserve the current save-owned inventory, knowledge and choices. Existing primary prerequisite record:

```json
{
  "id": "primary",
  "goal": "Restore the map and establish Elian’s next stop.",
  "required": [
    "map-circuit",
    "cafe-lead"
  ],
  "puzzleId": "primary",
  "requiredItem": null,
  "reward": null
}
```

## Local order

1. [VC-01: Restore the Map Circuit](restore-the-map-circuit.md). Required; record its logical completion before enabling dependent work. Arrive from town-gate. This encounter can be examined immediately; commits follow its stated prerequisites.
2. [VC-02: Release the District Key](release-the-district-key.md). Required; record its logical completion before enabling dependent work. Arrive from town-gate. Complete VC-01 first.
3. [VC-03: Find the Altered Route](find-the-altered-route.md). Optional; skipping must not block the following required action. Arrive from town-gate. Complete VC-01 first. Also complete the second required encounter before departure; this optional encounter never supplies its prerequisites.

Controls may be examined before prerequisites exist; dependent mutations remain locked with a specific reason. Returning from a close view never loses confirmed steps. Previewing a route or ending does not commit it.

## Outgoing branches

- `front`: Follow Elian’s café entry. You take the street named in the visitor book.
- `service`: Follow the evacuation staff route. The route passes the same café, behind its delivery door. The evacuation list stays with your evidence. Preserve flag `selectiveEvacuation`.

All local departure alternatives converge on closed-cafe. Optional encounter outcomes remain orthogonal to the single committed departure choice.

## Gate and reward preservation

VC-01: Does not independently mark the legacy room primary objective complete. Keep source clue IDs map-circuit. Observe mapped source objects only after the corresponding fact is actually presented; never auto-award all clues on room entry.

VC-02: Completes the legacy primary objective only after all source required clues and necessary equipment have been established. Keep source clue IDs cafe-lead. Observe mapped source objects only after the corresponding fact is actually presented; never auto-award all clues on room entry.

VC-03: Does not independently mark the legacy room primary objective complete. Keep source clue IDs unchanged; no new required clue is awarded here. Observe mapped source objects only after the corresponding fact is actually presented; never auto-award all clues on room entry.

## Required review

Trace the minimal route, each optional detour and every existing outgoing choice. Save after each confirmed step; restore and continue. Reject a design where an optional clue becomes a hidden required prerequisite. [Location acceptance](acceptance-and-review.md).
