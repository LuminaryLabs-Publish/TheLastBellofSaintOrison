# Extension Points

1. Writing: edit a room's content/observations.json or dialogue.json. Preserve stable IDs. Build content, inspect the in-game passage, then update its task evidence.
2. Investigations: author a specification with location, id, goal, required clues, puzzle, object and text. Run npm run author -- add-investigation --input <file>. The tool rejects duplicate IDs, adds the content and binding, and the existing inspection/answer operations execute it. Extra objects are paged in the interface. Primary completion alone authorizes departure; optional investigations do not silently become required.
3. Assets: add a declared portable procedural scene through add-asset, with provenance and supported palette overrides. Providers preserve their own resource lifecycle. Current model-file decoding and arbitrary imported animation are not implemented contracts.
4. Domains: create-domain requires a specification with stable ID and initialState. It creates all eleven files as a scaffold. Implement bounded reducers and tests before marking implemented.
5. Services: create-service-kit creates seven files with explicit unsupported execution. Complete the service and add its operations to its owner; unrelated owners need no edits.
6. Locations: create-location requires all nine authored content records. It creates the full package, then review its assets/sequences/fixtures, mark implemented and add its ID to campaign.json. build-catalog generates the install list. Do not manually edit generated composition.

Generators refuse overwrites. The contribution integration test copies the repository, edits prose, adds an asset and a new investigation, compiles and runs the real game in that isolated copy. It also verifies duplicate rejection. Final art/readability approval still needs inspected captures and human review.
