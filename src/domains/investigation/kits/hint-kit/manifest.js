export const manifest = {
  id: "orison-investigation-hint",
  kind: "service",
  version: "1.0.0",
  domainPath: "n:simulation:orison-investigation:hint",
  parentDomainPath: "n:simulation:orison-investigation",
  apiName: "orisonInvestigationHint",
  requires: ["orison:investigation"],
  provides: ["orison:investigation:hint"],
  status: "implemented",
};
