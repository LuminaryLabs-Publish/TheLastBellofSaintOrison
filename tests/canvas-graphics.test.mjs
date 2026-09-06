import test from "node:test";
import assert from "node:assert/strict";
import { createCanvas } from "@napi-rs/canvas";
import { createCanvasGraphicsProvider } from "../src/providers/canvas-graphics.js";
import { createGame } from "../src/composition/game.js";
import { memoryStorage } from "../src/providers/storage.js";
import { environment } from "../src/presentation/environment.js";
import { ROOMS } from "../content/campaign.js";

test("software graphics render every authored room, reuse the view, resize and dispose", () => {
  const scene = createCanvas(640, 360),
    ui = createCanvas(640, 360);
  const provider = createCanvasGraphicsProvider(scene, ui, {
    canvasFactory: createCanvas,
  });
  const engine = createGame({
    storage: memoryStorage(),
    platform: { graphicsMode: "canvas" },
  });
  const base = engine.n.orisonPresentation.packet();
  assert.match(
    base.ui.elements.find((e) => e.id === "graphics-notice").text,
    /Reduced graphics/,
  );
  for (const room of ROOMS) {
    const descriptor = environment(room, { id: room.id });
    const packet = {
      ...base,
      scene: descriptor,
      camera: descriptor.camera,
      output: { ...base.output, render: { pixelWidth: 640, pixelHeight: 360 } },
    };
    provider.render(packet);
    assert.ok(
      provider.stats().polygons > 0,
      room.id + " has projected geometry",
    );
    const first = scene.toBuffer("image/png");
    provider.render(packet);
    assert.deepEqual(
      scene.toBuffer("image/png"),
      first,
      "same view remains stable",
    );
  }
  provider.render(base);
  assert.equal(scene.width, 1280);
  assert.equal(ui.width, 1280);
  provider.dispose();
  assert.equal(provider.stats().geometries, 0);
  assert.equal(provider.pick(0.5, 0.5), null);
});
