export const manifest = {
  id: "location-closed-cafe",
  kind: "location",
  version: "1.0.0",
  locationId: "closed-cafe",
  requires: [
    "orison:investigation",
    "orison:inventory",
    "orison:narrative",
    "orison:threat",
    "orison:campaign",
  ],
  provides: ["orison:location:closed-cafe"],
  status: "implemented",
};
