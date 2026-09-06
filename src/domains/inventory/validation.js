import { ITEMS } from "../../../content/campaign.js";
import { validateShape } from "../portable.js";
import { initialState } from "./state.js";
export function validateState(s) {
  validateShape(s, initialState());
  if (
    s.items.some((id) => !Object.hasOwn(ITEMS, id)) ||
    new Set(s.items).size !== s.items.length
  )
    throw new Error("Invalid inventory");
  return s;
}
