# Market Street

Secure the shutter and collect a service lantern.

Source: src/kits/locations/market-street

## dialogue

```json
{
  "arrival": "Rain drums on canvas roofs. An abandoned freight lantern lies beside a half-lowered shutter. The café’s cable disappears through a service trunk on the far side. This crossing can be left safe for someone returning behind you.",
  "lines": [],
  "note": "Existing quoted speech is preserved verbatim in observations; add separately identified conversation lines here."
}
```

## observations

```json
[
  {
    "id": "plate",
    "text": "PIN THE WEIGHT. RAISE THE SHUTTER. ENGAGE THE CATCH. The plate shows a raised shutter held by the catch, never by a person beneath it."
  },
  {
    "id": "lamp",
    "text": "The lantern is cold but intact. A paper tie reads: “Apothecary resin only. Smoke carries the echo.” You put it in your satchel."
  },
  {
    "id": "winch",
    "text": "The winch has a weight pin, a winding handle and a locking catch. All three are within reach from the safe side."
  },
  {
    "id": "stall",
    "text": "A bent return-route sign lies beneath a tarpaulin. You straighten it and point it toward the safe freight alcove. Somebody following you will not have to guess."
  }
]
```

## investigations

```json
[
  {
    "id": "primary",
    "goal": "Secure the shutter and collect a service lantern.",
    "required": [
      "shutter-order"
    ],
    "puzzleId": "primary",
    "requiredItem": "lantern",
    "reward": null
  }
]
```

## puzzles

```json
[
  {
    "id": "primary",
    "title": "Keep a way open",
    "question": "Secure the crossing using the safety procedure.",
    "options": [
      "Pin the counterweight",
      "Raise the shutter",
      "Engage the catch"
    ],
    "answer": [
      0,
      1,
      2
    ],
    "success": "The catch locks with a clear metallic click. The crossing remains open without your weight on the handle.",
    "wrong": "The handle stops against its interlock. You remain on the safe side. Start with the counterweight.",
    "hints": [
      "The plate gives the procedure.",
      "Secure the weight before moving the shutter.",
      "Pin, raise, engage."
    ]
  }
]
```

## choices

```json
[
  {
    "id": "direct",
    "label": "Cross through the freight opening",
    "text": "The lantern knocks softly against your satchel."
  },
  {
    "id": "secure",
    "label": "Secure a return marker before crossing",
    "text": "You tie a pale marker at the opening. The route will be recognizable even without the lamps.",
    "flag": "marketSafe"
  }
]
```

## pressure

```json
{
  "pressure": 145,
  "warning": "A shutter slams at the far end of the market.",
  "critical": "The counterweight begins to slip; the open crossing narrows.",
  "retreat": "You withdraw to the freight alcove, beyond the shutter’s travel. Its safety stop catches."
}
```