# SYS-02 — Input, UI and accessibility

**Status:** Implemented first pass; device and accessibility review open. **Dependencies:** SYS-01.

## Objective

All advertised inputs can begin, investigate, save, load, change settings and reach an ending. Essential text fits supported screens and accessible modes. No invisible target is required.

## Required inputs and source anchors

src/host/browser.js; src/providers/canvas-ui.js; src/presentation/projection.js

Read the current delivery status before estimating effort. Recover actual game state from the public inspection API or a validated save; do not infer current implementation from an older plan.

## Ordered work

Run the browser review on a machine with Chromium. Navigate every menu by mouse and keyboard. Check modal trapping, cursor alignment at native and letterboxed sizes, text at 125%, selected-item recovery, and focus after closing a modal. Exercise physical controllers. Design semantic screen-reader output from the same Nexus descriptors, add remapping and localization, and validate reading order. Do not make a second authoritative DOM UI.

For each substantive change, first record the observed defect or missing behavior. Identify its authoritative owner. Change that owner or its proper adapter, not a convenient duplicate. Run the smallest review that reproduces the issue and then check affected consumers. Preserve already-authored choices unless this task explicitly requires a narrative decision.

## Evidence and output

Keep the changed source, updated specification, focused verification, initial/final logical state, representative screenshots or audio/video, and a finding record. Name input boundary, source revision and actual environment. Mark unavailable checks blocked with their exact required environment. Do not turn an unsupported check into a success assertion.

## Review loop

Inspect → record discrepancy → implement → reproduce the scenario → compare expected/observed → inspect the resulting output → update the tracker. Continue while a concrete material defect remains. Use human review for comprehension, fear, performance and final artistic judgment.

## Definition of done

All advertised inputs can begin, investigate, save, load, change settings and reach an ending. Essential text fits supported screens and accessible modes. No invisible target is required.

## Next-agent handoff

State what changed and why, exact commands/scenarios run, what their results establish, the remaining gap, and the next executable action. A task can be partially implemented while still awaiting target-device or creative acceptance.
