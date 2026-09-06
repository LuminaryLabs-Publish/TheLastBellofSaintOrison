import { manifest } from "./manifest.js";
import { defineDomainServiceKit, defineResource } from "nexusengine";
import { environment } from "../../../presentation/environment.js";
import { LOCATION_PACKAGES } from "../../../../content/campaign.js";
const Effects = defineResource("orison.presentation.effects");
const immutable = (value) => {
  if (value && typeof value === "object" && !Object.isFrozen(value)) {
    Object.values(value).forEach(immutable);
    Object.freeze(value);
  }
  return value;
};
export function createLocationPresentationKit() {
  return defineDomainServiceKit({
    ...manifest,
    id: "orison-location-presentation",
    domain: "presentation",
    domainPath: "n:presentation:orison-location",
    parentDomainPath: "n:presentation",
    apiName: "orisonLocationPresentation",
    version: "1.0.0",
    stability: "game-owned",
    resources: { Effects },
    initWorld({ world }) {
      world.setResource(Effects, {});
    },
    createApi({ engine, world }) {
      const n = engine.n;
      let currentRoom = null,
        sceneDescriptor = null;
      return {
        project() {
          const s = n.orison.getState(),
            u = n.ui.getState(),
            r = n.orison.getRoom();
          if (currentRoom !== r.id) {
            const scene = environment(
              { ...r, ...LOCATION_PACKAGES[r.id].bindings.palette },
              n.asset.getAsset(LOCATION_PACKAGES[r.id].bindings.sceneAsset),
              Object.fromEntries(
                Object.entries(LOCATION_PACKAGES[r.id].bindings.objects).map(
                  ([id, b]) => [id, n.asset.getAsset(b.assetId)],
                ),
              ),
            );
            n.graphics.setDescriptor("scenes", "active", scene);
            sceneDescriptor = immutable(
              n.graphics.getDescriptors("scenes").active,
            );
            n.camera.setDescriptor("views", "active", scene.camera);
            currentRoom = r.id;
          }
          const pressure = r.pressure
            ? Math.min(s.exposure / r.pressure, 1)
            : 0;
          const camera = sceneDescriptor.camera;
          const view = u.view ?? 0;
          const object = r.objects[view - 1];
          const x =
            object?.position?.[0] ?? [-4.2, -1.4, 1.4, 4.2][(view - 1) % 4];
          const z =
            object?.position?.[2] ??
            [0.6, -0.2, -0.2, 0.6][(view - 1) % 4] -
              Math.floor((view - 1) / 4) * 2.5;
          n.camera.setDescriptor("views", "active", {
            ...camera,
            position:
              view === 0
                ? camera.position
                : [
                    x,
                    2,
                    z +
                      (view <= 4
                        ? view === 1 || view === 4
                          ? 4.1
                          : 4.2
                        : 4.2),
                  ],
            target: view === 0 ? camera.target : [x, 1.1, z],
          });
          n.audio.setDescriptor("mix", "active", {
            id: r.id,
            enabled: s.started && u.screen === "play" && !u.suspended,
            volume: u.settings.volume,
            frequency: exteriorFrequency(r.theme),
            tension: pressure,
            cue: Math.floor(pressure * 4),
            caption: u.settings.captions
              ? pressure > 0.85
                ? r.critical
                : pressure > 0.6
                  ? r.warning
                  : ""
              : "",
          });
          world.setResource(Effects, {
            exposure: s.elapsed,
            pressure,
            brightness: u.settings.brightness,
            reducedMotion: u.settings.reducedMotion,
            ending: s.ending,
          });
          return { pressure };
        },
        packet() {
          return {
            scene: sceneDescriptor,
            camera: n.camera.getDescriptors("views").active,
            effects: structuredClone(world.getResource(Effects)),
            audio: n.audio.getDescriptors("mix").active,
          };
        },
        dispose() {
          currentRoom = null;
          sceneDescriptor = null;
        },
      };
    },
  });
}
function exteriorFrequency(theme) {
  return (
    {
      gate: 48,
      market: 57,
      square: 65,
      cafe: 73,
      chapel: 55,
      well: 37,
      tunnels: 43,
    }[theme] ?? 61
  );
}
