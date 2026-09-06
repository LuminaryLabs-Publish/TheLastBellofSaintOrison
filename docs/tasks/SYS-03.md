# SYS-03 — Inventory, evidence, pressure and persistence

**Status:** Implemented and automated; installed-save review open. **Dependencies:** SYS-01, SYS-02.

## Objective

Progress, current scene and ending conditions survive supported saves and updates; transient unfinished puzzle inputs deliberately reset. Every failure is recoverable without destroying mandatory evidence.

## Required inputs and source anchors

src/kits/interaction/player-actions-kit/kit.js; src/domains/; src/providers/storage.js; tests/coverage.test.mjs

Read the current delivery status before estimating effort. Recover actual game state from the public inspection API or a validated save; do not infer current implementation from an older plan.

## Ordered work

Trace every acquisition and use from obtainable clues. Confirm no duplicate rewards. Corrupt a disposable primary save and load the prior valid copy through the visible slot UI. Check Story/Gentle/standard settings, wrong attempts in quiet rooms, focus suspension, forced retreat and clue retention. Specify version migration before changing CONTENT_VERSION. Confirm app updates preserve the stable storage origin.

For each substantive change, first record the observed defect or missing behavior. Identify its authoritative owner. Change that owner or its proper adapter, not a convenient duplicate. Run the smallest review that reproduces the issue and then check affected consumers. Preserve already-authored choices unless this task explicitly requires a narrative decision.

## Evidence and output

Keep the changed source, updated specification, focused verification, initial/final logical state, representative screenshots or audio/video, and a finding record. Name input boundary, source revision and actual environment. Mark unavailable checks blocked with their exact required environment. Do not turn an unsupported check into a success assertion.

## Review loop

Inspect → record discrepancy → implement → reproduce the scenario → compare expected/observed → inspect the resulting output → update the tracker. Continue while a concrete material defect remains. Use human review for comprehension, fear, performance and final artistic judgment.

## Definition of done

Progress, current scene and ending conditions survive supported saves and updates; transient unfinished puzzle inputs deliberately reset. Every failure is recoverable without destroying mandatory evidence.

## Next-agent handoff

State what changed and why, exact commands/scenarios run, what their results establish, the remaining gap, and the next executable action. A task can be partially implemented while still awaiting target-device or creative acceptance.
