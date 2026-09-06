export const manifest = {
  id: "orison-inventory-inventory",
  kind: "service",
  version: "1.0.0",
  domainPath: "n:simulation:orison-inventory:inventory",
  parentDomainPath: "n:simulation:orison-inventory",
  apiName: "orisonInventoryInventory",
  requires: ["orison:inventory"],
  provides: ["orison:inventory:inventory"],
  status: "implemented",
};
