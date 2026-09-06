# REL-01 — Installed Windows build and Steam production

**Status:** Desktop package scripts exist; platform release blocked on target/account. **Dependencies:** SYS-07; final asset/rights approval.

## Objective

Installed target build and store checks pass with traceable artifacts and accurate claims. Steam publication is separately authorized; GitHub main is not used as evidence of platform release.

## Required inputs and source anchors

desktop/main.cjs; desktop/package.mjs; release/README.md

Read the current delivery status before estimating effort. Recover actual game state from the public inspection API or a validated save; do not infer current implementation from an older plan.

## Ordered work

Package Windows x64, install it cleanly, play offline, save/quit/reload and upgrade over a previous build. Verify protected renderer, navigation blocking, durable storage and process shutdown. Configure the owner’s actual Steam depots and branches only with release authorization. Decide Cloud/achievements before advertising them. Prepare final store assets, trailer, disclosures, rights and support instructions. Complete Valve reviews.

For each substantive change, first record the observed defect or missing behavior. Identify its authoritative owner. Change that owner or its proper adapter, not a convenient duplicate. Run the smallest review that reproduces the issue and then check affected consumers. Preserve already-authored choices unless this task explicitly requires a narrative decision.

## Evidence and output

Keep the changed source, updated specification, focused verification, initial/final logical state, representative screenshots or audio/video, and a finding record. Name input boundary, source revision and actual environment. Mark unavailable checks blocked with their exact required environment. Do not turn an unsupported check into a success assertion.

## Review loop

Inspect → record discrepancy → implement → reproduce the scenario → compare expected/observed → inspect the resulting output → update the tracker. Continue while a concrete material defect remains. Use human review for comprehension, fear, performance and final artistic judgment.

## Definition of done

Installed target build and store checks pass with traceable artifacts and accurate claims. Steam publication is separately authorized; GitHub main is not used as evidence of platform release.

## Next-agent handoff

State what changed and why, exact commands/scenarios run, what their results establish, the remaining gap, and the next executable action. A task can be partially implemented while still awaiting target-device or creative acceptance.
