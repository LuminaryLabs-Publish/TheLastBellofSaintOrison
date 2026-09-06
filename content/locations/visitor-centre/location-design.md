# Visitor Centre

Act I — The Return

Someone kept the lights on for you.

## Purpose and navigation

Restore the map and establish Elian’s next stop.

Town Gate → Visitor Centre → Closed Café

Arrival writing is in [Scenes and dialogue](scenes-and-dialogue.md). The canonical scene ID is `visitor-centre`. A wide authored camera and four close views are implemented; this does not yet provide four independently detailed subrooms.

The current environment uses the `office` procedural family, #6c7970 atmospheric color and #b6bd85 light accents. Unique production meshes, material detail, character performances and staged event animation require the room task's final art pass.

## Interactable objects

| Stable ID | Visible label | Action | Produces |
|---|---|---|---|
| visitor-centre.diagram | Circuit diagram | inspect | Knowledge: map-circuit |
| visitor-centre.book | Visitor book | inspect | Knowledge: cafe-lead |
| visitor-centre.cabinet | Map service cabinet | puzzle | Mechanism or observation |
| visitor-centre.staff | Staff evacuation list | optional | Flag: selectiveEvacuation |

## State boundary

Nexus Scene owns location identity. Orison progress owns seen objects, solved state and the committed choice. The active Object registry contains exactly four interaction identities. Re-entry before the final descent restores progress and enables missed observations; it does not re-open committed branch selection. Once the Well has been left, earlier locations cannot be revisited.

## Related specifications

- [Investigations and puzzles](investigations-and-puzzles.md)
- [Pressure and outcomes](pressure-and-outcomes.md)
- [Scenes and dialogue](scenes-and-dialogue.md)
- [Production task](../../../docs/tasks/L02-visitor-centre.md)

Pacing allocation: 10 minutes, unmeasured. No artificial wait is inserted to achieve it.
