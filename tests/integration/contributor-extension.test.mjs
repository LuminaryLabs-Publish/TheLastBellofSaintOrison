import test from "node:test";
import assert from "node:assert/strict";
import {
  mkdtempSync,
  cpSync,
  symlinkSync,
  writeFileSync,
  readFileSync,
  rmSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
test("a contributor changes writing, binds an asset and adds a playable investigation without shared edits", () => {
  const temp = mkdtempSync(join(tmpdir(), "orison-contribution-"));
  try {
    for (const dir of ["src", "content", "tools", "schemas", "docs"])
      cpSync(dir, join(temp, dir), { recursive: true });
    cpSync("package.json", join(temp, "package.json"));
    symlinkSync(resolve("node_modules"), join(temp, "node_modules"), "dir");
    const run = (...args) => {
      const p = spawnSync(process.execPath, args, {
        cwd: temp,
        encoding: "utf8",
      });
      assert.equal(p.status, 0, p.stderr + "\n" + p.stdout);
      return p;
    };
    const p = join(
      temp,
      "src/kits/locations/town-gate/content/observations.json",
    );
    const observations = JSON.parse(readFileSync(p));
    observations[0].text += " The replacement brass plate has a fresh scratch.";
    writeFileSync(p, JSON.stringify(observations));
    writeFileSync(
      join(temp, "asset-input.json"),
      JSON.stringify({
        location: "town-gate",
        asset: {
          id: "town-gate-restored",
          kind: "procedural-scene",
          source: { kind: "inline", data: { theme: "gate" } },
          metadata: { provenance: "authored test fixture" },
        },
        palette: { tint: "#445566", accent: "#cc8844" },
      }),
    );
    run("tools/authoring/cli.mjs", "add-asset", "--input", "asset-input.json");
    writeFileSync(
      join(temp, "investigation-input.json"),
      JSON.stringify({
        location: "town-gate",
        id: "brass-plate",
        goal: "Read the replacement plate",
        required: ["crossing-rule"],
        object: { id: "plate-control", name: "Replacement plate" },
        text: "A marked plate with one clearly labelled button.",
        puzzle: {
          id: "plate",
          title: "Plate",
          question: "Press the marked button.",
          options: ["Marked"],
          answer: [0],
          success: "The plate is secured.",
          wrong: "Follow the physical mark.",
          hints: ["Read the mark."],
        },
      }),
    );
    run(
      "tools/authoring/cli.mjs",
      "add-investigation",
      "--input",
      "investigation-input.json",
    );
    run("tools/authoring/cli.mjs", "validate-references");
    run("tools/authoring/build-content.mjs");
    const duplicate = spawnSync(
      process.execPath,
      [
        "tools/authoring/cli.mjs",
        "add-investigation",
        "--input",
        "investigation-input.json",
      ],
      { cwd: temp },
    );
    assert.notEqual(duplicate.status, 0);
    writeFileSync(
      join(temp, "probe.mjs"),
      `import assert from 'node:assert/strict';import {createGame} from './src/composition/game.js';import {memoryStorage} from './src/providers/storage.js';const e=createGame({storage:memoryStorage()});const send=c=>{e.n.orison.submit(c);e.tick(1/30);};send({action:'start',slot:0});send({action:'close'});send({action:'inspect',id:'notice'});assert.match(e.n.ui.getState().panel.text,/fresh scratch/);send({action:'close'});send({action:'object-page',page:1});assert.ok(e.n.orisonPresentation.packet().ui.elements.find(x=>x.id==='object-plate-control'));send({action:'inspect',id:'plate-control'});assert.equal(e.n.ui.getState().puzzle.investigationId,'brass-plate');send({action:'answer',index:0});assert.ok(e.n.orisonInvestigation.snapshot().puzzles['town-gate:brass-plate'].solved);assert.equal(e.n.orison.getProgress().solved,false);assert.equal(e.n.orisonPresentation.packet().scene.fog.color,'#445566');assert.equal(e.n.object.list().length,5);e.n.orison.dispose();`,
    );
    run("probe.mjs");
    writeFileSync(
      join(temp, "domain-input.json"),
      JSON.stringify({
        id: "weather-notes",
        description: "Track local weather observations",
        initialState: { notes: [] },
      }),
    );
    run(
      "tools/authoring/cli.mjs",
      "create-domain",
      "--input",
      "domain-input.json",
    );
    const roomContent=Object.fromEntries(["location","objects","investigations","puzzles","dialogue","observations","choices","pressure","presentation"].map(name=>[name,JSON.parse(readFileSync(join(temp,"src/kits/locations/town-gate/content/"+name+".json")))]));
    roomContent.location.id="gate-annex";roomContent.location.name="Gate Annex";
    const clueIds=new Map(roomContent.objects.filter(o=>o.clue).map(o=>[o.clue,"annex-"+o.clue]));
    for(const object of roomContent.objects)if(object.clue)object.clue=clueIds.get(object.clue);
    for(const inv of roomContent.investigations)inv.required=inv.required.map(id=>clueIds.get(id)??id);
    writeFileSync(join(temp,"location-input.json"),JSON.stringify({id:"gate-annex",description:"Gate Annex",content:roomContent}));
    run("tools/authoring/cli.mjs","create-location","--input","location-input.json");
    const manifestPath=join(temp,"src/kits/locations/gate-annex/manifest.js");
    writeFileSync(manifestPath,readFileSync(manifestPath,"utf8").replace('"scaffold"','"implemented"'));
    const campaignPath=join(temp,"content/progression/campaign.json");const campaign=JSON.parse(readFileSync(campaignPath));campaign.locations.splice(1,0,"gate-annex");writeFileSync(campaignPath,JSON.stringify(campaign));
    run("tools/authoring/cli.mjs","build-catalog");run("tools/authoring/build-content.mjs");
    writeFileSync(join(temp,"location-probe.mjs"),`import assert from 'node:assert/strict';import {createGame} from './src/composition/game.js';import {memoryStorage} from './src/providers/storage.js';const e=createGame({storage:memoryStorage()});const send=c=>{e.n.orison.submit(c);e.tick(1/30);};send({action:'start',slot:0});send({action:'close'});const r=e.n.orison.getRoom();for(const o of r.objects.filter(o=>o.clue)){send({action:'inspect',id:o.id});send({action:'close'});}send({action:'inspect',id:r.objects.find(o=>o.kind==='puzzle').id});for(const index of r.puzzle.answer)send({action:'answer',index});send({action:'close'});send({action:'depart',id:r.choices[0].id});assert.equal(e.n.orison.getRoom().id,'gate-annex');assert.ok(e.n.locationGateAnnex);e.n.orison.dispose();`);
    run("location-probe.mjs");
    const second = spawnSync(
      process.execPath,
      [
        "tools/authoring/cli.mjs",
        "create-domain",
        "--input",
        "domain-input.json",
      ],
      { cwd: temp },
    );
    assert.notEqual(second.status, 0);
  } finally {
    rmSync(temp, { recursive: true, force: true });
  }
});
