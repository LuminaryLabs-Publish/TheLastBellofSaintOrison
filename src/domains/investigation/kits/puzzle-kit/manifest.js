export const manifest = {
  id: "orison-investigation-puzzle",
  kind: "service",
  version: "1.0.0",
  domainPath: "n:simulation:orison-investigation:puzzle",
  parentDomainPath: "n:simulation:orison-investigation",
  apiName: "orisonInvestigationPuzzle",
  requires: ["orison:investigation"],
  provides: ["orison:investigation:puzzle"],
  status: "implemented",
};
