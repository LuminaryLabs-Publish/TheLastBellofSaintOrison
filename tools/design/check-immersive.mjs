// Documentation consistency checks. These do not run or approve the proposed game mechanics.
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
const root=path.resolve(import.meta.dirname,'../..'),base=path.join(root,'docs/design/immersive');
const read=r=>JSON.parse(fs.readFileSync(path.join(base,r),'utf8'));
const es=read('encounters.json'),source=read('source-baseline.json'),index=read('encounter-index.json');
const rooms=JSON.parse(fs.readFileSync(path.join(root,'content/progression/campaign.json'),'utf8')).locations;
assert.equal(es.length,45);assert.equal(new Set(es.map(e=>e.id)).size,45);assert.equal(rooms.length,15);
assert.equal(index.length,45);
const required=['id','room','title','kind','goal','firstImpression','entry','controls','clues','steps','wrong','hints','completion','mapping','pressure','accessibility','persistence','assets','implementation','buildSteps','acceptance','alternatives','timing'];
const assets=new Set(),itemIds=new Set(Object.keys(JSON.parse(fs.readFileSync(path.join(root,'content/shared/items.json'),'utf8'))));
const flagIds=new Set(rooms.flatMap(r=>[...source.locations[r].objects,...source.locations[r].choices].map(x=>x.flag).filter(Boolean)));
for(const e of es){
 for(const k of required)assert.ok(e[k]!==undefined&&e[k]!==null&&e[k]!==''&&(!Array.isArray(e[k])||e[k].length),`${e.id} missing ${k}`);
 assert.equal(e.status,'specified-not-implemented');assert.ok(['puzzle','investigation','decision'].includes(e.kind));assert.equal(typeof e.optional,'boolean');assert.equal(e.hints.length,3);assert.ok(e.steps.length>=3);assert.ok(e.clues.length>=2);assert.ok(e.acceptance.length>=10);
 assert.equal(e.timing.measuredMinutes,null);assert.ok(e.implementation.includes('CAP-MECHANISM'));
 assert.ok(rooms.includes(e.room));assert.equal(index.find(x=>x.id===e.id).room,e.room);
 const md=fs.readFileSync(path.join(base,index.find(x=>x.id===e.id).path),'utf8');
 for(const text of e.steps)assert.ok(md.includes(text),`${e.id}: generated step missing`);
 for(const eff of e.mapping.effects){if(eff.type==='item'||eff.type==='combination')assert.ok(itemIds.has(eff.id),`Unknown item ${eff.id}`);if(eff.type==='flag')assert.ok(flagIds.has(eff.id),`Unknown flag ${eff.id}`);}
 for(const a of e.assets){assert.ok(!assets.has(a.id),`Duplicate asset ${a.id}`);assets.add(a.id);assert.equal(a.status,'requested');assert.ok(a.description&&a.fallback&&a.variants.length>=3);}
 if(e.optional)assert.deepEqual(e.mapping.requiredClues,[],`${e.id}: optional encounter owns required evidence`);
}
let clues=0,branches=0;
for(const rid of rooms){
 const src=source.locations[rid],group=es.filter(e=>e.room===rid),req=src.investigations[0];
 assert.equal(group.length,3);assert.equal(group.filter(e=>e.mapping.primaryCompletion).length,1);
 const got=group.flatMap(e=>e.mapping.requiredClues);assert.deepEqual([...got].sort(),[...req.required].sort());clues+=got.length;
 for(const e of group){const objects=src.objects.filter(o=>e.mapping.requiredClues.includes(o.clue)).map(o=>o.id);assert.deepEqual(e.mapping.sourceObjects,objects);}
 assert.deepEqual(group.flatMap(e=>e.mapping.departureChoices),src.choices.map(c=>c.id));branches+=src.choices.length;
 for(const [stem,expected] of Object.entries(src))assert.deepEqual(JSON.parse(fs.readFileSync(path.join(root,`src/kits/locations/${rid}/content/${stem}.json`),'utf8')),expected,`Runtime source drift at ${rid}/${stem}; reconcile before publishing`);
 for(const f of ['location-design','encounter-flow','presentation-and-assets','implementation-task-pack','acceptance-and-review'])assert.ok(fs.existsSync(path.join(base,`locations/${rid}/${f}.md`)));
}
const allowsWitness=s=>['register','archive','relay'].every(i=>s.items.has(i))&&s.knowledge.has('names-second-four')&&!s.flags.relayBroken;
const scenarios=read('route-scenarios.json');assert.equal(scenarios.length,67);const seen=new Set();
for(const sc of scenarios){
 const state={items:new Set(['cassette']),knowledge:new Set(),flags:{}};
 assert.equal(sc.evidenceClass,'design-trace-not-runtime-test');
 for(const rid of rooms){
  const src=source.locations[rid];
  // Documentary state trace: visit each required encounter and apply the declared outputs.
  // Ordering within the source-compatible room aggregate is reviewed in its flow document.
  for(const e of es.filter(e=>e.room===rid&&!e.optional)){
   for(const c of e.mapping.requiredClues)state.knowledge.add(c);
   for(const effect of e.mapping.effects){
    if(effect.type==='item')state.items.add(effect.id);
    if(effect.type==='combination'){assert.ok(state.items.has('lantern')&&state.items.has('resin'));state.items.delete('lantern');state.items.delete('resin');state.items.add(effect.id);}
   }
  }
  const req=src.investigations[0];assert.ok(req.required.every(c=>state.knowledge.has(c)),`${sc.id}/${rid}: missing required knowledge`);
  if(req.requiredItem)assert.ok(state.items.has(req.requiredItem),`${sc.id}/${rid}: missing item`);
  if(rid==='apothecary')assert.ok(state.items.has('protectedLantern'));
  const choice=src.choices.find(c=>c.id===sc.choices[rid]);assert.ok(choice,`${sc.id}/${rid}: unknown departure`);seen.add(rid+'/'+choice.id);
  if(choice.ending==='witness')assert.ok(allowsWitness(state),`${sc.id}: impossible Witness`);
  if(choice.flag)state.flags[choice.flag]=true;if(choice.item)state.items.add(choice.item);
  if(choice.ending)state.ending=choice.ending;
 }
 assert.equal(state.ending,sc.expectedEnding);assert.equal(sc.expectedCompleted,true);
}
assert.equal(seen.size,31);
for(const f of read('eligibility-fixtures.json'))assert.equal(allowsWitness({items:new Set(f.items),knowledge:new Set(f.knowledge),flags:f.flags}),f.expectedAllowed,f.id);
const walk=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(d,e.name)):[path.join(d,e.name)]);
let links=0;const docs=walk(base).filter(f=>f.endsWith('.md'));
for(const file of docs){
 const text=fs.readFileSync(file,'utf8');
 assert.ok(text.trim().length>100,`Empty document ${file}`);
 for(const match of text.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)){
  const dest=match[1].split('#')[0];if(!dest||/^[a-z]+:/i.test(dest))continue;
  assert.ok(fs.existsSync(path.resolve(path.dirname(file),dest)),`Broken link ${file}: ${dest}`);links++;
 }
}
for(const dest of Object.values(read('document-aliases.json')))assert.ok(fs.existsSync(path.join(base,dest)),`Missing alias target ${dest}`);
execFileSync(process.execPath,[path.join(root,'tools/design/build-immersive.mjs'),'--check'],{stdio:'pipe'});
const report={evidenceClass:'documentation-consistency-not-runtime',encounters:es.length,locations:rooms.length,markdownDocuments:docs.length,requiredClues:clues,sourceDepartures:branches,assetRequests:assets.size,routeDesignTraces:scenarios.length,eligibilityFixtures:4,localLinksChecked:links,generatedViews:'current',sourceContent:'unchanged',limitations:['No new gameplay executed','No visual/audio quality or pacing claim','No unfamiliar-player comprehension evidence']};
console.log(JSON.stringify(report,null,2));
