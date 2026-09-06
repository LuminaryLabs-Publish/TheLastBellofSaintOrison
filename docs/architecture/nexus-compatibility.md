# Nexus Compatibility

Pinned Nexus source: LuminaryLabs-Dev/NexusEngine bacc8fc0073bf92910e26776a6695d2b8ec45858, package 0.0.4, exact codeload dependency and lockfile integrity.

Verified root exports: createEngine, defineDomainServiceKit and defineResource. Verified Foundation imports remain in src/composition/create-modular-game.js. Public runtime installation checks duplicate Kit IDs and required tokens. Parent/child paths register through defineDomainServiceKit. Project APIs use n:simulation:orison-<owner>; these names are project definitions, not engine exports.

Sequence: engine.n.sequence.getNodeRuntime(), setGraph/start/cancel/unmount/getNodeState/getRunnerStates and sequence.dispatch. Entry/exit/recovery are finite wait-event graphs; investigations retain three ordered native waits. Engine ticks cannot advance these graphs. No NexusEngine files are changed.
