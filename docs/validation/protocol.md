# Reproducible review protocol

## Evidence classes

| Review | Command or method | What it establishes |
|---|---|---|
| Content structure | `npm run content:check` | Stable IDs, clue links, valid solutions, branch bounds; timing numbers remain targets |
| State/route tests | `npm test` | Commands, all three endings, each immediate branch, re-entry, pressure, saves, modal hit testing and determinism |
| CPU rendered campaign | `npm run review:headless` | Actual Nexus composition, canvas hit testing, shared Three scene and UI renderer at each room and puzzle |
| Framebuffer clip | `node tools/review/record.mjs` then encode | Actual frame sequence and input/state trace; no OS-window input or captured audio |
| Browser playthrough | Vite running, `npm run review` | Real Chromium mouse path, page errors, screenshots and video on a supported workstation |
| Device/desktop review | Installed exact package | Actual window, audio/input devices, offline saves and platform behavior |
| Human review | Unfamiliar players with observed sessions | Comprehension, pacing, fear, emotional consequences and accessibility usability |

A screenshot of an ending from a fixture does not prove that ending is reachable. Route tests run through ordinary game commands, and the headless campaign uses canvas button hit testing through Nexus Input. The browser script must be run separately; it is never replaced by direct development commands while retaining a player-input label.

## Room acceptance loop

For each of fifteen rooms, inspect arrival and goal, every required object, plausible wrong operation, exact solution, optional observations, each branch, retreat, warning and critical state, save/restore, re-entry where permitted, all close views, the journal and next-room consequences. Repeat only affected scenarios after a correction. Record pass/fail/blocked/not applicable with a reason.

## High-risk cross-room routes

- Intact relay + original order + verified names reaches Witness.
- Broken relay disables Witness without blocking Silence/Vessel.
- Photographed order without the original leaves Witness unavailable; returning to recover the original is possible before leaving the Well.
- Release Elian physically vs keep her on the archive line; help her later vs leave safety unconfirmed. Ending text must not teleport her.
- Marked return and stabilized market affect exposure but never create the only solvable return route.
- Repeated solved-room visits preserve rewards and the committed choice; they cannot rewrite a final intervention.
- Save before and after an irreversible choice; reload must not silently switch it.

## Rendering setup

The CPU review needs a working Vulkan adapter. A supported Mesa Lavapipe installation may be selected through normal Vulkan environment configuration. Record which adapter is used. The script imports `src/providers/three-scene.js`, receives actual Nexus presentation packets and renders the same canvas UI. It is not a manually re-created illustration.

Frames, videos and logs go in ignored `captures/`. Keep small reviewed evidence images and machine-readable summaries in `docs/validation/evidence/`. Long recordings belong in durable artifact storage, not repeated Git history. Capture names and source hashes identify the exact reviewed content. Regenerate evidence after changes that materially affect it.

## Target profiles

Proposed goals are 60fps at 1080p on the selected recommended device and stable 30fps on minimum hardware. Neither profile has been selected or certified by this build. Record CPU/GPU/driver/OS, display resolution, quality settings, median/p95 frame time, memory and repeated-room behavior. Do not substitute headless CPU render time for shipping GPU performance.

## Completion gates

No known progression blocker or save-loss defect; every mandatory route obtainable; every supported input usable; critical text readable; exact audio mix reviewed; resources bounded across repeated equivalent sessions; target package installed; rights/credits verified; commercial claims match observed evidence. Unperformed gates stay open.
