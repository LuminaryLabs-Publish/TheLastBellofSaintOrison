import { ROOM_BY_ID } from "../../../../../content/campaign.js";
export const operations = {
  observe(s, p) {
    const object = ROOM_BY_ID[p.roomId]?.objects.find(
      (o) => o.id === p.objectId,
    );
    if (!object) throw new Error("Unknown observation");
    p = { ...p, clue: object.clue };
    const r = (s.rooms[p.roomId] ??= { seen: [], solved: false });
    if (!r.seen.includes(p.objectId)) r.seen.push(p.objectId);
    if (p.clue && !s.knowledge.includes(p.clue)) s.knowledge.push(p.clue);
    s.history.push({ room: p.roomId, object: p.objectId });
    s.history = s.history.slice(-150);
    return { observed: p.objectId };
  },
  enter(s, p) {
    if (!ROOM_BY_ID[p.roomId]) throw new Error("Unknown location");
    s.rooms[p.roomId] ??= { seen: [], solved: false };
    return { roomId: p.roomId };
  },
};
