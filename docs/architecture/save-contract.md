# Save Contract

Persistent envelope: schema orison-save/2, contentVersion orison-campaign/1, sceneId, domains and optional savedAt. Domains contain exactly investigation, inventory, narrative, threat and campaign. Each owner validates its own fields. The coordinator additionally checks known locations, entered-room consistency, seen objects, solved-puzzle evidence and valid committed choices.

The existing storage key namespace stays saint-orison.v1.slot.<0..2> so installed users retain their saves. The envelope version changes inside it. Legacy schema orison-campaign/1 is validated and converted; malformed saves are rejected before commit. Primary-save failure still attempts the previous saved copy. Browser storage denial keeps session saves and displays the temporary-save notice.

orison.getSnapshot remains the legacy read-only projection for tooling compatibility. Use getDomainSnapshot for full-fidelity new saves: it also retains hints, partial puzzle inputs, relationships and dialogue history. Legacy projection restoration cannot invent these newly introduced fields; they initialize empty. Disk writes always use version 2.

Operation request deduplication is bounded to 128 IDs per running session and resets at restore. It does not promise exactly-once network delivery. Content IDs, not callback/subscription handles, identify waits.
