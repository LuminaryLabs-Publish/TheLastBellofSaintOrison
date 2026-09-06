export const manifest = {
  id: "orison-investigation-deduction",
  kind: "service",
  version: "1.0.0",
  domainPath: "n:simulation:orison-investigation:deduction",
  parentDomainPath: "n:simulation:orison-investigation",
  apiName: "orisonInvestigationDeduction",
  requires: ["orison:investigation"],
  provides: ["orison:investigation:deduction"],
  status: "implemented",
};
