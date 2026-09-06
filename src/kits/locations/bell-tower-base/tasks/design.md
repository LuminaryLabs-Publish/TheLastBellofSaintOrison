# Bell Tower Base — design

Status: production review open
Owner: unassigned. Package: `src/kits/locations/bell-tower-base`.

Outcome: Learn the bell cycle and choose how to interrupt it. Improve layout, visible goal and fair warning signals while preserving reachable exit `school-hall`.

Inputs: ../content/location.json, ../content/investigations.json, ../content/puzzles.json, ../content/choices.json, ../tests/fixtures.json; docs/architecture/ownership-ledger.md.

Allowed changes: this package's content and assets. Shared behavior requires a separate owning-domain task. Do not edit compiled content/campaign.js.

Procedure:

1. Enter from `apothecary` with the fixture equipment and knowledge.
2. Read obtainable clues: governor-order, silence-method.
3. Inspect the authored solution: Open bypass → Release tension → Engage brake. Try a wrong input before the correct sequence.
4. Review alternatives preserve, break; confirm changed facts at the next location.
5. Check pressure, voluntary retreat, pause/read protection, save/reload and repeated clicks.
6. Run npm run content:build, npm run content:check and npm test. For visual changes run both graphics browser reviews and inspect captures.

Acceptance: clues remain obtainable; wrong attempts recover; each local choice reaches its specified next state; no duplicate reward or rewritten prior choice; no unrelated owner mutation. Final production approval also requires a human to understand the room without answer fixtures.

Evidence: source revision, commands, expected/observed state, screenshots for changed visuals and unresolved quality findings. Do not infer duration from allocated minutes (13).

Handoff: list changed files, decisions, remaining blockers and next exact action. Repository is authoritative; Drive synchronization is deferred by user instruction.
