import { manifests, write, read } from "./support.mjs";
export async function run() {
  const catalog = await manifests();
  write("docs/production/package-catalog.json", catalog);
  write(
    "src/composition/package-catalog.js",
    "// GENERATED package definitions. No live state.\nexport const packageCatalog=" +
      JSON.stringify(catalog, null, 2) +
      ";\n",
  );
  const domains = catalog.filter(
      (m) => m.kind === "domain" && m.status === "implemented",
    ),
    locations = read("content/progression/campaign.json").locations;
  const imports = [
    'import {orderKits} from "../../../composition/install-plan.js";',
  ];
  const calls = [];
  domains.forEach((d, i) => {
    imports.push(
      `import {createDomainKits as domain${i}} from "../../../domains/${d.id.slice(7)}/index.js";`,
    );
    calls.push(`...domain${i}()`);
  });
  for (const [path, factory] of [
    ["persistence/save-coordinator-kit", "createSaveCoordinatorKit"],
    ["sequence/game-operations-kit", "createGameOperationsKit"],
  ]) {
    imports.push(`import {${factory}} from "../../${path}/index.js";`);
    calls.push(factory + "()");
  }
  locations.forEach((id, i) => {
    const m = catalog.find((m) => m.kind === "location" && m.locationId === id);
    if (!m || m.status !== "implemented")
      throw new Error("Campaign location not implemented: " + id);
    imports.push(
      `import {createLocationKit as location${i}} from "../../locations/${id}/index.js";`,
    );
    calls.push(`location${i}()`);
  });
  imports.push(
    'import {createPlayerActionsKit} from "../../interaction/player-actions-kit/index.js";',
  );
  calls.push("createPlayerActionsKit({storage})");
  write(
    "src/kits/campaign/saint-orison-kit/kit.js",
    "// GENERATED from package manifests and campaign order.\n" +
      imports.join("\n") +
      "\nexport function createCampaignKits({storage}){return orderKits([" +
      calls.join(",") +
      "]);}\n",
  );
  return { packages: catalog.length };
}
