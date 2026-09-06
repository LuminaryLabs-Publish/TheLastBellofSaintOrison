import { createPackage, inputFile } from "./generate.mjs";
export async function run(options) {
  return createPackage("service", inputFile(options));
}
