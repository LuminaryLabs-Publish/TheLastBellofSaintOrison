export const manifest = {
  id: "orison-campaign-ending",
  kind: "service",
  version: "1.0.0",
  domainPath: "n:simulation:orison-campaign:ending",
  parentDomainPath: "n:simulation:orison-campaign",
  apiName: "orisonCampaignEnding",
  requires: ["orison:campaign"],
  provides: ["orison:campaign:ending"],
  status: "implemented",
};
