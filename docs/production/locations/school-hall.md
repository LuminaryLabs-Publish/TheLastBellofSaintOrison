# School Hall

Cross-check four identities without erasing chosen aliases.

Source: src/kits/locations/school-hall

## dialogue

```json
{
  "arrival": "The schoolroom belongs to the old hospital estate. Twelve desks face a slate board; a thirteenth position has no desk. In the glass you see a child turning a page. When you turn, only the page has moved. June speaks from the reflection: “Say what you can prove.”",
  "lines": [],
  "note": "Existing quoted speech is preserved verbatim in observations; add separately identified conversation lines here."
}
```

## observations

```json
[
  {
    "id": "photos",
    "text": "Two independent records agree: anchor — June Arlen; fern — Tomas Reed; gull — Ada Wren; wave — Niko Bell. The photograph captions and signed letters match. Some later aliases were chosen by the children to protect one another."
  },
  {
    "id": "lesson",
    "text": "“We traded names so none of us would be taken alone.” The slate asks for the photograph order: anchor, fern, gull, wave. You will keep the aliases beside the verified records rather than replacing them."
  },
  {
    "id": "register",
    "text": "Four symbol slots await the verified names. The empty place is labelled HOLDING PATTERN in an adult hand."
  },
  {
    "id": "reflection",
    "text": "Mara: “I will leave the name you chose beside the one they wrote.” June: “Then you have learned more than the teacher.” Her reflection closes the book. You do not ask her to perform another answer."
  }
]
```

## investigations

```json
[
  {
    "id": "primary",
    "goal": "Cross-check four identities without erasing chosen aliases.",
    "required": [
      "names-first-four",
      "school-order"
    ],
    "puzzleId": "primary",
    "requiredItem": null,
    "reward": "register"
  }
]
```

## puzzles

```json
[
  {
    "id": "primary",
    "title": "Keep both records",
    "question": "Match anchor, fern, gull and wave in order.",
    "options": [
      "June Arlen",
      "Tomas Reed",
      "Ada Wren",
      "Niko Bell"
    ],
    "answer": [
      0,
      1,
      2,
      3
    ],
    "success": "The First Register opens. Four identities are cross-checked, and their chosen aliases remain intact. The thirteenth position records an apparatus, not a thirteenth child.",
    "wrong": "The two records disagree with that placement. Nothing is overwritten. Compare the photograph captions again.",
    "hints": [
      "Use both the photographs and letters.",
      "The order is anchor, fern, gull, wave.",
      "June, Tomas, Ada, Niko."
    ]
  }
]
```

## choices

```json
[
  {
    "id": "copy",
    "label": "Copy the records with aliases intact",
    "text": "You preserve the distinction between verified history and chosen identity."
  },
  {
    "id": "ask",
    "label": "Ask June what should remain private",
    "text": "June leaves one margin closed. You carry the proof without claiming every memory.",
    "flag": "consent"
  }
]
```

## pressure

```json
{
  "pressure": 165,
  "warning": "Chalk taps the same number against every desk.",
  "critical": "The slate begins to write your childhood name.",
  "retreat": "You turn the slate face down and stand beside the open corridor door."
}
```