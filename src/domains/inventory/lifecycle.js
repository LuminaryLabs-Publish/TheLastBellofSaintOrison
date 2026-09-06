export const lifecycle = Object.freeze({
  installation: "one Nexus resource",
  reset: "initialState",
  restore: "validate then replace",
  tick: "commands only",
  disposal: "engine resource lifetime; no timers or subscriptions",
});
