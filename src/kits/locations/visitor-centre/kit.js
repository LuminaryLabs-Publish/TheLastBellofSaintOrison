import { defineDomainServiceKit } from "nexusengine";
import { ROOM_BY_ID } from "../../../../content/campaign.js";
import { manifest } from "./manifest.js";
import { bindLocation } from "./bindings.js";
export const location = ROOM_BY_ID["visitor-centre"];
export function createLocationKit() {
  return defineDomainServiceKit({
    ...manifest,
    domain: "simulation",
    domainPath: "n:simulation:orison-locations:visitor-centre",
    parentDomainPath: "n:simulation",
    apiName: "locationVisitorCentre",
    stability: "game-owned",
    createApi({ engine }) {
      return bindLocation(engine.n, location);
    },
  });
}
