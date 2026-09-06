const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld(
  "orisonPlatform",
  Object.freeze({
    desktop: true,
    quit: () => ipcRenderer.invoke("orison:quit"),
    toggleFullscreen: () => ipcRenderer.invoke("orison:fullscreen"),
  }),
);
