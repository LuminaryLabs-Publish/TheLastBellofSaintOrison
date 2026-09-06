import { ROOMS, ITEMS } from "../../content/campaign.js";
export const inventory = () => ({
  locations: ROOMS.map((r) => r.id),
  objects: ROOMS.flatMap((r) => r.objects.map((o) => r.id + "." + o.id)),
  items: Object.keys(ITEMS),
  puzzles: ROOMS.length,
  choices: ROOMS.reduce((n, r) => n + r.choices.length, 0),
});
console.log(JSON.stringify(inventory(), null, 2));
