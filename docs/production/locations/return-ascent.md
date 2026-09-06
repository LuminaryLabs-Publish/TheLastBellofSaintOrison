# Return Ascent

Use the verified return route and make it back above ground.

Source: src/kits/locations/return-ascent

## dialogue

```json
{
  "arrival": "The pipes have stopped singing together. Some lights are gone, but the material route still exists. What you repaired, marked or broke now matters. Elian is beside you only if you opened the isolation door; otherwise the archive line speaks from fixed emergency stations.",
  "lines": [],
  "note": "Existing quoted speech is preserved verbatim in observations; add separately identified conversation lines here."
}
```

## observations

```json
[
  {
    "id": "route",
    "text": "The reverse-route instruction reads: EMPTY CIRCLE, CLOSED EYE, MOUTH, OPEN EYE. Even if you left no chalk, the embossed symbols remain. Familiar voices are not a substitute for a physical route."
  },
  {
    "id": "station",
    "text": "Elian: “I can follow the same physical route. Tell me the symbols, not what the voices say.” You explain each junction. If she stayed at the archive station, this line is her way toward the protected upper stair."
  },
  {
    "id": "gates",
    "text": "The selectors open the route in reverse. Their raised symbols can be checked by the lantern or by touch."
  },
  {
    "id": "assist",
    "text": "You hold the local relay long enough for Elian to repeat the return instructions. She chooses her own pace. Helping does not erase the records already secured in your satchel."
  }
]
```

## investigations

```json
[
  {
    "id": "primary",
    "goal": "Use the verified return route and make it back above ground.",
    "required": [
      "return-order",
      "elian-return"
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
    "title": "Reverse the survey",
    "question": "Choose the reverse of the descent route.",
    "options": [
      "Open eye",
      "Mouth",
      "Closed eye",
      "Empty circle"
    ],
    "answer": [
      3,
      2,
      1,
      0
    ],
    "success": "The upper gate releases. You reach the parish stair with the core’s consequence behind you and your evidence still accounted for.",
    "wrong": "The selected passage returns to the pump niche. The raised reverse-route plate remains readable.",
    "hints": [
      "The return plate reverses the descent.",
      "Begin at the empty circle.",
      "Empty circle, closed eye, mouth, open eye."
    ]
  }
]
```

## choices

```json
[
  {
    "id": "leave",
    "label": "Continue to the square",
    "text": "You take the upper stair. Elian’s route follows the instructions you gave."
  },
  {
    "id": "help",
    "label": "Hold the line until Elian confirms her route",
    "text": "“Open eye,” she says at the last junction. This time the answer comes from a person who can leave.",
    "flag": "elianHelped"
  }
]
```

## pressure

```json
{
  "pressure": 115,
  "warning": "Water strikes the pump housing from the wrong side.",
  "critical": "The upper service gate begins to settle into its frame.",
  "retreat": "You shelter in the pump niche. Its mechanical hand release still works after the bell’s intervention."
}
```