// Exercise the real browser entry point, then the shipped production bundle.
import { spawn } from "node:child_process";
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function withServer(args, port, review, env = {}) {
  const server = spawn(
    process.execPath,
    [
      "node_modules/vite/bin/vite.js",
      ...args,
      "--host",
      "127.0.0.1",
      "--port",
      String(port),
      "--strictPort",
    ],
    { stdio: "inherit" },
  );
  try {
    const deadline = Date.now() + 30000;
    while (true) {
      if (server.exitCode !== null)
        throw new Error("Vite exited before it was ready");
      try {
        if ((await fetch(`http://127.0.0.1:${port}/`)).ok) break;
      } catch {}
      if (Date.now() > deadline) throw new Error("Vite startup timed out");
      await delay(200);
    }
    const child = spawn(process.execPath, [review], {
      stdio: "inherit",
      env: { ...process.env, ...env },
    });
    const code = await new Promise((resolve, reject) => {
      child.on("error", reject);
      child.on("exit", resolve);
    });
    if (code !== 0) throw new Error(`${review} failed (${code})`);
  } finally {
    server.kill("SIGTERM");
    await new Promise((resolve) => {
      if (server.exitCode !== null) resolve();
      else server.once("exit", resolve);
    });
  }
}
await withServer([], 5173, "tools/review/browser.mjs");
await withServer([], 5173, "tools/review/browser.mjs", {
  ORISON_FORCE_CANVAS: "1",
});
await withServer(["preview"], 4173, "tools/review/production.mjs");
