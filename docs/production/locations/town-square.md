# Town Square

Choose how to share the record without claiming what you cannot prove.

Source: src/kits/locations/town-square

## dialogue

```json
{
  "arrival": "The town square is quiet enough to hear the sea. A few residents wait beside the public notice stand. They ask what happened beneath their homes. You have knowledge, physical evidence and gaps. None of those should be disguised as another.",
  "lines": [],
  "note": "Existing quoted speech is preserved verbatim in observations; add separately identified conversation lines here."
}
```

## observations

```json
[
  {
    "id": "board",
    "text": "The evacuation notice calls the hospital incident a structural failure. There is room beside it for a record that can be inspected, challenged and kept by more than one person."
  },
  {
    "id": "satchel",
    "text": "You separate what you witnessed, what was independently recorded, what Elian told you and what remains unknown. The distinction belongs in the public account."
  },
  {
    "id": "account",
    "text": "The residents are listening. You can give them a truthful account without turning uncertainty into a performance."
  },
  {
    "id": "vale",
    "text": "Vale: “Will they forgive us?” Mara: “That is not a task I can complete for you.” You leave him with his signed confession and a choice to repeat it publicly."
  }
]
```

## investigations

```json
[
  {
    "id": "primary",
    "goal": "Choose how to share the record without claiming what you cannot prove.",
    "required": [
      "public-record",
      "evidence-boundary"
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
    "title": "What can be said",
    "question": "Choose the statement supported by your records.",
    "options": [
      "I can prove every voice was truthful",
      "Here is the proof, testimony and what remains unknown",
      "Nothing happened here"
    ],
    "answer": [
      1
    ],
    "success": "You lay out the records and label their limits. The residents can keep copies. No single person has to become the town’s memory again.",
    "wrong": "That would replace one convenient story with another. You return to the evidence and its limits.",
    "hints": [
      "Separate proof from testimony.",
      "Unknowns belong in an honest account.",
      "Offer proof, testimony and the remaining unknowns."
    ]
  }
]
```

## choices

```json
[
  {
    "id": "copies",
    "label": "Leave copies with the residents",
    "text": "The record begins to exist in more than one place.",
    "flag": "publicCopies"
  },
  {
    "id": "originals",
    "label": "Arrange independent custody of the originals",
    "text": "You identify which papers are originals and which are copies. The residents choose separate custodians.",
    "flag": "publicCopies"
  }
]
```

## pressure

```json
{
  "pressure": 0,
  "warning": "",
  "critical": "",
  "retreat": "You sit on the dry edge of the fountain and let the quiet remain quiet."
}
```