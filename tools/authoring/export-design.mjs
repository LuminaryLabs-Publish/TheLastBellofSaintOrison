import { read, write } from "./support.mjs";
export async function run() {
  const c = read("content/progression/campaign.json");
  for (const id of c.locations) {
    const p = "src/kits/locations/" + id;
    const location = read(p + "/content/location.json");
    write(
      "docs/production/locations/" + id + ".md",
      "# " +
        location.name +
        "\n\n" +
        location.goal +
        "\n\nSource: " +
        p +
        "\n\n" +
        [
          "dialogue",
          "observations",
          "investigations",
          "puzzles",
          "choices",
          "pressure",
        ]
          .map(
            (k) =>
              "## " +
              k +
              "\n\n```json\n" +
              JSON.stringify(read(p + "/content/" + k + ".json"), null, 2) +
              "\n```",
          )
          .join("\n\n"),
    );
  }
  return { exported: c.locations.length };
}
