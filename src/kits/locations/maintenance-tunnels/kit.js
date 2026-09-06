import { defineDomainServiceKit } from "nexusengine";
import { ROOM_BY_ID } from "../../../../content/campaign.js";
import { manifest } from "./manifest.js";
import { bindLocation } from "./bindings.js";
export const location = ROOM_BY_ID["maintenance-tunnels"];
export function createLocationKit() {
  return defineDomainServiceKit({
    ...manifest,
    domain: "simulation",
    domainPath: "n:simulation:orison-locations:maintenance-tunnels",
    parentDomainPath: "n:simulation",
    apiName: "locationMaintenanceTunnels",
    stability: "game-owned",
    createApi({ engine }) {
      return bindLocation(engine.n, location);
    },
  });
}
