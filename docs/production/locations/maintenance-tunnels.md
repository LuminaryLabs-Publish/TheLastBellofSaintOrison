# Maintenance Tunnels

Follow the utility markings and preserve a return route.

Source: src/kits/locations/maintenance-tunnels

## dialogue

```json
{
  "arrival": "The treated lantern warms the first junction. Physical pipes continue through the walls even when the sounds suggest another corridor. A survey plate describes the safe utility route. You can mark the return before the town changes around it.",
  "lines": [],
  "note": "Existing quoted speech is preserved verbatim in observations; add separately identified conversation lines here."
}
```

## observations

```json
[
  {
    "id": "plate",
    "text": "Safe survey order: OPEN EYE, MOUTH, CLOSED EYE, EMPTY CIRCLE. The symbols mean observe, refuse the invitation, ignore the lure, leave an unclaimed place. Their shapes are embossed as well as painted."
  },
  {
    "id": "window",
    "text": "Below the glass, acoustic tubes end in empty masks. Recorded names feed a single resonator. There are twelve patient channels and one container. The machinery confirms what Elian said: the Thirteenth is not a person to recover."
  },
  {
    "id": "junction",
    "text": "Four pipe gates carry the embossed survey symbols. The service plan defines their safe order."
  },
  {
    "id": "mark",
    "text": "The raised stone beside the junction is dry enough for waterproof survey chalk. A clear return arrow will survive the lanterns."
  }
]
```

## investigations

```json
[
  {
    "id": "primary",
    "goal": "Follow the utility markings and preserve a return route.",
    "required": [
      "tunnel-order",
      "container-proof"
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
    "title": "A route that can be checked",
    "question": "Follow the physical survey order.",
    "options": [
      "Open eye",
      "Mouth",
      "Closed eye",
      "Empty circle"
    ],
    "answer": [
      0,
      1,
      2,
      3
    ],
    "success": "The gates open toward the count chamber. You can trace the route by its continuous pipes; the disembodied directions fall silent.",
    "wrong": "That gate loops back to the same marked junction. No equipment is lost. Use the embossed survey plate.",
    "hints": [
      "The plate is a physical record.",
      "Observe, refuse, ignore, leave empty.",
      "Open eye, mouth, closed eye, empty circle."
    ]
  }
]
```

## choices

```json
[
  {
    "id": "direct",
    "label": "Continue along the verified pipes",
    "text": "You remember the pipe route, but leave no extra marker."
  },
  {
    "id": "mark",
    "label": "Chalk the return direction before proceeding",
    "text": "A white arrow points back to the pump niche. The later ascent will have a reliable landmark.",
    "flag": "returnMarked"
  }
]
```

## pressure

```json
{
  "pressure": 125,
  "warning": "The voice behind you takes the sound of your own footsteps.",
  "critical": "The far light dies. Your chalk marks remain visible.",
  "retreat": "You return to the pump niche using the pipes you can touch. The voice keeps walking beyond it."
}
```