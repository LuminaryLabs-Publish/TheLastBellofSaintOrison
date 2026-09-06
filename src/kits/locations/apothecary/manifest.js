export const manifest = {
  id: "location-apothecary",
  kind: "location",
  version: "1.0.0",
  locationId: "apothecary",
  requires: [
    "orison:investigation",
    "orison:inventory",
    "orison:narrative",
    "orison:threat",
    "orison:campaign",
  ],
  provides: ["orison:location:apothecary"],
  status: "implemented",
};
