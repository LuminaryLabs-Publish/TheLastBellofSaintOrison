import { createGame } from "./composition/game.js";
import { createBrowserStorage } from "./providers/storage.js";
import { createGraphicsProvider } from "./providers/graphics.js";
import { createAudioProvider } from "./providers/audio.js";
import { attachBrowserHost } from "./host/browser.js";
const graphics = createGraphicsProvider(
  document.querySelector("#scene"),
  document.querySelector("#interface"),
);
const engine = createGame({
  storage: createBrowserStorage(),
  platform: {
    desktop: Boolean(window.orisonPlatform?.desktop),
    graphicsMode: graphics.mode,
  },
});
const stop = attachBrowserHost({
  engine,
  graphics,
  audio: createAudioProvider(),
  surface: document.querySelector("#interface"),
  review: import.meta.env.DEV,
});
if (import.meta.hot) import.meta.hot.dispose(stop);
