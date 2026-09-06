# Exit Road: investigation contract

## Entry requirements

Enter through Town Square. Essential clue requirements are `last-listen`, `last-look`.

## Concrete player route

1. Inspect **The original cassette**. Read its actual record in the scene script. The journal receives `last-listen`.
2. Inspect **Look back at Saint Orison**. Read its actual record in the scene script. The journal receives `last-look`.

Operate **Write the first line home** after those records are available.

**The first line:** How will your account begin?

Available controls: Everything is fixed / This is what I can tell you / There is nothing to remember.

Exact solution: **This is what I can tell you**.

Partial correct answers stay in the current controls. A wrong input clears that attempt and adds up to 12 seconds of exposure within the room's nonnegative limit; it never destroys evidence. Closing/reopening controls restarts an unfinished attempt. Reading the journal freezes pressure; operating controls does not.

Wrong response: The sentence closes a question you have not answered. You turn to a clean line.

Success response: You write one honest sentence. The road ahead is ordinary, and that is enough to begin.

Success commits solved state; evidence rewards are described by observations and departures.

No additional exit inventory condition is imposed by this room.

## Optional investigations

- **Wait for Elian:** You leave space beside you without calling a name into the gate. What she remembers depends on your intervention. What you owe her does not.

## Hint ladder

1. The whole story does not have to fit one sentence.
2. Leave room for what remains unknown.
3. This is what I can tell you.

## Acceptance

Early operation must refuse missing records. Wrong inputs must remain recoverable. Repeated inspection or solved operation must not duplicate rewards. Successful operation must finish the Sequence's operate node; a departure without that state is rejected.
