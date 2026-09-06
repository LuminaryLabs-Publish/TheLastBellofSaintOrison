# Visitor Centre: investigation contract

## Entry requirements

Enter through Town Gate. Essential clue requirements are `map-circuit`, `cafe-lead`.

## Concrete player route

1. Inspect **Circuit diagram**. Read its actual record in the scene script. The journal receives `map-circuit`.
2. Inspect **Visitor book**. Read its actual record in the scene script. The journal receives `cafe-lead`.

Operate **Map service cabinet** after those records are available.

**Bring the map online:** Operate the circuit in the documented order.

Available controls: Disconnect red / Connect blue / Connect amber.

Exact solution: **Disconnect red → Connect blue → Connect amber**.

Partial correct answers stay in the current controls. A wrong input clears that attempt and adds up to 12 seconds of exposure within the room's nonnegative limit; it never destroys evidence. Closing/reopening controls restarts an unfinished attempt. Reading the journal freezes pressure; operating controls does not.

Wrong response: The safety breaker opens. No fuse is consumed. Re-read the diagram and reset the sequence.

Success response: The map lights in sections. A chalk line links the Café, market and bell tower. Beside the hospital, an underground route has been rubbed out.

Success commits solved state; evidence rewards are described by observations and departures.

No additional exit inventory condition is imposed by this room.

## Optional investigations

- **Staff evacuation list:** Two columns share the same names: DEPARTED and RETAINED. The carbon sheet reveals a deliberate change, not a clerical error. You photograph both layers.

## Hint ladder

1. Use the cabinet’s diagram, not the announcement.
2. Isolate before reconnecting.
3. Red off, blue on, amber on.

## Acceptance

Early operation must refuse missing records. Wrong inputs must remain recoverable. Repeated inspection or solved operation must not duplicate rewards. Successful operation must finish the Sequence's operate node; a departure without that state is rejected.
