# Well Chamber — implementation

Status: implementation and regression review
Owner: unassigned. Package: `src/kits/locations/well-chamber`.

Outcome: Recover the Bell Core and choose a fully explained intervention. Improve public operations, dependency bindings and outgoing state while preserving reachable exit `return-ascent`.

Inputs: ../content/location.json, ../content/investigations.json, ../content/puzzles.json, ../content/choices.json, ../tests/fixtures.json; docs/architecture/ownership-ledger.md.

Allowed changes: this package's bindings, lifecycle and tests. Shared behavior requires a separate owning-domain task. Do not edit compiled content/campaign.js.

Procedure:

1. Enter from `maintenance-tunnels` with the fixture equipment and knowledge.
2. Read obtainable clues: names-second-four, ending-methods.
3. Inspect the authored solution: Close shutter → Isolate feed → Release collars. Try a wrong input before the correct sequence.
4. Review alternatives witness, silence, vessel; confirm changed facts at the next location.
5. Check pressure, voluntary retreat, pause/read protection, save/reload and repeated clicks.
6. Run npm run content:build, npm run content:check and npm test. For visual changes run both graphics browser reviews and inspect captures.

Acceptance: clues remain obtainable; wrong attempts recover; each local choice reaches its specified next state; no duplicate reward or rewritten prior choice; no unrelated owner mutation. Final production approval also requires a human to understand the room without answer fixtures.

Evidence: source revision, commands, expected/observed state, screenshots for changed visuals and unresolved quality findings. Do not infer duration from allocated minutes (18).

Handoff: list changed files, decisions, remaining blockers and next exact action. Repository is authoritative; Drive synchronization is deferred by user instruction.
