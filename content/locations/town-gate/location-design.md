# Town Gate

Act I — The Return

The road ends. The invitation does not.

## Purpose and navigation

Read the crossing notice, then open a safe route into town.

Main menu → Town Gate → Visitor Centre

Arrival writing is in [Scenes and dialogue](scenes-and-dialogue.md). The canonical scene ID is `town-gate`. A wide authored camera and four close views are implemented; this does not yet provide four independently detailed subrooms.

The current environment uses the `gate` procedural family, #547f83 atmospheric color and #dfac67 light accents. Unique production meshes, material detail, character performances and staged event animation require the room task's final art pass.

## Interactable objects

| Stable ID | Visible label | Action | Produces |
|---|---|---|---|
| town-gate.notice | Crossing notice | inspect | Knowledge: crossing-rule |
| town-gate.callbox | Visitor intercom | inspect | Knowledge: blank-record |
| town-gate.latch | Gatehouse roster | puzzle | Mechanism or observation |
| town-gate.marks | Maintenance recess | optional | Flag: gateMarks |

## State boundary

Nexus Scene owns location identity. Orison progress owns seen objects, solved state and the committed choice. The active Object registry contains exactly four interaction identities. Re-entry before the final descent restores progress and enables missed observations; it does not re-open committed branch selection. Once the Well has been left, earlier locations cannot be revisited.

## Related specifications

- [Investigations and puzzles](investigations-and-puzzles.md)
- [Pressure and outcomes](pressure-and-outcomes.md)
- [Scenes and dialogue](scenes-and-dialogue.md)
- [Production task](../../../docs/tasks/L01-town-gate.md)

Pacing allocation: 8 minutes, unmeasured. No artificial wait is inserted to achieve it.
