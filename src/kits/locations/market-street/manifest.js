export const manifest = {
  id: "location-market-street",
  kind: "location",
  version: "1.0.0",
  locationId: "market-street",
  requires: [
    "orison:investigation",
    "orison:inventory",
    "orison:narrative",
    "orison:threat",
    "orison:campaign",
  ],
  provides: ["orison:location:market-street"],
  status: "implemented",
};
