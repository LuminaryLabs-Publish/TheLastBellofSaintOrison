export const manifest = {
  id: "orison-investigation-observation",
  kind: "service",
  version: "1.0.0",
  domainPath: "n:simulation:orison-investigation:observation",
  parentDomainPath: "n:simulation:orison-investigation",
  apiName: "orisonInvestigationObservation",
  requires: ["orison:investigation"],
  provides: ["orison:investigation:observation"],
  status: "implemented",
};
