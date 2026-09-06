export const manifest = {
  id: "location-parish-house",
  kind: "location",
  version: "1.0.0",
  locationId: "parish-house",
  requires: [
    "orison:investigation",
    "orison:inventory",
    "orison:narrative",
    "orison:threat",
    "orison:campaign",
  ],
  provides: ["orison:location:parish-house"],
  status: "implemented",
};
