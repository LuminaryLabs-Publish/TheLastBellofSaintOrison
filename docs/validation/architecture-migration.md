# Domain and Kit migration — 2026-09-06

Implemented repository scope: five product owners, sixteen Service Kits, fifteen location packages and six composition/integration packages. Google Drive is explicitly excluded. Final art, three-hour pacing, physical controllers/audio, accessibility certification and Steam release remain production work.

## Local evidence

- `npm run content:check`: package inventories, JSON schemas, IDs, references, dependencies and generated-content freshness.
- `node tools/migration/compare-content.mjs`: original campaign prose, objects, clues, answers, choices and endings preserved exactly as structured values.
- `npm test`: 45 tests, including the original routes and new ownership, installation, snapshot, cancellation, lifecycle and contributor scenarios.
- Contribution proof copies the project, changes prose, applies an asset binding, adds an optional playable investigation, generates a domain scaffold and rejects overwrite attempts. It also generates and installs an additional location through the campaign catalog and reaches it through legal commands.
- `npm run build`: production build succeeds. Nexus vendor chunk still exceeds Vite's advisory 500 kB threshold; this is not a target-device performance claim.
- CPU Vulkan/Lavapipe headless Three.js: an initial 95-frame large-text/close-view sweep and a final corrected 35-frame campaign run. The final run reaches the Witness ending using visible Canvas hit-tested controls. Representative room, puzzle and ending images were opened and inspected. Source hash manifest and result receipts are captured by the harness.
- The final headless run caught hidden departure controls after room queries began returning copies. Comparison now uses stable room IDs, and all three route tests assert visible departure controls. The complete rendered route then passed.

## Static audit disposition

The Nexus audit is bound to the fetched canonical bacc8fc commit and its root package.json. The installed package.json matches that source. The generic audit reports four heuristic errors, all inspected:

1. `storage.write(slot, payload)` in the player action Kit is a storage-provider call, not a DOM write.
2. `write(slot, payload)` in the storage provider is its serialization API, not product DOM output.
3. Two `object?.position` expressions in location presentation read optional authored object placement; they do not access optional Nexus APIs.

These are recorded false positives, not a claim that the unmodified generic script passed. The project boundary checker passes; public required product paths are independently checked at startup and in installation tests. Product UI remains Nexus descriptor output.

## Browser and deployment boundary

The sandbox Chromium download failed with CDN 502/timeouts. Local headless results are not described as browser results. The existing GitHub Actions deployment requires actual full-campaign WebGL and forced-Canvas mouse-input reviews plus production startup at 960×720, including denied storage. Deployment status must be read from the workflow run for the delivered commit; no passing result is invented here.

The first published migration run (`34047070340`) passed both full 15-room browser routes. Its production startup check exposed a review synchronization race: room buttons were still painted behind a modal, so their presence did not prove the modal had closed. The review now also waits for removed button labels to disappear and the expected panel title to appear. This strengthens the existing browser gate without changing game behavior. The follow-up workflow result remains the authority for deployment.

## Compatibility and remaining limits

Legacy getSnapshot remains a read-only compatibility projection. New disk saves use version-2 domain envelopes; legacy saves migrate. New-domain-only fields need getDomainSnapshot for full-fidelity tooling. Request receipts are bounded to 128 per session and reset on restore. Location authoring is compiled rather than hot-reloaded during a running session. Supported asset binding is portable procedural content; arbitrary model/audio decoder integration remains a separate provider capability.

All new domain/service generators deliberately create scaffold status and reject unimplemented operations. They do not claim newly generated behavior works before it is written and reviewed. Review ownership remains unassigned. Existing Drive links are neither invented nor changed.
