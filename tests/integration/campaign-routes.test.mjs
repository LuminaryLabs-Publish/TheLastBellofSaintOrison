import test from "node:test";
import assert from "node:assert/strict";
import { ROOMS } from "../../content/campaign.js";
import { setup, start } from "./helpers.mjs";
test("campaign cannot leave before the objective is solved", () => {
  const e = setup();
  start(e);
  assert.equal(
    e.n.scene.requestTransition({ exitId: "forward" }).accepted,
    false,
  );
  assert.equal(e.n.scene.getCurrentScene().id, ROOMS[0].id);
  e.n.orison.dispose();
});
