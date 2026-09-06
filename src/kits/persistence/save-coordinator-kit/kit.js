import { manifest } from "./manifest.js";
import { defineDomainServiceKit } from "nexusengine";
import {
  ROOM_BY_ID,
  CONTENT_VERSION,
  LOCATION_PACKAGES,
} from "../../../../content/campaign.js";
import { validateSave as validateV1 } from "./validate-v1.js";
const names = ["investigation", "inventory", "narrative", "threat", "campaign"];
export function migrateV1(payload) {
  validateV1(payload);
  const s = payload.game;
  return {
    schema: "orison-save/2",
    contentVersion: CONTENT_VERSION,
    sceneId: payload.sceneId,
    domains: {
      investigation: {
        puzzles: {},
        knowledge: s.knowledge,
        rooms: Object.fromEntries(
          Object.entries(s.rooms).map(([id, r]) => [
            id,
            { seen: r.seen, solved: r.solved },
          ]),
        ),
        history: s.history,
        deductions: {},
        hints: {},
      },
      inventory: { items: s.inventory, uses: {} },
      narrative: {
        flags: s.flags,
        choices: Object.fromEntries(
          Object.entries(s.rooms)
            .filter(([, r]) => r.choice)
            .map(([id, r]) => [id, r.choice]),
        ),
        dialogue: {},
        relationships: {},
      },
      threat: {
        elapsed: s.elapsed,
        exposure: s.exposure,
        setbacks: s.setbacks,
      },
      campaign: {
        started: s.started,
        completed: s.completed,
        revision: s.revision,
        slot: s.slot,
        sequenceNumber: s.sequenceNumber,
        ending: s.ending,
        visited: Object.keys(s.rooms),
        objectives: Object.fromEntries(
          Object.entries(s.rooms)
            .filter(([, r]) => r.solved)
            .map(([id]) => ["solved:" + id, true]),
        ),
      },
    },
  };
}
export function createSaveCoordinatorKit() {
  return defineDomainServiceKit({
    ...manifest,
    id: "orison-save-coordinator",
    domain: "simulation",
    domainPath: "n:simulation:orison-save",
    parentDomainPath: "n:simulation",
    apiName: "orisonSave",
    version: "1.0.0",
    stability: "game-owned",
    provides: ["orison:save"],
    requires: names.map((n) => "orison:" + n),
    createApi({ engine }) {
      const owners = Object.fromEntries(
        names.map((name) => [
          name,
          engine.n["orison" + name[0].toUpperCase() + name.slice(1)],
        ]),
      );
      function snapshot() {
        return {
          schema: "orison-save/2",
          contentVersion: CONTENT_VERSION,
          sceneId: engine.n.scene.getCurrentScene().id,
          domains: Object.fromEntries(
            names.map((name) => [name, owners[name].snapshot()]),
          ),
        };
      }
      function validate(p) {
        const value = structuredClone(
          p?.schema === CONTENT_VERSION ? migrateV1(p) : p,
        );
        if (
          !value ||
          value.schema !== "orison-save/2" ||
          value.contentVersion !== CONTENT_VERSION ||
          !ROOM_BY_ID[value.sceneId] ||
          !value.domains ||
          Object.keys(value.domains).sort().join() !== [...names].sort().join()
        )
          throw new Error("Incompatible or damaged save");
        for (const name of names) owners[name].validate(value.domains[name]);
        const { campaign: c, investigation: i, narrative: n } = value.domains;
        if (
          !c.visited.includes(value.sceneId) ||
          !i.rooms[value.sceneId] ||
          c.visited.some((id) => !ROOM_BY_ID[id] || !i.rooms[id]) ||
          Object.keys(i.rooms).some((id) => !c.visited.includes(id))
        )
          throw new Error("Inconsistent visited locations");
        for (const [id, r] of Object.entries(i.rooms)) {
          if (
            r.seen.some(
              (objectId) =>
                !ROOM_BY_ID[id].objects.some((o) => o.id === objectId),
            )
          )
            throw new Error("Unknown seen object");
          if (
            r.solved &&
            !ROOM_BY_ID[id].required.every((k) => i.knowledge.includes(k))
          )
            throw new Error("Solved puzzle lacks evidence");
        }
        for (const [id, choice] of Object.entries(n.choices))
          if (
            !ROOM_BY_ID[id]?.choices.some((x) => x.id === choice) ||
            !i.rooms[id]?.solved
          )
            throw new Error("Invalid saved choice");
        const knownClues = new Set(
          Object.values(ROOM_BY_ID).flatMap((r) =>
            r.objects.map((o) => o.clue).filter(Boolean),
          ),
        );
        if (
          new Set(i.knowledge).size !== i.knowledge.length ||
          i.knowledge.some((k) => !knownClues.has(k))
        )
          throw new Error("Unknown or duplicate knowledge");
        for (const [key, progress] of Object.entries(i.puzzles)) {
          const [roomId, investigationId] = key.split(":");
          const content = LOCATION_PACKAGES[roomId]?.content;
          const inv = content?.investigations.find(
            (v) => v.id === investigationId,
          );
          const puzzle = content?.puzzles.find((v) => v.id === inv?.puzzleId);
          if (
            !puzzle ||
            !Array.isArray(progress.inputs) ||
            typeof progress.solved !== "boolean" ||
            progress.inputs.length > puzzle.answer.length ||
            !progress.inputs.every((v, j) => v === puzzle.answer[j]) ||
            (progress.solved && progress.inputs.length !== puzzle.answer.length)
          )
            throw new Error("Invalid saved puzzle progress");
        }
        if (c.completed && !c.ending)
          throw new Error("Completed save lacks ending");
        return value;
      }
      function aggregate() {
        const d = snapshot().domains;
        return {
          schema: CONTENT_VERSION,
          ...d.campaign,
          ...d.threat,
          inventory: d.inventory.items,
          knowledge: d.investigation.knowledge,
          flags: d.narrative.flags,
          rooms: Object.fromEntries(
            d.campaign.visited.map((id) => [
              id,
              {
                solved: d.investigation.rooms[id]?.solved ?? false,
                choice: d.narrative.choices[id] ?? null,
                seen: d.investigation.rooms[id]?.seen ?? [],
              },
            ]),
          ),
          history: d.investigation.history,
          // Legacy shape is a read-only projection, never authoritative.
          ...{ visited: undefined, objectives: undefined },
        };
      }
      return {
        snapshot,
        validate,
        aggregate() {
          const s = aggregate();
          delete s.visited;
          delete s.objectives;
          return s;
        },
        restore(payload) {
          const p = validate(payload);
          for (const name of names) owners[name].restore(p.domains[name]);
        },
        reset() {
          for (const name of names) owners[name].reset();
        },
      };
    },
  });
}
