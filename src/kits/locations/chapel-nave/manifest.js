export const manifest = {
  id: "location-chapel-nave",
  kind: "location",
  version: "1.0.0",
  locationId: "chapel-nave",
  requires: [
    "orison:investigation",
    "orison:inventory",
    "orison:narrative",
    "orison:threat",
    "orison:campaign",
  ],
  provides: ["orison:location:chapel-nave"],
  status: "implemented",
};
