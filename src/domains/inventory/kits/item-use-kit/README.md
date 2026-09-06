# inventory / item-use

Installs `orisonInventoryItemUse` through Nexus. Owns no separate state; validated mutations run inside `orisonInventory`. See service.js for the exact operations and result fields. Unsupported input throws before commit. Snapshot/restore belongs to the parent domain. Add operations here, then validate input and add a behavior scenario before changing callers.
