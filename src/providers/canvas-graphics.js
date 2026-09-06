import * as THREE from "three";
import { createGraphicsAdapterBoundary } from "nexusengine/domains/presentation/graphics";
import { buildScene } from "./three-scene.js";
import { drawUI } from "./canvas-ui.js";

// Reduced graphics consume the same scene and camera packets as WebGL.
// This painter has no gameplay state, alternate clues, or progress authority.
export function createCanvasGraphicsProvider(
  surface,
  interfaceSurface,
  { canvasFactory } = {},
) {
  const ctx = surface.getContext("2d");
  if (!ctx) throw new Error("This browser cannot provide a drawing surface.");
  const raycaster = new THREE.Raycaster();
  let current = null,
    sourceId = null,
    cacheKey = null,
    frames = 0,
    polygons = 0;
  function nearClip(points, near) {
    const output = [];
    for (let i = 0; i < points.length; i++) {
      const a = points[i],
        b = points[(i + 1) % points.length];
      const insideA = a.z <= -near,
        insideB = b.z <= -near;
      if (insideA) output.push(a);
      if (insideA !== insideB)
        output.push(a.clone().lerp(b, (-near - a.z) / (b.z - a.z)));
    }
    return output;
  }
  function paint(packet, w, h) {
    const camera = current.camera;
    current.scene.updateMatrixWorld(true);
    camera.updateMatrixWorld(true);
    const faces = [],
      world = new THREE.Matrix4(),
      view = new THREE.Matrix4();
    const instance = new THREE.Matrix4(),
      a = new THREE.Vector3(),
      b = new THREE.Vector3(),
      c = new THREE.Vector3();
    const fog = new THREE.Color(packet.scene.fog.color);
    current.scene.traverse((mesh) => {
      if (!mesh.isMesh || mesh.material.map) return; // Labels remain available through the action cards.
      const geometry = mesh.geometry,
        positions = geometry.attributes.position,
        index = geometry.index;
      const count = index ? index.count : positions.count;
      for (let n = 0; n < (mesh.isInstancedMesh ? mesh.count : 1); n++) {
        if (mesh.isInstancedMesh) {
          mesh.getMatrixAt(n, instance);
          world.multiplyMatrices(mesh.matrixWorld, instance);
        } else world.copy(mesh.matrixWorld);
        view.multiplyMatrices(camera.matrixWorldInverse, world);
        for (let i = 0; i < count; i += 3) {
          a.fromBufferAttribute(
            positions,
            index ? index.getX(i) : i,
          ).applyMatrix4(view);
          b.fromBufferAttribute(
            positions,
            index ? index.getX(i + 1) : i + 1,
          ).applyMatrix4(view);
          c.fromBufferAttribute(
            positions,
            index ? index.getX(i + 2) : i + 2,
          ).applyMatrix4(view);
          const points = nearClip(
            [a.clone(), b.clone(), c.clone()],
            camera.near,
          );
          if (points.length < 3) continue;
          const depth =
            -points.reduce((sum, p) => sum + p.z, 0) / points.length;
          if (depth > camera.far) continue;
          const normal = new THREE.Vector3()
            .subVectors(b, a)
            .cross(new THREE.Vector3().subVectors(c, a))
            .normalize();
          const projected = points.map((p) => {
            p.applyMatrix4(camera.projectionMatrix);
            return [((p.x + 1) * w) / 2, ((1 - p.y) * h) / 2];
          });
          if (
            projected.every((p) => p[0] < 0) ||
            projected.every((p) => p[0] > w) ||
            projected.every((p) => p[1] < 0) ||
            projected.every((p) => p[1] > h)
          )
            continue;
          const material = mesh.material;
          const color = material.color
            .clone()
            .multiplyScalar(
              0.5 + 0.35 * Math.abs(normal.y) + 0.15 * Math.abs(normal.z),
            );
          if (material.emissive)
            color.add(
              material.emissive
                .clone()
                .multiplyScalar(material.emissiveIntensity ?? 0),
            );
          color.lerp(
            fog,
            THREE.MathUtils.clamp(
              (depth - current.scene.fog.near) /
                (current.scene.fog.far - current.scene.fog.near),
              0,
              0.95,
            ),
          );
          color.multiplyScalar(
            packet.effects.brightness * (1 - packet.effects.pressure * 0.22),
          );
          faces.push({ points: projected, depth, color: color.getStyle() });
        }
      }
    });
    faces.sort((a, b) => b.depth - a.depth);
    ctx.fillStyle = packet.scene.background;
    ctx.fillRect(0, 0, w, h);
    for (const face of faces) {
      ctx.beginPath();
      ctx.moveTo(...face.points[0]);
      for (const p of face.points.slice(1)) ctx.lineTo(...p);
      ctx.closePath();
      ctx.fillStyle = face.color;
      ctx.fill();
    }
    polygons = faces.length;
  }
  const provider = createGraphicsAdapterBoundary({
    id: "orison-canvas-provider",
    kind: "canvas-software",
    capabilities: {},
    render(packet) {
      if (sourceId !== packet.scene.id) {
        current?.dispose();
        current = buildScene(packet.scene, { canvasFactory });
        sourceId = packet.scene.id;
        cacheKey = null;
      }
      const w = packet.output.render.pixelWidth,
        h = packet.output.render.pixelHeight;
      if (surface.width !== w || surface.height !== h) {
        surface.width = w;
        surface.height = h;
        interfaceSurface.width = w;
        interfaceSurface.height = h;
        cacheKey = null;
      }
      if (interfaceSurface.width !== w || interfaceSurface.height !== h) {
        interfaceSurface.width = w;
        interfaceSurface.height = h;
      }
      current.camera.aspect = packet.output.cameraAspect;
      current.camera.fov = packet.camera.fov;
      current.camera.position.fromArray(packet.camera.position);
      current.camera.lookAt(...packet.camera.target);
      current.camera.updateProjectionMatrix();
      // Static view cache avoids redrawing thousands of faces at every root tick.
      // Continuous model motion is omitted in this quality tier; pressure remains authoritative.
      const key = JSON.stringify([
        sourceId,
        packet.camera,
        w,
        h,
        Math.floor(packet.effects.pressure * 20),
        packet.effects.brightness,
      ]);
      if (key !== cacheKey) {
        current.update(packet.effects);
        paint(packet, w, h);
        cacheKey = key;
      }
      drawUI(interfaceSurface, packet.ui);
      return provider.createFrameReceipt({
        frame: ++frames,
        metadata: { scene: sourceId, mode: "canvas", polygons },
      });
    },
    dispose() {
      current?.dispose();
      current = null;
      sourceId = null;
      cacheKey = null;
      ctx.clearRect(0, 0, surface.width, surface.height);
    },
  });
  return {
    mode: "canvas",
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
      mode: "canvas",
      frames,
      polygons,
      objects: current?.scene.children.length ?? 0,
      geometries: current
        ? new Set(
            current.scene.children
              .filter((x) => x.geometry)
              .map((x) => x.geometry),
          ).size
        : 0,
      textures: 0,
    }),
  };
}
