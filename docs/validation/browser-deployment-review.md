# Browser startup and Pages delivery review — 2026-09-06

## Reproduced issue

A browser `SecurityError` while reading local storage escaped the storage adapter and the first presentation update. The menu queries save slots, so denied storage prevented reaching any playable control. `src/main.js` also accessed the storage property eagerly, which could fail before game creation. This was reproduced with a backend that throws on access; earlier command tests used memory storage and missed it.

## Correction

The browser storage adapter resolves storage lazily, mirrors values already read into this session, and retains current writes in session memory when access or quota fails. It stops attempting persistence after failure. Product presentation shows a temporary-save warning, and manual save feedback never claims persistence in that mode. A new page starts a new temporary session. Successful persistent storage retains normal behavior. No existing disk save is intentionally deleted.

## Validation boundaries

- Content validation and all 15 scenario tests pass, including denial at startup, quota exhaustion during play, prior disk-save preservation, temporary reload behavior and normal persistent restoration.
- Production bundling passes. The pre-existing large Nexus vendor-chunk advisory remains.
- The headless campaign review completed 35 captures with `--storage-denied`, including the ending. The menu and arrival captures were visually inspected: the warning is readable and clear of the controls. CPU-rendered evidence is separate from browser execution.
- The deployment workflow adds a real Chromium mouse-input review through all fifteen rooms and a separate production-bundle check at a 960×720 viewport, including denied storage. Browser execution results belong to the workflow run; adding a test is not a passing result.
- Production checks observe text sent to the canvas and actual screenshots, apply mouse input, and read persisted saves. They do not install a game-command API into the production build.

## Deployment prerequisites

The workflow is limited to main pushes and explicit manual dispatch. Build and browser gates precede the Pages artifact upload. Deployment uses the protected `github-pages` environment, Pages write permission and an OIDC token. Content permissions remain read-only. Existing validation CI is retained.

At inspection, the repository Pages API returned 404: no Pages site was enabled. The available GitHub connector exposes source and workflow operations but not Pages administration. The repository owner must select Settings → Pages → Source → GitHub Actions once. The normal GITHUB_TOKEN cannot enable the site. This setting is a prerequisite, not a build defect. No credentials or permission workaround is included.

## Remaining playability and production work

Final environmental art, richer room-specific interactions, observed three-hour pacing, recorded/spatial audio, accessibility and physical-controller review remain open. This change fixes a demonstrated startup blocker; it does not claim these broader production gates are complete.
