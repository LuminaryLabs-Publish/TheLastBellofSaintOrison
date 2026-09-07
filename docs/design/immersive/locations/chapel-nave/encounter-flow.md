# Chapel Nave — Encounter Flow

Status: specified, not implemented.

## Incoming state

Arrive from flooded-archive. Preserve the current save-owned inventory, knowledge and choices. Existing primary prerequisite record:

```json
{
  "id": "primary",
  "goal": "Verify Elian’s identity and decide whether to release her.",
  "required": [
    "vessel-truth",
    "elian-location"
  ],
  "puzzleId": "primary",
  "requiredItem": null,
  "reward": null
}
```

## Local order

1. [CN-01: Restore the Intercom Connection](restore-the-intercom-connection.md). Required; record its logical completion before enabling dependent work. Arrive from flooded-archive. This encounter can be examined immediately; commits follow its stated prerequisites.
2. [CN-02: Verify the Survivor’s Account](verify-the-survivor-s-account.md). Required; record its logical completion before enabling dependent work. Arrive from flooded-archive. Complete CN-01 first.
3. [CN-03: Release or Leave the Survivor](release-or-leave-the-survivor.md). Required; record its logical completion before enabling dependent work. Complete CN-01 and CN-02 before committing this encounter. Previewing and inspection may occur earlier only when the content is actually available; no primary or item gate is bypassed.

Controls may be examined before prerequisites exist; dependent mutations remain locked with a specific reason. Returning from a close view never loses confirmed steps. Previewing a route or ending does not commit it.

## Outgoing branches

- `release`: Release Elian into the marked stair. You open the isolation door. Elian steps onto the physical stair beside you. She will travel with you through the parish house and tunnels. Preserve flag `elianReleased`.
- `line`: Ask Elian to maintain the archive line. Elian agrees to remain at its protected station. She will speak through the line; she will not appear physically beside you. Preserve flag `elianRemote`.

All local departure alternatives converge on parish-house. Optional encounter outcomes remain orthogonal to the single committed departure choice.

## Gate and reward preservation

CN-01: Does not independently mark the legacy room primary objective complete. Keep source clue IDs vessel-truth, elian-location. Observe mapped source objects only after the corresponding fact is actually presented; never auto-award all clues on room entry.

CN-02: Completes the legacy primary objective only after all source required clues and necessary equipment have been established. Keep source clue IDs unchanged; no new required clue is awarded here. Observe mapped source objects only after the corresponding fact is actually presented; never auto-award all clues on room entry.

CN-03: Does not independently mark the legacy room primary objective complete. Keep source clue IDs unchanged; no new required clue is awarded here. Observe mapped source objects only after the corresponding fact is actually presented; never auto-award all clues on room entry.

## Required review

Trace the minimal route, each optional detour and every existing outgoing choice. Save after each confirmed step; restore and continue. Reject a design where an optional clue becomes a hidden required prerequisite. [Location acceptance](acceptance-and-review.md).
