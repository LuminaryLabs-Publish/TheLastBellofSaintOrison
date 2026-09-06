import { validateShape } from "../portable.js";
import { initialState } from "./state.js";
export function validateState(s) {
  validateShape(s, initialState());
  if (
    ![0, 1, 2].includes(s.slot) ||
    (s.ending !== null &&
      !["witness", "silence", "vessel"].includes(s.ending)) ||
    !Number.isSafeInteger(s.revision) ||
    s.revision < 0 ||
    !Number.isSafeInteger(s.sequenceNumber) ||
    s.sequenceNumber < 0 ||
    s.visited.some((x) => typeof x !== "string")
  )
    throw new Error("Invalid campaign state");
  return s;
}
