# Return Ascent — Encounter Flow

Status: specified, not implemented.

## Incoming state

Arrive from well-chamber. Preserve the current save-owned inventory, knowledge and choices. Existing primary prerequisite record:

```json
{
  "id": "primary",
  "goal": "Use the verified return route and make it back above ground.",
  "required": [
    "return-order",
    "elian-return"
  ],
  "puzzleId": "primary",
  "requiredItem": null,
  "reward": null
}
```

## Local order

1. [RA-01: Identify the Surviving Route](identify-the-surviving-route.md). Required; record its logical completion before enabling dependent work. Arrive from well-chamber. This encounter can be examined immediately; commits follow its stated prerequisites.
2. [RA-02: Release the Escape Gates](release-the-escape-gates.md). Required; record its logical completion before enabling dependent work. Arrive from well-chamber. Complete RA-01 first.
3. [RA-03: Retrieve the Endangered Evidence](retrieve-the-endangered-evidence.md). Optional; skipping must not block the following required action. Arrive from well-chamber. Complete RA-01 first. Also complete the second required encounter before departure; this optional encounter never supplies its prerequisites.

Controls may be examined before prerequisites exist; dependent mutations remain locked with a specific reason. Returning from a close view never loses confirmed steps. Previewing a route or ending does not commit it.

## Outgoing branches

- `leave`: Continue to the square. You take the upper stair. Elian’s route follows the instructions you gave.
- `help`: Hold the line until Elian confirms her route. “Open eye,” she says at the last junction. This time the answer comes from a person who can leave. Preserve flag `elianHelped`.

All local departure alternatives converge on town-square. Optional encounter outcomes remain orthogonal to the single committed departure choice.

## Gate and reward preservation

RA-01: Does not independently mark the legacy room primary objective complete. Keep source clue IDs return-order, elian-return. Observe mapped source objects only after the corresponding fact is actually presented; never auto-award all clues on room entry.

RA-02: Completes the legacy primary objective only after all source required clues and necessary equipment have been established. Keep source clue IDs unchanged; no new required clue is awarded here. Observe mapped source objects only after the corresponding fact is actually presented; never auto-award all clues on room entry.

RA-03: Does not independently mark the legacy room primary objective complete. Keep source clue IDs unchanged; no new required clue is awarded here. Observe mapped source objects only after the corresponding fact is actually presented; never auto-award all clues on room entry.

## Required review

Trace the minimal route, each optional detour and every existing outgoing choice. Save after each confirmed step; restore and continue. Reject a design where an optional clue becomes a hidden required prerequisite. [Location acceptance](acceptance-and-review.md).
