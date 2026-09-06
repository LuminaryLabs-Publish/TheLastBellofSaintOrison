# Closed Café — assets

Status: production review open
Owner: unassigned. Package: `src/kits/locations/closed-cafe`.

Outcome: Compare the radio signal with Elian’s original cassette. Improve scene assets, palette, selection and provenance while preserving reachable exit `market-street`.

Inputs: ../content/location.json, ../content/investigations.json, ../content/puzzles.json, ../content/choices.json, ../tests/fixtures.json; docs/architecture/ownership-ledger.md.

Allowed changes: this package's content and assets. Shared behavior requires a separate owning-domain task. Do not edit compiled content/campaign.js.

Procedure:

1. Enter from `visitor-centre` with the fixture equipment and knowledge.
2. Read obtainable clues: true-signal, radio-channels.
3. Inspect the authored solution: 94 · tide station. Try a wrong input before the correct sequence.
4. Review alternatives record, trace; confirm changed facts at the next location.
5. Check pressure, voluntary retreat, pause/read protection, save/reload and repeated clicks.
6. Run npm run content:build, npm run content:check and npm test. For visual changes run both graphics browser reviews and inspect captures.

Acceptance: clues remain obtainable; wrong attempts recover; each local choice reaches its specified next state; no duplicate reward or rewritten prior choice; no unrelated owner mutation. Final production approval also requires a human to understand the room without answer fixtures.

Evidence: source revision, commands, expected/observed state, screenshots for changed visuals and unresolved quality findings. Do not infer duration from allocated minutes (12).

Handoff: list changed files, decisions, remaining blockers and next exact action. Repository is authoritative; Drive synchronization is deferred by user instruction.
