# Return Ascent

Act V — The Last Bell

The way back remembers your hands.

## Purpose and navigation

Use the verified return route and make it back above ground.

Well Chamber → Return Ascent → Town Square

Arrival writing is in [Scenes and dialogue](scenes-and-dialogue.md). The canonical scene ID is `return-ascent`. A wide authored camera and four close views are implemented; this does not yet provide four independently detailed subrooms.

The current environment uses the `tunnels` procedural family, #5b625f atmospheric color and #d5a574 light accents. Unique production meshes, material detail, character performances and staged event animation require the room task's final art pass.

## Interactable objects

| Stable ID | Visible label | Action | Produces |
|---|---|---|---|
| return-ascent.route | Return survey plate | inspect | Knowledge: return-order |
| return-ascent.station | Emergency line | inspect | Knowledge: elian-return |
| return-ascent.gates | Return gates | puzzle | Mechanism or observation |
| return-ascent.assist | Keep the emergency line open | optional | Flag: elianHelped |

## State boundary

Nexus Scene owns location identity. Orison progress owns seen objects, solved state and the committed choice. The active Object registry contains exactly four interaction identities. Re-entry before the final descent restores progress and enables missed observations; it does not re-open committed branch selection. Once the Well has been left, earlier locations cannot be revisited.

## Related specifications

- [Investigations and puzzles](investigations-and-puzzles.md)
- [Pressure and outcomes](pressure-and-outcomes.md)
- [Scenes and dialogue](scenes-and-dialogue.md)
- [Production task](../../../docs/tasks/L13-return-ascent.md)

Pacing allocation: 12 minutes, unmeasured. No artificial wait is inserted to achieve it.
