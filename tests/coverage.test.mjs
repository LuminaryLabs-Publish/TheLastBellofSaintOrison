import test from "node:test";
import assert from "node:assert/strict";
import { createGame } from "../src/composition/game.js";
import { createStorage, memoryStorage } from "../src/providers/storage.js";
import { ROOMS } from "../content/campaign.js";
import { hitButton, focusable } from "../src/providers/canvas-ui.js";
const send = (e, c) => {
  e.n.orison.submit(c);
  e.tick(1 / 30);
};
const close = (e) => send(e, { action: "close" });
function solve(e, r) {
  close(e);
  for (const o of r.objects.filter((o) => o.clue || o.kind === "collect")) {
    send(e, { action: "inspect", id: o.id });
    close(e);
  }
  send(e, {
    action: "inspect",
    id: r.objects.find((o) => o.kind === "puzzle").id,
  });
  for (const index of r.puzzle.answer) send(e, { action: "answer", index });
  close(e);
  if (r.id === "apothecary") {
    send(e, { action: "combine" });
    close(e);
  }
}
function leave(e, id) {
  send(e, { action: "depart", id });
  if (e.n.ui.getState().panel?.confirm)
    send(e, { action: "depart", id, confirm: true });
}
test("every authored branch, optional observation and room re-entry", () => {
  const e = createGame({ storage: memoryStorage() });
  send(e, { action: "start", slot: 0 });
  let branches = 0;
  for (const [i, r] of ROOMS.entries()) {
    solve(e, r);
    for (const o of r.objects.filter(
      (o) => o.kind === "optional" || o.kind === "use",
    )) {
      if (o.use) send(e, { action: "item", id: o.use });
      close(e);
      send(e, { action: "inspect", id: o.id });
      close(e);
      assert.ok(e.n.orison.getProgress().seen.includes(o.id));
    }
    if (i > 0 && i < 12) {
      const prev = ROOMS[i - 1];
      send(e, { action: "visit", id: prev.id });
      assert.equal(e.n.orison.getRoom().id, prev.id);
      close(e);
      assert.ok(e.n.orison.getProgress().solved);
      const oldChoice = e.n.orison.getProgress().choice;
      send(e, { action: "depart", id: prev.choices.at(-1).id });
      assert.equal(e.n.orison.getProgress().choice, oldChoice);
      send(e, { action: "visit", id: r.id });
      close(e);
    }
    const snapshot = e.n.orison.getSnapshot();
    for (const choice of r.choices) {
      e.n.orison.loadSnapshot(snapshot);
      leave(e, choice.id);
      assert.equal(e.n.orison.getState().rooms[r.id].choice, choice.id);
      if (choice.flag)
        assert.equal(e.n.orison.getState().flags[choice.flag], true);
      if (choice.ending)
        assert.equal(e.n.orison.getState().ending, choice.ending);
      assert.equal(e.n.orison.getRoom().id, ROOMS[i + 1]?.id ?? r.id);
      branches++;
    }
    e.n.orison.loadSnapshot(snapshot);
    leave(
      e,
      r.id === "flooded-archive"
        ? "original"
        : r.id === "well-chamber"
          ? "witness"
          : r.choices[0].id,
    );
  }
  assert.equal(branches, 31);
  assert.equal(e.n.orison.getState().completed, true);
  e.n.orison.dispose();
});
test("damaged relay blocks Witness but permits a full Silence ending", () => {
  const e = createGame({ storage: memoryStorage() });
  send(e, { action: "start", slot: 0 });
  for (const r of ROOMS) {
    solve(e, r);
    let choice = r.choices[0].id;
    if (r.id === "bell-tower-base")
      choice = r.choices.find((c) => c.flag === "relayBroken").id;
    if (r.id === "well-chamber") {
      assert.equal(e.n.orison.witnessAvailable(), false);
      send(e, { action: "depart", id: "witness", confirm: true });
      assert.equal(e.n.orison.getRoom().id, r.id);
      close(e);
      choice = "silence";
    }
    leave(e, choice);
  }
  assert.equal(e.n.orison.getState().completed, true);
  assert.equal(e.n.orison.getState().ending, "silence");
  e.n.orison.dispose();
});
test("modal hit testing and keyboard focus cannot reach obscured actions; journal reopens the clue", () => {
  const e = createGame({ storage: memoryStorage() });
  send(e, { action: "start", slot: 0 });
  let f = e.n.orisonPresentation.packet().ui;
  assert.equal(hitButton(f, 50, 600), null);
  assert.deepEqual(
    focusable(f).map((b) => b.id),
    ["panel-close"],
  );
  close(e);
  send(e, { action: "inspect", id: "notice" });
  close(e);
  send(e, { action: "journal" });
  send(e, { action: "read-clue", id: "crossing-rule" });
  assert.equal(e.n.ui.getState().screen, "journal");
  assert.equal(
    e.n.ui.getState().panel.text,
    ROOMS[0].objects.find((o) => o.clue === "crossing-rule").text,
  );
  close(e);
  assert.equal(e.n.ui.getState().screen, "journal");
});
test("invalid save fields rejected; interrupted primary save recovers prior copy", () => {
  const map = new Map(),
    storage = createStorage({
      getItem: (k) => map.get(k) ?? null,
      setItem: (k, v) => map.set(k, v),
    }),
    e = createGame({ storage });
  send(e, { action: "start", slot: 0 });
  e.n.orison.save();
  map.set("saint-orison.v1.slot.0", "{incomplete");
  assert.equal(e.n.orison.listSaves()[0].valid, true);
  assert.equal(e.n.orison.load(0), true);
  const p = e.n.orison.getSnapshot();
  for (const [key, value] of [
    ["elapsed", -1],
    ["setbacks", "bad"],
    ["slot", 8],
    ["history", null],
  ]) {
    const bad = structuredClone(p);
    bad.game[key] = value;
    assert.throws(() => e.n.orison.loadSnapshot(bad));
    assert.deepEqual(e.n.orison.getSnapshot(), p);
  }
});
test("forced retreat preserves evidence; Story mode eliminates deadline; actual engine delta governs exposure", () => {
  const e = createGame({ storage: memoryStorage() });
  send(e, { action: "start", slot: 0 });
  close(e);
  send(e, { action: "inspect", id: "notice" });
  close(e);
  const p = e.n.orison.getSnapshot();
  p.game.exposure = ROOMS[0].pressure - 0.01;
  e.n.orison.loadSnapshot(p);
  e.tick(1 / 30);
  assert.equal(e.n.orison.getState().setbacks, 1);
  assert.equal(e.n.orison.getState().exposure, 0);
  assert.ok(e.n.orison.getState().knowledge.includes("crossing-rule"));
  close(e);
  send(e, { action: "setting", patch: { pressure: "story" } });
  const before = e.n.orison.getState().exposure;
  e.tick(0.1);
  assert.equal(e.n.orison.getState().exposure, before);
  send(e, { action: "setting", patch: { pressure: "standard" } });
  const current = e.n.orison.getState().exposure;
  e.tick(0.1);
  assert.ok(
    Math.abs(e.n.orison.getState().exposure - current - e.clock.delta) < 1e-6,
  );
});
