export const operations = {
  select(s, p) {
    if (!["witness", "silence", "vessel"].includes(p.id))
      throw new Error("Unknown ending");
    if (s.ending && s.ending !== p.id)
      throw new Error("Ending already committed");
    s.ending = p.id;
    return { ending: p.id };
  },
  finish(s) {
    if (!s.ending) throw new Error("Ending not selected");
    s.completed = true;
    return { completed: true };
  },
};
