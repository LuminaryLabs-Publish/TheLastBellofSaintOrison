// Workstation player-input review. Never invokes the fixture/command API.
import { chromium } from "playwright";
import fs from "node:fs/promises";
import assert from "node:assert/strict";
import { ROOMS } from "../../content/campaign.js";
const out = "captures/browser";
await fs.mkdir(out, { recursive: true });
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1280, height: 720 },
  recordVideo: { dir: out, size: { width: 1280, height: 720 } },
});
const page = await context.newPage(),
  errors = [],
  trace = [];
page.on("pageerror", (error) => errors.push(error.message));
await page.goto(process.env.ORISON_REVIEW_URL ?? "http://127.0.0.1:5173");
await page.waitForFunction(() =>
  Boolean(window.orisonReview?.inspect().receipt),
);
const state = () => page.evaluate(() => window.orisonReview.inspect());
async function click(id) {
  const before = await state(),
    b = before.ui.elements.find((e) => e.id === id);
  assert.ok(b && !b.disabled, "Action available: " + id);
  await page.mouse.move(b.x + b.w / 2, b.y + b.h / 2);
  await page.mouse.click(b.x + b.w / 2, b.y + b.h / 2);
  await page.waitForTimeout(200);
  trace.push({ button: id, room: (await state()).room });
}
await page.screenshot({ path: out + "/menu.png" });
await click("new");
await click("slot-0");
await click("panel-close");
for (const r of ROOMS) {
  assert.equal((await state()).room, r.id);
  await page.screenshot({ path: out + "/" + r.id + ".png" });
  for (const o of r.objects.filter((o) => o.clue || o.kind === "collect")) {
    await click("object-" + o.id);
    await click("panel-close");
  }
  await click("object-" + r.objects.find((o) => o.kind === "puzzle").id);
  for (const index of r.puzzle.answer) await click("answer-" + index);
  await click("panel-close");
  if (r.id === "apothecary") {
    await click("nav-inventory");
    await click("combine");
    await click("panel-close");
  }
  let choice = r.choices[0].id;
  if (r.id === "flooded-archive") choice = "original";
  if (r.id === "well-chamber") choice = "witness";
  await click("choice-" + choice);
  if ((await state()).panel?.confirm) await click("confirm");
  if ((await state()).panel) await click("panel-close");
}
assert.equal((await state()).game.completed, true);
assert.deepEqual(errors, []);
await page.screenshot({ path: out + "/ending.png" });
await fs.writeFile(
  out + "/report.json",
  JSON.stringify(
    { mode: "real Chromium mouse input", trace, errors, final: await state() },
    null,
    2,
  ),
);
await context.close();
await browser.close();
