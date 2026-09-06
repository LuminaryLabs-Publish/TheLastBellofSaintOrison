# Production task tracker

Every row links to an executable task pack. The room packs contain exact source records and solutions; these shared packs define remaining system and release gates. Status is evidence-based, not a promise that a model can replace human or hardware review.

| ID | Task | Status | Dependencies |
|---|---|---|---|
| SYS-01 | [Nexus foundation and lifecycle](SYS-01.md) | Implemented; review bounded scale and migration separately | None; this is the shared foundation |
| SYS-02 | [Input, UI and accessibility](SYS-02.md) | Implemented first pass; device and accessibility review open | SYS-01 |
| SYS-03 | [Inventory, evidence, pressure and persistence](SYS-03.md) | Implemented and automated; installed-save review open | SYS-01, SYS-02 |
| SYS-04 | [Narrative continuity and meaningful duration](SYS-04.md) | Authored connected draft; blind pacing review open | SYS-03; all room scripts |
| SYS-05 | [Environment art and tactile mechanisms](SYS-05.md) | Procedural first pass integrated; final production open | SYS-01, SYS-02; room specifications |
| SYS-06 | [Audio, performance and psychological staging](SYS-06.md) | Synthesized ambience integrated; production mix open | SYS-02, SYS-04, SYS-05 |
| SYS-07 | [Browser and hardware acceptance](SYS-07.md) | Browser access blocked in build environment | SYS-01 through SYS-06 |
| REL-01 | [Installed Windows build and Steam production](REL-01.md) | Desktop package scripts exist; platform release blocked on target/account | SYS-07; final asset/rights approval |

[All fifteen location task packs](rooms.md) connect shared systems to concrete rooms. Start the next production pass with SYS-07 on a permitted browser workstation, while SYS-04/05/06 define the main content and presentation work.

## Completion discipline

A task row links its source, specification, evidence and handoff. Do not mark a room finished merely because it renders. Do not mark an act finished if optional routes silently require missing evidence. Do not mark the release finished until the installed package and platform gates pass.
