export const manifest = {
  id: "orison-campaign-objective",
  kind: "service",
  version: "1.0.0",
  domainPath: "n:simulation:orison-campaign:objective",
  parentDomainPath: "n:simulation:orison-campaign",
  apiName: "orisonCampaignObjective",
  requires: ["orison:campaign"],
  provides: ["orison:campaign:objective"],
  status: "implemented",
};
