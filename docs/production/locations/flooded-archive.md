# Flooded Archive

Recover the shutoff record and its carbon original.

Source: src/kits/locations/flooded-archive

## dialogue

```json
{
  "arrival": "Water presses paper against the lower shelves. The index desk is raised above the flood. A pump can expose the correct aisle briefly, but searching every cabinet would lose the record you actually need. You begin with the index, not the water.",
  "lines": [],
  "note": "Existing quoted speech is preserved verbatim in observations; add separately identified conversation lines here."
}
```

## observations

```json
[
  {
    "id": "index",
    "text": "The card reads: CLINICAL → OXYGEN → 02:13. The carbon original is stored separately in a waterproof case. The official ledger calls the deaths a fever event; the equipment order records a deliberate shutoff."
  },
  {
    "id": "pump",
    "text": "The pump must discharge toward the street drain, not the records sump. Its hand control grants one safe crossing. The raised walkway remains available if the water returns."
  },
  {
    "id": "cabinet",
    "text": "Three selector wheels search department, equipment and recorded time. You can operate them from the raised walkway."
  },
  {
    "id": "carbon",
    "text": "The carbon impression matches the signed order. You lift the case by its tether rather than crossing the unstable far shelf. The original will let others inspect the proof for themselves."
  }
]
```

## investigations

```json
[
  {
    "id": "primary",
    "goal": "Recover the shutoff record and its carbon original.",
    "required": [
      "archive-index",
      "archive-safe"
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
    "title": "Find the actual order",
    "question": "Select the indexed department, equipment and time.",
    "options": [
      "Clinical",
      "Oxygen",
      "02:13",
      "Admissions",
      "Bell repairs"
    ],
    "answer": [
      0,
      1,
      2
    ],
    "success": "The protective drawer opens. At 02:13 the oxygen supply was shut off by order, not accident. You photograph the record. The tethered carbon case can now be recovered as stronger public proof.",
    "wrong": "The index does not reference that combination. The drawer stays sealed and the record remains safe.",
    "hints": [
      "Start from the index desk.",
      "Three fields identify the record.",
      "Clinical, Oxygen, 02:13."
    ]
  }
]
```

## choices

```json
[
  {
    "id": "photo",
    "label": "Leave with the photographed record",
    "text": "You leave with the records you gathered. Any original proof already recovered remains protected in your satchel."
  },
  {
    "id": "original",
    "label": "Recover the tethered carbon original",
    "text": "You bring out the waterproof case. Public evidence need not depend on your testimony alone.",
    "item": "archive",
    "flag": "originalSaved"
  }
]
```

## pressure

```json
{
  "pressure": 135,
  "warning": "Water reaches the first red mark on the shelf legs.",
  "critical": "The far shelf tilts. The raised exit is still clear.",
  "retreat": "You return to the raised index desk. The pump’s reserve tank drains the nearest aisle; essential records remain in their protective cases."
}
```