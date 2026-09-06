import test from "node:test";
import assert from "node:assert/strict";
import { setup, start, send } from "./helpers.mjs";
test("commands change only their owner and snapshots cannot mutate authority", () => {
  const e = setup();
  start(e);
  const before = e.n.orison.getDomainSnapshot();
  e.n.orisonInventoryInventory.grant({ id: "key" });
  const after = e.n.orison.getDomainSnapshot();
  for (const domain of ["investigation", "narrative", "threat", "campaign"])
    assert.deepEqual(after.domains[domain], before.domains[domain]);
  assert.ok(after.domains.inventory.items.includes("key"));
  after.domains.inventory.items.length = 0;
  assert.ok(e.n.orisonInventory.snapshot().items.length);
  const inv = e.n.orisonInventory.snapshot();
  assert.throws(() =>
    e.n.orisonInventoryCombination.combine({ id: "protected-lantern" }),
  );
  assert.deepEqual(e.n.orisonInventory.snapshot(), inv);
  assert.throws(() => e.n.orisonInventory.command("unknown"));
  assert.throws(() =>
    e.n.orisonInvestigationPuzzle.solve({ roomId: "town-gate", required: [] }),
  );
  e.n.orison.dispose();
});
test("service capabilities produce actual owner effects and reject invalid input", () => {
  const e = setup();
  start(e);
  e.n.orisonInventoryInventory.grant({ id: "lantern" });
  e.n.orisonInventoryInventory.grant({ id: "resin" });
  e.n.orisonInventoryCombination.combine({ id: "protected-lantern" });
  assert.ok(e.n.orisonInventory.snapshot().items.includes("protectedLantern"));
  assert.throws(() =>
    e.n.orisonInventoryItemUse.use({
      id: "cassette",
      requiredItem: "key",
      targetId: "lock",
    }),
  );
  e.n.orisonInventoryItemUse.use({
    id: "cassette",
    requiredItem: "cassette",
    targetId: "player",
  });
  assert.equal(e.n.orisonInventory.snapshot().uses.player, "cassette");
  e.n.orisonNarrativeDialogue.passage({ id: "test" });
  e.n.orisonNarrativeRelationship.relate({ id: "elian", value: "remote" });
  assert.equal(e.n.orisonNarrative.snapshot().relationships.elian, "remote");
  assert.throws(() =>
    e.n.orisonInvestigationDeduction.deduce({
      id: "unknown",
      requires: ["missing"],
    }),
  );
  send(e, { action: "inspect", id: "notice" });
  send(e, { action: "close" });
  send(e, { action: "hint" });
  assert.equal(e.n.orisonInvestigation.snapshot().hints["town-gate"], 0);
  e.n.orison.dispose();
});
