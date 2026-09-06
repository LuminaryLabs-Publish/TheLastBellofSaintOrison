# orison-save-coordinator

Validates and coordinates consistent domain snapshots; imports legacy saves.

Public factory: `createSaveCoordinatorKit`. Install through src/composition/create-modular-game.js. Required APIs are verified there and by the production gates. Never add a parallel game state or timer. Update tests/integration when changing this boundary.
