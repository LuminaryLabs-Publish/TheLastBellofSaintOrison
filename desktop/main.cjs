const { app, BrowserWindow, ipcMain, protocol, net } = require("electron");
const path = require("node:path");
const { pathToFileURL } = require("node:url");
// Stable app origin keeps Chromium storage in Electron's per-user application data.
protocol.registerSchemesAsPrivileged([
  {
    scheme: "orison",
    privileges: { standard: true, secure: true, supportFetchAPI: true },
  },
]);
let window;
app.whenReady().then(() => {
  protocol.handle("orison", (request) => {
    const url = new URL(request.url),
      relative = decodeURIComponent(url.pathname).replace(/^\/+/, ""),
      root = path.resolve(__dirname, "../dist");
    const file = path.resolve(root, relative || "index.html");
    if (url.host !== "game" || !file.startsWith(root + path.sep))
      return new Response("Forbidden", { status: 403 });
    return net.fetch(pathToFileURL(file).toString());
  });
  window = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 960,
    minHeight: 600,
    backgroundColor: "#081419",
    autoHideMenuBar: true,
    title: "The Last Bell of Saint Orison",
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });
  window.webContents.setWindowOpenHandler(() => ({ action: "deny" }));
  window.webContents.on("will-navigate", (event, url) => {
    if (new URL(url).protocol !== "orison:" || new URL(url).hostname !== "game")
      event.preventDefault();
  });
  window.webContents.session.setPermissionRequestHandler(
    (_contents, _permission, callback) => callback(false),
  );
  ipcMain.handle("orison:quit", (event) => {
    if (event.sender === window.webContents) app.quit();
  });
  ipcMain.handle("orison:fullscreen", (event) => {
    if (event.sender === window.webContents)
      window.setFullScreen(!window.isFullScreen());
  });
  window.loadURL("orison://game/index.html");
});
app.on("window-all-closed", () => app.quit());
