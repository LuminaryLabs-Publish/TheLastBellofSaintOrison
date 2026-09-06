# Bell Tower Base: investigation contract

## Entry requirements

Enter through Apothecary. Essential clue requirements are `governor-order`, `silence-method`.

## Concrete player route

1. Inspect **Governor service log**. Read its actual record in the scene script. The journal receives `governor-order`.
2. Inspect **Acoustic brace diagram**. Read its actual record in the scene script. The journal receives `silence-method`.

Operate **Governor controls** after those records are available.

**Delay the ring:** Operate the non-destructive governor procedure.

Available controls: Open bypass / Release tension / Engage brake.

Exact solution: **Open bypass → Release tension → Engage brake**.

Partial correct answers stay in the current controls. A wrong input clears that attempt and adds up to 12 seconds of exposure within the room's nonnegative limit; it never destroys evidence. Closing/reopening controls restarts an unfinished attempt. Reading the journal freezes pressure; operating controls does not.

Wrong response: The safety gate closes over the controls. You release them and return to the documented starting position.

Success response: The governor settles. One cycle has been delayed, and the relay remains intact. You can keep this arrangement or choose the destructive shortcut before leaving.

Success commits solved state; evidence rewards are described by observations and departures.

No additional exit inventory condition is imposed by this room.

## Optional investigations

- **Relay junction:** The connection label identifies an outgoing municipal channel. You photograph its configuration; the same line could carry evidence instead of the bell.

## Hint ladder

1. The service log describes a delay, not a demolition.
2. Bypass before tension.
3. Bypass, tension, brake.

## Acceptance

Early operation must refuse missing records. Wrong inputs must remain recoverable. Repeated inspection or solved operation must not duplicate rewards. Successful operation must finish the Sequence's operate node; a departure without that state is rejected.
