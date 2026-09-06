export const operations = {
  deduce(s, p) {
    if (
      !Array.isArray(p.requires) ||
      !p.requires.every((k) => s.knowledge.includes(k))
    )
      throw new Error("Missing evidence for deduction");
    s.deductions[p.id] = true;
    return { deduced: p.id };
  },
};
