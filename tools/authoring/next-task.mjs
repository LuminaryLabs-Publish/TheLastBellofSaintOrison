import { read } from "./support.mjs";
export async function run() {
  const tasks = read("docs/production/tasks.json");
  const completed = new Set(
    tasks.filter((t) => t.status === "completed").map((t) => t.id),
  );
  const next = tasks.find(
    (t) =>
      t.status !== "completed" && t.dependencies.every((d) => completed.has(d)),
  );
  return {
    next: next ?? null,
    blocked: tasks
      .filter(
        (t) =>
          t.status !== "completed" &&
          !t.dependencies.every((d) => completed.has(d)),
      )
      .map((t) => t.id),
  };
}
