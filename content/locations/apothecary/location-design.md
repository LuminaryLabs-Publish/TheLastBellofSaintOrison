# Apothecary

Act II — The Bell Keeps Count

A steady flame is not a promise.

## Purpose and navigation

Test the resin, then prepare the lantern.

Market Street → Apothecary → Bell Tower Base

Arrival writing is in [Scenes and dialogue](scenes-and-dialogue.md). The canonical scene ID is `apothecary`. A wide authored camera and four close views are implemented; this does not yet provide four independently detailed subrooms.

The current environment uses the `apothecary` procedural family, #466b60 atmospheric color and #b6c98a light accents. Unique production meshes, material detail, character performances and staged event animation require the room task's final art pass.

## Interactable objects

| Stable ID | Visible label | Action | Produces |
|---|---|---|---|
| apothecary.recipe | Resin preparation | inspect | Knowledge: resin-test |
| apothecary.note | Keeper’s note | inspect | Knowledge: lantern-limits |
| apothecary.bench | Sample bench | puzzle | Mechanism or observation |
| apothecary.drawer | Dispensing drawer | optional | Flag: clinicalEvidence |

## State boundary

Nexus Scene owns location identity. Orison progress owns seen objects, solved state and the committed choice. The active Object registry contains exactly four interaction identities. Re-entry before the final descent restores progress and enables missed observations; it does not re-open committed branch selection. Once the Well has been left, earlier locations cannot be revisited.

## Related specifications

- [Investigations and puzzles](investigations-and-puzzles.md)
- [Pressure and outcomes](pressure-and-outcomes.md)
- [Scenes and dialogue](scenes-and-dialogue.md)
- [Production task](../../../docs/tasks/L05-apothecary.md)

Pacing allocation: 12 minutes, unmeasured. No artificial wait is inserted to achieve it.
