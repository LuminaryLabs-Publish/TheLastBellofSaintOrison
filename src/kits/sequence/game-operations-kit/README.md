# orison-game-operations

Runs narrow synchronous operations with bounded session receipts; supplies native finite graphs.

Public factory: `createGameOperationsKit`. Install through src/composition/create-modular-game.js. Required APIs are verified there and by the production gates. Never add a parallel game state or timer. Update tests/integration when changing this boundary.
