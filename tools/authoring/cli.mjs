import { args } from "./support.mjs";
const commands = [
  "create-domain",
  "create-service-kit",
  "create-location",
  "add-investigation",
  "add-asset",
  "validate-packages",
  "validate-references",
  "validate-dependencies",
  "build-catalog",
  "build-content",
  "export-design",
  "next-task",
];
const [command, ...argv] = process.argv.slice(2);
if (!command || command === "help") {
  console.log(
    "Usage: npm run author -- <command> [--input spec.json]\n" +
      commands.join("\n"),
  );
} else {
  try {
    if (!commands.includes(command))
      throw new Error("Unknown authoring command");
    const options = args(argv);
    const module = await import("./" + command + ".mjs");
    console.log(
      JSON.stringify(
        await (module.run ?? module.buildContent)(options),
        null,
        2,
      ),
    );
  } catch (e) {
    console.error(e.message);
    process.exitCode = 1;
  }
}
