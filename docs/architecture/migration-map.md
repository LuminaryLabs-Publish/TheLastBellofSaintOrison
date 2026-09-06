# Migration Map

| Former source/responsibility | Current owner |
|---|---|
| GameState resource | Removed; five installed domain resources |
| inventory/grant/combine | Inventory Service Kits |
| knowledge/seen/puzzle answer state | Investigation Service Kits |
| flags/choices/speech/relationship facts | Narrative Service Kits |
| elapsed/exposure/setbacks/rate policy | Threat pressure, escalation and retreat Kits |
| started/ending/visited/objectives/slot | Campaign Service Kits |
| input/UI action coordination | kits/interaction/player-actions-kit |
| save validation and aggregation | kits/persistence/save-coordinator-kit |
| room graph literals | location sequences/*.json through pinned runtime |
| content/campaign.js authoring | location packages + shared JSON; generated compatibility module |
| projection.js | game-interface-kit + location-presentation-kit |
| Object registration | location public enter/leave contracts |

The former orison-kit and projection modules only re-export public factories for compatibility. No GameState writer remains. The frozen migration baseline is evidence, never a runtime import. compare-content verifies the original prose, options, solutions and endings byte-for-value after extraction.
