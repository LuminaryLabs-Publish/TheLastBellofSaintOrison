export const operations = {
  use(s, p) {
    if (!s.items.includes(p.id) || p.id !== p.requiredItem)
      throw new Error("Item does not operate target");
    if (p.consume) s.items = s.items.filter((id) => id !== p.id);
    s.uses[p.targetId] = p.id;
    return { used: p.id, target: p.targetId };
  },
};
