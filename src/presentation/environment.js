// Renderer-neutral scene authoring; every transform/material enters Nexus Graphics.
export function environment(room, asset, objectAssets = {}) {
  if (!asset || !asset.id)
    throw new Error("Missing canonical room asset descriptor.");
  const shapes = [],
    labels = [];
  let serial = 0;
  const add = (shape, position, scale, color, extra = {}) =>
    shapes.push({
      id: room.id + ".shape." + serial++,
      shape,
      position,
      scale,
      color,
      roughness: 0.82,
      ...extra,
    });
  const box = (p, s, c, e) => add("box", p, s, c, e);
  const cyl = (p, s, c, e) => add("cylinder", p, s, c, e);
  const sphere = (p, s, c, e) => add("sphere", p, s, c, e);
  const stone = "#455154",
    wood = "#40362e",
    iron = "#263436",
    brass = "#9e7950";
  const window = (x, y, z, w = 1.2, h = 2) => {
    box([x, y, z], [w + 0.2, h + 0.2, 0.2], iron);
    box([x, y, z + 0.13], [w, h, 0.06], room.accent, {
      emissive: room.accent,
      emissiveIntensity: 0.45,
    });
    box([x, y, z + 0.2], [0.065, h, 0.08], iron);
    box([x, y, z + 0.2], [w, 0.065, 0.08], iron);
  };
  const table = (x, z, w = 2, d = 1) => {
    box([x, 0.95, z], [w, 0.12, d], wood);
    for (const dx of [-1, 1])
      for (const dz of [-1, 1])
        box(
          [x + dx * (w / 2 - 0.15), 0.45, z + dz * (d / 2 - 0.12)],
          [0.11, 0.9, 0.11],
          wood,
        );
  };
  const shelf = (x, z, w = 2) => {
    for (const dx of [-1, 1])
      box([x + (dx * w) / 2, 1.5, z], [0.12, 3, 0.55], wood);
    for (let y = 0.35; y < 3; y += 0.55) {
      box([x, y, z], [w, 0.08, 0.6], wood);
      for (let i = 0; i < 7; i++)
        box(
          [x - w / 2 + 0.2 + (i * (w - 0.3)) / 7, y + 0.24, z],
          [0.12, 0.37 + (i % 3) * 0.035, 0.32],
          ["#655345", "#58605a", "#645b57", "#77705b"][i % 4],
        );
    }
  };
  const arch = (x, z, w = 2.5, h = 4) => {
    for (const dx of [-1, 1])
      box([x + (dx * w) / 2, h / 2, z], [0.35, h, 0.4], stone);
    for (let i = 0; i < 12; i++) {
      const a = (i / 11) * Math.PI;
      box(
        [x + (Math.cos(a) * w) / 2, h + (Math.sin(a) * w) / 2, z],
        [0.42, 0.42, 0.44],
        stone,
        { rotation: [0, 0, a] },
      );
    }
  };
  const exterior = ["gate", "market", "square"].includes(room.theme);
  box([0, -0.22, -3], [26, 0.4, 38], "#252f31", { roughness: 0.35 });
  for (let z = -18; z < 13; z += 1.1)
    for (let x = -11; x < 12; x += 1.25)
      box(
        [x + (Math.round(z) % 2) * 0.4, 0, z],
        [1.18, 0.035, 1.02],
        (Math.round(x + z) * 7) % 3 === 0 ? "#3c494b" : "#303b3d",
        { roughness: 0.45 },
      );
  if (exterior) {
    for (const side of [-1, 1])
      for (let i = 0; i < 5; i++) {
        const x = side * 9,
          z = -3 - i * 5,
          h = 5 + (i % 3);
        box(
          [x, h / 2, z],
          [5, h, 4.8],
          ["#424b4a", "#535752", "#3a494d"][i % 3],
        );
        add("roof", [x, h + 0.8, z], [5.7, 1.8, 5.1], "#283334");
        for (let k = 0; k < 2; k++)
          window(x + (k - 0.5) * 1.8, 2.7, z + 2.46, 1.1, 1.8);
        box([x, 1, z + 2.5], [1.4, 2, 0.12], wood);
        for (let yy = 1; yy < h; yy += 0.6)
          box([x, yy, z + 2.42], [5, 0.03, 0.05], "#293c3e");
      }
    box([0, 6, -17], [4, 12, 4], "#596260");
    add("roof", [0, 13, -17], [5, 3, 5], "#263638");
    window(0, 9.5, -14.92, 2, 2.6);
    cyl([0, 9.25, -14.6], [0.85, 0.9, 0.85], brass);
    for (const x of [-5.6, 5.6]) {
      cyl([x, 2, -5], [0.065, 4, 0.065], iron);
      box([x, 4.05, -5], [0.5, 0.7, 0.5], iron);
      box([x, 4.05, -4.7], [0.34, 0.46, 0.02], room.accent, {
        emissive: room.accent,
        emissiveIntensity: 2,
      });
    }
    if (room.theme === "gate") {
      for (const x of [-5, 5]) {
        box([x, 2.3, -5], [1.1, 4.6, 1.3], stone);
        sphere([x, 4.8, -5], [0.5, 0.5, 0.5], stone);
      }
      for (let x = -4.5; x < 5; x += 0.45)
        box([x, 1.7, -5], [0.065, 3.4, 0.08], iron);
      box([0, 2.5, -5], [9, 0.085, 0.1], iron);
      box([0, 0.7, -5], [9, 0.085, 0.1], iron);
      box([-6.5, 1.6, -0.2], [2.4, 3.2, 2.5], "#58615d");
      window(-6.5, 1.9, 1.1, 1.4, 1.1);
    }
    if (room.theme === "market")
      for (const x of [-4, 4])
        for (let z = -2; z > -13; z -= 4) {
          table(x, z, 2.7, 1.8);
          for (const dx of [-1.4, 1.4])
            cyl([x + dx, 1.5, z], [0.04, 3, 0.04], wood);
          box([x, 3, z], [3.2, 0.09, 2.4], x < 0 ? "#674d41" : "#3f6967", {
            rotation: [0, 0, 0.1],
          });
          for (let i = 0; i < 4; i++)
            box([x - 1 + i * 0.6, 1.2, z], [0.4, 0.4, 0.5], "#625341");
        }
    if (room.theme === "square") {
      cyl([0, 0.3, -4], [2, 0.6, 2], stone);
      cyl([0, 0.65, -4], [1.8, 0.1, 1.8], "#577575", { metalness: 0.6 });
      cyl([0, 1.35, -4], [0.4, 1.4, 0.4], stone);
    }
  } else {
    box([0, 3, -9], [17, 6, 0.45], "#4a5554");
    box([-8.5, 3, -1], [0.4, 6, 16], stone);
    box([8.5, 3, -1], [0.4, 6, 16], stone);
    box([0, 6, -2], [17, 0.3, 16], "#293a3c");
    for (const x of [-6, -3, 0, 3, 6]) {
      box([x, 3, -8.7], [0.17, 6, 0.2], wood);
      box([x, 5.8, -2], [0.18, 0.25, 14], wood);
    }
    for (const x of [-5, 5]) window(x, 3.5, -8.7, 1.7, 2.8);
    box([0, 0.1, -3], [2.9, 0.03, 10], "#55463e");
    if (["office", "house"].includes(room.theme)) {
      table(0, -4, 4, 1.8);
      shelf(-5, -7, 3);
      shelf(5, -7, 2.5);
      for (let i = 0; i < 8; i++)
        box([-0.9 + i * 0.2, 1.05, -4], [0.6, 0.035, 0.7], "#b5ae91", {
          rotation: [0, i * 0.1, 0],
        });
      box([0, 2.4, -8.4], [2.3, 1.7, 0.15], brass);
      box([0, 2.4, -8.2], [2.05, 1.45, 0.05], "#293e40");
    }
    if (room.theme === "cafe") {
      for (const x of [-4, 0, 4])
        for (const z of [-1, -5]) {
          table(x, z, 2, 1.2);
          for (const dx of [-1.4, 1.4]) {
            box([x + dx, 0.5, z], [0.7, 0.15, 0.7], wood);
            box([x + dx, 1, z + 0.3], [0.7, 1, 0.12], wood);
          }
          cyl([x, 1.08, z], [0.12, 0.18, 0.12], "#b9b7a3");
        }
      box([-6, 1.1, -5], [1.2, 2.2, 6], wood);
    }
    if (room.theme === "apothecary") {
      for (const x of [-6, -3, 3, 6]) {
        shelf(x, -7, 2);
        for (let i = 0; i < 12; i++)
          cyl(
            [x - 0.75 + (i % 4) * 0.5, 0.8 + Math.floor(i / 4) * 0.6, -6.65],
            [0.1, 0.32, 0.1],
            ["#5f8065", "#83754b", "#557d81"][i % 3],
            { metalness: 0.3 },
          );
      }
      table(0, -2, 4, 1.8);
    }
    if (room.theme === "school") {
      for (const x of [-4, -1.3, 1.3, 4])
        for (const z of [-1, -3.8, -6.6]) {
          table(x, z, 1.6, 0.9);
          box([x, 0.55, z + 1], [0.7, 0.1, 0.65], wood);
        }
      box([0, 3.2, -8.5], [5, 2.4, 0.15], wood);
      box([0, 3.2, -8.35], [4.7, 2.1, 0.05], "#23403b");
      for (let i = 0; i < 12; i++)
        box([-2 + i * 0.35, 3.1, -8.3], [0.04, 0.45, 0.01], "#b4b4a0");
    }
    if (room.theme === "archive") {
      for (const x of [-5, -2, 2, 5]) shelf(x, -5, 1.9);
      box([0, 0.14, -2], [16, 0.08, 13], "#254c54", {
        metalness: 0.65,
        roughness: 0.1,
        motion: { kind: "pressure-rise", amount: 0.65 },
      });
      table(0, 1, 3, 1.5);
      for (const x of [-7, 7]) box([x, 0.35, -2], [1.2, 0.3, 13], wood);
    }
    if (room.theme === "chapel") {
      for (const z of [-2, -4.4, -6.8])
        for (const x of [-3.5, 3.5]) {
          box([x, 0.6, z], [4, 0.15, 0.8], wood);
          box([x, 1, z - 0.4], [4, 0.85, 0.15], wood);
        }
      arch(0, -7, 4, 3.6);
      table(0, -7, 2, 1);
      for (let i = 0; i < 7; i++) {
        cyl([-1.2 + i * 0.4, 1.3, -7], [0.045, 0.5, 0.045], "#b6ad87");
        sphere([-1.2 + i * 0.4, 1.6, -7], [0.045, 0.1, 0.045], "#ffc978", {
          emissive: "#ffc978",
          emissiveIntensity: 3,
        });
      }
    }
    if (["tower", "well"].includes(room.theme)) {
      cyl([0, 0.3, -4], [3.5, 0.5, 3.5], iron);
      cyl([0, 2.5, -4], [0.7, 5, 0.7], brass);
      for (let i = 0; i < 12; i++) {
        const a = (i * Math.PI) / 6;
        box(
          [Math.cos(a) * 2.5, 1.2, -4 + Math.sin(a) * 2.5],
          [0.35, 2.2, 0.4],
          iron,
        );
        box(
          [Math.cos(a) * 1.4, 3, -4 + Math.sin(a) * 1.4],
          [0.3, 3, 0.3],
          brass,
        );
      }
      add("torus", [0, 3.7, -4], [2.5, 2.5, 2.5], brass, {
        rotation: [Math.PI / 2, 0, 0],
        motion: { kind: "rotate", axis: "z", speed: 0.18 },
      });
      if (room.theme === "well") {
        cyl([0, 0.58, -4], [2.8, 0.02, 2.8], "#080f14");
        sphere([0, 1.5, -4], [0.42, 0.7, 0.42], "#a9d0bb", {
          emissive: "#82b9a3",
          emissiveIntensity: 1.5,
        });
      }
    }
    if (room.theme === "tunnels") {
      for (let z = 2; z > -18; z -= 2) {
        arch(0, z, 5, 2.8);
        for (const x of [-3.3, 3.3])
          cyl([x, 1.7, z - 1], [0.16, 2.1, 0.16], brass, {
            rotation: [Math.PI / 2, 0, 0],
          });
      }
      box([0, 3, -9], [3.8, 5.8, 0.5], "#101d20");
    }
  }
  // Four tactile foreground props are backed by stable Object registry identities.
  room.objects.forEach((o, i) => {
    const x = o.position?.[0] ?? [-4.2, -1.4, 1.4, 4.2][i % 4],
      z =
        o.position?.[2] ??
        [0.6, -0.2, -0.2, 0.6][i % 4] - Math.floor(i / 4) * 2.5;
    if (room.theme === "gate") {
      box([x, 0.75, z], [1.4, 1.5, 0.35], stone);
    } else if (room.theme === "tunnels") {
      box([x, 0.65, z], [0.8, 1.3, 0.65], iron);
    } else if (room.theme === "well" || room.theme === "tower") {
      cyl([x, 0.5, z], [1, 0.95, 1], stone);
    } else {
      table(x, z, 1.9, 1.05);
    }
    const pick = { objectId: o.id };
    const override = objectAssets[o.id]?.source?.data?.prop;
    if (override) {
      add(override.shape, [x, 1.25, z], override.scale, override.color, {
        ...pick,
      });
    } else if (o.kind === "puzzle") {
      box([x, 1.22, z], [1.25, 0.45, 0.8], "#344a4c", pick);
      for (let j = 0; j < 4; j++)
        cyl([x - 0.42 + j * 0.28, 1.48, z], [0.08, 0.06, 0.08], brass, pick);
      box([x, 1.52, z - 0.25], [0.65, 0.02, 0.15], room.accent, {
        ...pick,
        emissive: room.accent,
        emissiveIntensity: 0.6,
      });
    } else if (o.kind === "collect" || o.kind === "use") {
      cyl([x, 1.28, z], [0.24, 0.65, 0.24], brass, pick);
      sphere([x, 1.35, z], [0.16, 0.25, 0.16], room.accent, {
        ...pick,
        emissive: room.accent,
        emissiveIntensity: 0.8,
      });
    } else {
      box([x, 1.06, z], [1.1, 0.08, 0.7], wood, pick);
      box([x, 1.12, z], [0.96, 0.025, 0.61], "#c7bea2", pick);
      for (let j = 0; j < 6; j++)
        box(
          [x, 1.135, z - 0.2 + j * 0.07],
          [0.7 - (j % 2) * 0.15, 0.005, 0.012],
          "#686356",
          pick,
        );
    }
    box([x, 0.75, z + 0.57], [1.75, 0.27, 0.025], "#28373a");
    labels.push({
      text: o.name.toUpperCase(),
      position: [x, 0.75, z + 0.59],
      size: [1.66, 0.2],
      color: "#d9c99f",
      background: "#24383a",
      objectId: o.id,
    });
  });
  labels.push({
    text: room.name.toUpperCase(),
    position: [0, 4.75, exterior ? -6 : -8.4],
    size: [4, 0.44],
    color: "#cdbb92",
    background: "#263b3b",
  });
  return {
    id: room.id,
    revision: 2,
    shapes,
    labels,
    background: "#101b20",
    fog: { color: room.tint, near: 7, far: exterior ? 39 : 24 },
    lights: [
      {
        kind: "hemisphere",
        sky: room.tint,
        ground: "#252027",
        intensity: 1.65,
      },
      {
        kind: "directional",
        color: "#a9c2c8",
        intensity: 2.1,
        position: [-4, 9, 4],
      },
      {
        kind: "point",
        color: room.accent,
        intensity: 65,
        position: [0, 3, 3],
        distance: 18,
      },
    ],
    camera: { position: [0, 2.8, 8.7], target: [0, 1.7, -4], fov: 53 },
    weather: room.weather ?? "dust",
  };
}
