import { RECIPES } from "../../../../../content/campaign.js";
export const operations = {
  combine(s, p) {
    const recipe = RECIPES.find((r) => r.id === p.id);
    if (!recipe) throw new Error("Unknown recipe");
    if (!recipe.inputs.every((id) => s.items.includes(id)))
      throw new Error("Missing recipe inputs");
    s.items = s.items.filter((id) => !recipe.inputs.includes(id));
    if (!s.items.includes(recipe.output)) s.items.push(recipe.output);
    return { item: recipe.output };
  },
};
