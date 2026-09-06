// GENERATED from package manifests and campaign order.
import {orderKits} from "../../../composition/install-plan.js";
import {createDomainKits as domain0} from "../../../domains/campaign/index.js";
import {createDomainKits as domain1} from "../../../domains/inventory/index.js";
import {createDomainKits as domain2} from "../../../domains/investigation/index.js";
import {createDomainKits as domain3} from "../../../domains/narrative/index.js";
import {createDomainKits as domain4} from "../../../domains/threat/index.js";
import {createSaveCoordinatorKit} from "../../persistence/save-coordinator-kit/index.js";
import {createGameOperationsKit} from "../../sequence/game-operations-kit/index.js";
import {createLocationKit as location0} from "../../locations/town-gate/index.js";
import {createLocationKit as location1} from "../../locations/visitor-centre/index.js";
import {createLocationKit as location2} from "../../locations/closed-cafe/index.js";
import {createLocationKit as location3} from "../../locations/market-street/index.js";
import {createLocationKit as location4} from "../../locations/apothecary/index.js";
import {createLocationKit as location5} from "../../locations/bell-tower-base/index.js";
import {createLocationKit as location6} from "../../locations/school-hall/index.js";
import {createLocationKit as location7} from "../../locations/flooded-archive/index.js";
import {createLocationKit as location8} from "../../locations/chapel-nave/index.js";
import {createLocationKit as location9} from "../../locations/parish-house/index.js";
import {createLocationKit as location10} from "../../locations/maintenance-tunnels/index.js";
import {createLocationKit as location11} from "../../locations/well-chamber/index.js";
import {createLocationKit as location12} from "../../locations/return-ascent/index.js";
import {createLocationKit as location13} from "../../locations/town-square/index.js";
import {createLocationKit as location14} from "../../locations/exit-road/index.js";
import {createPlayerActionsKit} from "../../interaction/player-actions-kit/index.js";
export function createCampaignKits({storage}){return orderKits([...domain0(),...domain1(),...domain2(),...domain3(),...domain4(),createSaveCoordinatorKit(),createGameOperationsKit(),location0(),location1(),location2(),location3(),location4(),location5(),location6(),location7(),location8(),location9(),location10(),location11(),location12(),location13(),location14(),createPlayerActionsKit({storage})]);}
