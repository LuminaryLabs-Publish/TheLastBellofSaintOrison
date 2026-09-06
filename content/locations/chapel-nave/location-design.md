# Chapel Nave

Act III — The Living Witness

A confession is not a repair.

## Purpose and navigation

Verify Elian’s identity and decide whether to release her.

Flooded Archive → Chapel Nave → Parish House

Arrival writing is in [Scenes and dialogue](scenes-and-dialogue.md). The canonical scene ID is `chapel-nave`. A wide authored camera and four close views are implemented; this does not yet provide four independently detailed subrooms.

The current environment uses the `chapel` procedural family, #665c72 atmospheric color and #d9ba7b light accents. Unique production meshes, material detail, character performances and staged event animation require the room task's final art pass.

## Interactable objects

| Stable ID | Visible label | Action | Produces |
|---|---|---|---|
| chapel-nave.confession | Vale’s confession | inspect | Knowledge: vessel-truth |
| chapel-nave.line | Private archive line | inspect | Knowledge: elian-location |
| chapel-nave.intercom | Verify the private phrase | puzzle | Mechanism or observation |
| chapel-nave.promise | Listen without bargaining | optional | Flag: elianTrust |

## State boundary

Nexus Scene owns location identity. Orison progress owns seen objects, solved state and the committed choice. The active Object registry contains exactly four interaction identities. Re-entry before the final descent restores progress and enables missed observations; it does not re-open committed branch selection. Once the Well has been left, earlier locations cannot be revisited.

## Related specifications

- [Investigations and puzzles](investigations-and-puzzles.md)
- [Pressure and outcomes](pressure-and-outcomes.md)
- [Scenes and dialogue](scenes-and-dialogue.md)
- [Production task](../../../docs/tasks/L09-chapel-nave.md)

Pacing allocation: 15 minutes, unmeasured. No artificial wait is inserted to achieve it.
