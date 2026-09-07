# Maintenance Tunnels — Encounter Flow

Status: specified, not implemented.

## Incoming state

Arrive from parish-house. Preserve the current save-owned inventory, knowledge and choices. Existing primary prerequisite record:

```json
{
  "id": "primary",
  "goal": "Follow the utility markings and preserve a return route.",
  "required": [
    "tunnel-order",
    "container-proof"
  ],
  "puzzleId": "primary",
  "requiredItem": null,
  "reward": null
}
```

## Local order

1. [MT-01: Route Emergency Power](route-emergency-power.md). Required; record its logical completion before enabling dependent work. Arrive from parish-house. This encounter can be examined immediately; commits follow its stated prerequisites.
2. [MT-02: Follow the Service Line](follow-the-service-line.md). Required; record its logical completion before enabling dependent work. Arrive from parish-house. Complete MT-01 first.
3. [MT-03: Examine the Monitoring Station](examine-the-monitoring-station.md). Optional; skipping must not block the following required action. Arrive from parish-house. Complete MT-01 first. Also complete the second required encounter before departure; this optional encounter never supplies its prerequisites.

Controls may be examined before prerequisites exist; dependent mutations remain locked with a specific reason. Returning from a close view never loses confirmed steps. Previewing a route or ending does not commit it.

## Outgoing branches

- `direct`: Continue along the verified pipes. You remember the pipe route, but leave no extra marker.
- `mark`: Chalk the return direction before proceeding. A white arrow points back to the pump niche. The later ascent will have a reliable landmark. Preserve flag `returnMarked`.

All local departure alternatives converge on well-chamber. Optional encounter outcomes remain orthogonal to the single committed departure choice.

## Gate and reward preservation

MT-01: Does not independently mark the legacy room primary objective complete. Keep source clue IDs tunnel-order. Observe mapped source objects only after the corresponding fact is actually presented; never auto-award all clues on room entry.

MT-02: Completes the legacy primary objective only after all source required clues and necessary equipment have been established. Keep source clue IDs container-proof. Observe mapped source objects only after the corresponding fact is actually presented; never auto-award all clues on room entry.

MT-03: Does not independently mark the legacy room primary objective complete. Keep source clue IDs unchanged; no new required clue is awarded here. Observe mapped source objects only after the corresponding fact is actually presented; never auto-award all clues on room entry.

## Required review

Trace the minimal route, each optional detour and every existing outgoing choice. Save after each confirmed step; restore and continue. Reject a design where an optional clue becomes a hidden required prerequisite. [Location acceptance](acceptance-and-review.md).
