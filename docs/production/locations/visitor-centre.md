# Visitor Centre

Restore the map and establish Elian’s next stop.

Source: src/kits/locations/visitor-centre

## dialogue

```json
{
  "arrival": "The visitor centre smells of warm paper. Every chair faces the illuminated town map. An evacuation notice has yesterday’s date, but the visitor book was signed this morning. Elian has drawn a small wave beside her entry. She did not leave by the road.",
  "lines": [],
  "note": "Existing quoted speech is preserved verbatim in observations; add separately identified conversation lines here."
}
```

## observations

```json
[
  {
    "id": "diagram",
    "text": "The map transformer is isolated from the building supply. The diagram reads: disconnect RED, connect BLUE, then connect AMBER. The small circuit powers only the map. You will not touch the building mains."
  },
  {
    "id": "book",
    "text": "ELIAN VENN — CAFÉ, 07:10. Her note reads: “They sent everyone home except the people who remembered.” Beneath it, the clerk has stamped TRANSFERRED instead of DEPARTED."
  },
  {
    "id": "cabinet",
    "text": "Three low-voltage toggles sit inside an insulated enclosure. Their symbols match the circuit diagram."
  },
  {
    "id": "staff",
    "text": "Two columns share the same names: DEPARTED and RETAINED. The carbon sheet reveals a deliberate change, not a clerical error. You photograph both layers."
  }
]
```

## investigations

```json
[
  {
    "id": "primary",
    "goal": "Restore the map and establish Elian’s next stop.",
    "required": [
      "map-circuit",
      "cafe-lead"
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
    "title": "Bring the map online",
    "question": "Operate the circuit in the documented order.",
    "options": [
      "Disconnect red",
      "Connect blue",
      "Connect amber"
    ],
    "answer": [
      0,
      1,
      2
    ],
    "success": "The map lights in sections. A chalk line links the Café, market and bell tower. Beside the hospital, an underground route has been rubbed out.",
    "wrong": "The safety breaker opens. No fuse is consumed. Re-read the diagram and reset the sequence.",
    "hints": [
      "Use the cabinet’s diagram, not the announcement.",
      "Isolate before reconnecting.",
      "Red off, blue on, amber on."
    ]
  }
]
```

## choices

```json
[
  {
    "id": "front",
    "label": "Follow Elian’s café entry",
    "text": "You take the street named in the visitor book."
  },
  {
    "id": "service",
    "label": "Follow the evacuation staff route",
    "text": "The route passes the same café, behind its delivery door. The evacuation list stays with your evidence.",
    "flag": "selectiveEvacuation"
  }
]
```

## pressure

```json
{
  "pressure": 155,
  "warning": "The first bank of fluorescent tubes goes dark.",
  "critical": "The announcement loses its words. Only the shape of your name remains.",
  "retreat": "The service cabinet has a manual isolation switch. You turn it off and wait in the daylight panel by the door."
}
```