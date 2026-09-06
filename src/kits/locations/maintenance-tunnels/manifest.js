export const manifest = {
  id: "location-maintenance-tunnels",
  kind: "location",
  version: "1.0.0",
  locationId: "maintenance-tunnels",
  requires: [
    "orison:investigation",
    "orison:inventory",
    "orison:narrative",
    "orison:threat",
    "orison:campaign",
  ],
  provides: ["orison:location:maintenance-tunnels"],
  status: "implemented",
};
