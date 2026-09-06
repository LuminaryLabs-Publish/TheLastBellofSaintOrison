export const operations = {
  hint(s, p) {
    const level = Math.min((s.hints[p.roomId] ?? -1) + 1, p.hints.length - 1);
    if (level < 0) throw new Error("No authored hints");
    s.hints[p.roomId] = level;
    return { level, text: p.hints[level] };
  },
};
