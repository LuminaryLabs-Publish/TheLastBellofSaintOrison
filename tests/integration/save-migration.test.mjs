import test from "node:test";
import assert from "node:assert/strict";
import { setup, start, send } from "./helpers.mjs";
import { migrateV1 } from "../../src/kits/persistence/save-coordinator-kit/kit.js";
test("legacy migration and full domain snapshot round-trip; corrupt late domain is atomic", () => {
  const e = setup();
  start(e);
  send(e, { action: "inspect", id: "notice" });
  const old = e.n.orison.getSnapshot(),
    migrated = migrateV1(old);
  e.n.orison.loadSnapshot(migrated);
  assert.deepEqual(e.n.orison.getSnapshot(), old);
  const saved = e.n.orison.getDomainSnapshot();
  e.n.orisonInventoryInventory.grant({ id: "key" });
  e.n.orison.loadSnapshot(saved);
  assert.deepEqual(e.n.orison.getDomainSnapshot(), saved);
  const bad = structuredClone(saved);
  bad.domains.campaign.slot = 9;
  assert.throws(() => e.n.orison.loadSnapshot(bad));
  assert.deepEqual(e.n.orison.getDomainSnapshot(), saved);
  bad.domains.campaign.slot = 0;
  bad.domains.investigation.rooms["town-gate"].solved = true;
  assert.throws(() => e.n.orison.loadSnapshot(bad));
  e.n.orison.dispose();
});
