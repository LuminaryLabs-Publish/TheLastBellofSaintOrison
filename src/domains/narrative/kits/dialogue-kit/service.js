export const operations = {
  passage(s, p) {
    s.dialogue[p.id] = (s.dialogue[p.id] ?? 0) + 1;
    return { passage: p.id };
  },
};
