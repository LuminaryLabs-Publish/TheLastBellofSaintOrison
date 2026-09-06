# orison-campaign-composition

Installs domain, service, location and command packages in dependency order.

Public factory: `createCampaignKits`. Install through src/composition/create-modular-game.js. Required APIs are verified there and by the production gates. Never add a parallel game state or timer. Update tests/integration when changing this boundary.
