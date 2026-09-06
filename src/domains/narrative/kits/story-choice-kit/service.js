import { ROOM_BY_ID } from "../../../../../content/campaign.js";
export const operations = {
  choose(s, p) {
    const choice = ROOM_BY_ID[p.roomId]?.choices.find(
      (c) => c.id === p.choiceId,
    );
    if (!choice) throw new Error("Unknown story choice");
    p = { ...p, flag: choice.flag };
    if (s.choices[p.roomId] && s.choices[p.roomId] !== p.choiceId)
      throw new Error("Choice already committed");
    s.choices[p.roomId] = p.choiceId;
    if (p.flag) s.flags[p.flag] = true;
    return { choice: p.choiceId };
  },
  flag(s, p) {
    s.flags[p.id] = true;
    return { flag: p.id };
  },
};
