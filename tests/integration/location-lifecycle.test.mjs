import test from "node:test";
import assert from "node:assert/strict";
import { setup, start, send } from "./helpers.mjs";
test("repeated start/reset/restore releases objects and finite runners", () => {
  const e = setup();
  const kits = e.kits.length;
  for (let i = 0; i < 3; i++) {
    if (i === 0) start(e);
    else {
      send(e, { action: "start", slot: 0, confirm: true });
      send(e, { action: "close" });
    }
    assert.equal(e.n.object.list().length, 4);
    const snapshot = e.n.orison.getDomainSnapshot();
    e.n.orison.loadSnapshot(snapshot);
    assert.equal(e.n.object.list().length, 4);
    e.n.orison.dispose();
    assert.equal(e.n.object.list().length, 0);
    assert.equal(
      Object.keys(e.n.sequence.getNodeRuntime().getRunnerStates()).length,
      0,
    );
    assert.equal(e.kits.length, kits);
  }
});
