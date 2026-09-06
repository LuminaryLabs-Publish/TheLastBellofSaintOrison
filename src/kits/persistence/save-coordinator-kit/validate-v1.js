import {
  ROOM_BY_ID,
  ITEMS,
  CONTENT_VERSION,
} from "../../../../content/campaign.js";
export function validateSave(p) {
  if (
    !p ||
    p.schema !== CONTENT_VERSION ||
    !ROOM_BY_ID[p.sceneId] ||
    p.game?.schema !== CONTENT_VERSION
  )
    throw new Error("This save is incompatible or damaged.");
  const s = p.game;
  if (
    !Array.isArray(s.inventory) ||
    s.inventory.some((id) => !ITEMS[id]) ||
    !Array.isArray(s.knowledge) ||
    s.knowledge.some((k) => typeof k !== "string") ||
    !s.rooms ||
    !s.flags ||
    !Number.isFinite(s.elapsed) ||
    !Number.isFinite(s.exposure)
  )
    throw new Error("Invalid save state.");
  if (
    typeof s.started !== "boolean" ||
    typeof s.completed !== "boolean" ||
    !Number.isSafeInteger(s.revision) ||
    !Number.isSafeInteger(s.setbacks) ||
    s.setbacks < 0 ||
    s.elapsed < 0 ||
    s.exposure < 0 ||
    !Array.isArray(s.history) ||
    !Number.isSafeInteger(s.sequenceNumber) ||
    ![0, 1, 2].includes(s.slot) ||
    Array.isArray(s.rooms) ||
    Array.isArray(s.flags) ||
    !s.rooms[p.sceneId]
  )
    throw new Error("Invalid save fields.");
  if (s.ending && !["witness", "silence", "vessel"].includes(s.ending))
    throw new Error("Invalid ending in save.");
  for (const [id, r] of Object.entries(s.rooms))
    if (
      !ROOM_BY_ID[id] ||
      typeof r.solved !== "boolean" ||
      !Array.isArray(r.seen)
    )
      throw new Error("Invalid room state.");
  return p;
}
