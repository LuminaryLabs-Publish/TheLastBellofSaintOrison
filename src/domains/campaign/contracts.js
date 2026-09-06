export const contract = {
  owner: "orisonCampaign",
  queries: ["snapshot"],
  commands: ["command", "reset", "restore"],
  stateFields: [
    "started",
    "completed",
    "revision",
    "slot",
    "sequenceNumber",
    "ending",
    "visited",
    "objectives",
  ],
  result: {
    outcome: "completed",
    operation: "service.operation",
    result: "portable record",
  },
  failure: "throws before authoritative commit",
  events: "operation receipts; no global broadcast bus",
};
