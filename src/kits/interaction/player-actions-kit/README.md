# orison-player-actions

Routes bounded semantic commands to owner operations; owns no progress resource.

Public factory: `createPlayerActionsKit`. Install through src/composition/create-modular-game.js. Required APIs are verified there and by the production gates. Never add a parallel game state or timer. Update tests/integration when changing this boundary.
