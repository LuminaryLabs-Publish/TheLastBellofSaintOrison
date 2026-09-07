# Encounter Acceptance Template

**Specification package; no runtime or Drive changes.**

Separate design review from executable evidence. For a design review, inspect exact action/clue relationships and trace dependencies. For runtime acceptance, start from a legal incoming state, use actual input and observe each response before inspecting the corresponding owner snapshot.

Required cases: normal solution; supported alternative or explicit none; wrong action with recovery; missing prerequisite; repeat action; cancellation before commit; pause/blur during hold; save/restore at every stable step; invalid snapshot leaves live state unchanged; skipped optional content; each outgoing choice; muted audio/shape-only/large text/keyboard/Canvas fallback.

Record expected and observed results with the source revision. Attach screenshots or video of actual local execution for presentation claims and independent state traces for authority/receipt claims. No fixture-generated success is evidence that an unfamiliar player understood the room.

Reject missing evidence explicitly. A request to perform five design passes does not mean five successful playtests or visual approvals. Reviewers may accept a documentation improvement while leaving runtime and artistic gates open.
