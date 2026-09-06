import { defineDomainServiceKit } from "nexusengine";
import { ROOM_BY_ID } from "../../../../content/campaign.js";
import { manifest } from "./manifest.js";
import { bindLocation } from "./bindings.js";
export const location = ROOM_BY_ID["closed-cafe"];
export function createLocationKit() {
  return defineDomainServiceKit({
    ...manifest,
    domain: "simulation",
    domainPath: "n:simulation:orison-locations:closed-cafe",
    parentDomainPath: "n:simulation",
    apiName: "locationClosedCafe",
    stability: "game-owned",
    createApi({ engine }) {
      return bindLocation(engine.n, location);
    },
  });
}
