# Flooded Archive: investigation contract

## Entry requirements

Enter through School Hall. Essential clue requirements are `archive-index`, `archive-safe`.

## Concrete player route

1. Inspect **Archive index**. Read its actual record in the scene script. The journal receives `archive-index`.
2. Inspect **Pump instructions**. Read its actual record in the scene script. The journal receives `archive-safe`.

Operate **Indexed records cabinet** after those records are available.

**Find the actual order:** Select the indexed department, equipment and time.

Available controls: Clinical / Oxygen / 02:13 / Admissions / Bell repairs.

Exact solution: **Clinical → Oxygen → 02:13**.

Partial correct answers stay in the current controls. A wrong input clears that attempt and adds up to 12 seconds of exposure within the room's nonnegative limit; it never destroys evidence. Closing/reopening controls restarts an unfinished attempt. Reading the journal freezes pressure; operating controls does not.

Wrong response: The index does not reference that combination. The drawer stays sealed and the record remains safe.

Success response: The protective drawer opens. At 02:13 the oxygen supply was shut off by order, not accident. You photograph the record. The tethered carbon case can now be recovered as stronger public proof.

Success commits solved state; evidence rewards are described by observations and departures.

No additional exit inventory condition is imposed by this room.

## Optional investigations

- **Waterproof carbon case:** The carbon impression matches the signed order. You lift the case by its tether rather than crossing the unstable far shelf. The original will let others inspect the proof for themselves. Available only after the required mechanism is solved.

## Hint ladder

1. Start from the index desk.
2. Three fields identify the record.
3. Clinical, Oxygen, 02:13.

## Acceptance

Early operation must refuse missing records. Wrong inputs must remain recoverable. Repeated inspection or solved operation must not duplicate rewards. Successful operation must finish the Sequence's operate node; a departure without that state is rejected.
