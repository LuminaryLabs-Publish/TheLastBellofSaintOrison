# Exit Road

Act V — The Last Bell

You can leave a place without finishing its grief.

## Purpose and navigation

Acknowledge the consequence and decide what you carry home.

Town Square → Exit Road → Ending

Arrival writing is in [Scenes and dialogue](scenes-and-dialogue.md). The canonical scene ID is `exit-road`. A wide authored camera and four close views are implemented; this does not yet provide four independently detailed subrooms.

The current environment uses the `gate` procedural family, #889895 atmospheric color and #e6cea1 light accents. Unique production meshes, material detail, character performances and staged event animation require the room task's final art pass.

## Interactable objects

| Stable ID | Visible label | Action | Produces |
|---|---|---|---|
| exit-road.cassette | The original cassette | inspect | Knowledge: last-listen |
| exit-road.road | Look back at Saint Orison | inspect | Knowledge: last-look |
| exit-road.letter | Write the first line home | puzzle | Mechanism or observation |
| exit-road.elian | Wait for Elian | optional | Flag: elianHelped |

## State boundary

Nexus Scene owns location identity. Orison progress owns seen objects, solved state and the committed choice. The active Object registry contains exactly four interaction identities. Re-entry before the final descent restores progress and enables missed observations; it does not re-open committed branch selection. Once the Well has been left, earlier locations cannot be revisited.

## Related specifications

- [Investigations and puzzles](investigations-and-puzzles.md)
- [Pressure and outcomes](pressure-and-outcomes.md)
- [Scenes and dialogue](scenes-and-dialogue.md)
- [Production task](../../../docs/tasks/L15-exit-road.md)

Pacing allocation: 5 minutes, unmeasured. No artificial wait is inserted to achieve it.
