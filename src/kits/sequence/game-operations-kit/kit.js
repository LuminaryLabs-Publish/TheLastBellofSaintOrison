import { manifest } from "./manifest.js";
import { defineDomainServiceKit, defineResource } from "nexusengine";
import { LOCATION_PACKAGES } from "../../../../content/campaign.js";
const Receipts = defineResource("orison.operation-receipts");
export function createGameOperationsKit() {
  return defineDomainServiceKit({
    ...manifest,
    id: "orison-game-operations",
    domain: "simulation",
    domainPath: "n:simulation:orison-operations",
    parentDomainPath: "n:simulation",
    apiName: "orisonOperations",
    version: "1.0.0",
    stability: "game-owned",
    provides: ["orison:operations"],
    requires: [
      "orison:investigation",
      "orison:inventory",
      "orison:narrative",
      "orison:campaign",
    ],
    resources: { Receipts },
    initWorld({ world }) {
      world.setResource(Receipts, []);
    },
    createApi({ engine, world }) {
      const n = engine.n;
      const operations = {
        observe: (p) => n.orisonInvestigationObservation.observe(p),
        combine: (p) => n.orisonInventoryCombination.combine(p),
        use: (p) => n.orisonInventoryItemUse.use(p),
        dialogue: (p) => n.orisonNarrativeDialogue.passage(p),
        choose: (p) => n.orisonNarrativeStoryChoice.choose(p),
        solve: (p) => n.orisonInvestigationPuzzle.solve(p),
        complete: (p) => n.orisonCampaignObjective.complete(p),
      };
      return {
        graph(id, phase = "investigations") {
          const graph = LOCATION_PACKAGES[id]?.sequences[phase];
          if (!graph) throw new Error("Unknown finite workflow");
          return structuredClone(graph);
        },
        runPhase(id, phase) {
          const graph = LOCATION_PACKAGES[id]?.sequences[phase];
          if (!graph || phase === "investigations")
            throw new Error("Unsupported lifecycle phase");
          const runtime = n.sequence.getNodeRuntime();
          if (runtime.getNodeState("orison-investigation") === "running")
            runtime.cancel("orison-investigation", { reason: phase });
          runtime.setGraph(structuredClone(graph));
          runtime.start(graph.id);
          for (const event of graph.listen) n.sequence.dispatch(event);
          if (runtime.getNodeState(graph.id) !== "finished")
            throw new Error("Lifecycle sequence did not finish");
          runtime.unmount(graph.id);
          return { outcome: "completed", phase };
        },
        execute(request) {
          if (!request || !Object.hasOwn(operations, request.operation))
            throw new Error("Unknown operation");
          const key = JSON.stringify([request.operation, request.input ?? {}]);
          const receipts = world.getResource(Receipts);
          const old =
            request.requestId &&
            receipts.find((r) => r.requestId === request.requestId);
          if (old) {
            if (old.key !== key)
              throw new Error("Request ID reused with different input");
            return structuredClone(old.receipt);
          }
          if (request.cancelled)
            return { outcome: "cancelled", operation: request.operation };
          const receipt = operations[request.operation](request.input ?? {});
          if (request.requestId)
            world.setResource(
              Receipts,
              [
                ...receipts,
                { requestId: request.requestId, key, receipt },
              ].slice(-128),
            );
          return receipt;
        },
        reset() {
          world.setResource(Receipts, []);
        },
        receiptCount: () => world.getResource(Receipts).length,
      };
    },
  });
}
