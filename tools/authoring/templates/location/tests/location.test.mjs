import test from "node:test";
import assert from "node:assert/strict";
import { location } from "../index.js";
test("{{ID}} package has linked interactions", () => {
  assert.equal(location.id, "{{ID}}");
  assert.ok(
    location.required.every(
      (id) =>
        location.objects.some((o) => o.clue === id) ||
        ["crossing-rule", "blank-record"].includes(id),
    ),
  );
  assert.ok(
    location.puzzle.answer.every(
      (i) => Number.isInteger(i) && location.puzzle.options[i],
    ),
  );
});
