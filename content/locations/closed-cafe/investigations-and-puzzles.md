# Closed Café: investigation contract

## Entry requirements

Enter through Visitor Centre. Essential clue requirements are `true-signal`, `radio-channels`.

## Concrete player route

1. Inspect **Cassette comparison**. Read its actual record in the scene script. The journal receives `true-signal`.
2. Inspect **Counter receipt**. Read its actual record in the scene script. The journal receives `radio-channels`.

Operate **Shortwave radio** after those records are available.

**A voice and a recording:** Select the channel matching the original signal.

Available controls: 81 · inland dispatch / 94 · tide station / 107 · hospital relay.

Exact solution: **94 · tide station**.

Partial correct answers stay in the current controls. A wrong input clears that attempt and adds up to 12 seconds of exposure within the room's nonnegative limit; it never destroys evidence. Closing/reopening controls restarts an unfinished attempt. Reading the journal freezes pressure; operating controls does not.

Wrong response: The voice is convincing, but its signal does not match your cassette. You switch it off.

Success response: The gull cries, followed by two bells. Under the noise, Elian says, “Follow the service lanterns. Do not let them tell you I was taken. I chose to interrupt the relay.”

Success commits solved state; evidence rewards are described by observations and departures.

No additional exit inventory condition is imposed by this room.

## Optional investigations

- **Kitchen recorder:** From the threshold you see a loop of tape feeding through a recorder. Its power cable runs into a municipal junction, not a wall socket. You photograph the connection without entering.

## Hint ladder

1. The tape contains a tide signal.
2. The receipt identifies the station.
3. Tune to 94.

## Acceptance

Early operation must refuse missing records. Wrong inputs must remain recoverable. Repeated inspection or solved operation must not duplicate rewards. Successful operation must finish the Sequence's operate node; a departure without that state is rejected.
