import test from "node:test";
import assert from "node:assert/strict";
import { createGame } from "../src/composition/game.js";
import { memoryStorage } from "../src/providers/storage.js";
import { ROOMS } from "../content/campaign.js";
const setup = () => createGame({ storage: memoryStorage() });
const send = (e, c) => {
  e.n.orison.submit(c);
  e.tick(1 / 30);
};
const close = (e) => send(e, { action: "close" });
function solve(e, r) {
  close(e);
  // Early operation must not bypass clue acquisition.
  const target = r.objects.find((o) => o.kind === "puzzle");
  send(e, { action: "inspect", id: target.id });
  assert.equal(e.n.ui.getState().puzzle, null);
  close(e);
  for (const o of r.objects.filter((o) => o.clue || o.kind === "collect")) {
    send(e, { action: "inspect", id: o.id });
    close(e);
  }
  send(e, { action: "inspect", id: target.id });
  assert.ok(e.n.ui.getState().puzzle, r.id + " opens controls");
  // Deliberately wrong answer must not complete a puzzle.
  send(e, {
    action: "answer",
    index: (r.puzzle.answer[0] + 1) % r.puzzle.options.length,
  });
  assert.equal(e.n.orison.getProgress().solved, false);
  for (const index of r.puzzle.answer) send(e, { action: "answer", index });
  assert.equal(e.n.orison.getProgress().solved, true, r.id);
  close(e);
  if (r.id === "apothecary") {
    send(e, { action: "depart", id: "street" });
    assert.equal(e.n.orison.getRoom().id, r.id);
    close(e);
    send(e, { action: "combine" });
    close(e);
  }
}
for (const ending of ["witness", "silence", "vessel"])
  test("complete player command route: " + ending, () => {
    const e = setup();
    send(e, { action: "start", slot: 0 });
    for (const r of ROOMS) {
      assert.equal(e.n.orison.getRoom().id, r.id);
      solve(e, r);
      const inventoryBefore = e.n.orison.getState().inventory;
      const target = r.objects.find((o) => o.kind === "puzzle");
      send(e, { action: "inspect", id: target.id });
      close(e);
      assert.deepEqual(e.n.orison.getState().inventory, inventoryBefore);
      const snapshot = e.n.orison.getSnapshot();
      e.n.orison.loadSnapshot(snapshot);
      assert.deepEqual(e.n.orison.getSnapshot(), snapshot);
      let choice = r.choices[0].id;
      if (r.id === "flooded-archive") choice = "original";
      if (r.id === "well-chamber") choice = ending;
      if (r.id === "chapel-nave") choice = "release";
      send(e, { action: "depart", id: choice });
      if (e.n.ui.getState().panel?.confirm)
        send(e, { action: "depart", id: choice, confirm: true });
    }
    assert.equal(e.n.orison.getState().completed, true);
    assert.equal(e.n.orison.getState().ending, ending);
    assert.equal(Object.keys(e.n.orison.getState().rooms).length, 15);
    e.n.orison.dispose();
    assert.equal(e.n.object.list().length, 0);
    assert.equal(
      Object.keys(e.n.sequence.getNodeRuntime().getRunnerStates()).length,
      0,
    );
  });
test("pause, reading and suspension freeze exposure", () => {
  const e = setup();
  send(e, { action: "start", slot: 0 });
  const before = e.n.orison.getState().exposure;
  for (let i = 0; i < 10; i++) e.tick(1 / 30);
  assert.equal(e.n.orison.getState().exposure, before);
  close(e);
  send(e, { action: "pause" });
  const p = e.n.orison.getState().exposure;
  for (let i = 0; i < 10; i++) e.tick(1 / 30);
  assert.equal(e.n.orison.getState().exposure, p);
  send(e, { action: "back" });
  send(e, { type: "suspend", value: true });
  const s = e.n.orison.getState().exposure;
  e.tick(1 / 30);
  assert.equal(e.n.orison.getState().exposure, s);
});
test("save validation rejects corruption without changing authoritative progress", () => {
  const e = setup();
  send(e, { action: "start", slot: 0 });
  const before = e.n.orison.getSnapshot();
  assert.throws(() => e.n.orison.loadSnapshot({ schema: "invalid" }));
  assert.deepEqual(e.n.orison.getSnapshot(), before);
});
test("deterministic input produces equal state and presentation", () => {
  const a = setup(),
    b = setup();
  for (const e of [a, b]) {
    send(e, { action: "start", slot: 0 });
    close(e);
    send(e, { action: "inspect", id: "notice" });
    close(e);
    for (let i = 0; i < 15; i++) e.tick(1 / 30);
  }
  assert.deepEqual(a.n.orison.getSnapshot(), b.n.orison.getSnapshot());
  assert.deepEqual(
    a.n.ui.getDescriptors("frames"),
    b.n.ui.getDescriptors("frames"),
  );
});
test("Nexus gates are causal: input, scene, sequence, presentation", () => {
  const e = setup();
  send(e, { action: "start", slot: 0 });
  close(e);
  const before = e.n.ui.getDescriptors("frames");
  e.n.input.update({ pending: [{ action: "inspect", id: "notice" }] });
  e.tick(1 / 30);
  assert.ok(e.n.orison.getState().knowledge.includes("crossing-rule"));
  assert.notDeepEqual(before, e.n.ui.getDescriptors("frames"));
  assert.ok(e.n.interaction.getState().lastCommand);
  assert.equal(
    e.n.scene.requestTransition({ exitId: "forward" }).accepted,
    false,
  );
  const states = e.n.sequence.getNodeRuntime().getRunnerStates();
  for (let i = 0; i < 5; i++) e.tick(1 / 30);
  assert.deepEqual(e.n.sequence.getNodeRuntime().getRunnerStates(), states);
});
