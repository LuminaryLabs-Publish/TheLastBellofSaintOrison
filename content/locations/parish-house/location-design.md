# Parish House

Act IV — The Count Room

Someone ate breakfast above all of this.

## Purpose and navigation

Recover the relay contract and the descent equipment.

Chapel Nave → Parish House → Maintenance Tunnels

Arrival writing is in [Scenes and dialogue](scenes-and-dialogue.md). The canonical scene ID is `parish-house`. A wide authored camera and four close views are implemented; this does not yet provide four independently detailed subrooms.

The current environment uses the `house` procedural family, #735e53 atmospheric color and #e2b781 light accents. Unique production meshes, material detail, character performances and staged event animation require the room task's final art pass.

## Interactable objects

| Stable ID | Visible label | Action | Produces |
|---|---|---|---|
| parish-house.photos | Three dated photographs | inspect | Knowledge: safe-code |
| parish-house.letter | Elian’s letter | inspect | Knowledge: family-history |
| parish-house.safe | Silas’s wall safe | puzzle | Mechanism or observation |
| parish-house.chalk | Survey equipment | collect | Item: chalk |

## State boundary

Nexus Scene owns location identity. Orison progress owns seen objects, solved state and the committed choice. The active Object registry contains exactly four interaction identities. Re-entry before the final descent restores progress and enables missed observations; it does not re-open committed branch selection. Once the Well has been left, earlier locations cannot be revisited.

## Related specifications

- [Investigations and puzzles](investigations-and-puzzles.md)
- [Pressure and outcomes](pressure-and-outcomes.md)
- [Scenes and dialogue](scenes-and-dialogue.md)
- [Production task](../../../docs/tasks/L10-parish-house.md)

Pacing allocation: 12 minutes, unmeasured. No artificial wait is inserted to achieve it.
