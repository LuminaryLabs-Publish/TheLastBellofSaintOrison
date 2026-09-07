# Immersive Investigation Design

**45 encounter specifications across 15 locations. Documentation only: the deployed game's mechanics are unchanged.**

This package translates the September 7 attachment into repository design files. It preserves the authoritative story from [source commit aaaec2d](https://github.com/LuminaryLabs-Publish/TheLastBellofSaintOrison/tree/aaaec2d1ccb5856ccef9395f090653a7e2efca1f). Google Drive destinations are proposals; no folders or documents have been created there.

## Start here

- [Scope and migration plan](planning/redesign-plan.md)
- [Production tracker](planning/encounter-production-tracker.md)
- [Complete journey](story-and-progression/master-journey-map.md)
- [Story reconciliation](story-and-progression/existing-story-reconciliation.md)
- [Shared integration limits](gameplay-systems/integration-capability-matrix.md)
- [Five-pass evidence](../../production/immersive-review/README.md)

## Location packages

- [Town Gate](locations/town-gate/location-design.md) — TG-01, TG-02, TG-03.
- [Visitor Centre](locations/visitor-centre/location-design.md) — VC-01, VC-02, VC-03.
- [Closed Café](locations/closed-cafe/location-design.md) — CF-01, CF-02, CF-03.
- [Market Street](locations/market-street/location-design.md) — MS-01, MS-02, MS-03.
- [Apothecary](locations/apothecary/location-design.md) — AP-01, AP-02, AP-03.
- [Bell Tower Base](locations/bell-tower-base/location-design.md) — BT-01, BT-02, BT-03.
- [School Hall](locations/school-hall/location-design.md) — SH-01, SH-02, SH-03.
- [Flooded Archive](locations/flooded-archive/location-design.md) — FA-01, FA-02, FA-03.
- [Chapel Nave](locations/chapel-nave/location-design.md) — CN-01, CN-02, CN-03.
- [Parish House](locations/parish-house/location-design.md) — PH-01, PH-02, PH-03.
- [Maintenance Tunnels](locations/maintenance-tunnels/location-design.md) — MT-01, MT-02, MT-03.
- [Well Chamber](locations/well-chamber/location-design.md) — WC-01, WC-02, WC-03.
- [Return Ascent](locations/return-ascent/location-design.md) — RA-01, RA-02, RA-03.
- [Town Square](locations/town-square/location-design.md) — TS-01, TS-02, TS-03.
- [Exit Road](locations/exit-road/location-design.md) — ER-01, ER-02, ER-03.

## Editing and verification

Edit authored [encounters.json](encounters.json), then run `node tools/design/build-immersive.mjs` from the repository root. Location documents are generated views. Shared contracts are authored Markdown. Run `node tools/design/check-immersive.mjs` and `node tools/design/build-immersive.mjs --check` before publishing. Design IDs such as TG-01 are stable identities, not folder-order numbers.

The target is less mandatory reading and clearer action feedback. It remains an unimplemented redesign until each encounter passes runtime, visual and player-comprehension acceptance.
