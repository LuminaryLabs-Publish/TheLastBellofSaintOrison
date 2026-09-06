# Closed Café

Compare the radio signal with Elian’s original cassette.

Source: src/kits/locations/closed-cafe

## dialogue

```json
{
  "arrival": "Two cups stand beneath a dead wall clock. One holds a skin of milk; the other is dry. From the kitchen, Elian asks you to come closer. On your cassette she warned you about a voice that knows names. You put the tape on the counter before answering anything.",
  "lines": [],
  "note": "Existing quoted speech is preserved verbatim in observations; add separately identified conversation lines here."
}
```

## observations

```json
[
  {
    "id": "tape",
    "text": "On the original tape a gull cries, then two low tide bells sound. Elian says, “The long breathing.” The kitchen voice says, “The hungry sea.” It knows her tone, not her private phrase."
  },
  {
    "id": "receipt",
    "text": "A service receipt shows three radio channels: 81 — inland dispatch; 94 — tide station; 107 — hospital relay. Someone circled the tide station and wrote TWO AFTER THE GULL."
  },
  {
    "id": "radio",
    "text": "The dial is worn at three frequencies. A small speaker can play the signal without you speaking into the room."
  },
  {
    "id": "kitchen",
    "text": "From the threshold you see a loop of tape feeding through a recorder. Its power cable runs into a municipal junction, not a wall socket. You photograph the connection without entering."
  }
]
```

## investigations

```json
[
  {
    "id": "primary",
    "goal": "Compare the radio signal with Elian’s original cassette.",
    "required": [
      "true-signal",
      "radio-channels"
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
    "title": "A voice and a recording",
    "question": "Select the channel matching the original signal.",
    "options": [
      "81 · inland dispatch",
      "94 · tide station",
      "107 · hospital relay"
    ],
    "answer": [
      1
    ],
    "success": "The gull cries, followed by two bells. Under the noise, Elian says, “Follow the service lanterns. Do not let them tell you I was taken. I chose to interrupt the relay.”",
    "wrong": "The voice is convincing, but its signal does not match your cassette. You switch it off.",
    "hints": [
      "The tape contains a tide signal.",
      "The receipt identifies the station.",
      "Tune to 94."
    ]
  }
]
```

## choices

```json
[
  {
    "id": "record",
    "label": "Keep the recording and leave",
    "text": "You preserve the message. Elian entered voluntarily; whatever comes next must respect that."
  },
  {
    "id": "trace",
    "label": "Trace the cable from the threshold",
    "text": "The cable joins the market’s service trunk. You record its route.",
    "flag": "relayEvidence"
  }
]
```

## pressure

```json
{
  "pressure": 160,
  "warning": "The kitchen voice moves closer without crossing the doorway.",
  "critical": "Every empty table seems to have a breath beneath it.",
  "retreat": "You step outside the service door. The kitchen voice keeps talking to an empty café."
}
```