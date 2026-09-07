# Route Review Matrix

**Design traces, not executed gameplay tests.**

The [machine-readable scenarios](../route-scenarios.json) cover every one of the 31 source departures, plus 36 valid combinations of ending, Elian presence, relay integrity, original proof and return marking. Four [eligibility fixtures](../eligibility-fixtures.json) check specific Witness boundaries. The checker evaluates documentary mappings against source identifiers; future runtime tests must replay these routes through real input.

| Scenario | Ending | Chapel | Relay | Archive | Marking |
|---|---|---|---|---|---|
| branch-town-gate-shelter | witness | release | preserve | original | direct |
| branch-town-gate-passage | witness | release | preserve | original | direct |
| branch-visitor-centre-front | witness | release | preserve | original | direct |
| branch-visitor-centre-service | witness | release | preserve | original | direct |
| branch-closed-cafe-record | witness | release | preserve | original | direct |
| branch-closed-cafe-trace | witness | release | preserve | original | direct |
| branch-market-street-direct | witness | release | preserve | original | direct |
| branch-market-street-secure | witness | release | preserve | original | direct |
| branch-apothecary-street | witness | release | preserve | original | direct |
| branch-apothecary-clinical | witness | release | preserve | original | direct |
| branch-bell-tower-base-preserve | witness | release | preserve | original | direct |
| branch-bell-tower-base-break | silence | release | break | original | direct |
| branch-school-hall-copy | witness | release | preserve | original | direct |
| branch-school-hall-ask | witness | release | preserve | original | direct |
| branch-flooded-archive-photo | silence | release | preserve | photo | direct |
| branch-flooded-archive-original | witness | release | preserve | original | direct |
| branch-chapel-nave-release | witness | release | preserve | original | direct |
| branch-chapel-nave-line | witness | line | preserve | original | direct |
| branch-parish-house-utility | witness | release | preserve | original | direct |
| branch-parish-house-letter | witness | release | preserve | original | direct |
| branch-maintenance-tunnels-direct | witness | release | preserve | original | direct |
| branch-maintenance-tunnels-mark | witness | release | preserve | original | mark |
| branch-well-chamber-witness | witness | release | preserve | original | direct |
| branch-well-chamber-silence | silence | release | preserve | original | direct |
| branch-well-chamber-vessel | vessel | release | preserve | original | direct |
| branch-return-ascent-leave | witness | release | preserve | original | direct |
| branch-return-ascent-help | witness | release | preserve | original | direct |
| branch-town-square-copies | witness | release | preserve | original | direct |
| branch-town-square-originals | witness | release | preserve | original | direct |
| branch-exit-road-home | witness | release | preserve | original | direct |
| branch-exit-road-stay | witness | release | preserve | original | direct |
| boundary-witness-1011 | witness | release | preserve | original | mark |
| boundary-witness-1010 | witness | release | preserve | original | direct |
| boundary-witness-0011 | witness | line | preserve | original | mark |
| boundary-witness-0010 | witness | line | preserve | original | direct |
| boundary-silence-1111 | silence | release | break | original | mark |
| boundary-silence-1110 | silence | release | break | original | direct |
| boundary-silence-1101 | silence | release | break | photo | mark |
| boundary-silence-1100 | silence | release | break | photo | direct |
| boundary-silence-1011 | silence | release | preserve | original | mark |
| boundary-silence-1010 | silence | release | preserve | original | direct |
| boundary-silence-1001 | silence | release | preserve | photo | mark |
| boundary-silence-1000 | silence | release | preserve | photo | direct |
| boundary-silence-0111 | silence | line | break | original | mark |
| boundary-silence-0110 | silence | line | break | original | direct |
| boundary-silence-0101 | silence | line | break | photo | mark |
| boundary-silence-0100 | silence | line | break | photo | direct |
| boundary-silence-0011 | silence | line | preserve | original | mark |
| boundary-silence-0010 | silence | line | preserve | original | direct |
| boundary-silence-0001 | silence | line | preserve | photo | mark |
| boundary-silence-0000 | silence | line | preserve | photo | direct |
| boundary-vessel-1111 | vessel | release | break | original | mark |
| boundary-vessel-1110 | vessel | release | break | original | direct |
| boundary-vessel-1101 | vessel | release | break | photo | mark |
| boundary-vessel-1100 | vessel | release | break | photo | direct |
| boundary-vessel-1011 | vessel | release | preserve | original | mark |
| boundary-vessel-1010 | vessel | release | preserve | original | direct |
| boundary-vessel-1001 | vessel | release | preserve | photo | mark |
| boundary-vessel-1000 | vessel | release | preserve | photo | direct |
| boundary-vessel-0111 | vessel | line | break | original | mark |
| boundary-vessel-0110 | vessel | line | break | original | direct |
| boundary-vessel-0101 | vessel | line | break | photo | mark |
| boundary-vessel-0100 | vessel | line | break | photo | direct |
| boundary-vessel-0011 | vessel | line | preserve | original | mark |
| boundary-vessel-0010 | vessel | line | preserve | original | direct |
| boundary-vessel-0001 | vessel | line | preserve | photo | mark |
| boundary-vessel-0000 | vessel | line | preserve | photo | direct |

At each room compare required knowledge, items, primary completion and chosen departure. Optional original proof is required for Witness only; skipping it still leaves Silence and Vessel. Missing chalk cannot remove the permanent embossed return symbols. Remote Elian cannot be drawn beside Mara. The original case already held survives a later photo departure. After the Well commitment, no optional recovery changes the selected ending.
