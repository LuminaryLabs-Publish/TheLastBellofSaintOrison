// Production has no command/debug API. Interact with its canvas using the mouse.
import { chromium } from "playwright";
import { PNG } from "pngjs";
import fs from "node:fs/promises";
import assert from "node:assert/strict";
import { createGame } from "../../src/composition/game.js";
import { memoryStorage } from "../../src/providers/storage.js";
const browser = await chromium.launch({ headless: true });
const out = "captures/browser";
await fs.mkdir(out, { recursive: true });
const reports = [];
try {
  for (const denied of [false, true]) {
    const context = await browser.newContext({
      viewport: { width: 960, height: 720 },
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    // Observe text actually submitted to the canvas, never game state or commands.
    await page.addInitScript(
      ({ denied }) => {
        const original = CanvasRenderingContext2D.prototype.fillText;
        const clear = CanvasRenderingContext2D.prototype.clearRect;
        window.__paintedText = [];
        CanvasRenderingContext2D.prototype.clearRect = function (...args) {
          if (this.canvas.id === "interface") window.__paintedText = [];
          return clear.apply(this, args);
        };
        CanvasRenderingContext2D.prototype.fillText = function (text, ...args) {
          if (this.canvas.id === "interface")
            window.__paintedText.push(String(text));
          return original.call(this, text, ...args);
        };
        if (denied)
          Object.defineProperty(window, "localStorage", {
            get() {
              throw new DOMException("Access denied", "SecurityError");
            },
          });
      },
      { denied },
    );
    await page.goto("http://127.0.0.1:4173/");
    await page.waitForFunction(() =>
      window.__paintedText.some((t) => t.includes("Begin a new journey")),
    );
    assert.equal(
      await page.evaluate(() => typeof window.orisonReview),
      "undefined",
    );
    if (denied)
      assert.ok(
        await page.evaluate(() =>
          window.__paintedText.some((t) => t.includes("Temporary saves only")),
        ),
      );
    // A separate read model gives authored hit bounds; only mouse input reaches the browser game.
    const model = createGame({ storage: memoryStorage() });
    const click = async (id) => {
      const b = model.n.orisonPresentation
        .packet()
        .ui.elements.find((e) => e.id === id);
      assert.ok(b && !b.disabled, `Available action ${id}`);
      await page.mouse.click(
        (b.x + b.w / 2) * 0.75,
        90 + (b.y + b.h / 2) * 0.75,
      );
      model.n.orison.submit(b.command);
      model.tick(1 / 30);
      const target = model.n.orisonPresentation
        .packet()
        .ui.elements.filter((e) => e.kind === "button" && !e.disabled)
        .map((e) => e.text);
      await page.waitForFunction(
        (labels) =>
          labels.every((label) => window.__paintedText.includes(label)),
        target,
      );
    };
    await click("new");
    await click("slot-0");
    await click("panel-close");
    const room = model.n.orison.getRoom();
    for (const object of room.objects.filter((o) => o.clue)) {
      await click("object-" + object.id);
      await click("panel-close");
    }
    await click("object-" + room.objects.find((o) => o.kind === "puzzle").id);
    for (const answer of room.puzzle.answer) await click("answer-" + answer);
    await click("panel-close");
    await click("choice-" + room.choices[0].id);
    if (model.n.ui.getState().panel) await click("panel-close");
    assert.ok(
      await page.evaluate(() =>
        window.__paintedText.some((t) => t.includes("Visitor Centre")),
      ),
    );
    if (!denied) {
      assert.equal(
        await page.evaluate(
          () =>
            JSON.parse(localStorage.getItem("saint-orison.v1.slot.0")).sceneId,
        ),
        "visitor-centre",
      );
      await page.reload();
      await page.waitForFunction(() =>
        window.__paintedText.some((t) => t.includes("Continue the night")),
      );
    }
    const shot = await page.screenshot({
      path: `${out}/production-${denied ? "temporary-saves" : "persistent-saves"}.png`,
    });
    const png = PNG.sync.read(shot);
    let lit = 0;
    for (let i = 0; i < png.data.length; i += 4)
      if (png.data[i] + png.data[i + 1] + png.data[i + 2] > 180) lit++;
    assert.ok(lit > 3000, "Browser produced visible content");
    assert.deepEqual(errors, []);
    reports.push({
      deniedStorage: denied,
      productionDebugAPI: false,
      reached: "visitor-centre",
      visiblePixels: lit,
      errors,
    });
    await context.close();
  }
  await fs.writeFile(
    out + "/production-report.json",
    JSON.stringify(reports, null, 2),
  );
} finally {
  await browser.close();
}
