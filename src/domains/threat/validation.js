import { validateShape } from "../portable.js";
import { initialState } from "./state.js";
export function validateState(s) {
  validateShape(s, initialState());
  if (
    s.elapsed < 0 ||
    s.exposure < 0 ||
    !Number.isSafeInteger(s.setbacks) ||
    s.setbacks < 0
  )
    throw new Error("Invalid threat state");
  return s;
}
