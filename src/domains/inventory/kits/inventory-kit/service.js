import { ITEMS } from "../../../../../content/campaign.js";
export const operations = {
  grant(s, p) {
    if (!ITEMS[p.id]) throw new Error("Unknown item");
    if (!s.items.includes(p.id)) s.items.push(p.id);
    return { item: p.id };
  },
};
