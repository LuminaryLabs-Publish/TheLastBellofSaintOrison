# Maintenance Tunnels: investigation contract

## Entry requirements

Enter through Parish House. Essential clue requirements are `tunnel-order`, `container-proof`.

## Concrete player route

1. Inspect **Utility route plate**. Read its actual record in the scene script. The journal receives `tunnel-order`.
2. Inspect **Observation window**. Read its actual record in the scene script. The journal receives `container-proof`.

Operate **Junction selectors** after those records are available.

**A route that can be checked:** Follow the physical survey order.

Available controls: Open eye / Mouth / Closed eye / Empty circle.

Exact solution: **Open eye → Mouth → Closed eye → Empty circle**.

Partial correct answers stay in the current controls. A wrong input clears that attempt and adds up to 12 seconds of exposure within the room's nonnegative limit; it never destroys evidence. Closing/reopening controls restarts an unfinished attempt. Reading the journal freezes pressure; operating controls does not.

Wrong response: That gate loops back to the same marked junction. No equipment is lost. Use the embossed survey plate.

Success response: The gates open toward the count chamber. You can trace the route by its continuous pipes; the disembodied directions fall silent.

Success commits solved state; evidence rewards are described by observations and departures.

No additional exit inventory condition is imposed by this room.

## Optional investigations

- **Mark the return route:** The raised stone beside the junction is dry enough for waterproof survey chalk. A clear return arrow will survive the lanterns.  Select `chalk` before using this target.

## Hint ladder

1. The plate is a physical record.
2. Observe, refuse, ignore, leave empty.
3. Open eye, mouth, closed eye, empty circle.

## Acceptance

Early operation must refuse missing records. Wrong inputs must remain recoverable. Repeated inspection or solved operation must not duplicate rewards. Successful operation must finish the Sequence's operate node; a departure without that state is rejected.
