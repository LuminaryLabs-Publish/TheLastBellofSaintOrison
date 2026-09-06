export const manifest = {
  id: "location-town-square",
  kind: "location",
  version: "1.0.0",
  locationId: "town-square",
  requires: [
    "orison:investigation",
    "orison:inventory",
    "orison:narrative",
    "orison:threat",
    "orison:campaign",
  ],
  provides: ["orison:location:town-square"],
  status: "implemented",
};
