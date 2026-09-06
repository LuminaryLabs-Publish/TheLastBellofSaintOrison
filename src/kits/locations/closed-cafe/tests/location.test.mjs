import test from "node:test";
import assert from "node:assert/strict";
import { ROOMS } from "../../../../../content/campaign.js";
import { location } from "../index.js";
test("closed-cafe package has linked interactions", () => {
  assert.equal(location.id, "closed-cafe");
  assert.ok(
    location.required.every((id) =>
      ROOMS.some((r) => r.objects.some((o) => o.clue === id)),
    ),
  );
  assert.ok(
    location.puzzle.answer.every(
      (i) => Number.isInteger(i) && location.puzzle.options[i],
    ),
  );
});
