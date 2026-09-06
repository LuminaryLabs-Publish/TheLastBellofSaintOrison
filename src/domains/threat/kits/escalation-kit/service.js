export const operations = {
  penalty(s, p) {
    if (!Number.isFinite(p.limit) || p.limit < 0)
      throw new Error("Invalid pressure limit");
    s.exposure = Math.max(0, Math.min(s.exposure + 12, p.limit - 1));
    return { exposure: s.exposure };
  },
};
