export function validateProviderProfile(platform) {
  const mode = platform.graphicsMode ?? "webgl";
  if (!["webgl", "canvas"].includes(mode))
    throw new Error("Unsupported graphics mode");
  return { ...platform, graphicsMode: mode };
}
