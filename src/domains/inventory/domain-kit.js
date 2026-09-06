import { createOwnerKit } from "../owner-kit.js";
import { manifest } from "./manifest.js";
import { initialState } from "./state.js";
import { validateState } from "./validation.js";
import { operations as inventory } from "./kits/inventory-kit/operations.js";
import { operations as item_use } from "./kits/item-use-kit/operations.js";
import { operations as combination } from "./kits/combination-kit/operations.js";
import { createServiceKit as inventoryKit } from "./kits/inventory-kit/index.js";
import { createServiceKit as item_useKit } from "./kits/item-use-kit/index.js";
import { createServiceKit as combinationKit } from "./kits/combination-kit/index.js";
export function createDomainKit() {
  return createOwnerKit({
    manifest,
    initial: initialState,
    validate: validateState,
    operations: {
      ...Object.fromEntries(
        Object.entries(inventory).map(([k, v]) => ["inventory." + k, v]),
      ),
      ...Object.fromEntries(
        Object.entries(item_use).map(([k, v]) => ["item-use." + k, v]),
      ),
      ...Object.fromEntries(
        Object.entries(combination).map(([k, v]) => ["combination." + k, v]),
      ),
    },
  });
}
export function createDomainKits() {
  return [createDomainKit(), inventoryKit(), item_useKit(), combinationKit()];
}
