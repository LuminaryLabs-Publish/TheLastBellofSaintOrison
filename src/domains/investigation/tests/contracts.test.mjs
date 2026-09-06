import test from "node:test";
import assert from "node:assert/strict";
import { initialState, validateState } from "../index.js";
test("investigation rejects unknown snapshot fields", () => {
  const s = initialState();
  assert.equal(validateState(s), s);
  assert.throws(() => validateState({ ...s, unknown: true }));
});
