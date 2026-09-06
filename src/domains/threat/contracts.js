export const contract = {
  owner: "orisonThreat",
  queries: ["snapshot"],
  commands: ["command", "reset", "restore"],
  stateFields: ["elapsed", "exposure", "setbacks"],
  result: {
    outcome: "completed",
    operation: "service.operation",
    result: "portable record",
  },
  failure: "throws before authoritative commit",
  events: "operation receipts; no global broadcast bus",
};
