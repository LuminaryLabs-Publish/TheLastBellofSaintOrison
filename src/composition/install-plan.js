export function orderKits(kits, available = []) {
  const seen = new Set(),
    tokens = new Set(available),
    pending = [...kits],
    ordered = [];
  for (const kit of kits) {
    if (seen.has(kit.id)) throw new Error("Duplicate Kit: " + kit.id);
    seen.add(kit.id);
  }
  while (pending.length) {
    const i = pending.findIndex((k) =>
      (k.requires ?? []).every((t) => tokens.has(t)),
    );
    if (i < 0)
      throw new Error(
        "Missing or cyclic Kit dependencies: " +
          pending.map((k) => k.id).join(", "),
      );
    const [kit] = pending.splice(i, 1);
    ordered.push(kit);
    for (const t of kit.provides ?? []) tokens.add(t);
  }
  return ordered;
}
