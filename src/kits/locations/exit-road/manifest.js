export const manifest = {
  id: "location-exit-road",
  kind: "location",
  version: "1.0.0",
  locationId: "exit-road",
  requires: [
    "orison:investigation",
    "orison:inventory",
    "orison:narrative",
    "orison:threat",
    "orison:campaign",
  ],
  provides: ["orison:location:exit-road"],
  status: "implemented",
};
