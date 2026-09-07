# Exit Road — Encounter Flow

Status: specified, not implemented.

## Incoming state

Arrive from town-square. Preserve the current save-owned inventory, knowledge and choices. Existing primary prerequisite record:

```json
{
  "id": "primary",
  "goal": "Acknowledge the consequence and decide what you carry home.",
  "required": [
    "last-listen",
    "last-look"
  ],
  "puzzleId": "primary",
  "requiredItem": null,
  "reward": null
}
```

## Local order

1. [ER-01: Inspect the Final Trace](inspect-the-final-trace.md). Required; record its logical completion before enabling dependent work. Reach Exit Road after Town Square. Brief cassette and road acknowledgement remain required to preserve existing last-listen and last-look; deeper ambience and journal reading are optional.
2. [ER-02: Keep or Leave the Recording](keep-or-leave-the-recording.md). Required; record its logical completion before enabling dependent work. Arrive from town-square. Complete ER-01 first.
3. [ER-03: Leave or Remain](leave-or-remain.md). Required; record its logical completion before enabling dependent work. Complete ER-01 and ER-02 before committing this encounter. Previewing and inspection may occur earlier only when the content is actually available; no primary or item gate is bypassed.

Controls may be examined before prerequisites exist; dependent mutations remain locked with a specific reason. Returning from a close view never loses confirmed steps. Previewing a route or ending does not commit it.

## Outgoing branches

- `home`: Leave Saint Orison. You walk toward the sea road with the record and its consequences.
- `stay`: Stay until the record is safely copied. You delay your departure for an ordinary responsibility: ensuring the papers can outlast you. Preserve flag `publicCopies`.

All local departure alternatives converge on the already-selected ending. Optional encounter outcomes remain orthogonal to the single committed departure choice.

## Gate and reward preservation

ER-01: Does not independently mark the legacy room primary objective complete. Keep source clue IDs last-listen, last-look. Observe mapped source objects only after the corresponding fact is actually presented; never auto-award all clues on room entry.

ER-02: Completes the legacy primary objective only after all source required clues and necessary equipment have been established. Keep source clue IDs unchanged; no new required clue is awarded here. Observe mapped source objects only after the corresponding fact is actually presented; never auto-award all clues on room entry.

ER-03: Does not independently mark the legacy room primary objective complete. Keep source clue IDs unchanged; no new required clue is awarded here. Observe mapped source objects only after the corresponding fact is actually presented; never auto-award all clues on room entry.

## Required review

Trace the minimal route, each optional detour and every existing outgoing choice. Save after each confirmed step; restore and continue. Reject a design where an optional clue becomes a hidden required prerequisite. [Location acceptance](acceptance-and-review.md).
