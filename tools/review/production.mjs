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
  for (const [denied, canvas] of [
    [false, false],
    [true, false],
    [true, true],
  ]) {
    const context = await browser.newContext({
      viewport: { width: 960, height: 720 },
    });
    context.setDefaultTimeout(20000);
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => {
      errors.push(error.message);
      console.error("Production browser error:", error.message);
    });
    // Observe text actually submitted to the canvas, never game state or commands.
    await page.addInitScript(
      ({ denied, canvas }) => {
        if (canvas) {
          const original = HTMLCanvasElement.prototype.getContext;
          HTMLCanvasElement.prototype.getContext = function (kind, ...args) {
            return kind.startsWith("webgl")
              ? null
              : original.call(this, kind, ...args);
          };
        }
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
      { denied, canvas },
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
    if (canvas)
      assert.ok(
        await page.evaluate(() =>
          window.__paintedText.some((t) => t.includes("Reduced graphics")),
        ),
      );
    // A separate read model gives authored hit bounds; only mouse input reaches the browser game.
    const model = createGame({ storage: memoryStorage() });
    const click = async (id) => {
      const before = model.n.orisonPresentation.packet().ui;
      const b = before.elements.find((e) => e.id === id);
      assert.ok(b && !b.disabled, `Available action ${id}`);
      await page.mouse.click(
        (b.x + b.w / 2) * 0.75,
        90 + (b.y + b.h / 2) * 0.75,
      );
      model.n.orison.submit(b.command);
      model.tick(1 / 30);
      const after = model.n.orisonPresentation.packet().ui;
      const target = after.elements.filter((e) => e.kind === "button" && !e.disabled)
        .map((e) => e.text);
      // Underlying room buttons are painted even while a modal blocks input.
      // Wait for removed controls to disappear as well, otherwise closing a
      // panel can pass immediately and the next click hits the old modal.
      const removed = before.elements
        .filter((e) => e.kind === "button" && !e.disabled &&
          !after.elements.some((next) => next.text === e.text))
        .map((e) => e.text);
      const panelTitle = after.elements.find((e) => e.id === "panel-title")?.text;
      try { await page.waitForFunction(
        ({ target, removed, panelTitle }) =>
          target.every((label) => window.__paintedText.includes(label)) &&
          removed.every((label) => !window.__paintedText.includes(label)) &&
          (!panelTitle || window.__paintedText.includes(panelTitle)),
        { target, removed, panelTitle },
      ); } catch (error) {
        console.error("Paint transition mismatch", {
          action: id, target, removed, panelTitle,
          painted: await page.evaluate(() => window.__paintedText),
        });
        await page.screenshot({ path: `${out}/production-failure.png` });
        throw error;
      }
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
      path: `${out}/production-${canvas ? "canvas-" : ""}${denied ? "temporary-saves" : "persistent-saves"}.png`,
    });
    const png = PNG.sync.read(shot);
    let lit = 0;
    for (let i = 0; i < png.data.length; i += 4)
      if (png.data[i] + png.data[i + 1] + png.data[i + 2] > 180) lit++;
    assert.ok(lit > 3000, "Browser produced visible content");
    assert.deepEqual(errors, []);
    reports.push({
      deniedStorage: denied,
      graphics: canvas ? "canvas" : "webgl",
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
