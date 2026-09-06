import test from "node:test";
import assert from "node:assert/strict";
import { createGame } from "../../src/composition/game.js";
import { memoryStorage } from "../../src/providers/storage.js";
import { start, send } from "./helpers.mjs";
test("provider profile does not change authoritative progression", () => {
  const games = ["webgl", "canvas"].map((graphicsMode) =>
    createGame({
      storage: memoryStorage(),
      platform: { graphicsMode, desktop: false },
    }),
  );
  for (const e of games) {
    start(e);
    send(e, { action: "inspect", id: "notice" });
    send(e, { action: "close" });
    for (let i = 0; i < 20; i++) e.tick(1 / 30);
  }
  assert.deepEqual(
    games[0].n.orison.getDomainSnapshot(),
    games[1].n.orison.getDomainSnapshot(),
  );
  for (const e of games) e.n.orison.dispose();
});
