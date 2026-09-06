export function enterLocation(n, location) {
  n.object.reset();
  for (const o of location.objects)
    n.object.register({
      id: location.id + "." + o.id,
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
export function leaveLocation(n) {
  n.object.reset();
  n.interaction.update({ targets: [], lastCommand: null });
}
export function bindLocation(n, location) {
  return Object.freeze({
    definition: () => structuredClone(location),
    enter: () => enterLocation(n, location),
    leave: () => leaveLocation(n),
  });
}
