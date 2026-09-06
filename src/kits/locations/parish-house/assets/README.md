# Parish House assets

Edit bindings.json and manifest.json together. Current supported format is portable procedural geometry, metres, Y up, -Z forward. Palette overrides `tint` and `accent` are consumed by Presentation. Keep object IDs and interaction geometry stable. Both providers must retain selection and clue readability. Unsupported glTF/audio loading must not be advertised as implemented.

Record creator, source URL, license and attribution before adding third-party art. Providers release derived scene resources on scene replacement/disposal. Failed binding validation blocks the build. Use `npm run author -- add-asset --input <spec.json>` for declared assets.
