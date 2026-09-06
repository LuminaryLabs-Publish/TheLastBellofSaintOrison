# Visitor Centre — design

Status: production review open
Owner: unassigned. Package: `src/kits/locations/visitor-centre`.

Outcome: Restore the map and establish Elian’s next stop. Improve layout, visible goal and fair warning signals while preserving reachable exit `closed-cafe`.

Inputs: ../content/location.json, ../content/investigations.json, ../content/puzzles.json, ../content/choices.json, ../tests/fixtures.json; docs/architecture/ownership-ledger.md.

Allowed changes: this package's content and assets. Shared behavior requires a separate owning-domain task. Do not edit compiled content/campaign.js.

Procedure:

1. Enter from `town-gate` with the fixture equipment and knowledge.
2. Read obtainable clues: map-circuit, cafe-lead.
3. Inspect the authored solution: Disconnect red → Connect blue → Connect amber. Try a wrong input before the correct sequence.
4. Review alternatives front, service; confirm changed facts at the next location.
5. Check pressure, voluntary retreat, pause/read protection, save/reload and repeated clicks.
6. Run npm run content:build, npm run content:check and npm test. For visual changes run both graphics browser reviews and inspect captures.

Acceptance: clues remain obtainable; wrong attempts recover; each local choice reaches its specified next state; no duplicate reward or rewritten prior choice; no unrelated owner mutation. Final production approval also requires a human to understand the room without answer fixtures.

Evidence: source revision, commands, expected/observed state, screenshots for changed visuals and unresolved quality findings. Do not infer duration from allocated minutes (10).

Handoff: list changed files, decisions, remaining blockers and next exact action. Repository is authoritative; Drive synchronization is deferred by user instruction.
