# Town Square — Encounter Flow

Status: specified, not implemented.

## Incoming state

Arrive from return-ascent. Preserve the current save-owned inventory, knowledge and choices. Existing primary prerequisite record:

```json
{
  "id": "primary",
  "goal": "Choose how to share the record without claiming what you cannot prove.",
  "required": [
    "public-record",
    "evidence-boundary"
  ],
  "puzzleId": "primary",
  "requiredItem": null,
  "reward": null
}
```

## Local order

1. [TS-01: Read the Town’s Changes](read-the-town-s-changes.md). Required; record its logical completion before enabling dependent work. Arrive from return-ascent. This encounter can be examined immediately; commits follow its stated prerequisites.
2. [TS-02: Assemble the Account](assemble-the-account.md). Required; record its logical completion before enabling dependent work. Arrive from return-ascent. Complete TS-01 first.
3. [TS-03: Share or Withhold the Evidence](share-or-withhold-the-evidence.md). Required; record its logical completion before enabling dependent work. Complete TS-01 and TS-02 before committing this encounter. Previewing and inspection may occur earlier only when the content is actually available; no primary or item gate is bypassed.

Controls may be examined before prerequisites exist; dependent mutations remain locked with a specific reason. Returning from a close view never loses confirmed steps. Previewing a route or ending does not commit it.

## Outgoing branches

- `copies`: Leave copies with the residents. The record begins to exist in more than one place. Preserve flag `publicCopies`.
- `originals`: Arrange independent custody of the originals. You identify which papers are originals and which are copies. The residents choose separate custodians. Preserve flag `publicCopies`.

All local departure alternatives converge on exit-road. Optional encounter outcomes remain orthogonal to the single committed departure choice.

## Gate and reward preservation

TS-01: Does not independently mark the legacy room primary objective complete. Keep source clue IDs public-record, evidence-boundary. Observe mapped source objects only after the corresponding fact is actually presented; never auto-award all clues on room entry.

TS-02: Completes the legacy primary objective only after all source required clues and necessary equipment have been established. Keep source clue IDs unchanged; no new required clue is awarded here. Observe mapped source objects only after the corresponding fact is actually presented; never auto-award all clues on room entry.

TS-03: Does not independently mark the legacy room primary objective complete. Keep source clue IDs unchanged; no new required clue is awarded here. Observe mapped source objects only after the corresponding fact is actually presented; never auto-award all clues on room entry.

## Required review

Trace the minimal route, each optional detour and every existing outgoing choice. Save after each confirmed step; restore and continue. Reject a design where an optional clue becomes a hidden required prerequisite. [Location acceptance](acceptance-and-review.md).
