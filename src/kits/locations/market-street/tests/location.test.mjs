import test from "node:test";
import assert from "node:assert/strict";
import { ROOMS } from "../../../../../content/campaign.js";
import { location } from "../index.js";
test("market-street package has linked interactions", () => {
  assert.equal(location.id, "market-street");
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
