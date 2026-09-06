import { performance } from "node:perf_hooks";
import fs from "node:fs/promises";
import { createGame } from "../../src/composition/game.js";
import { memoryStorage } from "../../src/providers/storage.js";
const e = createGame({ storage: memoryStorage() });
e.n.orison.submit({ action: "start", slot: 0 });
e.tick(1 / 30);
e.n.orison.submit({ action: "close" });
e.tick(1 / 30);
const timings = [];
for (let i = 0; i < 140; i++) {
  const start = performance.now();
  e.tick(1 / 30);
  e.n.orisonPresentation.packet();
  if (i >= 20) timings.push(performance.now() - start);
}
timings.sort((a, b) => a - b);
const report = {
  mode: "Node CPU tick+packet microprofile; not GPU fps or target hardware certification",
  samples: timings.length,
  medianMs: timings[Math.floor(timings.length * 0.5)],
  p95Ms: timings[Math.floor(timings.length * 0.95)],
  heapUsedBytes: process.memoryUsage().heapUsed,
  objects: e.n.object.list().length,
};
e.n.orison.dispose();
report.afterDisposeObjects = e.n.object.list().length;
await fs.mkdir("captures", { recursive: true });
await fs.writeFile("captures/profile.json", JSON.stringify(report, null, 2));
console.log(report);
