# Encounter Document Template

**Specification package; no runtime or Drive changes.**

Use encounters.json as the authored source for generated location specifications. Required fields: stable id, room, title, kind, optional status, exact goal, first impression, named controls, obtainable clues, ordered action/response steps, recoverable wrong input, three specific hints, evaluable completion, source mapping, pressure, accessibility, persistence, assets, implementation steps and acceptance walkthroughs.

Templates describe the fields; finished encounter documents must contain actual authored values. A phrase such as “play the animation” fails unless its named object, start/end state, trigger, interruption and visible result are specified. A solver instruction fails unless the player can obtain the clue that justifies it.

The document must separate existing source behavior from target behavior and missing capabilities. One encounter can have alternate solutions; give each its prerequisites, state result and cost. If only one is supported, state that explicitly. Use named domain owners; never describe Sequence as the owner of continuous pressure.

Required review: action trace, minimal-route dependency trace, failed attempt, cancellation, duplicate input, save/restore, muted audio, keyboard and Canvas fallback. Visual/pacing approval stays pending until observed.
