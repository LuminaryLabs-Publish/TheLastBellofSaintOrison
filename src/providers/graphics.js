import * as THREE from "three";
import { createGraphicsAdapterBoundary } from "nexusengine/domains/presentation/graphics";
import { buildScene } from "./three-scene.js";
import { drawUI } from "./canvas-ui.js";
export function createGraphicsProvider(surface, interfaceSurface) {
  const renderer = new THREE.WebGLRenderer({
    canvas: surface,
    antialias: true,
    alpha: false,
  });
  renderer.setPixelRatio(1);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  let current = null,
    sourceId = null,
    frames = 0,
    width = 0,
    height = 0;
  const raycaster = new THREE.Raycaster();
  const provider = createGraphicsAdapterBoundary({
    id: "orison-three-provider",
    kind: "three-webgl",
    capabilities: {
      maximumTextureSize: renderer.capabilities.maxTextureSize,
      reflectionTechniques: [],
    },
    render(packet) {
      if (sourceId !== packet.scene.id) {
        current?.dispose();
        current = buildScene(packet.scene);
        sourceId = packet.scene.id;
      }
      const w = packet.output.render.pixelWidth,
        h = packet.output.render.pixelHeight;
      if (w !== width || h !== height) {
        renderer.setSize(w, h, false);
        interfaceSurface.width = w;
        interfaceSurface.height = h;
        width = w;
        height = h;
      }
      current.camera.aspect = packet.output.cameraAspect;
      current.camera.fov = packet.camera.fov;
      current.camera.position.fromArray(packet.camera.position);
      current.camera.lookAt(...packet.camera.target);
      current.camera.updateProjectionMatrix();
      renderer.toneMappingExposure =
        packet.effects.brightness * (1 - packet.effects.pressure * 0.22);
      current.scene.fog.near =
        packet.scene.fog.near * (1 - packet.effects.pressure * 0.3);
      current.scene.fog.far =
        packet.scene.fog.far * (1 - packet.effects.pressure * 0.35);
      current.update(packet.effects);
      renderer.render(current.scene, current.camera);
      drawUI(interfaceSurface, packet.ui);
      frames++;
      return provider.createFrameReceipt({
        frame: frames,
        metadata: {
          scene: sourceId,
          calls: renderer.info.render.calls,
          triangles: renderer.info.render.triangles,
          geometries: renderer.info.memory.geometries,
        },
      });
    },
    dispose() {
      current?.dispose();
      renderer.dispose();
      sourceId = null;
      current = null;
    },
  });
  return {
    render: provider.render,
    dispose: provider.dispose,
    pick(x, y) {
      if (!current) return null;
      raycaster.setFromCamera(
        new THREE.Vector2(x * 2 - 1, 1 - y * 2),
        current.camera,
      );
      return (
        raycaster.intersectObjects(current.scene.children)[0]?.object.userData
          .objectId ?? null
      );
    },
    stats: () => ({
      frames,
      objects: current?.scene.children.length ?? 0,
      geometries: renderer.info.memory.geometries,
      textures: renderer.info.memory.textures,
    }),
  };
}
