export const operations = {
  advance(s, p) {
    if (
      !Number.isFinite(p.delta) ||
      p.delta < 0 ||
      p.delta > 1 ||
      !Number.isFinite(p.rate) ||
      p.rate < 0
    )
      throw new Error("Invalid fixed pressure step");
    s.elapsed += p.delta;
    s.exposure += p.limit ? p.delta * p.rate : 0;
    return { exposure: s.exposure };
  },
  clear(s) {
    s.exposure = 0;
    return { exposure: 0 };
  },
};
