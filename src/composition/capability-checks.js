export function requireCapabilities(engine, requirements) {
  for (const { path, api, methods } of requirements) {
    if (
      !engine.n.path(path) ||
      !engine.n.ownerOf(path) ||
      !engine.n.api(api) ||
      methods.some((m) => typeof engine.n[api]?.[m] !== "function")
    ) {
      const error = new Error(
        "Required Nexus capability missing: " + path + " / " + api,
      );
      error.code = "NEXUS_REQUIRED_CAPABILITY_MISSING";
      throw error;
    }
  }
}
export const productCapabilities = [
  "Investigation",
  "Inventory",
  "Narrative",
  "Threat",
  "Campaign",
].map((name) => ({
  path: "n:simulation:orison-" + name.toLowerCase(),
  api: "orison" + name,
  methods: ["snapshot", "command", "restore", "reset"],
}));
