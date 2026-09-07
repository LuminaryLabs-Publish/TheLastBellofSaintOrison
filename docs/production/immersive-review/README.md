# Immersive design — five-pass evidence

Target: all 15 location packages under docs/design/immersive, their shared consistency rules and documentation tools. Baseline runtime commit: aaaec2d1ccb5856ccef9395f090653a7e2efca1f. Budget: five sequential pass-it attempts, with review-feedback-it text/source review after each candidate. No new runtime, visual or Google Drive work is claimed.

| Pass | Improvement objective | Review and revision |
|---|---|---|
| 1 | Exact observable actions replace encounter titles | [Review](pass-1-review.md), [revision](pass-1.json), [delta](pass-1.patch) |
| 2 | Preserve story clues, rewards, branches and ending conditions | [Review](pass-2-review.md), [revision](pass-2.json), [delta](pass-2.patch) |
| 3 | Specify fair pressure, accessible input and interrupted-state recovery | [Review](pass-3-review.md), [revision](pass-3.json), [delta](pass-3.patch) |
| 4 | Define asset requests, bounded tasks and real capability dependencies | [Review](pass-4-review.md), [revision](pass-4.json), [delta](pass-4.patch) |
| 5 | Trace routes and add exact acceptance and document validation | [Review](pass-5-review.md), [revision](pass-5.json), [delta](pass-5.patch) |

The [run ledger](run.json) records candidates, incumbents, observations and selection decisions. Patch files preserve actual candidate bytes as ordered deltas: begin with an empty directory and apply pass-1.patch through pass-5.patch using `patch -p1`. The hashes are over sorted path-to-UTF-8-content mappings, not subjective quality scores. Every patch is part of one shared five-pass budget; there are no hidden nested batches.

The [final consistency report](validation.json) counts document coverage, source mappings, references and design traces. These are specification checks, not tests of newly implemented gameplay. Existing runtime files are protected; publication does not implement the encounters.

Remaining gates: physical interaction APIs and mechanism state; state-driven controls and clue presentation; new save migration; sequence receipt integration; final assets, audio, measured pacing and unfamiliar-player understanding. Task owners and final creative reviewers remain unassigned.

[Complete document inventory](file-index.md). All five revision patches were reapplied sequentially into an empty temporary directory and their candidate hashes matched byte-for-byte. Historical patches intentionally preserve earlier drafts, including superseded wording; use the final design directory for implementation.
