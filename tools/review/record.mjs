import { sourceManifest } from "./source-manifest.mjs";
import fs from "node:fs/promises";
import { Renderer } from "@headless-three/renderer";
import { createCanvas, loadImage } from "@napi-rs/canvas";
import { createGame } from "../../src/composition/game.js";
import { memoryStorage } from "../../src/providers/storage.js";
import { buildScene } from "../../src/providers/three-scene.js";
import { drawUI, hitButton } from "../../src/providers/canvas-ui.js";
const out = process.argv[2] ?? "captures/interaction-frames";
await fs.mkdir(out, { recursive: true });
await fs.writeFile(
  out + "/source-manifest.json",
  JSON.stringify(await sourceManifest(), null, 2),
);
const engine = createGame({ storage: memoryStorage() }),
  renderer = new Renderer(),
  events = [];
const send = (c) => engine.n.orison.submit(c);
send({ action: "start", slot: 0 });
engine.tick(1 / 30);
send({ action: "close" });
engine.tick(1 / 30);
await fs.writeFile(
  out + "/before.json",
  JSON.stringify(engine.n.orison.getSnapshot(), null, 2),
);
const scene = buildScene(engine.n.orisonPresentation.packet().scene, {
  canvasFactory: createCanvas,
});
const canvas = createCanvas(1280, 720),
  overlay = createCanvas(1280, 720);
const actions = new Map([
  [24, "object-notice"],
  [100, "panel-close"],
  [132, "object-callbox"],
  [210, "panel-close"],
]);
for (let i = 0; i < 240; i++) {
  const id = actions.get(i);
  if (id) {
    const p = engine.n.orisonPresentation.packet(),
      b = p.ui.elements.find((e) => e.id === id),
      x = b.x + b.w / 2,
      y = b.y + b.h / 2;
    const hit = hitButton(p.ui, x, y);
    if (hit?.id !== id) throw Error("Invalid hit target " + id);
    send({ type: "point", x, y });
    send(hit.command);
    events.push({ frame: i, x, y, button: id, command: hit.command });
  }
  engine.tick(1 / 24);
  const packet = engine.n.orisonPresentation.packet();
  scene.update(packet.effects);
  const bytes = renderer.render(scene.scene, scene.camera, {
    width: 1280,
    height: 720,
  });
  canvas.getContext("2d").drawImage(await loadImage(bytes), 0, 0);
  drawUI(overlay, packet.ui);
  canvas.getContext("2d").drawImage(overlay, 0, 0);
  await fs.writeFile(
    out + "/frame-" + String(i).padStart(6, "0") + ".png",
    canvas.toBuffer("image/png"),
  );
}
await fs.writeFile(
  out + "/after.json",
  JSON.stringify(engine.n.orison.getSnapshot(), null, 2),
);
await fs.writeFile(
  out + "/inputs.json",
  JSON.stringify(
    {
      boundary:
        "canvas hit testing to Nexus Input queue; no OS/browser input or audio captured",
      events,
    },
    null,
    2,
  ),
);
scene.dispose();
engine.n.orison.dispose();
console.log("240 actual frames; 10 seconds at 24fps; two clues acquired");
