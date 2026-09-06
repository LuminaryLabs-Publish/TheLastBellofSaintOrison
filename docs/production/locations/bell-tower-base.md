# Bell Tower Base

Learn the bell cycle and choose how to interrupt it.

Source: src/kits/locations/bell-tower-base

## dialogue

```json
{
  "arrival": "A huge shaft turns above the maintenance platform. Each revolution pulls a cable into the hospital below. The governor can delay one cycle without breaking the transmission line. A crowbar offers a faster, permanent silence for this local mechanism.",
  "lines": [],
  "note": "Existing quoted speech is preserved verbatim in observations; add separately identified conversation lines here."
}
```

## observations

```json
[
  {
    "id": "log",
    "text": "For a non-destructive delay: open BYPASS, release TENSION, engage BRAKE. The relay stays connected. A warning below says breaking the shaft severs the public transmission route."
  },
  {
    "id": "stair",
    "text": "The three resonant braces are struck OUTER, INNER, OUTER to fracture an isolated core. Disconnect the relay before attempting it. You copy the diagram; this could end the vessel without replacing its occupant."
  },
  {
    "id": "governor",
    "text": "Three hand controls correspond to the service log. A fourth, red-painted shaft can be broken only after an explicit choice."
  },
  {
    "id": "relay",
    "text": "The connection label identifies an outgoing municipal channel. You photograph its configuration; the same line could carry evidence instead of the bell."
  }
]
```

## investigations

```json
[
  {
    "id": "primary",
    "goal": "Learn the bell cycle and choose how to interrupt it.",
    "required": [
      "governor-order",
      "silence-method"
    ],
    "puzzleId": "primary",
    "requiredItem": null,
    "reward": null
  }
]
```

## puzzles

```json
[
  {
    "id": "primary",
    "title": "Delay the ring",
    "question": "Operate the non-destructive governor procedure.",
    "options": [
      "Open bypass",
      "Release tension",
      "Engage brake"
    ],
    "answer": [
      0,
      1,
      2
    ],
    "success": "The governor settles. One cycle has been delayed, and the relay remains intact. You can keep this arrangement or choose the destructive shortcut before leaving.",
    "wrong": "The safety gate closes over the controls. You release them and return to the documented starting position.",
    "hints": [
      "The service log describes a delay, not a demolition.",
      "Bypass before tension.",
      "Bypass, tension, brake."
    ]
  }
]
```

## choices

```json
[
  {
    "id": "preserve",
    "label": "Leave the relay intact",
    "text": "You preserve the channel. The later Witness transmission remains possible.",
    "flag": "relayIntact"
  },
  {
    "id": "break",
    "label": "Break the shaft · disables Witness transmission",
    "text": "You strike the red shaft. The outgoing relay snaps. The Silence and Vessel methods remain possible; public transmission through this line does not.",
    "flag": "relayBroken"
  }
]
```

## pressure

```json
{
  "pressure": 140,
  "warning": "The governor’s amber mark approaches the contact plate.",
  "critical": "The platform shivers. The next ring is almost engaged.",
  "retreat": "You step off the marked platform and pull its emergency guard closed."
}
```