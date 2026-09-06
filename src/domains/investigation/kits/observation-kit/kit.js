import { defineDomainServiceKit } from "nexusengine";
import { manifest } from "./manifest.js";
import { operations } from "./operations.js";
export function createServiceKit() {
  return defineDomainServiceKit({
    ...manifest,
    domain: "simulation",
    stability: "game-owned",
    createApi({ engine }) {
      const owner = engine.n.orisonInvestigation;
      return Object.freeze(
        Object.fromEntries(
          Object.keys(operations).map((name) => [
            name,
            (input) => owner.command("observation." + name, input),
          ]),
        ),
      );
    },
  });
}
