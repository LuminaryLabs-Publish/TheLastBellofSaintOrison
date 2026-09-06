import { createOwnerKit } from "../owner-kit.js";
import { manifest } from "./manifest.js";
import { initialState } from "./state.js";
import { validateState } from "./validation.js";
import { operations as objective } from "./kits/objective-kit/operations.js";
import { operations as checkpoint } from "./kits/checkpoint-kit/operations.js";
import { operations as ending } from "./kits/ending-kit/operations.js";
import { createServiceKit as objectiveKit } from "./kits/objective-kit/index.js";
import { createServiceKit as checkpointKit } from "./kits/checkpoint-kit/index.js";
import { createServiceKit as endingKit } from "./kits/ending-kit/index.js";
export function createDomainKit() {
  return createOwnerKit({
    manifest,
    initial: initialState,
    validate: validateState,
    operations: {
      ...Object.fromEntries(
        Object.entries(objective).map(([k, v]) => ["objective." + k, v]),
      ),
      ...Object.fromEntries(
        Object.entries(checkpoint).map(([k, v]) => ["checkpoint." + k, v]),
      ),
      ...Object.fromEntries(
        Object.entries(ending).map(([k, v]) => ["ending." + k, v]),
      ),
    },
  });
}
export function createDomainKits() {
  return [createDomainKit(), objectiveKit(), checkpointKit(), endingKit()];
}
