import { manifest } from "./manifest.js";
import { normalizeSettings } from "../../presentation/game-interface-kit/settings.js";
import { defineDomainServiceKit } from "nexusengine";
import {
  ROOMS,
  ROOM_BY_ID,
  ITEMS,
  CONTENT_VERSION,
  LOCATION_PACKAGES,
} from "../../../../content/campaign.js";

const copy = (value) => structuredClone(value);
export function createPlayerActionsKit({ storage } = {}) {
  if (!storage)
    throw new Error("An explicit save-storage provider is required.");
  let api;
  return defineDomainServiceKit({
    ...manifest,
    id: "orison-player-actions",
    domain: "simulation",
    domainPath: "n:simulation:orison",
    parentDomainPath: "n:simulation",
    apiName: "orison",
    stability: "game-owned",
    version: "0.1.0",
    provides: ["orison:rules"],
    requires: [
      "orison:investigation",
      "orison:inventory",
      "orison:narrative",
      "orison:threat",
      "orison:campaign",
      "orison:save",
      "orison:operations",
    ],
    metadata: {
      owns: ["bounded semantic command routing"],
      doesNotOwn: ["scene identity", "UI state", "GPU resources"],
      product: "The Last Bell of Saint Orison",
    },
    systems: [
      {
        phase: "input",
        name: "orison-command-and-pressure",
        system() {
          api.tick(api.delta());
        },
      },
    ],
    createApi({ engine, world }) {
      const n = engine.n;
      const read = () => n.orisonSave.aggregate();
      const bump = () => n.orisonCampaignObjective.bump();
      const room = () => {
        const base = ROOM_BY_ID[n.scene.getCurrentScene().id];
        const selected = n.ui.getState().puzzle?.investigationId;
        if (!selected || selected === "primary") return base;
        const c = LOCATION_PACKAGES[base.id].content,
          inv = c.investigations.find((i) => i.id === selected);
        if (!inv) throw new Error("Unknown selected investigation");
        return {
          ...base,
          puzzle: c.puzzles.find((p) => p.id === inv.puzzleId),
        };
      };
      const ui = () => n.ui.getState();
      const panel = (title, text, extra = {}) =>
        n.ui.update({ panel: { title, text, ...extra }, puzzle: null });
      const roomProgress = () =>
        read().rooms[room().id] ?? { solved: false, choice: null, seen: [] };
      const grant = (id) => {
        if (id) n.orisonInventoryInventory.grant({ id });
      };
      const enter = (id) => {
        n.orisonInvestigationObservation.enter({ roomId: id });
        n.orisonCampaignObjective.enter({ roomId: id });
      };
      const runtime = () => n.sequence.getNodeRuntime();
      const graph = () => n.orisonOperations.graph(room().id);
      function rebuildSequence() {
        const previous = runtime().getNodeState("orison-investigation");
        if (previous === "running")
          runtime().cancel("orison-investigation", {
            reason: "location-or-save-transition",
          });
        n.orisonOperations.runPhase(room().id, "entry");
        runtime().setGraph(graph());
        runtime().start("orison-investigation");
        if (room().required.every((k) => read().knowledge.includes(k)))
          n.sequence.dispatch("orison.records-verified");
        if (roomProgress().solved)
          n.sequence.dispatch("orison.puzzle-complete");
      }
      const locationApi = () =>
        n[
          "location" +
            room()
              .id.split("-")
              .map((x) => x[0].toUpperCase() + x.slice(1))
              .join("")
        ];
      function syncObjects() {
        locationApi().enter();
      }
      function save(slot = read().slot) {
        if (!read().started) return false;
        const payload = n.orisonSave.snapshot();
        payload.domains.campaign.slot = slot;
        payload.savedAt = new Date().toISOString();
        try {
          storage.write(slot, payload);
          n.orisonCampaignCheckpoint.slot({ slot });
          bump();
          n.ui.update({ saveError: storage.notice?.() ?? null });
          return true;
        } catch (error) {
          n.ui.update({ saveError: "Could not save: " + error.message });
          return false;
        }
      }
      const validateSave = (p) => {
        n.orisonSave.validate(p);
        return p;
      };
      function load(slot) {
        try {
          let p,
            recovered = false;
          try {
            p = validateSave(storage.read(slot));
          } catch (error) {
            p = validateSave(storage.readPrevious(slot));
            recovered = true;
          }
          n.orisonSave.restore(p);
          n.orisonOperations.reset();
          n.scene.reset();
          n.scene.enterScene({ sceneId: p.sceneId });
          n.ui.update({
            screen: read().completed ? "ending" : "play",
            panel: null,
            puzzle: null,
            selection: null,
            focus: null,
            view: 0,
            saveError: recovered ? "Recovered the previous valid save." : null,
          });
          syncObjects();
          rebuildSequence();
          return true;
        } catch (error) {
          panel("Unable to load", error.message);
          return false;
        }
      }
      function start(slot = 0) {
        n.scene.reset();
        n.orisonSave.reset();
        n.orisonOperations.reset();
        n.orisonCampaignCheckpoint.start({ slot });
        enter(room().id);
        bump();
        syncObjects();
        rebuildSequence();
        n.ui.update({
          screen: "play",
          suspended: false,
          view: 0,
          selection: null,
          puzzle: null,
          focus: null,
        });
        panel(room().name, room().arrival);
        save(slot);
      }
      const frontier = () =>
        Math.max(
          0,
          ...Object.keys(read().rooms).map((id) =>
            ROOMS.findIndex((r) => r.id === id),
          ),
        );
      function visit(id) {
        const target = ROOMS.findIndex((r) => r.id === id),
          furthest = frontier();
        if (
          target < 0 ||
          !read().rooms[id] ||
          furthest >= 12 ||
          read().completed
        )
          return;
        n.scene.enterScene({ sceneId: id });
        syncObjects();
        rebuildSequence();
        n.ui.update({
          screen: "play",
          suspended: false,
          view: 0,
          selection: null,
          puzzle: null,
          hintLevel: -1,
        });
        panel(
          room().name,
          target < furthest
            ? "You return along the route you opened. Your work here remains complete; the recorded choice cannot be rewritten. You can recover observations you left behind."
            : "You return to the current investigation.",
        );
        save();
      }
      function witnessAvailable() {
        const s = read();
        return (
          s.inventory.includes("register") &&
          s.inventory.includes("archive") &&
          s.inventory.includes("relay") &&
          s.knowledge.includes("names-second-four") &&
          !s.flags.relayBroken
        );
      }
      function inspect(id) {
        const r = room(),
          o = r.objects.find((x) => x.id === id);
        if (!o) throw new Error("Unknown interaction target.");
        if (o.requiresSolved && !roomProgress().solved) {
          panel(o.name, "Locate and open the indexed record first.");
          return;
        }
        if (ui().selection) {
          if (o.use !== ui().selection) {
            panel(
              o.name,
              "That item does not operate this object. Nothing was consumed.",
            );
            n.ui.update({ selection: null });
            return;
          }
        }
        if (o.kind === "use" && ui().selection !== o.use) {
          panel(
            o.name,
            "Select " +
              ITEMS[o.use].name +
              " in your satchel, then use it here.",
          );
          return;
        }
        if (o.kind === "puzzle") {
          const investigationId = o.investigationId ?? "primary";
          const inv = LOCATION_PACKAGES[r.id].content.investigations.find(
            (i) => i.id === investigationId,
          );
          if (!inv) throw new Error("Unknown investigation binding");
          const puzzle = LOCATION_PACKAGES[r.id].content.puzzles.find(
            (p) => p.id === inv.puzzleId,
          );
          if (
            investigationId === "primary"
              ? roomProgress().solved
              : n.orisonInvestigation.snapshot().puzzles[
                  r.id + ":" + investigationId
                ]?.solved
          ) {
            panel(puzzle.title, puzzle.success);
            return;
          }
          const missing = inv.required.filter(
            (k) => !read().knowledge.includes(k),
          );
          if (missing.length) {
            panel(
              o.name,
              "You need the physical records before operating this. Inspect the marked documents in this location.",
            );
            return;
          }
          if (
            inv.requiredItem &&
            !read().inventory.includes(inv.requiredItem)
          ) {
            panel(
              o.name,
              "First collect " + ITEMS[inv.requiredItem].name + ".",
            );
            return;
          }
          n.ui.update({
            panel: null,
            puzzle: n.orisonInvestigationPuzzle.open({
              roomId: r.id,
              investigationId,
            }).result,
            screen: "play",
          });
          return;
        }
        n.orisonOperations.execute({
          operation: "observe",
          input: { roomId: r.id, objectId: id, clue: o.clue },
        });
        if (o.use)
          n.orisonInventoryItemUse.use({
            id: o.use,
            requiredItem: o.use,
            targetId: r.id + "." + id,
          });
        grant(o.item);
        if (o.flag) n.orisonNarrativeStoryChoice.flag({ id: o.flag });
        n.orisonNarrativeDialogue.passage({ id: r.id + "." + id });
        bump();
        if (r.required.every((k) => read().knowledge.includes(k))) {
          n.orisonInvestigationDeduction.deduce({
            id: r.id + ":records",
            requires: r.required,
          });
          n.sequence.dispatch("orison.records-verified");
        }
        n.ui.update({ selection: null });
        panel(o.name, o.text);
        save();
      }
      function answer(index) {
        const r = room(),
          p = ui().puzzle;
        if (
          !p ||
          !Number.isInteger(index) ||
          index < 0 ||
          index >= r.puzzle.options.length
        )
          return;
        const investigationId = p.investigationId ?? "primary";
        const result = n.orisonInvestigationPuzzle.attempt({
          roomId: r.id,
          investigationId,
          index,
        }).result;
        if (result.status !== "ready") {
          if (result.status === "wrong") {
            n.orisonThreatEscalation.penalty({ limit: r.pressure });
            bump();
          }
          n.ui.update({ puzzle: { ...p, ...result } });
          return;
        }
        if (investigationId === "primary") {
          n.sequence.dispatch("orison.puzzle-complete");
          if (runtime().getNodeState("operate") !== "finished")
            throw new Error("Sequence did not accept puzzle completion");
        }
        const solved = n.orisonInvestigationPuzzle.solve({
          roomId: r.id,
          investigationId,
        }).result;
        n.orisonCampaignObjective.complete({
          id:
            "solved:" +
            r.id +
            (investigationId === "primary" ? "" : ":" + investigationId),
        });
        grant(solved.reward);
        bump();
        panel(r.puzzle.title, r.puzzle.success);
        save();
      }
      function depart(choiceId, confirmed = false) {
        const r = room(),
          choice = r.choices.find((c) => c.id === choiceId);
        if (ROOMS.findIndex(candidate => candidate.id === r.id) < frontier()) {
          panel(
            "This choice is already recorded",
            "Return to the current investigation using the route button.",
          );
          return;
        }
        if (!choice || !roomProgress().solved) {
          panel("Before you leave", r.goal);
          return;
        }
        if (
          r.requiredExitItem &&
          !read().inventory.includes(r.requiredExitItem)
        ) {
          panel(
            "Prepare your equipment",
            "Open your satchel and combine the resin with the lantern before leaving.",
          );
          return;
        }
        if (choice.ending === "witness" && !witnessAvailable()) {
          panel(
            "Witness transmission unavailable",
            "You need the First Register, original shutoff order, relay contract, eight verified names and an intact relay. Silence and Vessel remain available.",
          );
          return;
        }
        if ((choice.ending || choice.flag === "relayBroken") && !confirmed) {
          panel("An irreversible decision", choice.text, { confirm: choiceId });
          return;
        }
        const before = n.orisonSave.snapshot();
        n.orisonNarrativeStoryChoice.choose({
          roomId: r.id,
          choiceId: choice.id,
          flag: choice.flag,
        });
        if (choice.flag?.startsWith("elian"))
          n.orisonNarrativeRelationship.relate({
            id: choice.flag,
            value: true,
          });
        grant(choice.item);
        if (choice.ending) n.orisonCampaignEnding.select({ id: choice.ending });
        n.orisonCampaignCheckpoint.depart();
        bump();
        n.sequence.dispatch("orison.departure");
        if (runtime().getNodeState("orison-investigation") !== "finished") {
          n.orisonSave.restore(before);
          throw new Error("Sequence has not authorized departure.");
        }
        n.orisonOperations.runPhase(r.id, "exit");
        const next = ROOMS[ROOMS.findIndex(candidate => candidate.id === r.id) + 1];
        if (!next) {
          n.orisonCampaignEnding.finish();
          bump();
          n.ui.update({ screen: "ending", panel: null, puzzle: null });
          save();
          return;
        }
        n.scene.grantToken("solved:" + r.id);
        const receipt = n.scene.requestTransition({ exitId: "forward" });
        if (!receipt.accepted) {
          n.orisonSave.restore(before);
          throw new Error(
            "Scene transition rejected: " + receipt.transition.reason,
          );
        }
        n.orisonThreatPressure.clear();
        enter(next.id);
        bump();
        syncObjects();
        rebuildSequence();
        n.ui.update({
          objectPage: 0,
          view: 0,
          selection: null,
          puzzle: null,
          hintLevel: -1,
        });
        panel(next.name, choice.text + "\n\n" + next.arrival);
        save();
      }
      function settings(patch) {
        const current = ui().settings;
        const next = normalizeSettings({ ...current, ...patch });
        n.ui.update({ settings: next });
        try {
          storage.writeSettings(next);
        } catch (error) {
          n.ui.update({ saveError: error.message });
        }
      }
      function handle(command) {
        const u = ui();
        if (command.type === "point") {
          n.ui.update({ pointer: { x: command.x, y: command.y }, focus: null });
          return;
        }
        if (command.type === "focus") {
          n.ui.update({ focus: command.id });
          return;
        }
        if (command.type === "suspend") {
          n.ui.update({ suspended: command.value });
          return;
        }
        if (command.type === "resize") {
          n.presentationOutput.setSurface({
            cssWidth: command.width,
            cssHeight: command.height,
            pixelRatio: 1,
          });
          return;
        }
        const action = command.action ?? command.type;
        n.interaction.update({
          lastCommand: copy(command),
          commandRevision: (n.interaction.getState().commandRevision ?? 0) + 1,
        });
        if (action === "platform") {
          if (
            ["fullscreen", "quit"].includes(command.operation) &&
            (command.operation !== "quit" || u.platform?.desktop)
          )
            n.ui.update({
              platformRequest: {
                operation: command.operation,
                id: (u.platformRequest?.id ?? 0) + 1,
              },
            });
          return;
        }
        if (action === "platform-error") {
          panel("Display change unavailable", command.message);
          return;
        }
        if (action === "screen") {
          n.ui.update({ screen: command.screen, panel: null, puzzle: null });
          return;
        }
        if (action === "new") {
          n.ui.update({ screen: "new", panel: null });
          return;
        }
        if (action === "start") {
          if (storage.has(command.slot) && !command.confirm) {
            panel(
              "Replace this save?",
              "Starting a new journey will replace the selected save.",
              { newSlot: command.slot },
            );
            return;
          }
          start(command.slot);
          return;
        }
        if (action === "load") {
          load(command.slot);
          return;
        }
        if (action === "continue") {
          const slots = storage
            .list(validateSave)
            .filter((s) => s.valid)
            .sort((a, b) => b.savedAt.localeCompare(a.savedAt));
          if (slots.length) load(slots[0].slot);
          return;
        }
        if (action === "settings") {
          n.ui.update({
            screen: "settings",
            returnScreen: u.screen === "menu" ? "menu" : "pause",
            panel: null,
            puzzle: null,
          });
          return;
        }
        if (action === "setting") {
          settings(command.patch);
          return;
        }
        if (action === "back") {
          n.ui.update({
            screen:
              u.screen === "settings"
                ? (u.returnScreen ?? "menu")
                : read().started
                  ? read().completed
                    ? "ending"
                    : "play"
                  : "menu",
            panel: null,
            puzzle: null,
            selection: null,
          });
          return;
        }
        if (action === "close") {
          n.ui.update({ panel: null, puzzle: null });
          return;
        }
        if (action === "pause") {
          n.ui.update({
            screen: u.screen === "play" ? "pause" : "play",
            panel: null,
            puzzle: null,
          });
          return;
        }
        if (action === "save") {
          if (save())
            panel(
              "Journey saved",
              storage.notice?.() ??
                "Your progress has been saved to slot " +
                  (read().slot + 1) +
                  ".",
            );
          return;
        }
        if (action === "visit") {
          visit(command.id);
          return;
        }
        if (action === "read-clue") {
          const o = ROOMS.flatMap((r) => r.objects).find(
            (o) => o.clue === command.id,
          );
          if (o && read().knowledge.includes(command.id)) panel(o.name, o.text);
          return;
        }
        if (action === "journal-page") {
          n.ui.update({
            journalPage: Math.max(
              0,
              Math.min(
                Math.ceil(read().knowledge.length / 12) - 1,
                command.page,
              ),
            ),
          });
          return;
        }
        if (
          action === "journal" ||
          action === "inventory" ||
          action === "map"
        ) {
          n.ui.update({ screen: action, panel: null, puzzle: null });
          return;
        }
        if (action === "item") {
          if (!read().inventory.includes(command.id)) return;
          n.ui.update({ screen: "play", selection: command.id });
          panel(ITEMS[command.id].name, ITEMS[command.id].text);
          return;
        }
        if (action === "combine") {
          if (
            read().inventory.includes("lantern") &&
            read().inventory.includes("resin")
          ) {
            n.orisonOperations.execute({
              operation: "combine",
              input: { id: "protected-lantern" },
            });
            bump();
            n.ui.update({ screen: "play" });
            panel(
              "A steady flame",
              "The blue resin catches without smoke. Your treated lantern slows exposure, while every warning remains meaningful.",
            );
            save();
          }
          return;
        }
        if (!read().started || read().completed || u.screen !== "play") return;
        if (action === "inspect") {
          inspect(command.id);
          return;
        }
        if (action === "answer") {
          answer(command.index);
          return;
        }
        if (action === "depart") {
          depart(command.id, command.confirm);
          return;
        }
        if (action === "object-page") {
          n.ui.update({ objectPage: command.page });
          return;
        }
        if (action === "view") {
          if (
            !Number.isInteger(command.index) ||
            command.index < 0 ||
            command.index > room().objects.length
          )
            return;
          n.ui.update({ view: command.index, selection: null });
          return;
        }
        if (action === "hint") {
          const result = n.orisonInvestigationHint.hint({
            roomId: room().id,
            hints: room().puzzle.hints,
          }).result;
          n.ui.update({ hintLevel: result.level });
          panel("A thought to follow", result.text);
          return;
        }
        if (action === "retreat") {
          n.orisonThreatRetreat.retreat();
          n.orisonOperations.runPhase(room().id, "recovery");
          rebuildSequence();
          bump();
          panel("A place to breathe", room().retreat);
          return;
        }
      }
      api = {
        delta: () => engine.clock.delta,
        getState: () => read(),
        getDomainSnapshot: () => n.orisonSave.snapshot(),
        getSnapshot: () => ({
          schema: CONTENT_VERSION,
          game: copy(read()),
          sceneId: room().id,
        }),
        loadSnapshot(p) {
          validateSave(p);
          n.orisonSave.restore(p);
          n.orisonOperations.reset();
          n.scene.enterScene({ sceneId: p.sceneId });
          syncObjects();
          rebuildSequence();
          n.ui.update({
            screen: read().completed ? "ending" : "play",
            panel: null,
            puzzle: null,
            selection: null,
          });
        },
        submit(command) {
          const pending = n.input.getState().pending ?? [];
          if (pending.length >= 64)
            throw new Error("Input queue capacity reached.");
          n.input.update({ pending: [...pending, copy(command)] });
        },
        tick(delta) {
          const pending = n.input.getState().pending ?? [];
          if (pending.length) {
            n.input.update({ pending: [] });
            for (const command of pending) handle(command);
          }
        },
        rebuildSequence,
        getFrontier: frontier,
        getRoom: () => copy(room()),
        getProgress: () => copy(roomProgress()),
        witnessAvailable,
        listSaves: () => storage.list(validateSave),
        storageNotice: () => storage.notice?.() ?? null,
        save,
        load,
        reset: () => start(read().slot),
        dispose() {
          n.ui.update({
            screen: "menu",
            suspended: true,
            puzzle: null,
            panel: null,
          });
          n.orisonOperations.reset();
          runtime().cancel("orison-investigation", { reason: "shutdown" });
          runtime().unmount("orison-investigation");
          n.input.update({ pending: [] });
          n.object.reset();
        },
      };
      return api;
    },
  });
}
