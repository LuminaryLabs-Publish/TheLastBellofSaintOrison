# SYS-01 — Nexus foundation and lifecycle

**Status:** Implemented; review bounded scale and migration separately. **Dependencies:** None; this is the shared foundation.

## Objective

One ordinary interaction demonstrably depends on the installed Nexus contracts; disposal leaves no active room objects or Sequence nodes. A future engine update has an explicit compatibility diff.

## Required inputs and source anchors

src/composition/game.js; src/kits/interaction/player-actions-kit/kit.js; src/domains/; docs/architecture/nexus.md

Read the current delivery status before estimating effort. Recover actual game state from the public inspection API or a validated save; do not infer current implementation from an older plan.

## Ordered work

Verify public exports against the pinned engine. Trace Input → rules → Sequence → Scene → Presentation without using a raw state setter. Confirm tick clamping, cancellation on load, object reset on entry and disposal on shutdown. Profile copies before optimizing. Do not import internals or add a second scheduler.

For each substantive change, first record the observed defect or missing behavior. Identify its authoritative owner. Change that owner or its proper adapter, not a convenient duplicate. Run the smallest review that reproduces the issue and then check affected consumers. Preserve already-authored choices unless this task explicitly requires a narrative decision.

## Evidence and output

Keep the changed source, updated specification, focused verification, initial/final logical state, representative screenshots or audio/video, and a finding record. Name input boundary, source revision and actual environment. Mark unavailable checks blocked with their exact required environment. Do not turn an unsupported check into a success assertion.

## Review loop

Inspect → record discrepancy → implement → reproduce the scenario → compare expected/observed → inspect the resulting output → update the tracker. Continue while a concrete material defect remains. Use human review for comprehension, fear, performance and final artistic judgment.

## Definition of done

One ordinary interaction demonstrably depends on the installed Nexus contracts; disposal leaves no active room objects or Sequence nodes. A future engine update has an explicit compatibility diff.

## Next-agent handoff

State what changed and why, exact commands/scenarios run, what their results establish, the remaining gap, and the next executable action. A task can be partially implemented while still awaiting target-device or creative acceptance.
