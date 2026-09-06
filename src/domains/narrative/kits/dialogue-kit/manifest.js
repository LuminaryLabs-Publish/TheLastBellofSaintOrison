export const manifest = {
  id: "orison-narrative-dialogue",
  kind: "service",
  version: "1.0.0",
  domainPath: "n:simulation:orison-narrative:dialogue",
  parentDomainPath: "n:simulation:orison-narrative",
  apiName: "orisonNarrativeDialogue",
  requires: ["orison:narrative"],
  provides: ["orison:narrative:dialogue"],
  status: "implemented",
};
