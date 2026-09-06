import { read, write, slug, validate } from "./support.mjs";
import { inputFile } from "./generate.mjs";
export async function run(options) {
  const spec = inputFile(options);
  slug(spec.location);
  const p = "src/kits/locations/" + spec.location;
  const assets = read(p + "/assets/manifest.json"),
    bindings = read(p + "/assets/bindings.json");
  validate("asset", [spec.asset], "asset");
  if (assets.some((a) => a.id === spec.asset.id))
    throw new Error("Refusing duplicate asset");
  if (!spec.asset.metadata?.provenance)
    throw new Error("Asset provenance required");
  if (spec.objectId && !Object.hasOwn(bindings.objects, spec.objectId))
    throw new Error("Unknown bound object");
  const prop = spec.asset.source.data.prop;
  if (
    prop &&
    (!["box", "sphere", "cylinder"].includes(prop.shape) ||
      !Array.isArray(prop.scale) ||
      prop.scale.length !== 3 ||
      prop.scale.some((n) => !Number.isFinite(n) || n <= 0) ||
      !/^#[0-9a-fA-F]{6}$/.test(prop.color))
  )
    throw new Error("Invalid portable prop");
  const palette = spec.palette ?? {};
  for (const [key, color] of Object.entries(palette))
    if (!["tint", "accent"].includes(key) || !/^#[0-9a-fA-F]{6}$/.test(color))
      throw new Error("Unsupported palette binding");
  write(p + "/assets/manifest.json", [...assets, spec.asset]);
  write(p + "/assets/bindings.json", {
    ...bindings,
    ...(spec.objectId
      ? {
          objects: {
            ...bindings.objects,
            [spec.objectId]: {
              ...bindings.objects[spec.objectId],
              assetId: spec.asset.id,
            },
          },
        }
      : { sceneAsset: spec.asset.id }),
    palette,
  });
  return { added: spec.asset.id, location: spec.location };
}
