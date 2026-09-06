export const manifest = {
  id: "location-town-gate",
  kind: "location",
  version: "1.0.0",
  locationId: "town-gate",
  requires: [
    "orison:investigation",
    "orison:inventory",
    "orison:narrative",
    "orison:threat",
    "orison:campaign",
  ],
  provides: ["orison:location:town-gate"],
  status: "implemented",
};
