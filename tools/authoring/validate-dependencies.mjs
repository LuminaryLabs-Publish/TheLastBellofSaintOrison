import { manifests } from "./support.mjs";
import { orderKits } from "../../src/composition/install-plan.js";
export async function run() {
  const entries = await manifests();
  return { ordered: orderKits(entries).map((x) => x.id) };
}
