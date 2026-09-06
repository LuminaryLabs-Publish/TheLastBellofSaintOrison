# Flooded Archive

Act III — The Living Witness

The truth has a waterline.

## Purpose and navigation

Recover the shutoff record and its carbon original.

School Hall → Flooded Archive → Chapel Nave

Arrival writing is in [Scenes and dialogue](scenes-and-dialogue.md). The canonical scene ID is `flooded-archive`. A wide authored camera and four close views are implemented; this does not yet provide four independently detailed subrooms.

The current environment uses the `archive` procedural family, #48717c atmospheric color and #9cb7a7 light accents. Unique production meshes, material detail, character performances and staged event animation require the room task's final art pass.

## Interactable objects

| Stable ID | Visible label | Action | Produces |
|---|---|---|---|
| flooded-archive.index | Archive index | inspect | Knowledge: archive-index |
| flooded-archive.pump | Pump instructions | inspect | Knowledge: archive-safe |
| flooded-archive.cabinet | Indexed records cabinet | puzzle | Mechanism or observation |
| flooded-archive.carbon | Waterproof carbon case | optional | Item: archive; Flag: originalSaved |

## State boundary

Nexus Scene owns location identity. Orison progress owns seen objects, solved state and the committed choice. The active Object registry contains exactly four interaction identities. Re-entry before the final descent restores progress and enables missed observations; it does not re-open committed branch selection. Once the Well has been left, earlier locations cannot be revisited.

## Related specifications

- [Investigations and puzzles](investigations-and-puzzles.md)
- [Pressure and outcomes](pressure-and-outcomes.md)
- [Scenes and dialogue](scenes-and-dialogue.md)
- [Production task](../../../docs/tasks/L08-flooded-archive.md)

Pacing allocation: 17 minutes, unmeasured. No artificial wait is inserted to achieve it.
