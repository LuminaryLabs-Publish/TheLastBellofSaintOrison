# Investigation domain

Sole writer of: knowledge, rooms, history, deductions, hints. Installed API: `orisonInvestigation`; path `n:simulation:orison-investigation`. Read immutable snapshots; mutate through a service command. Do not import state or reducers from another domain. Unknown operations and invalid drafts reject without a write.

Service Kits: observation, deduction, puzzle, hint. Each has a bounded operation table and uses the same parent resource. Reset before a new campaign; aggregate restoration validates all owners before committing any. No domain owns Scene, UI, graphics or device state.

Contributors: start with contracts.js, then the selected Kit README and tests/acceptance.json. Add independent behavior tests under tests/integration.
