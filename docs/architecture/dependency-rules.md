# Dependency Rules

Domains may import their own reducers, public sibling APIs through the installed namespace, immutable content and the shared stateless owner installer. They cannot import another domain's state/reducer files or provider implementation. Service Kits invoke the parent's validated command path and own no copied resource.

Composition uses orderKits: required tokens must be available before install, duplicate IDs reject, and missing/cyclic requirements reject. A domain declares capability tokens; service Kits extend its public API. Providers receive descriptors, never the engine or private domain stores.

Authoring compiles an explicit package catalog. Scaffold packages are listed honestly but not selected into the running campaign. New location IDs are activated explicitly in content/progression/campaign.json. Run npm run content:build after changes.
