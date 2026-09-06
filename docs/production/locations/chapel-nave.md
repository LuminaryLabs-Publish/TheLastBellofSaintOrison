# Chapel Nave

Verify Elian’s identity and decide whether to release her.

Source: src/kits/locations/chapel-nave

## dialogue

```json
{
  "arrival": "Father Vale waits beside a closed side chapel. He says Elian is safe because she is contained. Her voice arrives through a hospital intercom behind him: “Ask me something he did not teach me.” The private phrase on your cassette offers a better test than the face in the dark.",
  "lines": [],
  "note": "Existing quoted speech is preserved verbatim in observations; add separately identified conversation lines here."
}
```

## observations

```json
[
  {
    "id": "confession",
    "text": "“We called it mercy because we were afraid to call it theft.” Vale’s signed statement names Silas as the architect of the holding pattern. It also admits that restoring a record is not permission to use its subject."
  },
  {
    "id": "line",
    "text": "Elian: “I came willingly to stop the relay. They closed the isolation door after me. The Thirteenth is made from what they erased. It is not another child.” Mara: “And the sea?” Elian waits for you to choose the answer from the original tape."
  },
  {
    "id": "intercom",
    "text": "Use the cassette’s private phrase before deciding about the isolation door. Elian is physically in the annex beyond the side chapel."
  },
  {
    "id": "promise",
    "text": "Elian: “Do not make saving me the price of believing me.” Mara: “You can come with me, or keep the archive line open. I will tell you what each choice means.”"
  }
]
```

## investigations

```json
[
  {
    "id": "primary",
    "goal": "Verify Elian’s identity and decide whether to release her.",
    "required": [
      "vessel-truth",
      "elian-location"
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
    "title": "The living witness",
    "question": "What did Elian call the sea?",
    "options": [
      "The hungry sea",
      "The long breathing",
      "The last choir"
    ],
    "answer": [
      1
    ],
    "success": "Elian adds the second half without prompting: “And you called it a place to hide.” The live pulse meter agrees with the private line. You can release her into the marked stair or keep the archive channel open with her consent.",
    "wrong": "The copied public voice answers first. You close that channel. The original cassette remains a trustworthy reference.",
    "hints": [
      "Recall the original cassette, not the kitchen.",
      "The phrase describes a breath.",
      "The long breathing."
    ]
  }
]
```

## choices

```json
[
  {
    "id": "release",
    "label": "Release Elian into the marked stair",
    "text": "You open the isolation door. Elian steps onto the physical stair beside you. She will travel with you through the parish house and tunnels.",
    "flag": "elianReleased"
  },
  {
    "id": "line",
    "label": "Ask Elian to maintain the archive line",
    "text": "Elian agrees to remain at its protected station. She will speak through the line; she will not appear physically beside you.",
    "flag": "elianRemote"
  }
]
```

## pressure

```json
{
  "pressure": 180,
  "warning": "The intercom begins replacing pauses with another speaker’s breath.",
  "critical": "Vale reaches for the isolation switch. You can still stop the conversation.",
  "retreat": "You switch to the local line and close the public microphone. Elian waits without repeating your name."
}
```