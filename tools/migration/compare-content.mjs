import { readFileSync } from "node:fs";
import assert from "node:assert/strict";
import {
  ROOMS,
  ITEMS,
  ENDINGS,
  ACTS,
  CONTENT_VERSION,
} from "../../content/campaign.js";
const baseline = JSON.parse(
  readFileSync(new URL("./baseline-content.json", import.meta.url)),
);
for (const [name, current] of Object.entries({
  ROOMS,
  ITEMS,
  ENDINGS,
  ACTS,
  CONTENT_VERSION,
}))
  assert.deepEqual(current, baseline[name], name + " preservation");
console.log(
  "Baseline authored prose, IDs, answers, choices and endings preserved.",
);
