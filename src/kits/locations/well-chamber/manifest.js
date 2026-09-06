export const manifest = {
  id: "location-well-chamber",
  kind: "location",
  version: "1.0.0",
  locationId: "well-chamber",
  requires: [
    "orison:investigation",
    "orison:inventory",
    "orison:narrative",
    "orison:threat",
    "orison:campaign",
  ],
  provides: ["orison:location:well-chamber"],
  status: "implemented",
};
