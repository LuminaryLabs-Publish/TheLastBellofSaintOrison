export const manifest = {
  id: "location-return-ascent",
  kind: "location",
  version: "1.0.0",
  locationId: "return-ascent",
  requires: [
    "orison:investigation",
    "orison:inventory",
    "orison:narrative",
    "orison:threat",
    "orison:campaign",
  ],
  provides: ["orison:location:return-ascent"],
  status: "implemented",
};
