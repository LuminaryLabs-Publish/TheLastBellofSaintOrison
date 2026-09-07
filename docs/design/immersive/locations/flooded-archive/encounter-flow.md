# Flooded Archive — Encounter Flow

Status: specified, not implemented.

## Incoming state

Arrive from school-hall. Preserve the current save-owned inventory, knowledge and choices. Existing primary prerequisite record:

```json
{
  "id": "primary",
  "goal": "Recover the shutoff record and its carbon original.",
  "required": [
    "archive-index",
    "archive-safe"
  ],
  "puzzleId": "primary",
  "requiredItem": null,
  "reward": null
}
```

## Local order

1. [FA-01: Restore the Pump Flow](restore-the-pump-flow.md). Required; record its logical completion before enabling dependent work. Arrive from school-hall. This encounter can be examined immediately; commits follow its stated prerequisites.
2. [FA-02: Locate the Original Record](locate-the-original-record.md). Required; record its logical completion before enabling dependent work. Arrive from school-hall. Complete FA-01 first.
3. [FA-03: Recover the Handwritten Correction](recover-the-handwritten-correction.md). Optional; skipping must not block the following required action. Arrive from school-hall. Complete FA-01 first. Also complete the second required encounter before departure; this optional encounter never supplies its prerequisites.

Controls may be examined before prerequisites exist; dependent mutations remain locked with a specific reason. Returning from a close view never loses confirmed steps. Previewing a route or ending does not commit it.

## Outgoing branches

- `photo`: Leave with the photographed record. You leave with the records you gathered. Any original proof already recovered remains protected in your satchel.
- `original`: Recover the tethered carbon original. You bring out the waterproof case. Public evidence need not depend on your testimony alone. Preserve flag `originalSaved`. Preserve item `archive`.

All local departure alternatives converge on chapel-nave. Optional encounter outcomes remain orthogonal to the single committed departure choice.

## Gate and reward preservation

FA-01: Does not independently mark the legacy room primary objective complete. Keep source clue IDs archive-safe. Observe mapped source objects only after the corresponding fact is actually presented; never auto-award all clues on room entry.

FA-02: Completes the legacy primary objective only after all source required clues and necessary equipment have been established. Keep source clue IDs archive-index. Observe mapped source objects only after the corresponding fact is actually presented; never auto-award all clues on room entry.

FA-03: Does not independently mark the legacy room primary objective complete. Keep source clue IDs unchanged; no new required clue is awarded here. Observe mapped source objects only after the corresponding fact is actually presented; never auto-award all clues on room entry.

## Required review

Trace the minimal route, each optional detour and every existing outgoing choice. Save after each confirmed step; restore and continue. Reject a design where an optional clue becomes a hidden required prerequisite. [Location acceptance](acceptance-and-review.md).
