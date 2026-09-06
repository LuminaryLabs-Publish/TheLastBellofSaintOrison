# Saint Orison: game design and implementation scope

## Player promise

A personal investigation through a town whose preserved memory has become a machine. Mara follows Elian's cassette, tests claims against physical records, and decides what the town should be allowed to retain. Curiosity and responsibility drive play; there is no conventional combat, leveling system or multiplayer.

The commercial ambition is exceptional presentation, authored detail and reliability in a focused single-player adventure. The current build establishes a connected game and its production architecture; it does not establish final AAA presentation quality or a measured three-hour duration.

## Core loop

Enter a location, read its visible goal, inspect concrete objects, infer the documented operation, manage exposure, perform the operation, optionally recover more evidence, and choose a departure. Most pressure thresholds are 1–3 minutes of active exposure. A location may contain several investigations in the finished design; the present implementation has one primary puzzle per location with optional observations.

Time advances during exploration and puzzle operation. Reading, menus and suspension pause it. Darkness is capped so essential interface text remains available. Warning and critical captions correspond to increasing exposure; voluntary shelter is always visible. A forced retreat preserves evidence and increments a setback count. No sudden permanent failure deletes a campaign.

Click or focus an object. A close-view control changes the camera without changing the underlying rule. Journal entries can be reopened; items can be selected and used on their matching target. Resin and lantern have one explicit combination. The map permits return to visited rooms before the Well departure, with past choices locked.

## Journey

| Act | Locations in order | Target budget | Current mechanics |
|---|---|---|---|
| I | Town Gate → Visitor Centre → Closed Café | 30 min | Blank identity, circuit order, signal comparison |
| II | Market Street → Apothecary → Bell Tower Base | 35 min | Counterweight sequence, resin preparation, relay preservation |
| III | School Hall → Flooded Archive → Chapel Nave | 45 min | Identity cross-check, indexed evidence, private-phrase trust |
| IV | Parish House → Maintenance Tunnels → Well Chamber | 45 min | Documented access code, utility navigation, informed intervention |
| V | Return Ascent → Town Square → Exit Road | 25 min | Reversed route, proof boundaries, final account |

The allocations total 180 minutes but are not measured gameplay. Do not add waits to make a stopwatch match the table. Extend meaningful investigations, tactile operations, conversations and recovery scenes in response to blind playtests.

## Mechanical inventory

| Mechanic | Authoritative state | Current behavior | Remaining production depth |
|---|---|---|---|
| Point-and-click | Input/Interaction + product command | Cards and world picking; close views | Physical-browser and target-device acceptance |
| Evidence | Product knowledge IDs | Permanent journal entries and exact rereading | Search, localization and richer journal layout |
| Inventory | Product item IDs | Acquire once, select, use, resin combination | More tactile object manipulation if supported by writing |
| Puzzle | Room progress + transient UI attempt | Required clues; ordered/discrete controls; three hints | Distinct physical controls for each mechanism |
| Pressure | Product exposure | Thresholds, captions, sound cues, retreat, modifiers | Authored local event staging and sound/perception review |
| Branching | Committed room choice and flags | 31 local alternatives, mostly two; three endings | Consequential combinations and blind comprehension review |
| Relationships | Explicit flags and dialogue records | Elian release/return, June consent, Vale testimony | Actor animation and performed conversations |
| Re-entry | Scene identity + saved room progress | Revisit before final descent; collect missed evidence | Richer changed environment variants |
| Saving | Serialized game/scene ID | Three slots, autosave, backup recovery | Version migration and installed-update tests |
| Menus | Nexus UI | Start/load/pause/settings/journal/satchel/map/credits/endings | Full screen-reader strategy, controller/handheld proof |
| Rendering | Nexus Graphics/Camera descriptors | Procedural 3D, labels, instancing, animated mechanical/water descriptors | Final models/textures/lighting and hardware profiling |
| Audio | Nexus Audio descriptor | Original ambient synthesis and bell cues | Spatial scene audio, mix review, voice production |
| Desktop | Narrow host adapter | Electron shell and package scripts | Installed Windows and Steam checks |

## Branch and ending rules

Local alternatives reconverge at the next location. Some are narrative variations; others change inventory, pressure or ending access. Do not advertise them as separate campaigns. The relay choice is irreversible; Witness needs an intact relay and specified original evidence. Silence and Vessel remain available when Witness is blocked. Vessel is voluntary self-transfer in this adaptation.

The player's basic interaction rules remain trustworthy even when the fiction contains misleading voices. A bad inference should produce a recoverable response. Mandatory knowledge is never hidden solely behind a timer, a color distinction or an optional branch.

## UI, audio and accessibility

High-contrast text overlays carry essential goals, controls, warnings and evidence independently of the dark scene. Text panels scale, cursor scale is adjustable, captions accompany escalating sound, reduced motion freezes nonessential rotation, Gentle slows pressure, and Story removes deadlines. Physical key/controller handlers exist. These implementations still require actual input, display, audio and accessibility review; source inspection cannot certify them.

A screen-reader representation, full input remapping, comprehensive localization, independent mix buses and audio-device change handling remain production tasks. The game currently uses text dialogue and procedural props; no performance-capture or voice delivery is implied.

## Definition of done by layer

A rule is done when real commands reach its owner and produce validated state, including wrong/repeated/cancelled cases. A room is done when every route is solvable, readable, recoverable and reviewed through ordinary input. An asset is done when its rights, export, integration, performance and in-game framing are accepted. A release is done when the exact installed build and platform gates pass. Passing a renderer or route test does not satisfy all four definitions.

See [task packs](../tasks/index.md) and [delivery status](../validation/delivery-status.md) for the actual next work.
