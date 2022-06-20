
/** Enum for keys. */
export const enum Key {
  /** It's a Shader key. Type this key will override: `int`. */
  EmissiveColor = 0,
  /** It's a Shader key. Type this key will override: `float`. */
  EmissiveMultiple = 1,
  /** It's a Shader key. Type this key will override: `float`. */
  Glossiness = 2,
  /** It's a Shader key. Type this key will override: `float`. */
  SpecularStrength = 3,
  /** It's a Shader key. Type this key will override: `float`. */
  LightingEffect1 = 4,
  /** It's a Shader key. Type this key will override: `float`. */
  LightingEffect2 = 5,
  /** It's a Shader key. Type this key will override: `TextureSet`. */
  TextureSet = 6,
  /** It's a Shader key. Type this key will override: `int`. */
  TintColor = 7,
  /** It's a Shader key. Type this key will override: `float`. */
  Alpha = 8,
  /** It's a Shader key. Type this key will override: `string`. */
  Texture = 9,
  /** It's a Controller key. Type this key will override: `float`. */
  StartStop = 20,
  /** It's a Controller key. Type this key will override: `float`. */
  StartTime = 21,
  /** It's a Controller key. Type this key will override: `float`. */
  StopTime = 22,
  /** It's a Controller key. Type this key will override: `float`. */
  Frequency = 23,
  /** It's a Controller key. Type this key will override: `float`. */
  Phase = 24,
}

/** Used for easily know which texture you want to change. Only used when `key === Key.Texture`.
 *
 * @example
 * // SlotMask.Body should be defined in skyrimPlatform.ts. If it isn't,
 * // you may be using a version of Skyrim Platform older than 2.2.
 * AddSkinOverrideString(ref, isFemale, firstPerson, SlotMask.Body, Key.Texture, TextureIndex.Diffuse, "tex.dds", true)
 * AddNodeOverrideString(ref, isFemale, "3BA", Key.Texture, TextureIndex.Specular, "tex.dds", false)
 *
 * @remarks
 * These values are based on my work on deciphering NiOverride:
 * https://geek-of-all-trades.neocities.org/programming/skyrim/nioverride-textures-02-key-index.html
 *
 * ***Trigger warning***: Politically incorrect jokes and foul language abound in that link.
 * You have been warned.
 */
export const enum TextureIndex {
  Irrelevant = -1,
  Diffuse,
  Normal,
  EnvironmentMask,
  Subsurface = 2,
  Skin = 2,
  Glow,
  Detail = 3,
  Height,
  Environment,
  Multilayer,
  Specular,
  Backlight = 7,
  Unknown01,
  Unknown02,
}