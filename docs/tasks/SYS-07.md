# SYS-07 — Browser and hardware acceptance

**Status:** Browser access blocked in build environment. **Dependencies:** SYS-01 through SYS-06.

## Objective

The exact outgoing build works through real devices at published quality targets; no progression blockers, save loss or unexplained resource growth remain. Results name hardware, resolution, settings and source.

## Required inputs and source anchors

tools/review/browser.mjs; docs/validation/protocol.md; tools/review/headless.mjs

Read the current delivery status before estimating effort. Recover actual game state from the public inspection API or a validated save; do not infer current implementation from an older plan.

## Ordered work

Install Chromium on a permitted workstation and run the Vite game through the provided mouse review. Capture console errors, requests, screenshots and video. Manually test scene ray picking, fullscreen, resizing, long sessions and reload. Select named minimum/recommended Windows devices and measure median/p95 frame time, input response, RAM/VRAM and scene-loading duration. CPU Vulkan evidence is a separate provider check.

For each substantive change, first record the observed defect or missing behavior. Identify its authoritative owner. Change that owner or its proper adapter, not a convenient duplicate. Run the smallest review that reproduces the issue and then check affected consumers. Preserve already-authored choices unless this task explicitly requires a narrative decision.

## Evidence and output

Keep the changed source, updated specification, focused verification, initial/final logical state, representative screenshots or audio/video, and a finding record. Name input boundary, source revision and actual environment. Mark unavailable checks blocked with their exact required environment. Do not turn an unsupported check into a success assertion.

## Review loop

Inspect → record discrepancy → implement → reproduce the scenario → compare expected/observed → inspect the resulting output → update the tracker. Continue while a concrete material defect remains. Use human review for comprehension, fear, performance and final artistic judgment.

## Definition of done

The exact outgoing build works through real devices at published quality targets; no progression blockers, save loss or unexplained resource growth remain. Results name hardware, resolution, settings and source.

## Next-agent handoff

State what changed and why, exact commands/scenarios run, what their results establish, the remaining gap, and the next executable action. A task can be partially implemented while still awaiting target-device or creative acceptance.
