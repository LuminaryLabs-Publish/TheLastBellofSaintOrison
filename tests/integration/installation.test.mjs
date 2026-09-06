import test from "node:test";
import assert from "node:assert/strict";
import { setup } from "./helpers.mjs";
import {
  requireCapabilities,
  productCapabilities,
} from "../../src/composition/capability-checks.js";
import { orderKits } from "../../src/composition/install-plan.js";
test("real Nexus paths, duplicate installation and dependency failures", () => {
  const e = setup();
  requireCapabilities(e, productCapabilities);
  const before = e.kits.length;
  e.installKit(e.kits.at(-1));
  assert.equal(e.kits.length, before);
  assert.throws(
    () =>
      requireCapabilities(e, [
        { path: "n:simulation:absent", api: "absent", methods: ["run"] },
      ]),
    { code: "NEXUS_REQUIRED_CAPABILITY_MISSING" },
  );
  assert.throws(() =>
    orderKits([
      { id: "a", requires: ["b"], provides: ["a"] },
      { id: "b", requires: ["a"], provides: ["b"] },
    ]),
  );
  assert.throws(() => orderKits([{ id: "a" }, { id: "a" }]));
  e.n.orison.dispose();
});
