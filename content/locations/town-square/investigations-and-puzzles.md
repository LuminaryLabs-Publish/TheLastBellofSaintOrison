# Town Square: investigation contract

## Entry requirements

Enter through Return Ascent. Essential clue requirements are `public-record`, `evidence-boundary`.

## Concrete player route

1. Inspect **Public notice stand**. Read its actual record in the scene script. The journal receives `public-record`.
2. Inspect **Review the evidence**. Read its actual record in the scene script. The journal receives `evidence-boundary`.

Operate **Prepare your account** after those records are available.

**What can be said:** Choose the statement supported by your records.

Available controls: I can prove every voice was truthful / Here is the proof, testimony and what remains unknown / Nothing happened here.

Exact solution: **Here is the proof, testimony and what remains unknown**.

Partial correct answers stay in the current controls. A wrong input clears that attempt and adds up to 12 seconds of exposure within the room's nonnegative limit; it never destroys evidence. Closing/reopening controls restarts an unfinished attempt. Reading the journal freezes pressure; operating controls does not.

Wrong response: That would replace one convenient story with another. You return to the evidence and its limits.

Success response: You lay out the records and label their limits. The residents can keep copies. No single person has to become the town’s memory again.

Success commits solved state; evidence rewards are described by observations and departures.

No additional exit inventory condition is imposed by this room.

## Optional investigations

- **Father Vale at the fountain:** Vale: “Will they forgive us?” Mara: “That is not a task I can complete for you.” You leave him with his signed confession and a choice to repeat it publicly.

## Hint ladder

1. Separate proof from testimony.
2. Unknowns belong in an honest account.
3. Offer proof, testimony and the remaining unknowns.

## Acceptance

Early operation must refuse missing records. Wrong inputs must remain recoverable. Repeated inspection or solved operation must not duplicate rewards. Successful operation must finish the Sequence's operate node; a departure without that state is rejected.
