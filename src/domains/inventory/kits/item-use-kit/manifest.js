export const manifest = {
  id: "orison-inventory-item-use",
  kind: "service",
  version: "1.0.0",
  domainPath: "n:simulation:orison-inventory:item-use",
  parentDomainPath: "n:simulation:orison-inventory",
  apiName: "orisonInventoryItemUse",
  requires: ["orison:inventory"],
  provides: ["orison:inventory:item-use"],
  status: "implemented",
};
