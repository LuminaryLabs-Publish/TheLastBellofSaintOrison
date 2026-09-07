# Town Gate — Encounter Flow

Status: specified, not implemented.

## Incoming state

Arrive from new game. Preserve the current save-owned inventory, knowledge and choices. Existing primary prerequisite record:

```json
{
  "id": "primary",
  "goal": "Read the crossing notice, then open a safe route into town.",
  "required": [
    "crossing-rule",
    "blank-record"
  ],
  "puzzleId": "primary",
  "requiredItem": null,
  "reward": "key"
}
```

## Local order

1. [TG-01: Read the Crossing Signal](read-the-crossing-signal.md). Required; record its logical completion before enabling dependent work. Arrive from new game with Elian’s cassette. This encounter can be examined immediately; commits follow its stated prerequisites.
2. [TG-02: Release the Gate Latch](release-the-gate-latch.md). Required; record its logical completion before enabling dependent work. Arrive from new game with Elian’s cassette. Complete TG-01 first.
3. [TG-03: Answer the Callbox](answer-the-callbox.md). Optional; skipping must not block the following required action. Arrive from new game with Elian’s cassette. Complete TG-01 first. Also complete the second required encounter before departure; this optional encounter never supplies its prerequisites.

Controls may be examined before prerequisites exist; dependent mutations remain locked with a specific reason. Returning from a close view never loses confirmed steps. Previewing a route or ending does not commit it.

## Outgoing branches

- `shelter`: Wait in shelter; cross on the dark lamp. You wait through both bells. When the lamp dies, you cross without looking toward the footsteps.
- `passage`: Take the marked maintenance passage. You follow the carved arrow through the gatehouse wall. A second arrow marks a return route. Preserve flag `gateMarks`.

All local departure alternatives converge on visitor-centre. Optional encounter outcomes remain orthogonal to the single committed departure choice.

## Gate and reward preservation

TG-01: Does not independently mark the legacy room primary objective complete. Keep source clue IDs crossing-rule. Observe mapped source objects only after the corresponding fact is actually presented; never auto-award all clues on room entry.

TG-02: Completes the legacy primary objective only after all source required clues and necessary equipment have been established. Keep source clue IDs blank-record. Observe mapped source objects only after the corresponding fact is actually presented; never auto-award all clues on room entry.

TG-03: Does not independently mark the legacy room primary objective complete. Keep source clue IDs unchanged; no new required clue is awarded here. Observe mapped source objects only after the corresponding fact is actually presented; never auto-award all clues on room entry.

## Required review

Trace the minimal route, each optional detour and every existing outgoing choice. Save after each confirmed step; restore and continue. Reject a design where an optional clue becomes a hidden required prerequisite. [Location acceptance](acceptance-and-review.md).
