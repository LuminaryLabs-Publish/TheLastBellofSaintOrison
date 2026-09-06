export const contract = {
  owner: "orisonInvestigation",
  queries: ["snapshot"],
  commands: ["command", "reset", "restore"],
  stateFields: ["knowledge", "rooms", "history", "deductions", "hints"],
  result: {
    outcome: "completed",
    operation: "service.operation",
    result: "portable record",
  },
  failure: "throws before authoritative commit",
  events: "operation receipts; no global broadcast bus",
};
