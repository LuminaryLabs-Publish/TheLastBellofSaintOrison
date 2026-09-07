# School Hall — Encounter Flow

Status: specified, not implemented.

## Incoming state

Arrive from bell-tower-base. Preserve the current save-owned inventory, knowledge and choices. Existing primary prerequisite record:

```json
{
  "id": "primary",
  "goal": "Cross-check four identities without erasing chosen aliases.",
  "required": [
    "names-first-four",
    "school-order"
  ],
  "puzzleId": "primary",
  "requiredItem": null,
  "reward": "register"
}
```

## Local order

1. [SH-01: Reassemble the Class Photograph](reassemble-the-class-photograph.md). Required; record its logical completion before enabling dependent work. Arrive from bell-tower-base. This encounter can be examined immediately; commits follow its stated prerequisites.
2. [SH-02: Find the Missing Place](find-the-missing-place.md). Required; record its logical completion before enabling dependent work. Arrive from bell-tower-base. Complete SH-01 first.
3. [SH-03: Reveal the Covered Drawing](reveal-the-covered-drawing.md). Optional; skipping must not block the following required action. Arrive from bell-tower-base. Complete SH-01 first. Also complete the second required encounter before departure; this optional encounter never supplies its prerequisites.

Controls may be examined before prerequisites exist; dependent mutations remain locked with a specific reason. Returning from a close view never loses confirmed steps. Previewing a route or ending does not commit it.

## Outgoing branches

- `copy`: Copy the records with aliases intact. You preserve the distinction between verified history and chosen identity.
- `ask`: Ask June what should remain private. June leaves one margin closed. You carry the proof without claiming every memory. Preserve flag `consent`.

All local departure alternatives converge on flooded-archive. Optional encounter outcomes remain orthogonal to the single committed departure choice.

## Gate and reward preservation

SH-01: Does not independently mark the legacy room primary objective complete. Keep source clue IDs names-first-four. Observe mapped source objects only after the corresponding fact is actually presented; never auto-award all clues on room entry.

SH-02: Completes the legacy primary objective only after all source required clues and necessary equipment have been established. Keep source clue IDs school-order. Observe mapped source objects only after the corresponding fact is actually presented; never auto-award all clues on room entry.

SH-03: Does not independently mark the legacy room primary objective complete. Keep source clue IDs unchanged; no new required clue is awarded here. Observe mapped source objects only after the corresponding fact is actually presented; never auto-award all clues on room entry.

## Required review

Trace the minimal route, each optional detour and every existing outgoing choice. Save after each confirmed step; restore and continue. Reject a design where an optional clue becomes a hidden required prerequisite. [Location acceptance](acceptance-and-review.md).
