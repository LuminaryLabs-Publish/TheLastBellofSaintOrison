export const manifest = {
  id: "location-flooded-archive",
  kind: "location",
  version: "1.0.0",
  locationId: "flooded-archive",
  requires: [
    "orison:investigation",
    "orison:inventory",
    "orison:narrative",
    "orison:threat",
    "orison:campaign",
  ],
  provides: ["orison:location:flooded-archive"],
  status: "implemented",
};
