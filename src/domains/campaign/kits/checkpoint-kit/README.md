# campaign / checkpoint

Installs `orisonCampaignCheckpoint` through Nexus. Owns no separate state; validated mutations run inside `orisonCampaign`. See service.js for the exact operations and result fields. Unsupported input throws before commit. Snapshot/restore belongs to the parent domain. Add operations here, then validate input and add a behavior scenario before changing callers.
