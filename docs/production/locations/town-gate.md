# Town Gate

Read the crossing notice, then open a safe route into town.

Source: src/kits/locations/town-gate

## dialogue

```json
{
  "arrival": "Salt gathers on the envelope in your coat. Elian’s cassette arrived yesterday, though she has been missing for eleven days. Ahead, the gatehouse light moves across an empty crossing. Beyond it stands the hospital’s bell tower. You are Mara Venn. You came to find your sister, not to give this place another name.",
  "lines": [],
  "note": "Existing quoted speech is preserved verbatim in observations; add separately identified conversation lines here."
}
```

## observations

```json
[
  {
    "id": "notice",
    "text": "WAIT THROUGH TWO BELLS. CROSS ON THE DARK LAMP. Under the official lettering, someone has scratched: Do not answer the visitor intercom with a name. You copy the warning exactly."
  },
  {
    "id": "callbox",
    "text": "“Visitor?” The voice is yours, with an old childhood hesitation. Three photograph badges hang below: red anchor, white fern, black gull. The fourth roster line has no photograph. A blank record is different from an offered name."
  },
  {
    "id": "latch",
    "text": "A mechanical selector waits beneath the roster. Its empty line is a real selectable entry, not a missing label."
  },
  {
    "id": "marks",
    "text": "Inside the dependable shelter, arrows cut into the stone lead toward an unlit service passage. Their white ends point back to the road. You record the return direction."
  }
]
```

## investigations

```json
[
  {
    "id": "primary",
    "goal": "Read the crossing notice, then open a safe route into town.",
    "required": [
      "crossing-rule",
      "blank-record"
    ],
    "puzzleId": "primary",
    "requiredItem": null,
    "reward": "key"
  }
]
```

## puzzles

```json
[
  {
    "id": "primary",
    "title": "The visitor register",
    "question": "What will you submit to the intercom?",
    "options": [
      "Mara Venn",
      "Elian Venn",
      "The blank record"
    ],
    "answer": [
      2
    ],
    "success": "The printer produces a blank visitor pass and an intake key. “Present,” says the intercom. You have opened a route without offering a living identity.",
    "wrong": "The speaker repeats the offered name. You withdraw the selector before confirming. The blank row remains available.",
    "hints": [
      "The warning says not to offer a name.",
      "A record can be empty without being absent.",
      "Submit the blank record."
    ]
  }
]
```

## choices

```json
[
  {
    "id": "shelter",
    "label": "Wait in shelter; cross on the dark lamp",
    "text": "You wait through both bells. When the lamp dies, you cross without looking toward the footsteps."
  },
  {
    "id": "passage",
    "label": "Take the marked maintenance passage",
    "text": "You follow the carved arrow through the gatehouse wall. A second arrow marks a return route.",
    "flag": "gateMarks"
  }
]
```

## pressure

```json
{
  "pressure": 150,
  "warning": "The indicator turns amber. A second bell is gathering in the iron.",
  "critical": "A figure stands inside the fog. The shelter is still open.",
  "retreat": "You step behind the stone recess. Something crosses where you were standing. It never enters the marked shelter."
}
```