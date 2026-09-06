import { defineDomainServiceKit, defineResource } from "nexusengine";
import {
  ROOMS,
  ROOM_BY_ID,
  ITEMS,
  CONTENT_VERSION,
} from "../../../content/campaign.js";

export const GameState = defineResource("orison.progress");
const copy = (value) => structuredClone(value);
const initial = () => ({
  schema: CONTENT_VERSION,
  started: false,
  completed: false,
  revision: 0,
  elapsed: 0,
  exposure: 0,
  setbacks: 0,
  inventory: ["cassette"],
  knowledge: [],
  flags: {},
  rooms: {},
  ending: null,
  slot: 0,
  sequenceNumber: 0,
  history: [],
});
export const defaultSettings = {
  volume: 0.45,
  brightness: 1,
  pressure: "standard",
  textScale: 1,
  cursorScale: 1,
  reducedMotion: false,
  captions: true,
  quality: "high",
};

export function normalizeSettings(value = {}) {
  const s = {
    ...defaultSettings,
    ...(value && typeof value === "object" ? value : {}),
  };
  for (const [key, min, max] of [
    ["volume", 0, 1],
    ["brightness", 0.65, 1.5],
    ["textScale", 1, 1.3],
    ["cursorScale", 1, 2],
  ]) {
    const n = Number(s[key]);
    s[key] = Number.isFinite(n)
      ? Math.max(min, Math.min(max, n))
      : defaultSettings[key];
  }
  if (!["standard", "gentle", "story"].includes(s.pressure))
    s.pressure = "standard";
  s.reducedMotion = Boolean(s.reducedMotion);
  s.captions = s.captions !== false;
  return s;
}

