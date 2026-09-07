# Bell Tower Base — Implementation Task Pack

**Implementation remains queued.** This repository change supplies specifications only.

## Outcome

Build the three specified encounters while preserving the current bell-tower-base story outputs and all departure choices.

## Inputs and allowed scope

Read [location design](location-design.md), [flow](encounter-flow.md), all three encounter files, [asset manifest](presentation-and-assets.md) and the [integration capability matrix](../../gameplay-systems/integration-capability-matrix.md). Primary future edit boundary: `src/kits/locations/bell-tower-base/`. Shared work requires its own owning-domain task before this room can use it.

## Ordered tasks

1. Reconcile incoming fixture state with the pinned source and the continuity map; retain existing identifiers.
2. Complete required shared semantic-control, mechanism-state, projection and save contracts; do not make room-local private substitutes.
3. Implement BT-01 from [Balance the Governor](balance-the-governor.md); connect real input, result feedback and cancellation, then exercise its acceptance walkthrough.
4. Implement BT-02 from [Isolate the Access Mechanism](isolate-the-access-mechanism.md); connect real input, result feedback and cancellation, then exercise its acceptance walkthrough.
5. Implement BT-03 from [Preserve or Disable the Relay](preserve-or-disable-the-relay.md); connect real input, result feedback and cancellation, then exercise its acceptance walkthrough.
6. Project all required clues through both WebGL and Canvas providers, using accessible alternatives for sound, color and precision.
7. Keep original prose in optional journal entries and inspect captions at large text scale.
8. Run content checks, domain/save/route tests and exact-source localhost browser plus headless Three.js review when runtime work is implemented.
9. Report changed files, remaining gaps, observed outputs and source-bound evidence before marking any encounter implemented.

## Dependencies

Story preservation is described in each encounter mapping. Block physical operation work on missing shared capability rather than routing arbitrary callbacks through Sequence. Existing downstream destination: school-hall.

## Acceptance and handoff

[Acceptance and review](acceptance-and-review.md) supplies the scenarios. A developer should attach the implementation SHA, command results, captured actions, screenshots and unresolved art/audio/pacing decisions. Neither this task document nor a generated file is evidence of working gameplay.
