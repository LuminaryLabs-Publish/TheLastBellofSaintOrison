# Maintenance Tunnels

Act IV — The Count Room

Follow the pipes. Let the voices get lost.

## Purpose and navigation

Follow the utility markings and preserve a return route.

Parish House → Maintenance Tunnels → Well Chamber

Arrival writing is in [Scenes and dialogue](scenes-and-dialogue.md). The canonical scene ID is `maintenance-tunnels`. A wide authored camera and four close views are implemented; this does not yet provide four independently detailed subrooms.

The current environment uses the `tunnels` procedural family, #47646b atmospheric color and #bd9d70 light accents. Unique production meshes, material detail, character performances and staged event animation require the room task's final art pass.

## Interactable objects

| Stable ID | Visible label | Action | Produces |
|---|---|---|---|
| maintenance-tunnels.plate | Utility route plate | inspect | Knowledge: tunnel-order |
| maintenance-tunnels.window | Observation window | inspect | Knowledge: container-proof |
| maintenance-tunnels.junction | Junction selectors | puzzle | Mechanism or observation |
| maintenance-tunnels.mark | Mark the return route | use | Flag: returnMarked; Requires selected: chalk |

## State boundary

Nexus Scene owns location identity. Orison progress owns seen objects, solved state and the committed choice. The active Object registry contains exactly four interaction identities. Re-entry before the final descent restores progress and enables missed observations; it does not re-open committed branch selection. Once the Well has been left, earlier locations cannot be revisited.

## Related specifications

- [Investigations and puzzles](investigations-and-puzzles.md)
- [Pressure and outcomes](pressure-and-outcomes.md)
- [Scenes and dialogue](scenes-and-dialogue.md)
- [Production task](../../../docs/tasks/L11-maintenance-tunnels.md)

Pacing allocation: 15 minutes, unmeasured. No artificial wait is inserted to achieve it.
