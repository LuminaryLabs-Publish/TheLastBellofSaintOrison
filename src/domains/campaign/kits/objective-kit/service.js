export const operations = {
  enter(s, p) {
    if (!s.visited.includes(p.roomId)) s.visited.push(p.roomId);
    return { roomId: p.roomId };
  },
  complete(s, p) {
    s.objectives[p.id] = true;
    return { objective: p.id };
  },
  bump(s) {
    s.revision++;
    return { revision: s.revision };
  },
};
