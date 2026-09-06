# Well Chamber

Act IV — The Count Room

Nothing down here is asking to be useful.

## Purpose and navigation

Recover the Bell Core and choose a fully explained intervention.

Maintenance Tunnels → Well Chamber → Return Ascent

Arrival writing is in [Scenes and dialogue](scenes-and-dialogue.md). The canonical scene ID is `well-chamber`. A wide authored camera and four close views are implemented; this does not yet provide four independently detailed subrooms.

The current environment uses the `well` procedural family, #476d70 atmospheric color and #d8ae64 light accents. Unique production meshes, material detail, character performances and staged event animation require the room task's final art pass.

## Interactable objects

| Stable ID | Visible label | Action | Produces |
|---|---|---|---|
| well-chamber.names | Paired identity records | inspect | Knowledge: names-second-four |
| well-chamber.methods | Intervention instructions | inspect | Knowledge: ending-methods |
| well-chamber.core | Core release collars | puzzle | Mechanism or observation |
| well-chamber.voices | Listen to the unclaimed silence | optional | Flag: consent |

## State boundary

Nexus Scene owns location identity. Orison progress owns seen objects, solved state and the committed choice. The active Object registry contains exactly four interaction identities. Re-entry before the final descent restores progress and enables missed observations; it does not re-open committed branch selection. Once the Well has been left, earlier locations cannot be revisited.

## Related specifications

- [Investigations and puzzles](investigations-and-puzzles.md)
- [Pressure and outcomes](pressure-and-outcomes.md)
- [Scenes and dialogue](scenes-and-dialogue.md)
- [Production task](../../../docs/tasks/L12-well-chamber.md)

Pacing allocation: 18 minutes, unmeasured. No artificial wait is inserted to achieve it.
