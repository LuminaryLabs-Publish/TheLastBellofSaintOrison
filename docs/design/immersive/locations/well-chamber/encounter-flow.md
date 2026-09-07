# Well Chamber — Encounter Flow

Status: specified, not implemented.

## Incoming state

Arrive from maintenance-tunnels. Preserve the current save-owned inventory, knowledge and choices. Existing primary prerequisite record:

```json
{
  "id": "primary",
  "goal": "Recover the Bell Core and choose a fully explained intervention.",
  "required": [
    "names-second-four",
    "ending-methods"
  ],
  "puzzleId": "primary",
  "requiredItem": null,
  "reward": "core"
}
```

## Local order

1. [WC-01: Stabilize the Inspection Platform](stabilize-the-inspection-platform.md). Required; record its logical completion before enabling dependent work. Arrive from maintenance-tunnels. This encounter can be examined immediately; commits follow its stated prerequisites.
2. [WC-02: Trace the Bell Mechanism](trace-the-bell-mechanism.md). Required; record its logical completion before enabling dependent work. Inspect the paired records and method models before or after WC-01. Grant core and mark primary solved only when both are complete; no end choice unlocks early.
3. [WC-03: Commit the Final Intervention](commit-the-final-intervention.md). Required; record its logical completion before enabling dependent work. Complete WC-01 and WC-02 before committing this encounter. Previewing and inspection may occur earlier only when the content is actually available; no primary or item gate is bypassed.

Controls may be examined before prerequisites exist; dependent mutations remain locked with a specific reason. Returning from a close view never loses confirmed steps. Previewing a route or ending does not commit it.

## Outgoing branches

- `witness`: WITNESS · transmit names and original proof. You preserve the original records and open the verified public channel. The vessel will lose its role as the sole container.   Commit existing ending `witness`.
- `silence`: SILENCE · isolate and end the vessel. You disconnect the relay and strike outer, inner, outer. No new person is offered. Public proof remains limited to what you carry.   Commit existing ending `silence`.
- `vessel`: VESSEL · knowingly offer your own pattern. You offer your own copied childhood pattern. The others can leave; you accept a continuing burden and the loss of being reliably remembered.   Commit existing ending `vessel`.

All local departure alternatives converge on return-ascent. Optional encounter outcomes remain orthogonal to the single committed departure choice.

## Gate and reward preservation

WC-01: Does not independently mark the legacy room primary objective complete. Keep source clue IDs unchanged; no new required clue is awarded here. Observe mapped source objects only after the corresponding fact is actually presented; never auto-award all clues on room entry.

WC-02: Completes the legacy primary objective only after all source required clues and necessary equipment have been established. Keep source clue IDs names-second-four, ending-methods. Observe mapped source objects only after the corresponding fact is actually presented; never auto-award all clues on room entry.

WC-03: Does not independently mark the legacy room primary objective complete. Keep source clue IDs unchanged; no new required clue is awarded here. Observe mapped source objects only after the corresponding fact is actually presented; never auto-award all clues on room entry.

## Required review

Trace the minimal route, each optional detour and every existing outgoing choice. Save after each confirmed step; restore and continue. Reject a design where an optional clue becomes a hidden required prerequisite. [Location acceptance](acceptance-and-review.md).
