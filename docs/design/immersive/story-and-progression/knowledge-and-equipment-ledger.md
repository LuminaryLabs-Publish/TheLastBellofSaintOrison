# Knowledge and Equipment Ledger

**Target design specification; not implemented gameplay.**

| Source location | Required knowledge | Original evidence object IDs | Target encounter |
|---|---|---|---|
| town-gate | `crossing-rule` | `notice` | TG-01 |
| town-gate | `blank-record` | `callbox` | TG-02 |
| visitor-centre | `map-circuit` | `diagram` | VC-01 |
| visitor-centre | `cafe-lead` | `book` | VC-02 |
| closed-cafe | `true-signal` | `tape` | CF-01 |
| closed-cafe | `radio-channels` | `receipt` | CF-01 |
| market-street | `shutter-order` | `plate` | MS-01 |
| apothecary | `resin-test` | `recipe` | AP-01 |
| apothecary | `lantern-limits` | `note` | AP-01 |
| bell-tower-base | `governor-order` | `log` | BT-01 |
| bell-tower-base | `silence-method` | `stair` | BT-02 |
| school-hall | `names-first-four` | `photos` | SH-01 |
| school-hall | `school-order` | `lesson` | SH-02 |
| flooded-archive | `archive-safe` | `pump` | FA-01 |
| flooded-archive | `archive-index` | `index` | FA-02 |
| chapel-nave | `vessel-truth` | `confession` | CN-01 |
| chapel-nave | `elian-location` | `line` | CN-01 |
| parish-house | `safe-code` | `photos` | PH-01 |
| parish-house | `family-history` | `letter` | PH-02 |
| maintenance-tunnels | `tunnel-order` | `plate` | MT-01 |
| maintenance-tunnels | `container-proof` | `window` | MT-02 |
| well-chamber | `names-second-four` | `names` | WC-02 |
| well-chamber | `ending-methods` | `methods` | WC-02 |
| return-ascent | `return-order` | `route` | RA-01 |
| return-ascent | `elian-return` | `station` | RA-01 |
| town-square | `public-record` | `board` | TS-01 |
| town-square | `evidence-boundary` | `satchel` | TS-01 |
| exit-road | `last-listen` | `cassette` | ER-01 |
| exit-road | `last-look` | `road` | ER-01 |

## Item chain
- New journey: cassette is already carried. It is never consumed by a comparison.
- TG-02: grant key once; VC-02 uses the same key and retains it.
- MS-02: collect lantern before Market departure.
- AP-01: observe both resin-test and lantern-limits, then grant resin. AP-02 combines lantern and resin into protectedLantern before departure. A fixture supplies reusable test quantities; no new consumable economy is implied.
- SH-02: First Register contains the four corroborated identities with chosen aliases.
- FA-03: original carbon case grants archive and originalSaved only on retrieval. A photograph-only route remains valid for Silence and Vessel. An original already held is never removed by choosing photo later.
- PH-01 exposes the safe; PH-02 records family-history, takes chalk and collects the relay contract. This split avoids attempting legacy primary completion before its source prerequisites exist.
- WC-01 makes core accessible; WC-02 supplies required evidence. Grant core and primary completion only after both finish.

## Prohibited shortcuts
Do not add a second district key, require optional lore, grant archive on entering the room, or invent a thirteenth child. A tool such as the café hook is a tethered local control, not a new permanent inventory dependency. Marker and recording-copy props do not silently expand the current inventory schema.
