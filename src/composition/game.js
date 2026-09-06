import { createEngine } from "nexusengine";
import { createSceneKit, createWorldDomain } from "nexusengine/domains/world";
import { createSpatialKit } from "nexusengine/domains/spatial";
import { createSimulationKit } from "nexusengine/domains/simulation";
import { createInputKit } from "nexusengine/domains/interaction/input";
import { createInteractionKit } from "nexusengine/domains/interaction/runtime";
import { createObjectRegistryKit } from "nexusengine/domains/object/registry";
import { createAssetRegistryKit } from "nexusengine/domains/asset/registry";
import { createUIKit } from "nexusengine/domains/presentation/ui";
import { createGraphicsKit } from "nexusengine/domains/presentation/graphics";
import { createCameraKit } from "nexusengine/domains/presentation/camera";
import { createAudioKit } from "nexusengine/domains/presentation/audio";
import { createPresentationKit } from "nexusengine/domains/presentation/registry";
import { createPresentationOutputKit } from "nexusengine/domains/presentation/output";
import { ROOMS } from "../../content/campaign.js";
import { createOrisonKit, normalizeSettings } from "../game/kits/orison-kit.js";
import { createProjectionKit } from "../presentation/projection.js";

export function createGame({ storage, platform = { desktop: false } } = {}) {
  const scenes = ROOMS.map((r, i) => ({
    id: r.id,
    title: r.name,
    exits:
      i < ROOMS.length - 1
        ? [{ id: "forward", to: ROOMS[i + 1].id, requires: ["solved:" + r.id] }]
        : [],
  }));
  const engine = createEngine({
    driveSequenceNodesWithTick: false,
    sequenceNodeHistoryLimit: 100,
    kits: [
      createSpatialKit(),
      createWorldDomain({ childDomains: false }),
      createSceneKit({ scenes }),
      createInteractionKit(),
      createInputKit({ initialState: { pending: [] } }),
      createObjectRegistryKit(),
      createSimulationKit(),
      createAssetRegistryKit({
        assets: ROOMS.map((r) => ({
          id: r.id,
          kind: "procedural-scene",
          source: { kind: "inline", data: { theme: r.theme } },
          metadata: { contentVersion: 1 },
        })),
      }),
      createPresentationKit(),
      createUIKit({
        initialState: {
          platform,
          platformRequest: null,
          screen: "menu",
          view: 0,
          panel: null,
          puzzle: null,
          selection: null,
          pointer: { x: 640, y: 360 },
          focus: null,
          settings: normalizeSettings(storage.readSettings()),
        },
      }),
      createGraphicsKit(),
      createCameraKit(),
      createAudioKit(),
      createPresentationOutputKit({
        surface: { cssWidth: 1280, cssHeight: 720, pixelRatio: 1 },
        policy: { frameMode: "native" },
      }),
      createOrisonKit({ storage }),
      createProjectionKit(),
    ],
  });
  for (const [api, method] of [
    ["orison", "submit"],
    ["sequence", "dispatch"],
    ["ui", "setDescriptor"],
    ["scene", "requestTransition"],
    ["graphics", "setDescriptor"],
    ["object", "register"],
    ["asset", "getAsset"],
  ]) {
    if (typeof engine.n[api]?.[method] !== "function")
      throw new Error(
        "Required Nexus capability missing: " + api + "." + method,
      );
  }
  engine.n.orisonPresentation.project();
  return engine;
}
