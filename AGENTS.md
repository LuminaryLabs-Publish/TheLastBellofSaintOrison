# Working on Saint Orison

Read README.md, docs/validation/delivery-status.md and the exact task pack before editing. Do not depend on conversation memory. Keep unsupported completion claims out of reports and product marketing.

## Ownership

- content/campaign.js is the executable authored content source. Generated room documents are views of it; regenerate with node tools/authoring/document.mjs after content changes.
- Installed n:simulation:orison owns inventory, evidence, pressure and choices. n:scene owns current location. n:ui owns interface state. Presentation projects data; providers do not receive engine authority.
- Use public Nexus package exports. Pin the dependency. Missing engine behavior is a named dependency, never a hidden duplicate engine.
- A sequence coordinates finite waits; it does not own continuous pressure or overwrite another domain's state.
- Browser and desktop are host adapters of the same composition. Product UI is rendered from Nexus descriptors.

## Review

Run npm run content:check, npm test and npm run build after shared mechanic changes. Add scenario tests only for real risks, not assertions mirroring implementation. For visuals, inspect captures from the actual provider/scene. Never call a fixture run a player-input run or call software rendering a hardware benchmark.

Do not weaken save, scene, or sequence guards to satisfy a test. Trace the first discrepancy. Tests and content routes should be solvable using obtainable knowledge. Inspect modal hit bounds and large-text layout when changing UI.

## Delivery

Do not commit node_modules, dist, desktop/out, long frame sequences, private planning records, credentials or unrestricted debug controls. Review public diff and verify remote branch before publishing. Production removes window.orisonReview through the Vite build; only the development build may expose controlled inspection commands.

No Steam release, store access changes or message sending is implied by a source change. Record unfinished work honestly with exact next actions. Do not describe this game as a prototype; use development build and name its actual maturity.
