# Exit Road

Acknowledge the consequence and decide what you carry home.

Source: src/kits/locations/exit-road

## dialogue

```json
{
  "arrival": "The gatehouse fan turns in the morning air. The fourth roster line is still blank unless you offered your pattern below. You stop where the cassette first played. The sea sounds larger now that nothing is trying to speak over it.",
  "lines": [],
  "note": "Existing quoted speech is preserved verbatim in observations; add separately identified conversation lines here."
}
```

## observations

```json
[
  {
    "id": "cassette",
    "text": "Elian: “The long breathing.” You let the recording reach its ordinary click at the end. An old message does not need to answer a new question."
  },
  {
    "id": "road",
    "text": "The tower is a structure again. Some windows are broken, some are lit, and people will have to decide what to do with both. Your intervention changed the town. It did not replace the work of living in it."
  },
  {
    "id": "letter",
    "text": "A blank page rests against your satchel. You can begin without pretending the account is complete."
  },
  {
    "id": "elian",
    "text": "You leave space beside you without calling a name into the gate. What she remembers depends on your intervention. What you owe her does not."
  }
]
```

## investigations

```json
[
  {
    "id": "primary",
    "goal": "Acknowledge the consequence and decide what you carry home.",
    "required": [
      "last-listen",
      "last-look"
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
    "title": "The first line",
    "question": "How will your account begin?",
    "options": [
      "Everything is fixed",
      "This is what I can tell you",
      "There is nothing to remember"
    ],
    "answer": [
      1
    ],
    "success": "You write one honest sentence. The road ahead is ordinary, and that is enough to begin.",
    "wrong": "The sentence closes a question you have not answered. You turn to a clean line.",
    "hints": [
      "The whole story does not have to fit one sentence.",
      "Leave room for what remains unknown.",
      "This is what I can tell you."
    ]
  }
]
```

## choices

```json
[
  {
    "id": "home",
    "label": "Leave Saint Orison",
    "text": "You walk toward the sea road with the record and its consequences."
  },
  {
    "id": "stay",
    "label": "Stay until the record is safely copied",
    "text": "You delay your departure for an ordinary responsibility: ensuring the papers can outlast you.",
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
  "retreat": "For once there is no pressure to move."
}
```