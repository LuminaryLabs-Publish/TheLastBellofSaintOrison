import { LOCATION_PACKAGES } from "../../../../../content/campaign.js";
function definition(p) {
  const c = LOCATION_PACKAGES[p.roomId]?.content;
  const investigation = c?.investigations.find(
    (i) => i.id === (p.investigationId ?? "primary"),
  );
  const puzzle = c?.puzzles.find((x) => x.id === investigation?.puzzleId);
  if (!puzzle) throw new Error("Unknown investigation");
  return { investigation, puzzle, key: p.roomId + ":" + investigation.id };
}
export const operations = {
  open(s, p) {
    const { investigation, puzzle, key } = definition(p);
    if (!investigation.required.every((k) => s.knowledge.includes(k)))
      throw new Error("Missing puzzle evidence");
    s.puzzles[key] ??= { inputs: [], solved: false };
    return {
      inputs: [...s.puzzles[key].inputs],
      message: puzzle.question,
      investigationId: investigation.id,
    };
  },
  attempt(s, p) {
    const { puzzle, key } = definition(p),
      progress = s.puzzles[key];
    if (!progress || progress.solved) throw new Error("Puzzle is not open");
    if (
      !Number.isInteger(p.index) ||
      p.index < 0 ||
      p.index >= puzzle.options.length
    )
      throw new Error("Invalid puzzle input");
    if (p.index !== puzzle.answer[progress.inputs.length]) {
      progress.inputs = [];
      return { status: "wrong", inputs: [], message: puzzle.wrong };
    }
    progress.inputs.push(p.index);
    return {
      status:
        progress.inputs.length === puzzle.answer.length ? "ready" : "continue",
      inputs: [...progress.inputs],
      message: "Accepted. Continue the documented order.",
    };
  },
  solve(s, p) {
    const { investigation, puzzle, key } = definition(p),
      progress = s.puzzles[key];
    if (
      !s.rooms[p.roomId] ||
      !investigation.required.every((k) => s.knowledge.includes(k))
    )
      throw new Error("Missing puzzle evidence");
    if (
      !progress ||
      progress.inputs.length !== puzzle.answer.length ||
      !progress.inputs.every((v, i) => v === puzzle.answer[i])
    )
      throw new Error("Puzzle answer not completed");
    progress.solved = true;
    if (investigation.id === "primary") s.rooms[p.roomId].solved = true;
    return {
      solved: true,
      investigationId: investigation.id,
      reward: investigation.reward,
    };
  },
};
