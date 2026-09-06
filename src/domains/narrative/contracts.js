export const contract = {
  owner: "orisonNarrative",
  queries: ["snapshot"],
  commands: ["command", "reset", "restore"],
  stateFields: ["flags", "choices", "dialogue", "relationships"],
  result: {
    outcome: "completed",
    operation: "service.operation",
    result: "portable record",
  },
  failure: "throws before authoritative commit",
  events: "operation receipts; no global broadcast bus",
};
