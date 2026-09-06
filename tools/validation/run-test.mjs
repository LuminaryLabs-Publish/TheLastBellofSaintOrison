import { spawnSync } from "node:child_process";
export function run(files) {
  const result = spawnSync(process.execPath, ["--test", ...files], {
    stdio: "inherit",
  });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}
