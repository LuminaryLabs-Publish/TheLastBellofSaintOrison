import { spawnSync } from "node:child_process";
const commands = [
  ["tools/authoring/cli.mjs", "validate-packages"],
  ["tools/authoring/cli.mjs", "validate-references"],
  ["tools/authoring/cli.mjs", "validate-dependencies"],
  ["tools/authoring/build-content.mjs", "--check"],
  ["tools/validation/check-boundaries.mjs"],
];
for (const args of commands) {
  const result = spawnSync(process.execPath, args, { stdio: "inherit" });
  if (result.status !== 0) process.exit(result.status ?? 1);
}
console.log(
  "Structural production gates passed. Run npm test and browser reviews for behavior and output proof.",
);
