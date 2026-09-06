import test from "node:test";
import assert from "node:assert/strict";
import { createBrowserStorage } from "../src/providers/storage.js";
import { createGame } from "../src/composition/game.js";

const send = (engine, command) => {
  engine.n.orison.submit(command);
  engine.tick(1 / 30);
};
const denied = () => {
  throw new DOMException("Access denied", "SecurityError");
};

test("denied browser storage still permits starting, saving and continuing the session", () => {
  const storage = createBrowserStorage(denied);
  const engine = createGame({ storage });
  engine.tick(1 / 30);
  assert.match(
    engine.n.orisonPresentation
      .packet()
      .ui.elements.find((e) => e.id === "save-error").text,
    /Temporary saves/,
  );
  send(engine, { action: "start", slot: 0 });
  assert.equal(engine.n.orison.getState().started, true);
  assert.equal(storage.list()[0].valid, true);
  send(engine, { action: "close" });
  send(engine, { action: "save" });
  assert.match(
    engine.n.ui.getState().panel.text ?? engine.n.ui.getState().panel.body,
    /Temporary saves/,
  );
  send(engine, { action: "load", slot: 0 });
  assert.equal(engine.n.orison.getRoom().id, "town-gate");
  assert.equal(createBrowserStorage(denied).list()[0].empty, true);
});

test("quota exhaustion preserves the prior disk save and current in-session save", () => {
  const disk = new Map();
  let full = false;
  const backend = {
    getItem: (key) => disk.get(key) ?? null,
    setItem(key, value) {
      if (full) throw new DOMException("Full", "QuotaExceededError");
      disk.set(key, value);
    },
  };
  const storage = createBrowserStorage(() => backend);
  const engine = createGame({ storage });
  send(engine, { action: "start", slot: 0 });
  const original = disk.get("saint-orison.v1.slot.0");
  full = true;
  send(engine, { action: "close" });
  send(engine, {
    action: "inspect",
    id: engine.n.orison.getRoom().objects.find((o) => o.clue).id,
  });
  assert.equal(disk.get("saint-orison.v1.slot.0"), original);
  assert.ok(storage.read(0).game.knowledge.length > 0);
  assert.ok(storage.notice());
  assert.equal(storage.readPrevious(0).game.knowledge.length, 0);
});

test("available browser storage persists between provider instances without a warning", () => {
  const disk = new Map();
  const backend = {
    getItem: (key) => disk.get(key) ?? null,
    setItem: (key, value) => disk.set(key, value),
  };
  const storage = createBrowserStorage(() => backend);
  const engine = createGame({ storage });
  send(engine, { action: "start", slot: 1 });
  const restored = createGame({ storage: createBrowserStorage(() => backend) });
  send(restored, { action: "load", slot: 1 });
  assert.equal(restored.n.orison.getState().started, true);
  assert.equal(restored.n.orison.storageNotice(), null);
});
