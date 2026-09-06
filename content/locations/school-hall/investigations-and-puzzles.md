# School Hall: investigation contract

## Entry requirements

Enter through Bell Tower Base. Essential clue requirements are `names-first-four`, `school-order`.

## Concrete player route

1. Inspect **School photographs**. Read its actual record in the scene script. The journal receives `names-first-four`.
2. Inspect **June’s slate**. Read its actual record in the scene script. The journal receives `school-order`.

Operate **Class register** after those records are available.

**Keep both records:** Match anchor, fern, gull and wave in order.

Available controls: June Arlen / Tomas Reed / Ada Wren / Niko Bell.

Exact solution: **June Arlen → Tomas Reed → Ada Wren → Niko Bell**.

Partial correct answers stay in the current controls. A wrong input clears that attempt and adds up to 12 seconds of exposure within the room's nonnegative limit; it never destroys evidence. Closing/reopening controls restarts an unfinished attempt. Reading the journal freezes pressure; operating controls does not.

Wrong response: The two records disagree with that placement. Nothing is overwritten. Compare the photograph captions again.

Success response: The First Register opens. Four identities are cross-checked, and their chosen aliases remain intact. The thirteenth position records an apparatus, not a thirteenth child.

Success grants `register` exactly once.

No additional exit inventory condition is imposed by this room.

## Optional investigations

- **Speak to June:** Mara: “I will leave the name you chose beside the one they wrote.” June: “Then you have learned more than the teacher.” Her reflection closes the book. You do not ask her to perform another answer.

## Hint ladder

1. Use both the photographs and letters.
2. The order is anchor, fern, gull, wave.
3. June, Tomas, Ada, Niko.

## Acceptance

Early operation must refuse missing records. Wrong inputs must remain recoverable. Repeated inspection or solved operation must not duplicate rewards. Successful operation must finish the Sequence's operate node; a departure without that state is rejected.
