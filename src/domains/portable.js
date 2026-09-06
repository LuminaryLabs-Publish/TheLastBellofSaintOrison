export function validateShape(value, initial) {
  if (!value || typeof value !== "object" || Array.isArray(value))
    throw new Error("State must be a record");
  if (Object.keys(value).sort().join() !== Object.keys(initial).sort().join())
    throw new Error("Unknown or missing state fields");
  for (const [key, example] of Object.entries(initial)) {
    const v = value[key];
    if (Array.isArray(example)) {
      if (!Array.isArray(v)) throw new Error("Expected array: " + key);
    } else if (example !== null && typeof v !== typeof example)
      throw new Error("Invalid state type: " + key);
  }
  const visit = (v) => {
    if (typeof v === "number" && !Number.isFinite(v))
      throw new Error("Nonfinite state");
    if (v && typeof v === "object") {
      if (Object.getPrototypeOf(v) !== Object.prototype && !Array.isArray(v))
        throw new Error("Nonportable record");
      for (const [k, x] of Object.entries(v)) {
        if (["__proto__", "constructor", "prototype"].includes(k))
          throw new Error("Unsafe key");
        visit(x);
      }
    } else if (
      !["string", "number", "boolean"].includes(typeof v) &&
      v !== null
    )
      throw new Error("Nonportable state");
  };
  visit(value);
  return value;
}
