export const manifest = {
  id: "orison-inventory-combination",
  kind: "service",
  version: "1.0.0",
  domainPath: "n:simulation:orison-inventory:combination",
  parentDomainPath: "n:simulation:orison-inventory",
  apiName: "orisonInventoryCombination",
  requires: ["orison:inventory"],
  provides: ["orison:inventory:combination"],
  status: "implemented",
};
