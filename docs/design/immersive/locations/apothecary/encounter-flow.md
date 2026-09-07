# Apothecary — Encounter Flow

Status: specified, not implemented.

## Incoming state

Arrive from market-street. Preserve the current save-owned inventory, knowledge and choices. Existing primary prerequisite record:

```json
{
  "id": "primary",
  "goal": "Test the resin, then prepare the lantern.",
  "required": [
    "resin-test",
    "lantern-limits"
  ],
  "puzzleId": "primary",
  "requiredItem": null,
  "reward": "resin"
}
```

## Local order

1. [AP-01: Test the Protective Mixture](test-the-protective-mixture.md). Required; record its logical completion before enabling dependent work. Arrive from market-street. This encounter can be examined immediately; commits follow its stated prerequisites.
2. [AP-02: Prepare the Lantern Wick](prepare-the-lantern-wick.md). Required; record its logical completion before enabling dependent work. Arrive from market-street. Complete AP-01 first.
3. [AP-03: Examine the Failed Batch](examine-the-failed-batch.md). Optional; skipping must not block the following required action. Arrive from market-street. Complete AP-01 first. Also complete the second required encounter before departure; this optional encounter never supplies its prerequisites.

Controls may be examined before prerequisites exist; dependent mutations remain locked with a specific reason. Returning from a close view never loses confirmed steps. Previewing a route or ending does not commit it.

## Outgoing branches

- `street`: Carry the treated lantern to the tower. The flame burns steadily. You remember what it cannot promise.
- `clinical`: Take the clinical note as well. You preserve the note that separates the human crime from the phenomenon. Preserve flag `clinicalEvidence`.

All local departure alternatives converge on bell-tower-base. Optional encounter outcomes remain orthogonal to the single committed departure choice.

## Gate and reward preservation

AP-01: Completes the legacy primary objective only after all source required clues and necessary equipment have been established. Keep source clue IDs resin-test, lantern-limits. Observe mapped source objects only after the corresponding fact is actually presented; never auto-award all clues on room entry.

AP-02: Does not independently mark the legacy room primary objective complete. Keep source clue IDs unchanged; no new required clue is awarded here. Observe mapped source objects only after the corresponding fact is actually presented; never auto-award all clues on room entry.

AP-03: Does not independently mark the legacy room primary objective complete. Keep source clue IDs unchanged; no new required clue is awarded here. Observe mapped source objects only after the corresponding fact is actually presented; never auto-award all clues on room entry.

## Required review

Trace the minimal route, each optional detour and every existing outgoing choice. Save after each confirmed step; restore and continue. Reject a design where an optional clue becomes a hidden required prerequisite. [Location acceptance](acceptance-and-review.md).
