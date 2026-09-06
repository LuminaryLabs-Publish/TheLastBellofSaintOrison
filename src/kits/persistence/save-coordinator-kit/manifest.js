export const manifest = {
  id: "orison-save-coordinator",
  kind: "composition",
  version: "1.0.0",
  status: "implemented",
  purpose:
    "Validates and coordinates consistent domain snapshots; imports legacy saves.",
  requires: [
    "orison:investigation",
    "orison:inventory",
    "orison:narrative",
    "orison:threat",
    "orison:campaign",
  ],
  provides: ["orison:save"],
};
