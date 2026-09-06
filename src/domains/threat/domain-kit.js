import { createOwnerKit } from "../owner-kit.js";
import { manifest } from "./manifest.js";
import { initialState } from "./state.js";
import { validateState } from "./validation.js";
import { operations as pressure } from "./kits/pressure-kit/operations.js";
import { operations as escalation } from "./kits/escalation-kit/operations.js";
import { operations as retreat } from "./kits/retreat-kit/operations.js";
import { createServiceKit as pressureKit } from "./kits/pressure-kit/index.js";
import { createServiceKit as escalationKit } from "./kits/escalation-kit/index.js";
import { createServiceKit as retreatKit } from "./kits/retreat-kit/index.js";
export function createDomainKit() {
  return createOwnerKit({
    manifest,
    initial: initialState,
    validate: validateState,
    operations: {
      ...Object.fromEntries(
        Object.entries(pressure).map(([k, v]) => ["pressure." + k, v]),
      ),
      ...Object.fromEntries(
        Object.entries(escalation).map(([k, v]) => ["escalation." + k, v]),
      ),
      ...Object.fromEntries(
        Object.entries(retreat).map(([k, v]) => ["retreat." + k, v]),
      ),
    },
  });
}
export function createDomainKits() {
  return [createDomainKit(), pressureKit(), escalationKit(), retreatKit()];
}
