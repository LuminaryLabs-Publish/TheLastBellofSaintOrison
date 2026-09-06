import { ROOM_BY_ID } from "../../../../../content/campaign.js";
import { defineDomainServiceKit } from "nexusengine";
import { manifest } from "./manifest.js";
import { operations } from "./operations.js";
export function createServiceKit() {
  let tick;
  return defineDomainServiceKit({
    systems: [
      {
        phase: "simulate",
        name: "orison-threat-pressure",
        system() {
          tick();
        },
      },
    ],
    ...manifest,
    domain: "simulation",
    stability: "game-owned",
    createApi({ engine }) {
      const n = engine.n;
      const owner = n.orisonThreat;
      const panel = (title, text) =>
        n.ui.update({ panel: { title, text }, puzzle: null });
      tick = () => {
        const delta = engine.clock.delta;
        const u = n.ui.getState(),
          s = {
            ...n.orisonCampaign.snapshot(),
            ...owner.snapshot(),
            inventory: n.orisonInventory.snapshot().items,
            flags: n.orisonNarrative.snapshot().flags,
          },
          r = ROOM_BY_ID[n.scene.getCurrentScene().id];
        if (
          !s.started ||
          s.completed ||
          u.screen !== "play" ||
          u.panel ||
          u.suspended
        )
          return;
        const rate =
          u.settings.pressure === "story"
            ? 0
            : u.settings.pressure === "gentle"
              ? 0.5
              : 1;
        const protection =
          (s.inventory.includes("protectedLantern") ? 0.8 : 1) *
          (r.id === "return-ascent" && s.flags.returnMarked ? 0.75 : 1) *
          (r.id === "return-ascent" && s.flags.marketSafe ? 0.85 : 1) *
          (s.flags.relayIntact &&
          ["school-hall", "flooded-archive"].includes(r.id)
            ? 0.9
            : 1);
        n.orisonThreatPressure.advance({
          delta,
          rate: rate * protection,
          limit: r.pressure,
        });
        n.orisonCampaignObjective.bump();
        if (r.pressure && owner.snapshot().exposure >= r.pressure) {
          n.orisonThreatRetreat.retreat();
          n.orisonOperations.runPhase(r.id, "recovery");
          n.orison.rebuildSequence();
          n.orisonCampaignObjective.bump();
          panel(
            "Forced retreat",
            r.retreat +
              "\n\nYour recovered evidence is safe. Return when you are ready.",
          );
        }
      };
      return Object.freeze(
        Object.fromEntries(
          Object.keys(operations).map((name) => [
            name,
            (input) => owner.command("pressure." + name, input),
          ]),
        ),
      );
    },
  });
}
