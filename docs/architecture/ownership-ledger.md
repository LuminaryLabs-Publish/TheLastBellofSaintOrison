# Migration ownership ledger

Baseline: game 068ab8b53b581606781bdcc9cc798da7c5b71784; Nexus bacc8fc0073bf92910e26776a6695d2b8ec45858 (0.0.4).

Product domains register through the public `defineDomainServiceKit` and `defineResource` exports. Their project-specific paths are children of the existing `n:simulation` domain; they are not new Nexus exports.

| Values | Sole writer | Public boundary | Preservation proof |
|---|---|---|---|
| knowledge, seen objects, solved puzzles, observation history, deductions, hints | Investigation | orisonInvestigation commands and snapshots | clue/answer routes, input causality |
| possessed items, transformations | Inventory | orisonInventory commands and snapshots | collection, combination, unchanged failed use |
| flags, room choices, dialogue progress, relationships | Narrative | orisonNarrative commands and snapshots | all departure alternatives, repeat rejection |
| elapsed, exposure, setbacks | Threat | orisonThreat commands and snapshots | pause, difficulty, forced retreat |
| started, completed, revision, slot, sequenceNumber, ending, visited objectives | Campaign | orisonCampaign commands and snapshots | start, endings, checkpoint restore |
| current location and travel tokens | Nexus Scene | scene public API | guarded travel, revisit |
| semantic input and targets | Nexus Input/Interaction | input/interaction APIs | real browser + command routes |
| object identities | Nexus Object | object registry | enter/leave count |
| source asset identity | Nexus Asset | asset registry | binding replacement |
| UI, focus, settings, camera, audio, effects | installed Presentation Kits | descriptors | packet and graphics parity |
| finite workflow runner state | pinned Nexus Sequence | sequence node runtime | completion/cancel/restore |
| device buffers, clock accumulator | Host adapter | input + engine.tick | fixed-step host |
| decoded meshes, canvas, GPU and audio handles | providers | immutable output packets | disposal, WebGL/Canvas |

The existing `orison` API becomes a stateless compatibility projection and command coordinator. It must not own a GameState resource, apply generic cross-domain state patches, or retain a mirrored snapshot. Save envelopes are transient aggregates. All restores validate before committing. No provider receives a domain API.

No Google Drive operations are in this implementation. Existing final art, three-hour pacing, physical-device and Steam release gates remain separate.
