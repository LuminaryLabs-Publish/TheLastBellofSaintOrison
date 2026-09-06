import { manifest } from "./manifest.js";
import { defineDomainServiceKit } from "nexusengine";
import { ROOMS, ACTS, ITEMS, ENDINGS } from "../../../../content/campaign.js";
const rect = (id, x, y, w, h, fill, extra = {}) => ({
  id,
  kind: "rect",
  x,
  y,
  w,
  h,
  fill,
  ...extra,
});
const text = (id, x, y, value, size = 18, extra = {}) => ({
  id,
  kind: "text",
  x,
  y,
  text: value,
  size,
  color: "#dfded0",
  font: "sans",
  ...extra,
});
const button = (id, x, y, w, h, label, command, extra = {}) => ({
  id,
  kind: "button",
  x,
  y,
  w,
  h,
  text: label,
  command,
  ...extra,
});
export function createProjectionKit() {
  let api;
  return defineDomainServiceKit({
    ...manifest,
    id: "orison-presentation-projection",
    domain: "presentation",
    domainPath: "n:presentation:orison",
    parentDomainPath: "n:presentation",
    apiName: "orisonPresentation",
    version: "0.1.0",
    stability: "game-owned",
    systems: [
      {
        phase: "resolve",
        name: "orison-presentation",
        system() {
          api.project();
        },
      },
    ],
    createApi({ engine, world }) {
      const n = engine.n;
      api = {
        project() {
          const s = n.orison.getState(),
            u = n.ui.getState(),
            r = n.orison.getRoom(),
            rp = n.orison.getProgress(),
            elements = [];
          const { pressure } = n.orisonLocationPresentation.project();
          const add = (...e) => elements.push(...e);
          if (u.screen === "menu") {
            add(
              rect("menu-shade", 0, 0, 740, 720, "#091216e8"),
              text("eyebrow", 86, 120, "A PSYCHOLOGICAL HORROR ADVENTURE", 12, {
                spacing: 4,
                color: "#bba77d",
              }),
              text("title-a", 82, 176, "THE LAST BELL", 61, { font: "serif" }),
              text("title-b", 86, 246, "of Saint Orison", 48, {
                font: "serif",
                italic: true,
              }),
              text(
                "tagline",
                88,
                326,
                "Some things survive because nobody will name them.",
                17,
                { color: "#aeb9b5", maxWidth: 470 },
              ),
            );
            const entries = [
              ["continue", "Continue the night", { action: "continue" }],
              ["new", "Begin a new journey", { action: "new" }],
              ["load", "Load a journey", { action: "screen", screen: "load" }],
              ["settings", "Settings", { action: "settings" }],
              ["credits", "Credits", { action: "screen", screen: "credits" }],
            ];
            if (u.platform?.desktop)
              entries.push([
                "quit",
                "Quit game",
                { action: "platform", operation: "quit" },
              ]);
            entries.forEach(([id, label, command], i) =>
              add(
                button(id, 86, 401 + i * 46, 395, 39, label, command, {
                  disabled:
                    id === "continue" &&
                    !n.orison.listSaves().some((x) => x.valid),
                  style: "menu",
                }),
              ),
            );
            add(
              text(
                "menu-footer",
                88,
                687,
                "HEADPHONES RECOMMENDED     ·     MOUSE / KEYBOARD / CONTROLLER",
                11,
                { color: "#8b9995" },
              ),
            );
          } else if (u.screen === "ending") {
            const e = ENDINGS[s.ending] ?? ENDINGS.silence;
            add(
              rect("end-shade", 0, 0, 1280, 720, "#081419e5"),
              text("ending-label", 160, 100, "THE NIGHT IS OVER", 12, {
                spacing: 5,
                color: "#bba77d",
              }),
              text("ending-title", 158, 143, e.title, 55, { font: "serif" }),
              text("ending-subtitle", 160, 219, e.subtitle, 23, {
                font: "serif",
                italic: true,
              }),
              text("ending-story", 160, 278, e.text, 22, {
                maxWidth: 950,
                lineHeight: 1.6,
              }),
              text(
                "ending-consequence",
                160,
                510,
                s.flags.elianReleased
                  ? "Elian took the physical route beside you."
                  : s.flags.elianHelped
                    ? "Elian followed your verified return directions."
                    : "Elian remained on the archive line; her safety is not confirmed.",
                17,
                { maxWidth: 920, color: "#b3c5bd" },
              ),
              button(
                "ending-menu",
                160,
                585,
                310,
                50,
                "Return to the main menu",
                { action: "screen", screen: "menu" },
              ),
              button("ending-record", 492, 585, 280, 50, "Read the record", {
                action: "journal",
              }),
            );
          } else if (["new", "load"].includes(u.screen)) {
            add(
              rect("slots-bg", 0, 0, 1280, 720, "#0b161bea"),
              text(
                "slots-title",
                110,
                110,
                u.screen === "new"
                  ? "Begin a new journey"
                  : "Your saved journeys",
                45,
                { font: "serif" },
              ),
            );
            for (const slot of n.orison.listSaves()) {
              const y = 230 + slot.slot * 112;
              add(
                button(
                  "slot-" + slot.slot,
                  110,
                  y,
                  1030,
                  85,
                  "0" +
                    (slot.slot + 1) +
                    "  ·  " +
                    (slot.valid
                      ? (ROOMS.find((r) => r.id === slot.sceneId)?.name ??
                          slot.sceneId) +
                        "  —  " +
                        slot.savedAt.slice(0, 16).replace("T", " ")
                      : slot.empty
                        ? "Empty slot"
                        : "Damaged or incompatible save"),
                  {
                    action: u.screen === "new" ? "start" : "load",
                    slot: slot.slot,
                  },
                  { disabled: u.screen === "load" && !slot.valid },
                ),
              );
            }
            add(
              button("slots-back", 110, 615, 220, 45, "Back", {
                action: "screen",
                screen: "menu",
              }),
            );
          } else if (u.screen === "settings") {
            add(
              rect("settings-bg", 0, 0, 1280, 720, "#0b161bf4"),
              text("settings-title", 100, 70, "Make the night your own", 40, {
                font: "serif",
              }),
            );
            const rows = [
              [
                "Volume",
                Math.round(u.settings.volume * 100) + "%",
                { volume: Math.max(0, u.settings.volume - 0.1) },
                { volume: Math.min(1, u.settings.volume + 0.1) },
              ],
              [
                "Brightness",
                u.settings.brightness.toFixed(1),
                { brightness: u.settings.brightness - 0.1 },
                { brightness: u.settings.brightness + 0.1 },
              ],
              [
                "Text size",
                Math.round(u.settings.textScale * 100) + "%",
                { textScale: 1 },
                { textScale: 1.25 },
              ],
              [
                "Cursor size",
                u.settings.cursorScale + "×",
                { cursorScale: 1 },
                { cursorScale: 1.75 },
              ],
            ];
            rows.forEach(([label, value, minus, plus], i) => {
              const y = 170 + i * 63;
              add(
                text("setting-" + i, 100, y + 10, label, 19),
                text("value-" + i, 460, y + 10, value, 19),
                button("minus-" + i, 620, y, 65, 40, "−", {
                  action: "setting",
                  patch: minus,
                }),
                button("plus-" + i, 700, y, 65, 40, "+", {
                  action: "setting",
                  patch: plus,
                }),
              );
            });
            add(text("pressure-label", 100, 442, "Pressure", 19));
            ["standard", "gentle", "story"].forEach((p, i) =>
              add(
                button(
                  "pressure-" + p,
                  380 + i * 210,
                  429,
                  195,
                  43,
                  p.toUpperCase(),
                  { action: "setting", patch: { pressure: p } },
                  { selected: p === u.settings.pressure },
                ),
              ),
            );
            add(
              button("fullscreen", 800, 350, 300, 40, "Toggle fullscreen", {
                action: "platform",
                operation: "fullscreen",
              }),
            );
            add(
              button(
                "motion",
                100,
                505,
                430,
                44,
                "Reduced motion: " + (u.settings.reducedMotion ? "ON" : "OFF"),
                {
                  action: "setting",
                  patch: { reducedMotion: !u.settings.reducedMotion },
                },
              ),
              button(
                "captions",
                550,
                505,
                430,
                44,
                "Sound captions: " + (u.settings.captions ? "ON" : "OFF"),
                {
                  action: "setting",
                  patch: { captions: !u.settings.captions },
                },
              ),
              text(
                "settings-help",
                100,
                575,
                "Reading and menus pause pressure. Story mode removes the deadline.\nControls: click to interact · Tab / arrows to focus · Enter to select · Esc to return.",
                15,
                { maxWidth: 1050, lineHeight: 1.5, color: "#a7b8b3" },
              ),
              button("settings-back", 100, 650, 200, 42, "Back", {
                action: "back",
              }),
            );
          } else if (u.screen === "pause") {
            add(
              rect("pause-bg", 0, 0, 1280, 720, "#081419dd"),
              text("pause-title", 150, 120, "A moment of quiet", 48, {
                font: "serif",
              }),
            );
            [
              ["Resume", { action: "back" }],
              ["Save journey", { action: "save" }],
              ["Load journey", { action: "screen", screen: "load" }],
              ["Settings", { action: "settings" }],
              ["Main menu", { action: "screen", screen: "menu" }],
            ].forEach(([label, command], i) =>
              add(
                button(
                  "pause-" + i,
                  150,
                  250 + i * 65,
                  470,
                  50,
                  label,
                  command,
                ),
              ),
            );
          } else if (
            ["journal", "inventory", "map", "credits"].includes(u.screen)
          ) {
            add(
              rect("book-bg", 0, 0, 1280, 720, "#0b181df5"),
              text(
                "book-title",
                80,
                57,
                {
                  journal: "The record",
                  inventory: "Your satchel",
                  map: "Saint Orison",
                  credits: "The people behind the night",
                }[u.screen],
                43,
                { font: "serif" },
              ),
            );
            if (u.screen === "inventory") {
              s.inventory.forEach((id, i) =>
                add(
                  button(
                    "item-" + id,
                    80 + (i % 2) * 565,
                    150 + Math.floor(i / 2) * 64,
                    540,
                    54,
                    ITEMS[id].name,
                    { action: "item", id },
                  ),
                ),
              );
              if (
                s.inventory.includes("resin") &&
                s.inventory.includes("lantern")
              )
                add(
                  button(
                    "combine",
                    80,
                    565,
                    540,
                    50,
                    "Combine resin + service lantern",
                    { action: "combine" },
                  ),
                );
            }
            if (u.screen === "journal") {
              const page = u.journalPage ?? 0,
                known = s.knowledge.slice(page * 12, page * 12 + 12);
              known.forEach((k, i) => {
                const o = ROOMS.flatMap((r) => r.objects).find(
                  (o) => o.clue === k,
                );
                add(
                  button(
                    "clue-" + k,
                    80 + (i % 2) * 565,
                    145 + Math.floor(i / 2) * 67,
                    540,
                    54,
                    o?.name ?? k,
                    { action: "read-clue", id: k },
                  ),
                );
              });
              add(
                text(
                  "record-help",
                  80,
                  578,
                  "Open a recorded observation to read it again. Evidence is never consumed by a puzzle.",
                  15,
                  { color: "#a9b9b2" },
                ),
                button(
                  "journal-prev",
                  760,
                  636,
                  150,
                  42,
                  "Previous",
                  { action: "journal-page", page: page - 1 },
                  { disabled: page === 0 },
                ),
                button(
                  "journal-next",
                  940,
                  636,
                  150,
                  42,
                  "Next",
                  { action: "journal-page", page: page + 1 },
                  { disabled: (page + 1) * 12 >= s.knowledge.length },
                ),
              );
            }
            if (u.screen === "map")
              ROOMS.forEach((r, i) => {
                const known = Boolean(s.rooms[r.id]),
                  current = r.id === n.orison.getRoom().id;
                add(
                  button(
                    "map-" + r.id,
                    80 + (i % 3) * 395,
                    143 + Math.floor(i / 3) * 83,
                    367,
                    59,
                    String(i + 1).padStart(2, "0") + "  " + r.name,
                    { action: "visit", id: r.id },
                    {
                      disabled:
                        !known || current || n.orison.getFrontier() >= 12,
                      selected: current,
                    },
                  ),
                );
              });
            if (u.screen === "credits")
              add(
                text(
                  "credits-text",
                  80,
                  150,
                  "THE LAST BELL OF SAINT ORISON\nA Luminary Labs game\n\nStory adaptation: Mara and Elian’s Saint Orison manuscript\nGame production: Luminary Labs with AI-assisted implementation\nEngine: NexusEngine · LuminaryLabs-Dev · MIT\nRendering: Three.js · MIT\nEnvironment models and synthesized sound: authored for this build\n\nSaint Orison · Development edition",
                  21,
                  { maxWidth: 1050, lineHeight: 1.6 },
                ),
              );
            add(
              button("book-back", 80, 651, 230, 42, "Back", { action: "back" }),
            );
          } else {
            add(
              rect("top-shade", 0, 0, 1280, 122, "#081216bf"),
              text(
                "act",
                40,
                27,
                "ACT " +
                  ["I", "II", "III", "IV", "V"][r.act] +
                  "  /  " +
                  ACTS[r.act].toUpperCase(),
                11,
                { spacing: 2, color: "#bda87e" },
              ),
              text("room-title", 38, 48, r.name, 33, { font: "serif" }),
              text("objective", 40, 93, r.goal, 15, {
                color: "#b7c4bd",
                maxWidth: 720,
              }),
            );
            [
              ["journal", "Journal  J"],
              ["inventory", "Satchel  I"],
              ["map", "Map  M"],
              ["pause", "Pause  Esc"],
            ].forEach(([action, label], i) =>
              add(
                button(
                  "nav-" + action,
                  835 + i * 108,
                  30,
                  100,
                  35,
                  label,
                  { action },
                  { small: true },
                ),
              ),
            );
            if (u.settings.captions && pressure > 0.6)
              add(
                text(
                  "caption",
                  640,
                  153,
                  pressure > 0.85 ? r.critical : r.warning,
                  17,
                  { align: "center", maxWidth: 850, color: "#e7d9bb" },
                ),
              );
            add(
              rect("bottom-shade", 0, 534, 1280, 186, "#071218de"),
              text(
                "interaction-caption",
                40,
                552,
                u.selection
                  ? "USING " + ITEMS[u.selection].name.toUpperCase()
                  : "LOOK CLOSELY. KEEP WHAT YOU CAN PROVE.",
                11,
                { spacing: 2, color: "#b49e72" },
              ),
            );
            const objectPage = Math.min(
              u.objectPage ?? 0,
              Math.max(0, Math.ceil(r.objects.length / 4) - 1),
            );
            r.objects
              .slice(objectPage * 4, objectPage * 4 + 4)
              .forEach((o, localIndex) => {
                const i = objectPage * 4 + localIndex;
                const x = 40 + localIndex * 302;
                add(
                  button(
                    "object-" + o.id,
                    x,
                    582,
                    284,
                    56,
                    o.name,
                    { action: "inspect", id: o.id },
                    {
                      kindLabel:
                        o.kind === "puzzle"
                          ? "OPERATE"
                          : o.kind === "optional"
                            ? "INVESTIGATE"
                            : o.kind.toUpperCase(),
                      seen: rp.seen.includes(o.id),
                    },
                  ),
                  button(
                    "view-" + i,
                    x,
                    642,
                    83,
                    26,
                    "Look closer",
                    { action: "view", index: i + 1 },
                    { small: true },
                  ),
                );
              });
            if (r.objects.length > 4)
              add(
                button("object-page", 1040, 543, 190, 30, "More objects", {
                  action: "object-page",
                  page: (objectPage + 1) % Math.ceil(r.objects.length / 4),
                }),
              );
            add(
              button(
                "wide",
                40,
                682,
                130,
                26,
                "Wide view",
                { action: "view", index: 0 },
                { small: true },
              ),
              button(
                "hint",
                195,
                682,
                95,
                26,
                "A hint",
                { action: "hint" },
                { small: true },
              ),
              button(
                "retreat",
                315,
                682,
                170,
                26,
                "Take shelter",
                { action: "retreat" },
                { small: true },
              ),
            );
            add(
              rect("pressure-track", 1000, 684, 240, 3, "#4b5750"),
              rect(
                "pressure-fill",
                1000,
                684,
                240 * pressure,
                3,
                pressure > 0.85 ? "#bf8067" : "#bead85",
              ),
              text(
                "pressure-text",
                1240,
                696,
                r.pressure
                  ? u.settings.pressure === "story"
                    ? "NO DEADLINE"
                    : pressure > 0.85
                      ? "CRITICAL"
                      : pressure > 0.6
                        ? "WARNING"
                        : "STABLE"
                  : "QUIET",
                9,
                { align: "right", color: "#b7b4a4" },
              ),
            );
            if (
              ROOMS.findIndex(candidate => candidate.id === r.id) < n.orison.getFrontier() &&
              !u.panel &&
              !u.puzzle
            ) {
              add(
                button(
                  "return-current",
                  340,
                  410,
                  600,
                  55,
                  "Return to " + ROOMS[n.orison.getFrontier()].name,
                  { action: "visit", id: ROOMS[n.orison.getFrontier()].id },
                ),
              );
            } else if (rp.solved && !u.panel && !u.puzzle) {
              add(
                rect("exit-panel", 240, 209, 800, 265, "#0b191fed"),
                text("exit-title", 270, 232, "Choose your next step", 28, {
                  font: "serif",
                }),
              );
              r.choices.forEach((c, i) =>
                add(
                  button(
                    "choice-" + c.id,
                    270,
                    284 + i * 56,
                    740,
                    46,
                    c.label,
                    { action: "depart", id: c.id },
                    {
                      disabled:
                        c.ending === "witness" && !n.orison.witnessAvailable(),
                    },
                  ),
                ),
              );
            }
          }
          if (u.puzzle && u.screen === "play") {
            add(
              rect("puzzle-scrim", 0, 0, 1280, 720, "#051014aa"),
              rect("puzzle-box", 160, 139, 960, 441, "#0c1b21f8"),
              text("puzzle-title", 196, 171, r.puzzle.title, 34, {
                font: "serif",
              }),
              text("puzzle-message", 196, 233, u.puzzle.message, 19, {
                maxWidth: 875,
                lineHeight: 1.45,
              }),
              text(
                "puzzle-inputs",
                196,
                322,
                "SEQUENCE  " +
                  u.puzzle.inputs.map((i) => r.puzzle.options[i]).join("  /  "),
                13,
                { maxWidth: 875, color: "#c8b286" },
              ),
            );
            r.puzzle.options.forEach((label, i) =>
              add(
                button(
                  "answer-" + i,
                  196 + (i % 3) * 293,
                  376 + Math.floor(i / 3) * 62,
                  275,
                  49,
                  label,
                  { action: "answer", index: i },
                ),
              ),
            );
            add(
              button("puzzle-back", 196, 520, 170, 38, "Close controls", {
                action: "close",
              }),
            );
          }
          if (u.panel) {
            add(
              rect("panel-scrim", 0, 0, 1280, 720, "#041017a8"),
              rect("panel-box", 155, 102, 970, 535, "#0c1b22fa"),
              rect("panel-line", 155, 102, 970, 2, "#b6a16e"),
              text("panel-title", 192, 132, u.panel.title, 35, {
                font: "serif",
              }),
              text(
                "panel-text",
                192,
                201,
                u.panel.text,
                20 * u.settings.textScale,
                { maxWidth: 890, lineHeight: 1.5 },
              ),
            );
            add(
              button(
                "panel-close",
                192,
                580,
                210,
                42,
                u.panel.confirm || u.panel.newSlot !== undefined
                  ? "Cancel"
                  : "Continue",
                { action: "close" },
              ),
            );
            if (u.panel.confirm)
              add(
                button(
                  "confirm",
                  427,
                  580,
                  490,
                  42,
                  "Confirm this irreversible choice",
                  { action: "depart", id: u.panel.confirm, confirm: true },
                ),
              );
            if (u.panel.newSlot !== undefined)
              add(
                button(
                  "confirm-new",
                  427,
                  580,
                  490,
                  42,
                  "Replace save and begin",
                  { action: "start", slot: u.panel.newSlot, confirm: true },
                ),
              );
          }
          const saveNotice = u.saveError ?? n.orison.storageNotice();
          if (u.platform?.graphicsMode === "canvas")
            add(
              text(
                "graphics-notice",
                640,
                saveNotice ? 26 : 10,
                "Reduced graphics — all story controls remain available.",
                14,
                { align: "center", color: "#d4bd85" },
              ),
            );
          if (saveNotice)
            add(
              text("save-error", 640, 10, saveNotice, 14, {
                align: "center",
                color: "#ffb7a3",
              }),
            );
          const modalIndex = elements.findLastIndex(
            (e) => e.id === "panel-scrim" || e.id === "puzzle-scrim",
          );
          const buttons = elements
            .slice(Math.max(0, modalIndex))
            .filter((e) => e.kind === "button" && !e.disabled);
          const p = u.pointer ?? { x: 640, y: 360 };
          const active = u.focus
            ? buttons.find((b) => b.id === u.focus)
            : [...buttons]
                .reverse()
                .find(
                  (b) =>
                    p.x >= b.x &&
                    p.x <= b.x + b.w &&
                    p.y >= b.y &&
                    p.y <= b.y + b.h,
                );
          n.ui.setDescriptor("frames", "active", {
            width: 1280,
            height: 720,
            elements,
            settings: u.settings,
            cursor: {
              ...p,
              scale: u.settings.cursorScale,
              label: u.selection ? "USE" : (active?.kindLabel ?? ""),
              activeId: active?.id ?? null,
            },
            modal: Boolean(u.panel || u.puzzle),
          });
        },
        packet() {
          return {
            ...n.orisonLocationPresentation.packet(),
            ui: n.ui.getDescriptors("frames").active,
            output: n.presentationOutput.getDescriptor(),
            platform: n.ui.getState().platformRequest,
          };
        },
        dispose() {
          n.orisonLocationPresentation.dispose();
        },
      };
      return api;
    },
  });
}
