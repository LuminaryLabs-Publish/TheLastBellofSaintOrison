# Exit Road — writing

Status: production review open
Owner: unassigned. Package: `src/kits/locations/exit-road`.

Outcome: Acknowledge the consequence and decide what you carry home. Improve observations, arrival, dialogue and choice consequences while preserving reachable exit `ending`.

Inputs: ../content/location.json, ../content/investigations.json, ../content/puzzles.json, ../content/choices.json, ../tests/fixtures.json; docs/architecture/ownership-ledger.md.

Allowed changes: this package's content and assets. Shared behavior requires a separate owning-domain task. Do not edit compiled content/campaign.js.

Procedure:

1. Enter from `town-square` with the fixture equipment and knowledge.
2. Read obtainable clues: last-listen, last-look.
3. Inspect the authored solution: This is what I can tell you. Try a wrong input before the correct sequence.
4. Review alternatives home, stay; confirm changed facts at the next location.
5. Check pressure, voluntary retreat, pause/read protection, save/reload and repeated clicks.
6. Run npm run content:build, npm run content:check and npm test. For visual changes run both graphics browser reviews and inspect captures.

Acceptance: clues remain obtainable; wrong attempts recover; each local choice reaches its specified next state; no duplicate reward or rewritten prior choice; no unrelated owner mutation. Final production approval also requires a human to understand the room without answer fixtures.

Evidence: source revision, commands, expected/observed state, screenshots for changed visuals and unresolved quality findings. Do not infer duration from allocated minutes (5).

Handoff: list changed files, decisions, remaining blockers and next exact action. Repository is authoritative; Drive synchronization is deferred by user instruction.
