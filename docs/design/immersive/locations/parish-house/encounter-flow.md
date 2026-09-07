# Parish House — Encounter Flow

Status: specified, not implemented.

## Incoming state

Arrive from chapel-nave. Preserve the current save-owned inventory, knowledge and choices. Existing primary prerequisite record:

```json
{
  "id": "primary",
  "goal": "Recover the relay contract and the descent equipment.",
  "required": [
    "safe-code",
    "family-history"
  ],
  "puzzleId": "primary",
  "requiredItem": "chalk",
  "reward": "relay"
}
```

## Local order

1. [PH-01: Open the Mechanical Safe](open-the-mechanical-safe.md). Required; record its logical completion before enabling dependent work. Arrive from chapel-nave. This encounter can be examined immediately; commits follow its stated prerequisites.
2. [PH-02: Expose the Descent Entrance](expose-the-descent-entrance.md). Required; record its logical completion before enabling dependent work. Arrive from chapel-nave. Complete PH-01 first.
3. [PH-03: Examine the Hidden Photograph](examine-the-hidden-photograph.md). Optional; skipping must not block the following required action. Arrive from chapel-nave. Complete PH-01 first. Also complete the second required encounter before departure; this optional encounter never supplies its prerequisites.

Controls may be examined before prerequisites exist; dependent mutations remain locked with a specific reason. Returning from a close view never loses confirmed steps. Previewing a route or ending does not commit it.

## Outgoing branches

- `utility`: Descend by the documented utility stair. You carry the contract and a practical route back.
- `letter`: Discuss the letter before descending. You admit what you burned. Elian does not forgive on command, but she hears the admission. Preserve flag `elianTrust`.

All local departure alternatives converge on maintenance-tunnels. Optional encounter outcomes remain orthogonal to the single committed departure choice.

## Gate and reward preservation

PH-01: Does not independently mark the legacy room primary objective complete. Keep source clue IDs safe-code. Observe mapped source objects only after the corresponding fact is actually presented; never auto-award all clues on room entry.

PH-02: Completes the legacy primary objective only after all source required clues and necessary equipment have been established. Keep source clue IDs family-history. Observe mapped source objects only after the corresponding fact is actually presented; never auto-award all clues on room entry.

PH-03: Does not independently mark the legacy room primary objective complete. Keep source clue IDs unchanged; no new required clue is awarded here. Observe mapped source objects only after the corresponding fact is actually presented; never auto-award all clues on room entry.

## Required review

Trace the minimal route, each optional detour and every existing outgoing choice. Save after each confirmed step; restore and continue. Reject a design where an optional clue becomes a hidden required prerequisite. [Location acceptance](acceptance-and-review.md).
