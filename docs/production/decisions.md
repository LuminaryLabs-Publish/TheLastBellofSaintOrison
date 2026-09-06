# Architecture decisions

- 2026-09-06: Preserve the pinned engine and extend through project-owned Domain Service Kits. This avoids making the game depend on unshipped engine proposals.
- Split progress among Investigation, Inventory, Narrative, Threat and Campaign; retain a read-only legacy aggregate for current consumers.
- Preserve authored content exactly during extraction. Do not combine architectural migration with a story rewrite.
- Keep five general product domains and fifteen state-free location composition packages; do not create fifteen copies of shared state.
- Compile JSON to plain ESM for identical Node/browser consumption and explicit stale-output checks.
- Keep current storage keys and previous-save recovery. Version the envelope, not the user's storage location.
- Keep request receipts bounded and session-scoped; no unproven exactly-once/network guarantee.
- No Google Drive writes, new permissions, external messages or NexusEngine repository changes.
