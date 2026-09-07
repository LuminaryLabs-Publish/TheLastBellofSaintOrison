# Chapel Nave — Implementation Task Pack

**Implementation remains queued.** This repository change supplies specifications only.

## Outcome

Build the three specified encounters while preserving the current chapel-nave story outputs and all departure choices.

## Inputs and allowed scope

Read [location design](location-design.md), [flow](encounter-flow.md), all three encounter files, [asset manifest](presentation-and-assets.md) and the [integration capability matrix](../../gameplay-systems/integration-capability-matrix.md). Primary future edit boundary: `src/kits/locations/chapel-nave/`. Shared work requires its own owning-domain task before this room can use it.

## Ordered tasks

1. Reconcile incoming fixture state with the pinned source and the continuity map; retain existing identifiers.
2. Complete required shared semantic-control, mechanism-state, projection and save contracts; do not make room-local private substitutes.
3. Implement CN-01 from [Restore the Intercom Connection](restore-the-intercom-connection.md); connect real input, result feedback and cancellation, then exercise its acceptance walkthrough.
4. Implement CN-02 from [Verify the Survivor’s Account](verify-the-survivor-s-account.md); connect real input, result feedback and cancellation, then exercise its acceptance walkthrough.
5. Implement CN-03 from [Release or Leave the Survivor](release-or-leave-the-survivor.md); connect real input, result feedback and cancellation, then exercise its acceptance walkthrough.
6. Project all required clues through both WebGL and Canvas providers, using accessible alternatives for sound, color and precision.
7. Keep original prose in optional journal entries and inspect captions at large text scale.
8. Run content checks, domain/save/route tests and exact-source localhost browser plus headless Three.js review when runtime work is implemented.
9. Report changed files, remaining gaps, observed outputs and source-bound evidence before marking any encounter implemented.

## Dependencies

Story preservation is described in each encounter mapping. Block physical operation work on missing shared capability rather than routing arbitrary callbacks through Sequence. Existing downstream destination: parish-house.

## Acceptance and handoff

[Acceptance and review](acceptance-and-review.md) supplies the scenarios. A developer should attach the implementation SHA, command results, captured actions, screenshots and unresolved art/audio/pacing decisions. Neither this task document nor a generated file is evidence of working gameplay.
