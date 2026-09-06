# School Hall

Act III — The Living Witness

Twelve desks. An empty place.

## Purpose and navigation

Cross-check four identities without erasing chosen aliases.

Bell Tower Base → School Hall → Flooded Archive

Arrival writing is in [Scenes and dialogue](scenes-and-dialogue.md). The canonical scene ID is `school-hall`. A wide authored camera and four close views are implemented; this does not yet provide four independently detailed subrooms.

The current environment uses the `school` procedural family, #68726e atmospheric color and #b9b697 light accents. Unique production meshes, material detail, character performances and staged event animation require the room task's final art pass.

## Interactable objects

| Stable ID | Visible label | Action | Produces |
|---|---|---|---|
| school-hall.photos | School photographs | inspect | Knowledge: names-first-four |
| school-hall.lesson | June’s slate | inspect | Knowledge: school-order |
| school-hall.register | Class register | puzzle | Mechanism or observation |
| school-hall.reflection | Speak to June | optional | Flag: consent |

## State boundary

Nexus Scene owns location identity. Orison progress owns seen objects, solved state and the committed choice. The active Object registry contains exactly four interaction identities. Re-entry before the final descent restores progress and enables missed observations; it does not re-open committed branch selection. Once the Well has been left, earlier locations cannot be revisited.

## Related specifications

- [Investigations and puzzles](investigations-and-puzzles.md)
- [Pressure and outcomes](pressure-and-outcomes.md)
- [Scenes and dialogue](scenes-and-dialogue.md)
- [Production task](../../../docs/tasks/L07-school-hall.md)

Pacing allocation: 13 minutes, unmeasured. No artificial wait is inserted to achieve it.
