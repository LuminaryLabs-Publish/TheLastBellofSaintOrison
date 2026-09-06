import { createGame } from "./composition/game.js";
import { createStorage } from "./providers/storage.js";
import { createGraphicsProvider } from "./providers/graphics.js";
import { createAudioProvider } from "./providers/audio.js";
import { attachBrowserHost } from "./host/browser.js";
const engine = createGame({
  storage: createStorage(localStorage),
  platform: { desktop: Boolean(window.orisonPlatform?.desktop) },
});
const graphics = createGraphicsProvider(
  document.querySelector("#scene"),
  document.querySelector("#interface"),
);
const stop = attachBrowserHost({
  engine,
  graphics,
  audio: createAudioProvider(),
  surface: document.querySelector("#interface"),
  review: import.meta.env.DEV,
});
if (import.meta.hot) import.meta.hot.dispose(stop);
