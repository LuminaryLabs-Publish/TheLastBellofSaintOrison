# Town Gate: investigation contract

## Entry requirements

Enter through the new-game flow. Essential clue requirements are `crossing-rule`, `blank-record`.

## Concrete player route

1. Inspect **Crossing notice**. Read its actual record in the scene script. The journal receives `crossing-rule`.
2. Inspect **Visitor intercom**. Read its actual record in the scene script. The journal receives `blank-record`.

Operate **Gatehouse roster** after those records are available.

**The visitor register:** What will you submit to the intercom?

Available controls: Mara Venn / Elian Venn / The blank record.

Exact solution: **The blank record**.

Partial correct answers stay in the current controls. A wrong input clears that attempt and adds up to 12 seconds of exposure within the room's nonnegative limit; it never destroys evidence. Closing/reopening controls restarts an unfinished attempt. Reading the journal freezes pressure; operating controls does not.

Wrong response: The speaker repeats the offered name. You withdraw the selector before confirming. The blank row remains available.

Success response: The printer produces a blank visitor pass and an intake key. “Present,” says the intercom. You have opened a route without offering a living identity.

Success grants `key` exactly once.

No additional exit inventory condition is imposed by this room.

## Optional investigations

- **Maintenance recess:** Inside the dependable shelter, arrows cut into the stone lead toward an unlit service passage. Their white ends point back to the road. You record the return direction.

## Hint ladder

1. The warning says not to offer a name.
2. A record can be empty without being absent.
3. Submit the blank record.

## Acceptance

Early operation must refuse missing records. Wrong inputs must remain recoverable. Repeated inspection or solved operation must not duplicate rewards. Successful operation must finish the Sequence's operate node; a departure without that state is rejected.
