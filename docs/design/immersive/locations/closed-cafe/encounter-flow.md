# Closed Café — Encounter Flow

Status: specified, not implemented.

## Incoming state

Arrive from visitor-centre. Preserve the current save-owned inventory, knowledge and choices. Existing primary prerequisite record:

```json
{
  "id": "primary",
  "goal": "Compare the radio signal with Elian’s original cassette.",
  "required": [
    "true-signal",
    "radio-channels"
  ],
  "puzzleId": "primary",
  "requiredItem": null,
  "reward": null
}
```

## Local order

1. [CF-01: Tune the Witness Transmission](tune-the-witness-transmission.md). Required; record its logical completion before enabling dependent work. Arrive from visitor-centre. This encounter can be examined immediately; commits follow its stated prerequisites.
2. [CF-02: Open the Service Hatch](open-the-service-hatch.md). Required; record its logical completion before enabling dependent work. Arrive from visitor-centre. Complete CF-01 first.
3. [CF-03: Test the Kitchen Voice](test-the-kitchen-voice.md). Optional; skipping must not block the following required action. Arrive from visitor-centre. Complete CF-01 first. Also complete the second required encounter before departure; this optional encounter never supplies its prerequisites.

Controls may be examined before prerequisites exist; dependent mutations remain locked with a specific reason. Returning from a close view never loses confirmed steps. Previewing a route or ending does not commit it.

## Outgoing branches

- `record`: Keep the recording and leave. You preserve the message. Elian entered voluntarily; whatever comes next must respect that.
- `trace`: Trace the cable from the threshold. The cable joins the market’s service trunk. You record its route. Preserve flag `relayEvidence`.

All local departure alternatives converge on market-street. Optional encounter outcomes remain orthogonal to the single committed departure choice.

## Gate and reward preservation

CF-01: Does not independently mark the legacy room primary objective complete. Keep source clue IDs true-signal, radio-channels. Observe mapped source objects only after the corresponding fact is actually presented; never auto-award all clues on room entry.

CF-02: Completes the legacy primary objective only after all source required clues and necessary equipment have been established. Keep source clue IDs unchanged; no new required clue is awarded here. Observe mapped source objects only after the corresponding fact is actually presented; never auto-award all clues on room entry.

CF-03: Does not independently mark the legacy room primary objective complete. Keep source clue IDs unchanged; no new required clue is awarded here. Observe mapped source objects only after the corresponding fact is actually presented; never auto-award all clues on room entry.

## Required review

Trace the minimal route, each optional detour and every existing outgoing choice. Save after each confirmed step; restore and continue. Reject a design where an optional clue becomes a hidden required prerequisite. [Location acceptance](acceptance-and-review.md).
