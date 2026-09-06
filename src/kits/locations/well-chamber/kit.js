import { defineDomainServiceKit } from "nexusengine";
import { ROOM_BY_ID } from "../../../../content/campaign.js";
import { manifest } from "./manifest.js";
import { bindLocation } from "./bindings.js";
export const location = ROOM_BY_ID["well-chamber"];
export function createLocationKit() {
  return defineDomainServiceKit({
    ...manifest,
    domain: "simulation",
    domainPath: "n:simulation:orison-locations:well-chamber",
    parentDomainPath: "n:simulation",
    apiName: "locationWellChamber",
    stability: "game-owned",
    createApi({ engine }) {
      return bindLocation(engine.n, location);
    },
  });
}
