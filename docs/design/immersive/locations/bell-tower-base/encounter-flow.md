# Bell Tower Base — Encounter Flow

Status: specified, not implemented.

## Incoming state

Arrive from apothecary. Preserve the current save-owned inventory, knowledge and choices. Existing primary prerequisite record:

```json
{
  "id": "primary",
  "goal": "Learn the bell cycle and choose how to interrupt it.",
  "required": [
    "governor-order",
    "silence-method"
  ],
  "puzzleId": "primary",
  "requiredItem": null,
  "reward": null
}
```

## Local order

1. [BT-01: Balance the Governor](balance-the-governor.md). Required; record its logical completion before enabling dependent work. Arrive from apothecary. This encounter can be examined immediately; commits follow its stated prerequisites.
2. [BT-02: Isolate the Access Mechanism](isolate-the-access-mechanism.md). Required; record its logical completion before enabling dependent work. Arrive from apothecary. Complete BT-01 first.
3. [BT-03: Preserve or Disable the Relay](preserve-or-disable-the-relay.md). Required; record its logical completion before enabling dependent work. Complete BT-01 and BT-02 before committing this encounter. Previewing and inspection may occur earlier only when the content is actually available; no primary or item gate is bypassed.

Controls may be examined before prerequisites exist; dependent mutations remain locked with a specific reason. Returning from a close view never loses confirmed steps. Previewing a route or ending does not commit it.

## Outgoing branches

- `preserve`: Leave the relay intact. You preserve the channel. The later Witness transmission remains possible. Preserve flag `relayIntact`.
- `break`: Break the shaft · disables Witness transmission. You strike the red shaft. The outgoing relay snaps. The Silence and Vessel methods remain possible; public transmission through this line does not. Preserve flag `relayBroken`.

All local departure alternatives converge on school-hall. Optional encounter outcomes remain orthogonal to the single committed departure choice.

## Gate and reward preservation

BT-01: Does not independently mark the legacy room primary objective complete. Keep source clue IDs governor-order. Observe mapped source objects only after the corresponding fact is actually presented; never auto-award all clues on room entry.

BT-02: Completes the legacy primary objective only after all source required clues and necessary equipment have been established. Keep source clue IDs silence-method. Observe mapped source objects only after the corresponding fact is actually presented; never auto-award all clues on room entry.

BT-03: Does not independently mark the legacy room primary objective complete. Keep source clue IDs unchanged; no new required clue is awarded here. Observe mapped source objects only after the corresponding fact is actually presented; never auto-award all clues on room entry.

## Required review

Trace the minimal route, each optional detour and every existing outgoing choice. Save after each confirmed step; restore and continue. Reject a design where an optional clue becomes a hidden required prerequisite. [Location acceptance](acceptance-and-review.md).
