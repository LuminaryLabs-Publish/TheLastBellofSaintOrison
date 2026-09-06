# Contributing to Saint Orison

Choose one domain Service Kit or one location package. Read its README, task pack and acceptance record. Keep changes inside that scope; request a separate shared-owner task when an operation contract must change.

Run `npm ci`, `npm run author -- help`, `npm run content:build`, `npm run content:check`, `npm test`, then `npm run build`. JSON schemas validate records; reference and dependency checks validate connections. Do not edit generated campaign.js, package-catalog.js or the campaign install list. Add a regression scenario when behavior changes.

Room contributors start in src/kits/locations/<id>/tasks. Architecture contributors start in docs/architecture/ownership-ledger.md. State changes go through the owner's service. Never put gameplay authority into rendering or a second update loop.

Use the existing browser review for WebGL and Canvas and the exact-source headless renderer for visual work. Inspect captures. Record source revision, commands, expected/observed state and limitations. Only proven behavior may be marked implemented; final art, pacing, audio and device approval remain separate production tasks.

Review owners are currently unassigned. No new collaborators or external document permissions are implied. Drive synchronization is deferred by user instruction.
