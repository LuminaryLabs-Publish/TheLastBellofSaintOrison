# Closed Café

Act I — The Return

Her voice remembers the wrong things.

## Purpose and navigation

Compare the radio signal with Elian’s original cassette.

Visitor Centre → Closed Café → Market Street

Arrival writing is in [Scenes and dialogue](scenes-and-dialogue.md). The canonical scene ID is `closed-cafe`. A wide authored camera and four close views are implemented; this does not yet provide four independently detailed subrooms.

The current environment uses the `cafe` procedural family, #746954 atmospheric color and #efb875 light accents. Unique production meshes, material detail, character performances and staged event animation require the room task's final art pass.

## Interactable objects

| Stable ID | Visible label | Action | Produces |
|---|---|---|---|
| closed-cafe.tape | Cassette comparison | inspect | Knowledge: true-signal |
| closed-cafe.receipt | Counter receipt | inspect | Knowledge: radio-channels |
| closed-cafe.radio | Shortwave radio | puzzle | Mechanism or observation |
| closed-cafe.kitchen | Kitchen recorder | optional | Flag: relayEvidence |

## State boundary

Nexus Scene owns location identity. Orison progress owns seen objects, solved state and the committed choice. The active Object registry contains exactly four interaction identities. Re-entry before the final descent restores progress and enables missed observations; it does not re-open committed branch selection. Once the Well has been left, earlier locations cannot be revisited.

## Related specifications

- [Investigations and puzzles](investigations-and-puzzles.md)
- [Pressure and outcomes](pressure-and-outcomes.md)
- [Scenes and dialogue](scenes-and-dialogue.md)
- [Production task](../../../docs/tasks/L03-closed-cafe.md)

Pacing allocation: 12 minutes, unmeasured. No artificial wait is inserted to achieve it.
