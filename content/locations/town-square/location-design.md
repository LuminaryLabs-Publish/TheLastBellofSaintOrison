# Town Square

Act V — The Last Bell

Morning is not an acquittal.

## Purpose and navigation

Choose how to share the record without claiming what you cannot prove.

Return Ascent → Town Square → Exit Road

Arrival writing is in [Scenes and dialogue](scenes-and-dialogue.md). The canonical scene ID is `town-square`. A wide authored camera and four close views are implemented; this does not yet provide four independently detailed subrooms.

The current environment uses the `square` procedural family, #758887 atmospheric color and #e0c196 light accents. Unique production meshes, material detail, character performances and staged event animation require the room task's final art pass.

## Interactable objects

| Stable ID | Visible label | Action | Produces |
|---|---|---|---|
| town-square.board | Public notice stand | inspect | Knowledge: public-record |
| town-square.satchel | Review the evidence | inspect | Knowledge: evidence-boundary |
| town-square.account | Prepare your account | puzzle | Mechanism or observation |
| town-square.vale | Father Vale at the fountain | optional | Flag: valeAccountable |

## State boundary

Nexus Scene owns location identity. Orison progress owns seen objects, solved state and the committed choice. The active Object registry contains exactly four interaction identities. Re-entry before the final descent restores progress and enables missed observations; it does not re-open committed branch selection. Once the Well has been left, earlier locations cannot be revisited.

## Related specifications

- [Investigations and puzzles](investigations-and-puzzles.md)
- [Pressure and outcomes](pressure-and-outcomes.md)
- [Scenes and dialogue](scenes-and-dialogue.md)
- [Production task](../../../docs/tasks/L14-town-square.md)

Pacing allocation: 8 minutes, unmeasured. No artificial wait is inserted to achieve it.
