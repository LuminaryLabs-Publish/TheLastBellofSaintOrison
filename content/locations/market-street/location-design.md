# Market Street

Act II — The Bell Keeps Count

The town closes one shutter at a time.

## Purpose and navigation

Secure the shutter and collect a service lantern.

Closed Café → Market Street → Apothecary

Arrival writing is in [Scenes and dialogue](scenes-and-dialogue.md). The canonical scene ID is `market-street`. A wide authored camera and four close views are implemented; this does not yet provide four independently detailed subrooms.

The current environment uses the `market` procedural family, #536968 atmospheric color and #c68658 light accents. Unique production meshes, material detail, character performances and staged event animation require the room task's final art pass.

## Interactable objects

| Stable ID | Visible label | Action | Produces |
|---|---|---|---|
| market-street.plate | Freight safety plate | inspect | Knowledge: shutter-order |
| market-street.lamp | Abandoned service lantern | collect | Item: lantern |
| market-street.winch | Shutter winch | puzzle | Mechanism or observation |
| market-street.stall | Repair stall | optional | Flag: marketSafe |

## State boundary

Nexus Scene owns location identity. Orison progress owns seen objects, solved state and the committed choice. The active Object registry contains exactly four interaction identities. Re-entry before the final descent restores progress and enables missed observations; it does not re-open committed branch selection. Once the Well has been left, earlier locations cannot be revisited.

## Related specifications

- [Investigations and puzzles](investigations-and-puzzles.md)
- [Pressure and outcomes](pressure-and-outcomes.md)
- [Scenes and dialogue](scenes-and-dialogue.md)
- [Production task](../../../docs/tasks/L04-market-street.md)

Pacing allocation: 10 minutes, unmeasured. No artificial wait is inserted to achieve it.
