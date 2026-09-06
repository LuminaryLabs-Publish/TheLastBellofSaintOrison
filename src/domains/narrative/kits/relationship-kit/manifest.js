export const manifest = {
  id: "orison-narrative-relationship",
  kind: "service",
  version: "1.0.0",
  domainPath: "n:simulation:orison-narrative:relationship",
  parentDomainPath: "n:simulation:orison-narrative",
  apiName: "orisonNarrativeRelationship",
  requires: ["orison:narrative"],
  provides: ["orison:narrative:relationship"],
  status: "implemented",
};
