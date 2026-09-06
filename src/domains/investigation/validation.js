import { validateShape } from "../portable.js";
import { initialState } from "./state.js";
export function validateState(s) {
  validateShape(s, initialState());
  if (
    s.knowledge.some((x) => typeof x !== "string") ||
    Object.values(s.rooms).some(
      (r) =>
        typeof r.solved !== "boolean" ||
        !Array.isArray(r.seen) ||
        r.seen.some((x) => typeof x !== "string"),
    )
  )
    throw new Error("Invalid investigation state");
  return s;
}
