# Apothecary

Test the resin, then prepare the lantern.

Source: src/kits/locations/apothecary

## dialogue

```json
{
  "arrival": "Bottles crowd the window, turning streetlight green. The dispensing bench holds three samples and an intact test lamp. A handwritten warning separates two ideas: a flame can protect your breathing, but it cannot protect your judgment.",
  "lines": [],
  "note": "Existing quoted speech is preserved verbatim in observations; add separately identified conversation lines here."
}
```

## observations

```json
[
  {
    "id": "recipe",
    "text": "The treatment must burn amber, leave no black residue and keep the test strip dry. Red seal: black soot. Green seal: wet strip. Blue seal: clear glass and a dry strip. These observations are written beside the used samples."
  },
  {
    "id": "note",
    "text": "“Do not trust a voice because your lamp stays lit. The resin limits the acoustic dust; it does not turn a copy into a person.” At the bottom Elian has written: “Ask what I called the sea.”"
  },
  {
    "id": "bench",
    "text": "Each sample has a used test strip and a differently shaped seal. The blue seal is triangular, the red round, the green square."
  },
  {
    "id": "drawer",
    "text": "A clinical note states that the affected patients were deprived of oxygen before any supernatural event was recorded. Someone tried to make the phenomenon an alibi."
  }
]
```

## investigations

```json
[
  {
    "id": "primary",
    "goal": "Test the resin, then prepare the lantern.",
    "required": [
      "resin-test",
      "lantern-limits"
    ],
    "puzzleId": "primary",
    "requiredItem": null,
    "reward": "resin"
  }
]
```

## puzzles

```json
[
  {
    "id": "primary",
    "title": "Choose the tested treatment",
    "question": "Which sample passes all three observations?",
    "options": [
      "Round red seal · soot",
      "Square green seal · damp",
      "Triangular blue seal · dry"
    ],
    "answer": [
      2
    ],
    "success": "You bottle the blue-sealed resin. Open your satchel and combine it with the service lantern. The result will slow exposure below the town.",
    "wrong": "This sample failed its recorded test. You leave it sealed and do not waste the service lantern.",
    "hints": [
      "All three conditions must pass.",
      "Reject soot and moisture.",
      "Choose the triangular blue seal."
    ]
  }
]
```

## choices

```json
[
  {
    "id": "street",
    "label": "Carry the treated lantern to the tower",
    "text": "The flame burns steadily. You remember what it cannot promise."
  },
  {
    "id": "clinical",
    "label": "Take the clinical note as well",
    "text": "You preserve the note that separates the human crime from the phenomenon.",
    "flag": "clinicalEvidence"
  }
]
```

## pressure

```json
{
  "pressure": 155,
  "warning": "Smoke gathers in the doorway although nothing is burning there.",
  "critical": "The back-room glass darkens from the inside.",
  "retreat": "You close the fire screen and return to the ventilated dispensing window."
}
```