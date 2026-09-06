> Current architecture migration: [domain/Kit implementation and evidence](architecture-migration.md). Browser availability statements below describe the earlier implementation; consult the current deployment run for current browser status.

# Delivery status — 2026-09-06

**Outcome: connected development implementation with verified command routes and CPU-rendered review. The full premium/Steam release plan remains partially complete.** This document deliberately separates implemented behavior from final production acceptance.

See the [browser startup and deployment follow-up](browser-deployment-review.md) for the storage-denial fix and the added browser/deployment gates.

## Implemented

- Fifteen sequential locations in five acts, sixty interactive objects, fifteen primary puzzles, thirty-one local departure alternatives and three endings.
- Mara/Elian narrative adaptation, actual observations and dialogue, exact puzzle solutions, progressive hints, persistent clues and ending conditions.
- Installed Nexus product rules; public Input, Interaction, Sequence, Scene, Object, Asset and Presentation contracts; replaceable graphics/audio/storage adapters.
- Menus, three save slots, autosave, previous-save recovery, journal rereading, inventory selection/combination, map re-entry before the final descent, pause and adjustable pressure.
- Procedural 3D environments, four close views per room, physical labels, shared static-mesh instancing, water/mechanical presentation motion and original synthesized ambience.
- Browser host, custom cursor, keyboard and gamepad handlers, fullscreen request, isolated Electron desktop shell and packaging scripts.
- Seventy-five generated room specification documents, fifteen detailed room task packs, eight shared production/release task packs, design/architecture/review instructions and CI configuration.

## Verified evidence

| Gate | Result | Practical limit |
|---|---|---|
| Content graph and IDs | Pass: 15 locations, 60 objects, 31 branches, 15 puzzles | Does not judge writing quality or timing |
| Automated suite | Pass: 12 scenario tests | Direct game commands and canvas hit tests, not physical devices |
| Endings | Witness, Silence and Vessel complete through legal commands | Not every combinatorial playthrough |
| Branches and optional records | Every immediate branch and optional observation exercised | High-risk damaged-relay route separately tested |
| Persistence / re-entry | Save snapshots, corrupted-primary recovery, locked prior choices and revisits checked | Installed updates and future schema migrations untested |
| Nexus causality | Input reaches rules/presentation; Sequence and Scene reject premature departure | Not proof of the proposed future root Sequence architecture |
| Rendered campaign | CPU Vulkan captures of rooms, puzzle controls and all close views; large-text pass | Separate from WebGL/browser proof and final art approval |
| Interaction clip | 240 genuine rendered frames, 10 seconds, 24fps, 1280×720 | Canvas hit-testing boundary; no browser input or audio capture |
| Production bundling | Vite build passes | Engine vendor chunk remains above the advisory 500kB threshold |
| Linux and Windows x64 desktop packages | Both package assemblies pass | Installed launch not validated here |

The browser attempted to open localhost and returned `net::ERR_BLOCKED_BY_CLIENT`. A separate local Chromium launch was also unavailable under the environment's process restrictions. Browser input, WebGL parity, real audio, physical controllers, installed Windows behavior and Steam checks are not marked passed.

## Defects found and corrected during review

1. The journal listed clue titles without reopening the writing. Entries now open their full recorded observations with pagination.
2. Background controls could remain highlighted behind a modal. Focus/hit selection now respects the active modal boundary.
3. Wrong attempts in quiet rooms could create negative exposure, which stricter save validation detected. Exposure now remains nonnegative.
4. Slot discovery could hide a recoverable prior save. It now validates the primary and fallback and permits recovery through the slot flow.
5. Large-text transition paragraphs could overlap the modal footer. The panel was enlarged and controls moved below the maximum measured text block.
6. Earlier preparation flags lacked enough mechanical consequences. Preserved relay, marked return and stabilized routes now affect specified later exposure; all return routes remain solvable.
7. Ending prose assumed Elian was physically present. Common ending text now avoids that assumption; separate relationship state reports confirmed presence or uncertainty.
8. Repeated full-scene copying dominated the tick/packet path. Changing effects now live in an installed presentation resource; the immutable Graphics scene snapshot is cached after its authoritative write.

9. Bell voices bypassed the master gain. They now share its mute/pause path; physical audio acceptance still requires a device review.

A local Node microprofile before the last optimization measured roughly 21.8ms median / 27.6ms p95 for tick plus packet. The follow-up measured roughly 1.6ms median / 5.7ms p95. These are two sandbox observations, not controlled target-device benchmarks or a 60fps claim. Four room Object identities were present and zero remained after disposal.

## Required work still open

- Replace repeated generic puzzle-control presentation with distinct tactile mechanisms and add meaningful investigations/conversations where blind pacing review requires them.
- Finish production models, materials, lighting, environmental animation, character portrayal, voice work and spatial/multibus audio. Current visuals are readable procedural context, not accepted AAA art.
- Measure the actual campaign with unfamiliar players. The 180-minute sum is a planning allocation; this build does not establish three hours of authored play.
- Run the supplied actual browser input review on a permitted workstation. Validate all menus, scene ray picking, fullscreen, audio, resizing and long sessions.
- Complete controller, handheld, accessibility, remapping, localization and screen-reader strategy.
- Profile named minimum/recommended hardware and repeated installed sessions. Validate Windows install/update/offline save retention using the assembled package.
- Complete Steamworks selection/configuration, store assets, rights review, content disclosures, account-controlled review and publication. Cloud and achievements are not implemented.

## Plan phase disposition

Phases 0–6 establish the recovered story, verified engine foundation and connected campaign. Phase 7 presentation is a first pass. Phases 8–10 have automated and CPU-rendered evidence but still need ordinary-device and human reviews. Phase 11 target performance and Phase 12 Steam production are open. Source delivery to main is separate from those release gates. Post-release support begins only after an actual release.

Next useful work: [SYS-07 browser/device acceptance](../tasks/SYS-07.md), alongside [SYS-04 narrative/pacing](../tasks/SYS-04.md), [SYS-05 art/mechanisms](../tasks/SYS-05.md), and [SYS-06 audio](../tasks/SYS-06.md).
