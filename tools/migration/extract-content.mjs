// Extraction is already committed. Reconstructing the legacy view is deliberately non-destructive.
import { assembleContent } from "../authoring/build-content.mjs";
console.log(JSON.stringify(assembleContent(), null, 2));
