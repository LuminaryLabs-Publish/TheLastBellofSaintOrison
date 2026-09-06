import { createOwnerKit } from "../owner-kit.js";
import { manifest } from "./manifest.js";
import { initialState } from "./state.js";
import { validateState } from "./validation.js";
import { operations as observation } from "./kits/observation-kit/operations.js";
import { operations as deduction } from "./kits/deduction-kit/operations.js";
import { operations as puzzle } from "./kits/puzzle-kit/operations.js";
import { operations as hint } from "./kits/hint-kit/operations.js";
import { createServiceKit as observationKit } from "./kits/observation-kit/index.js";
import { createServiceKit as deductionKit } from "./kits/deduction-kit/index.js";
import { createServiceKit as puzzleKit } from "./kits/puzzle-kit/index.js";
import { createServiceKit as hintKit } from "./kits/hint-kit/index.js";
export function createDomainKit() {
  return createOwnerKit({
    manifest,
    initial: initialState,
    validate: validateState,
    operations: {
      ...Object.fromEntries(
        Object.entries(observation).map(([k, v]) => ["observation." + k, v]),
      ),
      ...Object.fromEntries(
        Object.entries(deduction).map(([k, v]) => ["deduction." + k, v]),
      ),
      ...Object.fromEntries(
        Object.entries(puzzle).map(([k, v]) => ["puzzle." + k, v]),
      ),
      ...Object.fromEntries(
        Object.entries(hint).map(([k, v]) => ["hint." + k, v]),
      ),
    },
  });
}
export function createDomainKits() {
  return [
    createDomainKit(),
    observationKit(),
    deductionKit(),
    puzzleKit(),
    hintKit(),
  ];
}
