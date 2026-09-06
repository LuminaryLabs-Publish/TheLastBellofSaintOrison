import * as THREE from "three";
// Generic scene packet consumer. No game state or room rules enter this provider.
export function buildScene(descriptor, { canvasFactory } = {}) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(descriptor.background);
  scene.fog = new THREE.Fog(
    descriptor.fog.color,
    descriptor.fog.near,
    descriptor.fog.far,
  );
  const geometry = new Map(),
    materials = new Map(),
    textures = [],
    animated = [],
    batches = new Map();
  const geo = (shape) => {
    if (!geometry.has(shape))
      geometry.set(
        shape,
        shape === "cylinder"
          ? new THREE.CylinderGeometry(0.5, 0.5, 1, 16)
          : shape === "sphere"
            ? new THREE.SphereGeometry(0.5, 16, 12)
            : shape === "torus"
              ? new THREE.TorusGeometry(0.5, 0.035, 8, 40)
              : shape === "roof"
                ? new THREE.ConeGeometry(0.71, 1, 4)
                : new THREE.BoxGeometry(1, 1, 1),
      );
    return geometry.get(shape);
  };
  const transform = (object, d) => {
    object.position.fromArray(d.position);
    object.scale.fromArray(d.scale);
    if (d.rotation) object.rotation.fromArray(d.rotation);
    if (d.shape === "roof") object.rotation.y += Math.PI / 4;
    object.updateMatrix();
  };
  for (const d of descriptor.shapes) {
    const key = [
      d.color,
      d.roughness,
      d.metalness,
      d.emissive,
      d.emissiveIntensity,
    ].join("|");
    if (!materials.has(key))
      materials.set(
        key,
        new THREE.MeshStandardMaterial({
          color: d.color,
          roughness: d.roughness ?? 0.8,
          metalness: d.metalness ?? 0.08,
          emissive: d.emissive ?? "#000000",
          emissiveIntensity: d.emissiveIntensity ?? 0,
        }),
      );
    if (!d.objectId && !d.motion) {
      const batchKey = d.shape + "|" + key;
      if (!batches.has(batchKey))
        batches.set(batchKey, {
          geometry: geo(d.shape),
          material: materials.get(key),
          items: [],
        });
      batches.get(batchKey).items.push(d);
      continue;
    }
    const mesh = new THREE.Mesh(geo(d.shape), materials.get(key));
    mesh.name = d.id;
    transform(mesh, d);
    mesh.userData.objectId = d.objectId ?? null;
    scene.add(mesh);
    if (d.motion) animated.push({ mesh, source: d });
  }
  for (const b of batches.values()) {
    const mesh = new THREE.InstancedMesh(
        b.geometry,
        b.material,
        b.items.length,
      ),
      dummy = new THREE.Object3D();
    b.items.forEach((d, i) => {
      dummy.rotation.set(0, 0, 0);
      transform(dummy, d);
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
    scene.add(mesh);
  }
  const createCanvas =
    canvasFactory ??
    ((w, h) => {
      const c = document.createElement("canvas");
      c.width = w;
      c.height = h;
      return c;
    });
  for (const [i, d] of (descriptor.labels ?? []).entries()) {
    const canvas = createCanvas(1024, 128),
      ctx = canvas.getContext("2d");
    ctx.fillStyle = d.background;
    ctx.fillRect(0, 0, 1024, 128);
    ctx.font = "40px Georgia";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = d.color;
    ctx.fillText(d.text, 512, 64, 980);
    const texture = new THREE.DataTexture(
      new Uint8Array(ctx.getImageData(0, 0, 1024, 128).data),
      1024,
      128,
    );
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.flipY = true;
    texture.needsUpdate = true;
    textures.push(texture);
    const g = new THREE.PlaneGeometry(...d.size),
      m = new THREE.MeshBasicMaterial({ map: texture });
    geometry.set("label" + i, g);
    materials.set("label" + i, m);
    const mesh = new THREE.Mesh(g, m);
    mesh.position.fromArray(d.position);
    mesh.userData.objectId = d.objectId;
    scene.add(mesh);
  }
  for (const d of descriptor.lights) {
    let l;
    if (d.kind === "hemisphere")
      l = new THREE.HemisphereLight(d.sky, d.ground, d.intensity);
    else if (d.kind === "point")
      l = new THREE.PointLight(d.color, d.intensity, d.distance);
    else l = new THREE.DirectionalLight(d.color, d.intensity);
    if (d.position) l.position.fromArray(d.position);
    scene.add(l);
  }
  const camera = new THREE.PerspectiveCamera(
    descriptor.camera.fov,
    16 / 9,
    0.1,
    100,
  );
  camera.position.fromArray(descriptor.camera.position);
  camera.lookAt(...descriptor.camera.target);
  camera.updateMatrixWorld();
  return {
    scene,
    camera,
    update(effects) {
      for (const { mesh, source } of animated) {
        const m = source.motion;
        if (m.kind === "pressure-rise")
          mesh.position.y = source.position[1] + effects.pressure * m.amount;
        if (m.kind === "rotate")
          mesh.rotation[m.axis] =
            (source.rotation?.[{ x: 0, y: 1, z: 2 }[m.axis]] ?? 0) +
            (effects.reducedMotion ? 0 : effects.exposure * m.speed);
      }
      scene.fog.near = descriptor.fog.near * (1 - effects.pressure * 0.3);
      scene.fog.far = descriptor.fog.far * (1 - effects.pressure * 0.35);
    },
    dispose() {
      for (const g of geometry.values()) g.dispose();
      for (const m of materials.values()) m.dispose();
      for (const t of textures) t.dispose();
      scene.clear();
    },
  };
}
