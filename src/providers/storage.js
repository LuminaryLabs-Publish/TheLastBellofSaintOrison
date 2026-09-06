import { CONTENT_VERSION } from "../../content/campaign.js";
export function createStorage(backend) {
  const key = (slot) => "saint-orison.v1.slot." + slot;
  function read(slot) {
    const raw = backend.getItem(key(slot));
    if (!raw) throw new Error("This slot is empty.");
    return JSON.parse(raw);
  }
  return {
    read,
    readPrevious(slot) {
      const raw = backend.getItem(key(slot) + ".previous");
      if (!raw) throw new Error("No recoverable previous save.");
      return JSON.parse(raw);
    },
    has: (slot) => Boolean(backend.getItem(key(slot))),
    write(slot, payload) {
      if (![0, 1, 2].includes(slot)) throw new Error("Invalid save slot");
      const raw = JSON.stringify(payload);
      JSON.parse(raw);
      const previous = backend.getItem(key(slot));
      if (previous) backend.setItem(key(slot) + ".previous", previous);
      backend.setItem(key(slot), raw);
    },
    list(validate) {
      return [0, 1, 2].map((slot) => {
        let p,
          recovered = false;
        const inspect = (raw) => {
          const value = JSON.parse(raw);
          if (validate) validate(value);
          else if (value.schema !== CONTENT_VERSION || !value.game)
            throw new Error("Invalid save");
          return value;
        };
        try {
          try {
            p = inspect(backend.getItem(key(slot)));
          } catch {
            p = inspect(backend.getItem(key(slot) + ".previous"));
            recovered = true;
          }
          return {
            slot,
            valid: true,
            sceneId: p.sceneId,
            savedAt: p.savedAt ?? "",
            completed: p.game.completed,
            recovered,
          };
        } catch {
          return { slot, valid: false, empty: !backend.getItem(key(slot)) };
        }
      });
    },
    readSettings() {
      try {
        return JSON.parse(backend.getItem("saint-orison.settings")) ?? {};
      } catch {
        return {};
      }
    },
    writeSettings(s) {
      backend.setItem("saint-orison.settings", JSON.stringify(s));
    },
  };
}
export function memoryStorage() {
  const map = new Map();
  return createStorage({
    getItem: (k) => map.get(k) ?? null,
    setItem: (k, v) => map.set(k, v),
  });
}
