# Well Chamber

Recover the Bell Core and choose a fully explained intervention.

Source: src/kits/locations/well-chamber

## dialogue

```json
{
  "arrival": "The shaft is wider than the chapel above. Twelve acoustic lines terminate around a portable core. Four further identities are preserved in paired admission and family records: Iris Cole, Samir Hale, Ruth Fen and Leon March. With the First Register, eight can be verified. The empty thirteenth channel is the vessel.",
  "lines": [],
  "note": "Existing quoted speech is preserved verbatim in observations; add separately identified conversation lines here."
}
```

## observations

```json
[
  {
    "id": "names",
    "text": "Iris Cole, Samir Hale, Ruth Fen and Leon March each appear in an admission record and a signed family record. Their aliases are retained. These four join the four from the school register. You will not invent the remaining names."
  },
  {
    "id": "methods",
    "text": "WITNESS: intact relay, First Register, original shutoff order, relay contract, eight verified names. SILENCE: isolate relay, strike braces outer–inner–outer; no replacement. VESSEL: explicitly offer your own copied pattern; others leave, the burden continues. Every method needs the core released first."
  },
  {
    "id": "core",
    "text": "The plate on the core reads: CLOSE SHUTTER, ISOLATE FEED, RELEASE COLLARS. This removes the resonator safely without yet choosing its fate."
  },
  {
    "id": "voices",
    "text": "Mara: “You do not have to answer.” Some lines carry a breath. Others carry nothing. You leave their record open rather than filling it with what you hope to hear."
  }
]
```

## investigations

```json
[
  {
    "id": "primary",
    "goal": "Recover the Bell Core and choose a fully explained intervention.",
    "required": [
      "names-second-four",
      "ending-methods"
    ],
    "puzzleId": "primary",
    "requiredItem": null,
    "reward": "core"
  }
]
```

## puzzles

```json
[
  {
    "id": "primary",
    "title": "Release the resonator",
    "question": "Follow the core’s isolation plate.",
    "options": [
      "Close shutter",
      "Isolate feed",
      "Release collars"
    ],
    "answer": [
      0,
      1,
      2
    ],
    "success": "The Bell Core comes free. Eight identities are verified. Choose an intervention with its stated requirements and consequence. Nothing is committed until you confirm.",
    "wrong": "A mechanical interlock holds. The core remains seated. Begin by closing the acoustic shutter.",
    "hints": [
      "The isolation plate gives a safe order.",
      "Close the acoustic path before releasing hardware.",
      "Shutter, feed, collars."
    ]
  }
]
```

## choices

```json
[
  {
    "id": "witness",
    "label": "WITNESS · transmit names and original proof",
    "text": "You preserve the original records and open the verified public channel. The vessel will lose its role as the sole container.",
    "ending": "witness"
  },
  {
    "id": "silence",
    "label": "SILENCE · isolate and end the vessel",
    "text": "You disconnect the relay and strike outer, inner, outer. No new person is offered. Public proof remains limited to what you carry.",
    "ending": "silence"
  },
  {
    "id": "vessel",
    "label": "VESSEL · knowingly offer your own pattern",
    "text": "You offer your own copied childhood pattern. The others can leave; you accept a continuing burden and the loss of being reliably remembered.",
    "ending": "vessel"
  }
]
```

## pressure

```json
{
  "pressure": 180,
  "warning": "The core begins repeating the first syllable of every recorded name.",
  "critical": "The outgoing relay pulses. An intervention is still yours to choose.",
  "retreat": "You close the core’s acoustic shutter. It cannot take an offered name through a closed channel."
}
```