import assert from "node:assert/strict";
import { ROOMS, ITEMS } from "../../content/campaign.js";
const ids = new Set(),
  clues = new Set();
let objects = 0,
  branches = 0;
for (const room of ROOMS) {
  assert.ok(!ids.has(room.id));
  ids.add(room.id);
  assert.ok(room.objects.length >= 1);
  const local = new Set();
  for (const o of room.objects) {
    assert.ok(!local.has(o.id));
    local.add(o.id);
    if (o.clue) clues.add(o.clue);
    if (o.item) assert.ok(ITEMS[o.item]);
    objects++;
  }
  assert.ok(room.arrival.length > 100);
  assert.ok(room.puzzle.answer.length > 0);
  assert.ok(room.puzzle.answer.every((i) => room.puzzle.options[i]));
  assert.equal(room.puzzle.hints.length, 3);
  assert.ok(room.choices.length >= 2 && room.choices.length <= 5);
  branches += room.choices.length;
}
for (const room of ROOMS)
  for (const required of room.required)
    assert.ok(clues.has(required), required);
console.log(
  JSON.stringify(
    {
      locations: ids.size,
      interactiveObjects: objects,
      branchOptions: branches,
      puzzles: ROOMS.length,
      planningMinutes: ROOMS.reduce((n, r) => n + r.minutes, 0),
      durationStatus: "unmeasured target",
      status: "structure passed",
    },
    null,
    2,
  ),
);
