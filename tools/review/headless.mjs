import { sourceManifest } from "./source-manifest.mjs";
import fs from "node:fs/promises";
import { Renderer } from "@headless-three/renderer";
import { createCanvas, loadImage } from "@napi-rs/canvas";
import { createGame } from "../../src/composition/game.js";
import {
  memoryStorage,
  createBrowserStorage,
} from "../../src/providers/storage.js";
import { buildScene } from "../../src/providers/three-scene.js";
import { drawUI, hitButton } from "../../src/providers/canvas-ui.js";
import { ROOMS } from "../../content/campaign.js";
import { createGraphicsAdapterBoundary } from "nexusengine/domains/presentation/graphics";
const out = process.argv[2] ?? "captures/headless";
await fs.mkdir(out, { recursive: true });
await fs.writeFile(
  out + "/source-manifest.json",
  JSON.stringify(await sourceManifest(), null, 2),
);
const engine = createGame({
    storage: process.argv.includes("--storage-denied")
      ? createBrowserStorage(() => {
          throw new Error("Storage denied for review");
        })
      : memoryStorage(),
  }),
  renderer = new Renderer(),
  results = [];
const send = (c) => {
  engine.n.orison.submit(c);
  engine.tick(1 / 30);
};
const click = (id) => {
  const f = engine.n.orisonPresentation.packet().ui,
    b = f.elements.find((x) => x.id === id);
  if (!b) throw Error("Missing visible button " + id);
  const x = b.x + b.w / 2,
    y = b.y + b.h / 2;
  send({ type: "point", x, y });
  const hit = hitButton(engine.n.orisonPresentation.packet().ui, x, y);
  if (hit?.id !== id) throw Error("Occluded button " + id);
  send(hit.command);
};
let frame = 0;
const adapter = createGraphicsAdapterBoundary({
  id: "orison-review-wgpu",
  kind: "wgpu-headless",
  capabilities: {},
  render(packet) {
    const built = buildScene(packet.scene, { canvasFactory: createCanvas });
    built.update(packet.effects);
    built.camera.position.fromArray(packet.camera.position);
    built.camera.lookAt(...packet.camera.target);
    const bytes = renderer.render(built.scene, built.camera, {
      width: 1280,
      height: 720,
    });
    built.dispose();
    return {
      bytes,
      receipt: adapter.createFrameReceipt({
        frame: ++frame,
        metadata: { scene: packet.scene.id, mode: "headless-fixture" },
      }),
    };
  },
});
async function capture(name) {
  engine.n.orisonPresentation.project();
  const p = engine.n.orisonPresentation.packet(),
    { bytes, receipt } = adapter.render(p),
    canvas = createCanvas(1280, 720),
    ui = createCanvas(1280, 720);
  canvas.getContext("2d").drawImage(await loadImage(bytes), 0, 0);
  drawUI(ui, p.ui);
  canvas.getContext("2d").drawImage(ui, 0, 0);
  await fs.writeFile(out + "/" + name + ".png", canvas.toBuffer("image/png"));
  results.push({
    name,
    room: p.scene.id,
    receipt,
    objects: p.scene.shapes.length,
  });
  console.log("captured " + name);
}
await capture("00-menu");
if (process.argv.includes("--large")) {
  click("settings");
  click("plus-2");
  click("settings-back");
}
click("new");
click("slot-0");
await capture("01-arrival");
click("panel-close");
for (const [i, r] of ROOMS.entries()) {
  await capture(String(i + 1).padStart(2, "0") + "-" + r.id);
  if (process.argv.includes("--views")) {
    for (let v = 0; v < 4; v++) {
      click("view-" + v);
      await capture(String(i + 1).padStart(2, "0") + "-view-" + v);
    }
    click("wide");
  }
  for (const o of r.objects.filter((o) => o.clue || o.kind === "collect")) {
    click("object-" + o.id);
    if (i === 0 && o.clue) await capture("01-clue-" + o.id);
    click("panel-close");
  }
  click("object-" + r.objects.find((o) => o.kind === "puzzle").id);
  await capture(String(i + 1).padStart(2, "0") + "-puzzle");
  for (const index of r.puzzle.answer) click("answer-" + index);
  click("panel-close");
  if (r.id === "apothecary") {
    click("nav-inventory");
    click("combine");
    click("panel-close");
  }
  let choice = r.choices[0].id;
  if (r.id === "flooded-archive") choice = "original";
  if (r.id === "well-chamber") choice = "witness";
  click("choice-" + choice);
  if (engine.n.ui.getState().panel?.confirm) click("confirm");
  if (engine.n.ui.getState().panel) click("panel-close");
}
await capture("16-ending");
await fs.writeFile(
  out + "/results.json",
  JSON.stringify(
    {
      mode: "Nexus input + canvas hit testing + CPU Vulkan scene render; not browser or hardware proof",
      results,
      completed: engine.n.orison.getState().completed,
    },
    null,
    2,
  ),
);
engine.n.orison.dispose();
engine.n.orisonPresentation.dispose();
