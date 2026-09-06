export const operations = {
  relate(s, p) {
    if (typeof p.value !== "boolean" && typeof p.value !== "string")
      throw new Error("Relationship fact must be portable");
    s.relationships[p.id] = p.value;
    return { relationship: p.id };
  },
};
