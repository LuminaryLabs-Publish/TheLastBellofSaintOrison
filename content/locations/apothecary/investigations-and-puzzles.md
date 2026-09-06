# Apothecary: investigation contract

## Entry requirements

Enter through Market Street. Essential clue requirements are `resin-test`, `lantern-limits`.

## Concrete player route

1. Inspect **Resin preparation**. Read its actual record in the scene script. The journal receives `resin-test`.
2. Inspect **Keeper’s note**. Read its actual record in the scene script. The journal receives `lantern-limits`.

Operate **Sample bench** after those records are available.

**Choose the tested treatment:** Which sample passes all three observations?

Available controls: Round red seal · soot / Square green seal · damp / Triangular blue seal · dry.

Exact solution: **Triangular blue seal · dry**.

Partial correct answers stay in the current controls. A wrong input clears that attempt and adds up to 12 seconds of exposure within the room's nonnegative limit; it never destroys evidence. Closing/reopening controls restarts an unfinished attempt. Reading the journal freezes pressure; operating controls does not.

Wrong response: This sample failed its recorded test. You leave it sealed and do not waste the service lantern.

Success response: You bottle the blue-sealed resin. Open your satchel and combine it with the service lantern. The result will slow exposure below the town.

Success grants `resin` exactly once.

Before departure, the inventory must contain `protectedLantern`. Combine the service lantern with tested resin in the satchel; both components are replaced by one treated lantern.

## Optional investigations

- **Dispensing drawer:** A clinical note states that the affected patients were deprived of oxygen before any supernatural event was recorded. Someone tried to make the phenomenon an alibi.

## Hint ladder

1. All three conditions must pass.
2. Reject soot and moisture.
3. Choose the triangular blue seal.

## Acceptance

Early operation must refuse missing records. Wrong inputs must remain recoverable. Repeated inspection or solved operation must not duplicate rewards. Successful operation must finish the Sequence's operate node; a departure without that state is rejected.
