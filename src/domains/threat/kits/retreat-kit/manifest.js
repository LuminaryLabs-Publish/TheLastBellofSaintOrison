export const manifest = {
  id: "orison-threat-retreat",
  kind: "service",
  version: "1.0.0",
  domainPath: "n:simulation:orison-threat:retreat",
  parentDomainPath: "n:simulation:orison-threat",
  apiName: "orisonThreatRetreat",
  requires: ["orison:threat"],
  provides: ["orison:threat:retreat"],
  status: "implemented",
};
