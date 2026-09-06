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
