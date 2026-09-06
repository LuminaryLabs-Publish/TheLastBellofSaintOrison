import test from "node:test";
import assert from "node:assert/strict";
import { setup, start } from "./helpers.mjs";
test("finite sequences stay dormant; receipts deduplicate, cancel and reject", () => {
  const e = setup();
  start(e);
  const runtime = e.n.sequence.getNodeRuntime(),
    before = runtime.getRunnerStates();
  for (let i = 0; i < 5; i++) e.tick(1 / 30);
  assert.deepEqual(runtime.getRunnerStates(), before);
  const request = {
    requestId: "inspect-1",
    operation: "observe",
    input: { roomId: "town-gate", objectId: "notice", clue: "crossing-rule" },
  };
  const a = e.n.orisonOperations.execute(request),
    state = e.n.orisonInvestigation.snapshot();
  assert.deepEqual(e.n.orisonOperations.execute(request), a);
  assert.deepEqual(e.n.orisonInvestigation.snapshot(), state);
  assert.throws(() => e.n.orisonOperations.execute({ ...request, input: {} }));
  const cancelled = e.n.orisonOperations.execute({
    operation: "observe",
    input: {},
    cancelled: true,
  });
  assert.equal(cancelled.outcome, "cancelled");
  assert.deepEqual(e.n.orisonInvestigation.snapshot(), state);
  assert.throws(() => e.n.orisonOperations.execute({ operation: "unknown" }));
  for (const phase of ["entry", "exit", "recovery"])
    assert.equal(
      e.n.orisonOperations.runPhase("town-gate", phase).outcome,
      "completed",
    );
  e.n.orison.dispose();
});
