export const manifest = {
  id: "location-school-hall",
  kind: "location",
  version: "1.0.0",
  locationId: "school-hall",
  requires: [
    "orison:investigation",
    "orison:inventory",
    "orison:narrative",
    "orison:threat",
    "orison:campaign",
  ],
  provides: ["orison:location:school-hall"],
  status: "implemented",
};
