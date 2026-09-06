import { validateShape } from "../portable.js";
import { initialState } from "./state.js";
export function validateState(s) {
  validateShape(s, initialState());
  if (
    Object.values(s.flags).some((v) => typeof v !== "boolean") ||
    Object.values(s.choices).some((v) => typeof v !== "string")
  )
    throw new Error("Invalid narrative state");
  return s;
}
