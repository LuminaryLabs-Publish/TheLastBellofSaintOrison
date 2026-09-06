# Parish House

Recover the relay contract and the descent equipment.

Source: src/kits/locations/parish-house

## dialogue

```json
{
  "arrival": "A cup has left a pale ring on Silas’s writing desk. Beyond the domestic rooms, a utility door leads toward the count chamber. Three photographs show the same study as its window is bricked, its cabinet moved and its bell painted. The ordinary changes hide an ordinary safe.",
  "lines": [],
  "note": "Existing quoted speech is preserved verbatim in observations; add separately identified conversation lines here."
}
```

## observations

```json
[
  {
    "id": "photos",
    "text": "The photographs show three changes in order. Four window panels were bricked; the ledger cabinet moved to alcove one; seven bands were painted on the bell. A note says the safe code follows these repairs: 4, 1, 7."
  },
  {
    "id": "letter",
    "text": "“Mara, I blamed you for burning Father’s papers. Now I know he asked you to. That does not make it harmless. It means we both need a record that survives what we want to believe.” You leave the original folded along its old creases."
  },
  {
    "id": "safe",
    "text": "The safe has a mechanical number wheel. Its combination is established by changes in the room, not a hidden random code."
  },
  {
    "id": "chalk",
    "text": "A bundle of waterproof chalk sits beside a descent diagram. The keeper marked return directions before entering the tunnels. You take the remaining chalk."
  }
]
```

## investigations

```json
[
  {
    "id": "primary",
    "goal": "Recover the relay contract and the descent equipment.",
    "required": [
      "safe-code",
      "family-history"
    ],
    "puzzleId": "primary",
    "requiredItem": "chalk",
    "reward": "relay"
  }
]
```

## puzzles

```json
[
  {
    "id": "primary",
    "title": "A domestic combination",
    "question": "Enter the repair counts in chronological order.",
    "options": [
      "4",
      "1",
      "7",
      "2",
      "8"
    ],
    "answer": [
      0,
      1,
      2
    ],
    "success": "Inside lies the Orison Recovery relay contract and a utility pass. The company plans to carry the holding pattern through the town’s infrastructure. The same channel can transmit public evidence.",
    "wrong": "The wheel returns to its stop. The photographs still show all three numbers.",
    "hints": [
      "Read the changes in chronological order.",
      "Windows, cabinet alcove, painted bands.",
      "4, 1, 7."
    ]
  }
]
```

## choices

```json
[
  {
    "id": "utility",
    "label": "Descend by the documented utility stair",
    "text": "You carry the contract and a practical route back."
  },
  {
    "id": "letter",
    "label": "Discuss the letter before descending",
    "text": "You admit what you burned. Elian does not forgive on command, but she hears the admission.",
    "flag": "elianTrust"
  }
]
```

## pressure

```json
{
  "pressure": 165,
  "warning": "Footsteps stop outside the study whenever you stop reading.",
  "critical": "The handle turns once, although the stair is empty.",
  "retreat": "You move into the utility vestibule and secure its mechanical bolt."
}
```