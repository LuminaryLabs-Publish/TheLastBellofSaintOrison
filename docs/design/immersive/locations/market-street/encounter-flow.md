# Market Street — Encounter Flow

Status: specified, not implemented.

## Incoming state

Arrive from closed-cafe. Preserve the current save-owned inventory, knowledge and choices. Existing primary prerequisite record:

```json
{
  "id": "primary",
  "goal": "Secure the shutter and collect a service lantern.",
  "required": [
    "shutter-order"
  ],
  "puzzleId": "primary",
  "requiredItem": "lantern",
  "reward": null
}
```

## Local order

1. [MS-01: Cross the Shutter Cycle](cross-the-shutter-cycle.md). Required; record its logical completion before enabling dependent work. Arrive from closed-cafe. This encounter can be examined immediately; commits follow its stated prerequisites.
2. [MS-02: Release the Jammed Winch](release-the-jammed-winch.md). Required; record its logical completion before enabling dependent work. Arrive from closed-cafe. Complete MS-01 first.
3. [MS-03: Recover the Stranded Parcel](recover-the-stranded-parcel.md). Optional; skipping must not block the following required action. Arrive from closed-cafe. Complete MS-01 first. Also complete the second required encounter before departure; this optional encounter never supplies its prerequisites.

Controls may be examined before prerequisites exist; dependent mutations remain locked with a specific reason. Returning from a close view never loses confirmed steps. Previewing a route or ending does not commit it.

## Outgoing branches

- `direct`: Cross through the freight opening. The lantern knocks softly against your satchel.
- `secure`: Secure a return marker before crossing. You tie a pale marker at the opening. The route will be recognizable even without the lamps. Preserve flag `marketSafe`.

All local departure alternatives converge on apothecary. Optional encounter outcomes remain orthogonal to the single committed departure choice.

## Gate and reward preservation

MS-01: Does not independently mark the legacy room primary objective complete. Keep source clue IDs shutter-order. Observe mapped source objects only after the corresponding fact is actually presented; never auto-award all clues on room entry.

MS-02: Completes the legacy primary objective only after all source required clues and necessary equipment have been established. Keep source clue IDs unchanged; no new required clue is awarded here. Observe mapped source objects only after the corresponding fact is actually presented; never auto-award all clues on room entry.

MS-03: Does not independently mark the legacy room primary objective complete. Keep source clue IDs unchanged; no new required clue is awarded here. Observe mapped source objects only after the corresponding fact is actually presented; never auto-award all clues on room entry.

## Required review

Trace the minimal route, each optional detour and every existing outgoing choice. Save after each confirmed step; restore and continue. Reject a design where an optional clue becomes a hidden required prerequisite. [Location acceptance](acceptance-and-review.md).
