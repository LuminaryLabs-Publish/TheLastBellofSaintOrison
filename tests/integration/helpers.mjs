import { createGame } from "../../src/composition/game.js";
import { memoryStorage } from "../../src/providers/storage.js";
export const setup = () => createGame({ storage: memoryStorage() });
export const send = (e, c) => {
  e.n.orison.submit(c);
  e.tick(1 / 30);
};
export const start = (e) => {
  send(e, { action: "start", slot: 0 });
  send(e, { action: "close" });
};