export function createOrisonKit({ storage } = {}) {
  if (!storage)
    throw new Error("An explicit save-storage provider is required.");
  let api;
  return defineDomainServiceKit({
    id: "saint-orison-rules",
    domain: "simulation",
    domainPath: "n:simulation:orison",
    parentDomainPath: "n:simulation",
    apiName: "orison",
    stability: "game-owned",
    version: "0.1.0",
    provides: ["orison:rules"],
    requires: [],
    resources: { GameState },
    metadata: {
      owns: [
        "investigation progress",
        "inventory",
        "knowledge",
        "pressure",
        "story choices",
      ],
      doesNotOwn: ["scene identity", "UI state", "GPU resources"],
      product: "The Last Bell of Saint Orison",
    },
    initWorld({ world }) {
      world.setResource(GameState, initial());
    },
    systems: [
      {
        phase: "simulate",
        name: "orison-command-and-pressure",
        system() {
          api.tick(api.delta());
        },
      },
    ],
    createApi({ engine, world }) {
      const n = engine.n;
      const read = () => world.getResource(GameState);
      const room = () => ROOM_BY_ID[n.scene.getCurrentScene().id];
      const ui = () => n.ui.getState();
      const edit = (fn) => {
        const s = copy(read());
        fn(s);
        s.revision++;
        world.setResource(GameState, s);
        return s;
      };
      const panel = (title, text, extra = {}) =>
        n.ui.update({ panel: { title, text, ...extra }, puzzle: null });
      const roomProgress = () =>
        read().rooms[room().id] ?? { solved: false, choice: null, seen: [] };
      const grant = (s, id) => {
        if (id && !s.inventory.includes(id)) s.inventory.push(id);
      };
      const remember = (s, id) => {
        if (id && !s.knowledge.includes(id)) s.knowledge.push(id);
      };
      const runtime = () => n.sequence.getNodeRuntime();
      const graph = () => ({
        id: "orison-investigation",
        type: "sequence",
        completionMode: "sequence",
        driver: "event",
        children: [
          {
            id: "inspect-records",
            type: "waitForEvent",
            completionMode: "event",
            driver: "event",
            listen: ["orison.records-verified"],
          },
          {
            id: "operate",
            type: "waitForEvent",
            completionMode: "event",
            driver: "event",
            listen: ["orison.puzzle-complete"],
          },
          {
            id: "depart",
            type: "waitForEvent",
            completionMode: "event",
            driver: "event",
            listen: ["orison.departure"],
          },
        ],
      });
      function rebuildSequence() {
        const previous = runtime().getNodeState("orison-investigation");
        if (previous === "running")
          runtime().cancel("orison-investigation", {
            reason: "location-or-save-transition",
          });
        runtime().setGraph(graph());
        runtime().start("orison-investigation");
        if (room().required.every((k) => read().knowledge.includes(k)))
          n.sequence.dispatch("orison.records-verified");
        if (roomProgress().solved)
          n.sequence.dispatch("orison.puzzle-complete");
      }
      function syncObjects() {
        n.object.reset();
        for (const o of room().objects)
          n.object.register({
            id: room().id + "." + o.id,
            type: "interactive-prop",
            transform: { position: [0, 0, 0] },
            metadata: { objectId: o.id, kind: o.kind, label: o.name },
          });
        n.interaction.update({
          targets: n.object
            .list()
            .map((o) => ({ id: o.id, objectId: o.metadata.objectId })),
          lastCommand: null,
        });
      }
      function save(slot = read().slot) {
        if (!read().started) return false;
        const payload = {
          schema: CONTENT_VERSION,
          game: copy(read()),
          sceneId: room().id,
          savedAt: new Date().toISOString(),
        };
        payload.game.slot = slot;
        try {
          storage.write(slot, payload);
          edit((s) => (s.slot = slot));
          n.ui.update({ saveError: null });
          return true;
        } catch (error) {
          n.ui.update({ saveError: "Could not save: " + error.message });
          return false;
        }
      }
      function validateSave(p) {
        if (
          !p ||
          p.schema !== CONTENT_VERSION ||
          !ROOM_BY_ID[p.sceneId] ||
          p.game?.schema !== CONTENT_VERSION
        )
          throw new Error("This save is incompatible or damaged.");
        const s = p.game;
        if (
          !Array.isArray(s.inventory) ||
          s.inventory.some((id) => !ITEMS[id]) ||
          !Array.isArray(s.knowledge) ||
          s.knowledge.some((k) => typeof k !== "string") ||
          !s.rooms ||
          !s.flags ||
          !Number.isFinite(s.elapsed) ||
          !Number.isFinite(s.exposure)
        )
          throw new Error("Invalid save state.");
        if (
          typeof s.started !== "boolean" ||
          typeof s.completed !== "boolean" ||
          !Number.isSafeInteger(s.revision) ||
          !Number.isSafeInteger(s.setbacks) ||
          s.setbacks < 0 ||
          s.elapsed < 0 ||
          s.exposure < 0 ||
          !Array.isArray(s.history) ||
          !Number.isSafeInteger(s.sequenceNumber) ||
          ![0, 1, 2].includes(s.slot) ||
          Array.isArray(s.rooms) ||
          Array.isArray(s.flags) ||
          !s.rooms[p.sceneId]
        )
          throw new Error("Invalid save fields.");
        if (s.ending && !["witness", "silence", "vessel"].includes(s.ending))
          throw new Error("Invalid ending in save.");
        for (const [id, r] of Object.entries(s.rooms))
          if (
            !ROOM_BY_ID[id] ||
            typeof r.solved !== "boolean" ||
            !Array.isArray(r.seen)
          )
            throw new Error("Invalid room state.");
        return p;
      }
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
          world.setResource(GameState, copy(p.game));
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
        world.setResource(GameState, initial());
        edit((s) => {
          s.started = true;
          s.slot = slot;
          s.rooms[room().id] = { solved: false, choice: null, seen: [] };
        });
        syncObjects();
        rebuildSequence();
        n.ui.update({
          screen: "play",
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
          if (roomProgress().solved) {
            panel(r.puzzle.title, r.puzzle.success);
            return;
          }
          const missing = r.required.filter(
            (k) => !read().knowledge.includes(k),
          );
          if (missing.length) {
            panel(
              o.name,
              "You need the physical records before operating this. Inspect the marked documents in this location.",
            );
            return;
          }
          if (r.requiredItem && !read().inventory.includes(r.requiredItem)) {
            panel(o.name, "First collect " + ITEMS[r.requiredItem].name + ".");
            return;
          }
          n.ui.update({
            panel: null,
            puzzle: { inputs: [], message: r.puzzle.question },
            screen: "play",
          });
          return;
        }
        edit((s) => {
          const rp = (s.rooms[r.id] ??= {
            solved: false,
            choice: null,
            seen: [],
          });
          if (!rp.seen.includes(id)) rp.seen.push(id);
          remember(s, o.clue);
          grant(s, o.item);
          if (o.flag) s.flags[o.flag] = true;
          s.history.push({ room: r.id, object: id });
          s.history = s.history.slice(-150);
        });
        if (r.required.every((k) => read().knowledge.includes(k)))
          n.sequence.dispatch("orison.records-verified");
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
        const inputs = [...p.inputs, index];
        if (index !== r.puzzle.answer[inputs.length - 1]) {
          edit(
            (s) =>
              (s.exposure = Math.max(
                0,
                Math.min(s.exposure + 12, r.pressure - 1),
              )),
          );
          n.ui.update({ puzzle: { inputs: [], message: r.puzzle.wrong } });
          return;
        }
        if (inputs.length < r.puzzle.answer.length) {
          n.ui.update({
            puzzle: {
              inputs,
              message: "Accepted. Continue the documented order.",
            },
          });
          return;
        }
        n.sequence.dispatch("orison.puzzle-complete");
        if (runtime().getNodeState("operate") !== "finished")
          throw new Error("Sequence did not accept puzzle completion.");
        edit((s) => {
          s.rooms[r.id].solved = true;
          grant(s, r.reward);
        });
        panel(r.puzzle.title, r.puzzle.success);
        save();
      }
      function depart(choiceId, confirmed = false) {
        const r = room(),
          choice = r.choices.find((c) => c.id === choiceId);
        if (ROOMS.indexOf(r) < frontier()) {
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
        const before = copy(read());
        edit((s) => {
          s.rooms[r.id].choice = choice.id;
          if (choice.flag) s.flags[choice.flag] = true;
          grant(s, choice.item);
          if (choice.ending) s.ending = choice.ending;
          s.sequenceNumber++;
        });
        n.sequence.dispatch("orison.departure");
        if (runtime().getNodeState("orison-investigation") !== "finished") {
          world.setResource(GameState, before);
          throw new Error("Sequence has not authorized departure.");
        }
        const next = ROOMS[ROOMS.indexOf(r) + 1];
        if (!next) {
          edit((s) => (s.completed = true));
          n.ui.update({ screen: "ending", panel: null, puzzle: null });
          save();
          return;
        }
        n.scene.grantToken("solved:" + r.id);
        const receipt = n.scene.requestTransition({ exitId: "forward" });
        if (!receipt.accepted) {
          world.setResource(GameState, before);
          throw new Error(
            "Scene transition rejected: " + receipt.transition.reason,
          );
        }
        edit((s) => {
          s.exposure = 0;
          s.rooms[next.id] ??= { solved: false, choice: null, seen: [] };
        });
        syncObjects();
        rebuildSequence();
        n.ui.update({ view: 0, selection: null, puzzle: null, hintLevel: -1 });
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
              "Your progress has been saved to slot " + (read().slot + 1) + ".",
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
            edit((s) => {
              s.inventory = s.inventory.filter(
                (id) => !["lantern", "resin"].includes(id),
              );
              grant(s, "protectedLantern");
            });
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
        if (action === "view") {
          n.ui.update({ view: command.index, selection: null });
          return;
        }
        if (action === "hint") {
          const level = Math.min((u.hintLevel ?? -1) + 1, 2);
          n.ui.update({ hintLevel: level });
          panel("A thought to follow", room().puzzle.hints[level]);
          return;
        }
        if (action === "retreat") {
          edit((s) => {
            s.exposure = 0;
            s.setbacks++;
          });
          panel("A place to breathe", room().retreat);
          return;
        }
      }
      api = {
        delta: () => engine.clock.delta,
        getState: () => copy(read()),
        getSnapshot: () => ({
          schema: CONTENT_VERSION,
          game: copy(read()),
          sceneId: room().id,
        }),
        loadSnapshot(p) {
          validateSave(p);
          world.setResource(GameState, copy(p.game));
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
          const u = ui(),
            s = read(),
            r = room();
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
          edit((next) => {
            next.elapsed += delta;
            next.exposure += r.pressure ? delta * rate * protection : 0;
          });
          if (r.pressure && read().exposure >= r.pressure) {
            edit((next) => {
              next.exposure = 0;
              next.setbacks++;
            });
            panel(
              "Forced retreat",
              r.retreat +
                "\n\nYour recovered evidence is safe. Return when you are ready.",
            );
          }
        },
        getFrontier: frontier,
        getRoom: () => room(),
        getProgress: () => copy(roomProgress()),
        witnessAvailable,
        listSaves: () => storage.list(validateSave),
        save,
        load,
        reset: () => start(read().slot),
        dispose() {
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
