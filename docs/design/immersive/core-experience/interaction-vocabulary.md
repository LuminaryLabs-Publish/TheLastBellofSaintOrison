# Interaction Vocabulary

**Target specification; runtime implementation pending.**

| Verb | Pointer behavior | Keyboard/assisted behavior | Commit boundary |
|---|---|---|---|
| Inspect | Click object or labelled target | Focus then confirm | Record only the displayed fact |
| Turn | Drag between visible detents | Previous/next detent then confirm | At accepted detent |
| Pull | Drag to the marked stop | Select pull, then confirm stop | At latched stop |
| Hold | Press while active | Toggle assisted hold | Never an irreversible choice by itself |
| Place/connect | Select item, then target | Select source and destination | Validated destination accepted |
| Compare | Alternate two visible references | Previous/next reference | Player confirms supported relationship |
| Listen | Start or stop local playback | Replay or open equivalent transcript | Required fact delivered or acknowledged |
| Choose | Select a consequence preview | Focus preview and confirm separately | Explicit final confirmation |
| Retreat | Select persistent shelter action | Back/retreat control | Cancel local action, then safe room state |

Hover communicates affordance but never commits a choice. Release, Escape, pause and loss of focus cancel unlatched manipulation. No essential action requires pixel precision, color vision, a held key or audio alone. These verbs need shared implementation before room authors can depend on them.
