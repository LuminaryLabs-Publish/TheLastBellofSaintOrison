# Integration Capability Matrix

**Specification package; no runtime or Drive changes.**

## Current source boundaries
Pinned source: aaaec2d1ccb5856ccef9395f090653a7e2efca1f; Nexus dependency bacc8fc0073bf92910e26776a6695d2b8ec45858. These are inspected contracts, not current upstream feature claims.

| Capability | Existing public route | What this redesign still needs |
|---|---|---|
| Player actions | orison.submit with inspect, answer, depart, combine, view, hint, retreat | Semantic detents, holds and placement commands with cancellation |
| Discovery | orisonInvestigationObservation.observe({roomId, objectId}) | Register new affordances while retaining verified source clue semantics |
| Puzzle progress | orisonInvestigationPuzzle.open/attempt/solve; indexed answer prefixes | Versioned mechanical control-state transitions, not direct solve calls |
| Inventory | orisonInventoryInventory.grant; item-use and combination services | Local prop vs permanent item distinction maintained |
| Story choices | orisonNarrativeStoryChoice.choose({roomId, choiceId}) | Physical previews that preserve commit guards and original choice IDs |
| Finite operations | orisonOperations.execute; observe, combine, use, dialogue, choose, solve, complete | Bind actual operation receipts to new multi-encounter waits |
| Sequence | n.sequence.getNodeRuntime and dispatch through the existing coordinator | Prove multiple encounter lifecycle/restore without overwriting a live graph |
| Save | orisonSave snapshot/restore and orison-save/2 owner envelopes | Versioned physical-progress schema and migration fixtures |
| Presentation | Existing UI and room projection Kits | Tactile controls, clue close-ups and state-driven animations in both providers |

Source files: src/kits/interaction/player-actions-kit/kit.js; src/domains/investigation/kits/puzzle-kit/service.js; src/domains/investigation/kits/observation-kit/service.js; src/kits/sequence/game-operations-kit/kit.js; src/kits/persistence/save-coordinator-kit/kit.js.

## Shared prerequisite tasks
- **CAP-INPUT** — extend semantic actions with named targets, discrete detents, assisted holds and cancel-on-blur. Done when pointer and keyboard produce equivalent validated inputs without repeating a commit.
- **CAP-MECHANISM** — add versioned physical progress to Investigation. Done when invalid actions preserve state, accepted steps produce receipts and completion cannot bypass prerequisites. Do not write directly into world resources from a room.
- **CAP-PROJECTION** — project physical controls and clue states. Done when each required action works in WebGL and Canvas with captions, large text and reduced motion. Providers cannot decide game outcomes.
- **CAP-SAVE** — migrate legacy progress and validate new owner records atomically. Done when all interrupted-action and duplicate-reward cases survive save/restore and an invalid snapshot leaves the current session intact.
- **CAP-SEQUENCE** — compose finite receipt waits with the pinned engine. Done when cancel, failure, leave/re-entry and restore are proven without a second scheduler or conflicting active graph.

Dependency order: define shared records and input contract; implement CAP-MECHANISM with CAP-INPUT; integrate CAP-PROJECTION and CAP-SAVE; prove CAP-SEQUENCE; then Town Gate runtime implementation. The other rooms can author assets/specs concurrently but cannot claim installed mechanics before these dependencies work.

The built-in operations receipt cache is bounded to 128 per session and reset on restore. It is not persistent exactly-once delivery. Durable reward/choice protection must come from validated owner state and restoration, not from assuming that cache survives a reload.
