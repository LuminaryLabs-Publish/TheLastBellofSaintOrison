# Bell Tower Base

Act II — The Bell Keeps Count

A machine made to sound like mercy.

## Purpose and navigation

Learn the bell cycle and choose how to interrupt it.

Apothecary → Bell Tower Base → School Hall

Arrival writing is in [Scenes and dialogue](scenes-and-dialogue.md). The canonical scene ID is `bell-tower-base`. A wide authored camera and four close views are implemented; this does not yet provide four independently detailed subrooms.

The current environment uses the `tower` procedural family, #68635d atmospheric color and #deab6d light accents. Unique production meshes, material detail, character performances and staged event animation require the room task's final art pass.

## Interactable objects

| Stable ID | Visible label | Action | Produces |
|---|---|---|---|
| bell-tower-base.log | Governor service log | inspect | Knowledge: governor-order |
| bell-tower-base.stair | Acoustic brace diagram | inspect | Knowledge: silence-method |
| bell-tower-base.governor | Governor controls | puzzle | Mechanism or observation |
| bell-tower-base.relay | Relay junction | optional | Flag: relayEvidence |

## State boundary

Nexus Scene owns location identity. Orison progress owns seen objects, solved state and the committed choice. The active Object registry contains exactly four interaction identities. Re-entry before the final descent restores progress and enables missed observations; it does not re-open committed branch selection. Once the Well has been left, earlier locations cannot be revisited.

## Related specifications

- [Investigations and puzzles](investigations-and-puzzles.md)
- [Pressure and outcomes](pressure-and-outcomes.md)
- [Scenes and dialogue](scenes-and-dialogue.md)
- [Production task](../../../docs/tasks/L06-bell-tower-base.md)

Pacing allocation: 13 minutes, unmeasured. No artificial wait is inserted to achieve it.
