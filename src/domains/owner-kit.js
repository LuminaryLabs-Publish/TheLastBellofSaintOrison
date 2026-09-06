import { defineDomainServiceKit, defineResource } from "nexusengine";
export function createOwnerKit({ manifest, initial, validate, operations }) {
  const State = defineResource(manifest.id + ".state");
  return defineDomainServiceKit({
    ...manifest,
    domain: "simulation",
    stability: "game-owned",
    resources: { State },
    initWorld({ world }) {
      world.setResource(State, initial());
    },
    createApi({ world }) {
      const snapshot = () => structuredClone(world.getResource(State));
      return Object.freeze({
        snapshot,
        validate,
        reset() {
          world.setResource(State, initial());
        },
        restore(value) {
          validate(value);
          world.setResource(State, structuredClone(value));
        },
        command(operation, input = {}) {
          if (!Object.hasOwn(operations, operation))
            throw new Error("Unsupported operation: " + operation);
          if (!input || typeof input !== "object" || Array.isArray(input))
            throw new Error("Operation input must be a record");
          for (const [key, value] of Object.entries(input)) {
            if (
              (key === "id" || key.endsWith("Id")) &&
              (typeof value !== "string" ||
                !value ||
                ["__proto__", "constructor", "prototype"].includes(value))
            )
              throw new Error("Invalid identifier: " + key);
          }
          const draft = snapshot();
          const result = operations[operation](draft, structuredClone(input));
          validate(draft);
          world.setResource(State, draft);
          return Object.freeze({
            outcome: "completed",
            operation,
            result: structuredClone(result),
          });
        },
      });
    },
  });
}
