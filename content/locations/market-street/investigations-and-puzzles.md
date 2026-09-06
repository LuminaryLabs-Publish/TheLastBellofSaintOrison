# Market Street: investigation contract

## Entry requirements

Enter through Closed Café. Essential clue requirements are `shutter-order`. Collect `lantern` before operation.

## Concrete player route

1. Inspect **Freight safety plate**. Read its actual record in the scene script. The journal receives `shutter-order`.
2. Inspect **Abandoned service lantern**. Read its actual record in the scene script.  Collect `lantern` once.

Operate **Shutter winch** after those records are available.

**Keep a way open:** Secure the crossing using the safety procedure.

Available controls: Pin the counterweight / Raise the shutter / Engage the catch.

Exact solution: **Pin the counterweight → Raise the shutter → Engage the catch**.

Partial correct answers stay in the current controls. A wrong input clears that attempt and adds up to 12 seconds of exposure within the room's nonnegative limit; it never destroys evidence. Closing/reopening controls restarts an unfinished attempt. Reading the journal freezes pressure; operating controls does not.

Wrong response: The handle stops against its interlock. You remain on the safe side. Start with the counterweight.

Success response: The catch locks with a clear metallic click. The crossing remains open without your weight on the handle.

Success commits solved state; evidence rewards are described by observations and departures.

No additional exit inventory condition is imposed by this room.

## Optional investigations

- **Repair stall:** A bent return-route sign lies beneath a tarpaulin. You straighten it and point it toward the safe freight alcove. Somebody following you will not have to guess.

## Hint ladder

1. The plate gives the procedure.
2. Secure the weight before moving the shutter.
3. Pin, raise, engage.

## Acceptance

Early operation must refuse missing records. Wrong inputs must remain recoverable. Repeated inspection or solved operation must not duplicate rewards. Successful operation must finish the Sequence's operate node; a departure without that state is rejected.
