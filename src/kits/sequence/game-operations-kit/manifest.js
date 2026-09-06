export const manifest = {
  id: "orison-game-operations",
  kind: "composition",
  version: "1.0.0",
  status: "implemented",
  purpose:
    "Runs narrow synchronous operations with bounded session receipts; supplies native finite graphs.",
  requires: [
    "orison:investigation",
    "orison:inventory",
    "orison:narrative",
    "orison:campaign",
  ],
  provides: ["orison:operations"],
};
