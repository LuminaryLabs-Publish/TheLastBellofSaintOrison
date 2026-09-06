export const manifest = {
  id: "orison-player-actions",
  kind: "composition",
  version: "1.0.0",
  status: "implemented",
  purpose:
    "Routes bounded semantic commands to owner operations; owns no progress resource.",
  requires: [
    "orison:investigation",
    "orison:inventory",
    "orison:narrative",
    "orison:threat",
    "orison:campaign",
    "orison:save",
    "orison:operations",
  ],
  provides: ["orison:rules"],
};
