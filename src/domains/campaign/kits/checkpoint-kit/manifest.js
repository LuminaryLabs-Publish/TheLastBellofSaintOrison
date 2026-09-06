export const manifest = {
  id: "orison-campaign-checkpoint",
  kind: "service",
  version: "1.0.0",
  domainPath: "n:simulation:orison-campaign:checkpoint",
  parentDomainPath: "n:simulation:orison-campaign",
  apiName: "orisonCampaignCheckpoint",
  requires: ["orison:campaign"],
  provides: ["orison:campaign:checkpoint"],
  status: "implemented",
};
