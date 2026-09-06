export const manifest = {
  id: "orison-threat-escalation",
  kind: "service",
  version: "1.0.0",
  domainPath: "n:simulation:orison-threat:escalation",
  parentDomainPath: "n:simulation:orison-threat",
  apiName: "orisonThreatEscalation",
  requires: ["orison:threat"],
  provides: ["orison:threat:escalation"],
  status: "implemented",
};
