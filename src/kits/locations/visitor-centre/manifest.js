export const manifest = {
  id: "location-visitor-centre",
  kind: "location",
  version: "1.0.0",
  locationId: "visitor-centre",
  requires: [
    "orison:investigation",
    "orison:inventory",
    "orison:narrative",
    "orison:threat",
    "orison:campaign",
  ],
  provides: ["orison:location:visitor-centre"],
  status: "implemented",
};
