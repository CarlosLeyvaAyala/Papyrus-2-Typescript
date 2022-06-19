##[GetPapyrusObjects'
Unit containing all regex constants and functions needed to translate 
from Papyrus to Typescript.
]##
import strformat
import sugar
import strutils
import sequtils
import re

const 
  papyrusObjects = @[
    "WorldSpace",
    "WordOfPower",
    "Weather",
    "Weapon",
    "VoiceType",
    "VisualEffect",
    "Utility",
    "Ui",
    "TreeObject",
    "TopicInfo",
    "Topic",
    "TextureSet",
    "TalkingActivator",
    "TESModPlatform",
    "Static",
    "Spell",
    "SoundDescriptor",
    "SoundCategory",
    "Sound",
    "SoulGem",
    "Shout",
    "ShaderParticleGeometry",
    "Scroll",
    "Scene",
    "ReferenceAlias",
    "Race",
    "Quest",
    "Projectile",
    "Potion",
    "Perk",
    "Package",
    "Outfit",
    "ObjectReference",
    "NetImmerse",
    "MusicType",
    "MiscObject",
    "Message",
    "MagicEffect",
    "LocationRefType",
    "LocationAlias",
    "Location",
    "Light",
    "LeveledSpell",
    "LeveledItem",
    "LeveledActor",
    "Keyword",
    "Key",
    "Input",
    "Ingredient",
    "ImpactDataSet",
    "ImageSpaceModifier",
    "Idle",
    "HeadPart",
    "Hazard",
    "GlobalVariable",
    "Game",
    "Furniture",
    "FormList",
    "Form",
    "Flora",
    "Faction",
    "Explosion",
    "EquipSlot",
    "EncounterZone",
    "Enchantment",
    "EffectShader",
    "Door",
    "DefaultObjectManager",
    "Debug",
    "Container",
    "ConstructibleObject",
    "CombatStyle",
    "ColorForm",
    "Class",
    "Cell",
    "Book",
    "AssociationType",
    "Art",
    "ArmorAddon",
    "Armor",
    "Apparatus",
    "Ammo",
    "Alias",
    "ActorValueInfo",
    "ActorBase",
    "Actor",
    "ActiveMagicEffect",
    "Activator",
    "Action"
  ]

proc GetArgN (args: string, n: int): string = 
  const argsRegex = r"((\w+)(\[\s*\])*)\s(\w+)\s*=?(.*)"
  var matches: array[20, string]
  let r = re(argsRegex, {reIgnoreCase, reStudy})
  let matched = args.match(r, matches)  
  return if (matched): matches[n] else: ""

const GetVarName = (args: string) => GetArgN(args, 3)

# Renames TS reserved words that are not a problem in Papyrus
const AvoidReserved = (s: string) => s.replace("default", "defaultVal")

# Transforms arguments to something else
proc TransformArgs(args: string, f: (string) -> string): string =
  if strip(args) == "": 
    return ""

  const stripA = (s: string) => strip(s)
  return args.split(",").map(stripA).map(f).foldr(a & ", " & b)

# Removes types from an argument list
proc UntypeArgs(args: string): string =
  return TransformArgs(args, (s) => AvoidReserved(GetVarName(s)))

# Transforms a variable type from Papyrus to Typescript
proc PapyrusToTsType(t: string): string = 
  result = t.strip().toLowerAscii()
  if result == "": return "void"

  # Easy primitives
  result = result.replace("float", "number").replace("int", "number").replace("bool", "boolean")

  # const Nullable = (obj: string) => obj & " | null"

  for obj in papyrusObjects:
    let l = obj.toLowerAscii()
    if not result.startsWith(l): continue

    # FormType | null
    let nO = obj & " | null"

    # Array type. Example: "form   [" => "(Form | null)["
    let rx = re(l & r"\s*\[")
    result = result.replace(rx, fmt"({nO})[")

    # Nullable object type. Example: "form" => "Form | null"
    if l == result: result = result.replace(l, nO)

const 
  scriptNameVar = "sn"  ## \
  ## This name will be output as a Typescript `const` that will be used
  ## as a placeholder for `(sp as any).<Papyrus script name>`.
  ## 
  ## **Example**
  ## 
  ## ```ts
  ## // If input was nioverride.psc
  ## const sn = (sp as any).NiOverride
  ## ```
  
  # ========================================================================
  isScriptName* = r"^\s*scriptname (\w*)(extends )?(.*)?( hidden)?" ## \
  ## Used to check if a line is a Papyrus script name.
  # Used for extracting the script name. See `scriptNameVar <#scriptNameVar>`_.
  
  TranslateScriptName* = (l: string, m: openArray[string]) => 
    fmt"const {scriptNameVar} = (sp as any).$1" % m[0] ##\
  ## Translates the ScriptName section from Papyrus to Typescript.
  
  # ========================================================================
  isProperty* = r"(.*)property (\w*)\s*=\s*(.*) autoreadonly(.*)" ##\
  ## Used to check if a line is a Papyrus property.
  
  TranslateProperty* = (l: string, m: openArray[string]) => "export const $2 = $3" % m ##\
  ## Translates a property from Papyrus to Typescript.

  # ========================================================================
  isFunction* = r"^\s*(((\w*)\s*(\[\s*\]\s*)*)\s+)?function (\w*)\s*\((.*)\).*" ##\
  ## Used to check if a line is a function header.

proc TranslateFunction*(l: string, m: openArray[string]): string =
  let typ = PapyrusToTsType(m[1])
  let fn = m[4]
  let input = m[5]
  let args = UntypeArgs(m[5])
  result = fmt"export const {fn} = ({input}): {typ} => {scriptNameVar}.{fn}({args})" 
  ##\
