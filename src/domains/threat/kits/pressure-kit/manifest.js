export const manifest = {
  id: "orison-threat-pressure",
  kind: "service",
  version: "1.0.0",
  domainPath: "n:simulation:orison-threat:pressure",
  parentDomainPath: "n:simulation:orison-threat",
  apiName: "orisonThreatPressure",
  requires: [
    "orison:threat",
    "orison:threat:retreat",
    "orison:inventory",
    "orison:narrative",
    "orison:campaign",
    "orison:rules",
    "orison:operations",
  ],
  provides: ["orison:threat:pressure"],
  status: "implemented",
};
