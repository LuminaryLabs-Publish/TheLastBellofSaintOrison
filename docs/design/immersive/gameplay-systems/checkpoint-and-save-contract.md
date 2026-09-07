# Checkpoint and Save Contract

**Target specification; runtime implementation pending.**

The existing game stores an orison-save/2 envelope with five domain snapshots and scene identity. The physical encounter records proposed here extend that model and therefore require schema and migration work before activation. Documentation must not claim the current loader accepts them.

At a safe commit boundary gather consistent owner states: mechanism progress, knowledge, inventory, narrative, threat and campaign. Keep definition version and stable encounter identity with new logical progress. Do not serialize input handlers, subscriptions, GPU/audio resources or animation frame counters.

Validate the entire incoming envelope before replacing live state. Invalid or unknown records leave the current session intact and report a recoverable reason. A legacy completed primary maps to its completed target encounters with no replayed rewards; an incomplete indexed puzzle needs an explicitly authored conversion or a safe reset that retains clues/items and explains the reset.

After restoration reconstruct presentation and finite waits from logical progress. Repeat-save/reload after every step must neither duplicate a reward nor silently choose a branch. Existing temporary-save warnings and prior-save recovery stay available. A future schema fixture matrix must cover both old and new states.
