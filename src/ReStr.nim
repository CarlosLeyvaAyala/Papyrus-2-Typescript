##[ReStr'
Unit containing all regex constants and functions needed to translate 
from Papyrus to Typescript.
]##
import algorithm
import ManualOps
import strformat
import regex
import sequtils
import strutils
import sugar

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

proc GetPapyrusObjects*(getCustomTypes: bool = true): seq[string] = 
  if not getCustomTypes: return papyrusObjects
  result = concat(papyrusObjects, GetCustomTypes())
  result.sort(SortOrder.Descending)

proc GetArgN (args: string, n: int): string = 
  const argsRegex = re"(?i)((\w+)(\[\s*\])*)\s(\w+)\s*=?(.*)"
  var m: RegexMatch
  if not args.strip().match(argsRegex, m): return ""
  return m.groupFirstCapture(n, args)

const GetVarName = (args: string) => GetArgN(args, 3)
const GetVarType = (args: string) => GetArgN(args, 0)
const GetVarDefault = (args: string) => GetArgN(args, 4)

# Renames TS reserved words that are not a problem in Papyrus
const AvoidReserved = (s: string) => s.replace("default", "defaultVal")

# Transforms arguments to something else
proc TransformArgs(args: string, f: (string) -> string): string =
  if strip(args) == "": 
    return ""

  return args.split(re"(?s),(?=[\w\s]+)")
    .map(s => strip(s))
    .map(f)
    .foldr(a & ", " & b)

# Removes types from an argument list
proc UntypeArgs(args: string): string =
  return TransformArgs(args, (s) => AvoidReserved(GetVarName(s)))

# Transforms a variable type from Papyrus to Typescript
proc PapyrusToTsType(t: string, areArgs: bool): string = 
  result = t.strip().toLowerAscii()
  if result == "": return "void"

  # Easy primitives
  result = result.replace("float", "number").replace("int", "number").replace("bool", "boolean")

  # Object types
  for obj in GetPapyrusObjects():
    let l = obj.toLowerAscii()
    if not result.startsWith(l): continue

    # FormType | null
    let nO = obj & " | null"

    # Array type. Example: "form[" => "(Form | null)["
    if areArgs: 
      result = result.replace(fmt"{l}[]", fmt"({nO})[] | null")
    else:
      result = result.replace(fmt"{l}[", fmt"({nO})[")

    # Nullable object type. Example: "form" => "Form | null"
    if l == result: result = result.replace(l, nO)

# Transforms Papyrus arguments to TS ones.
# Used for creating the function header.
proc PapyrusArgsToTs(args: string): string = 
  const T = proc (arg: string): string =
    const PapyDefaultToTs = (s: string) => s.toLowerAscii().replace("none", "null")

    let varName = GetVarName(arg).AvoidReserved()
    let varType = GetVarType(arg).PapyrusToTsType(true)
    let defaultVal = GetVarDefault(arg).PapyDefaultToTs()
    let dv = if defaultVal != "": " = " & defaultVal.strip() else: ""
    return fmt"{varName}: {varType}{dv}"

  try:
    return TransformArgs(args, T)
  except:
    # If something fails, the more likely case is embedded Papyrus code;
    # like the way most PapyrusUtil source files have inside them.
    # This program aim is not to automate whole language translation, but
    # only function headers, so that kind of code is output verbatim for a
    # human to fix it.
    return "// " & args

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
  isScriptName = re"(?i)^\s*scriptname (\w*)(extends )?(.*)?( hidden)?" ## \
  ## Used to check if a line is a Papyrus script name.
  # Used for extracting the script name. See `scriptNameVar <#scriptNameVar>`_.
  
  TranslateScriptName* = (l: string) => 
    l.replace(isScriptName, fmt"const {scriptNameVar} = (sp as any).$1")
  
  # ========================================================================
  isProperty = re"(?i)(.*)property (\w*)\s*=\s*(.*) autoreadonly(.*)" ##\
  ## Used to check if a line is a Papyrus property.
  toProperty = "export const $2 = $3"

  isVarProperty = re"(?i)(.*)property (\w*)\s*=\s*(.*) auto (.*)"
  toVarProperty = "export let $2 = $3"
  
  TranslateProperties* = (l: string) => 
    l.replace(isProperty, toProperty)
      .replace(isVarProperty, toVarProperty) ##\
  ## Translates a property from Papyrus to Typescript.

  # ========================================================================
  ## Used to check if a line is a function header.
  isFunc = re"(?imsU)^[^\S\r\n]*(((\w*)[^\S\r\n]*(\[[^\S\r\n]*\][^\S\r\n]*)*)[^\S\r\n]+)?function (\w*)\s*\((.*)\).*$"

proc TranslateFunction(m: RegexMatch, l: string): string =
  # Remove Papyrus' line continuations, like in: 
  # Function RegisterForHitEventEx(ActiveMagicEffect akActiveEffect, Form akAggressorFilter = None, Form akSourceFilter = None, Form akProjectileFilter = None, \
  # int aiPowerFilter = -1, int aiSneakFilter = -1, int aiBashFilter = -1, int aiBlockFilter = -1, bool abMatch = true) global native	
  const R = (s: string)  => s.replace(re"(?s)\\[^\S\r\n]*[\r\n]", "")

  let typ = m.groupFirstCapture(1, l).PapyrusToTsType(false)
  let fn = m.groupFirstCapture(4, l)

  let a = m.groupFirstCapture(5, l).R()
  let input = a.PapyrusArgsToTs()
  let args = a.UntypeArgs()
  result = fmt"export const {fn} = ({input}): {typ} => {scriptNameVar}.{fn}({args})" 
##\ Tranforms a whole function declaration from Papyrus to Ts.

proc TranslateFunctions*(l: string): string =
  l.replace(isFunc, TranslateFunction)

proc ToTsDoc(lines: seq[string]): string =
  let txt = "/**" & lines.map(s => "* " & s).foldr(a & "\n" & b) & "*/"

  let open = "/***"
  const openTo = "/**"
  let close = "*/"
  let closeTo = "\n*/"

  return txt.replace(open, openTo)
        .replace(close, closeTo) 

proc BlockCommentToTsDoc(txt: string, pattern: Regex): string = 
  const MToTsDoc = (m: RegexMatch, s: string) => ToTsDoc(m.group(0, s)[0].strip().split("\n"))
  txt.replace(pattern, MToTsDoc)

proc MultiCommentToTsDoc(txt: string): string = 
  proc CleanComment(m: RegexMatch, s: string): string =
    let lines = m.group(0, s)
    let clean = lines.map(l => l.replace(re"\s*;(.*)", "$1"))
      .map(s => strip(s))

    return "\n" & ToTsDoc(clean) & "\n"
  return txt.replace(re"(?m)(^\s*;(.*)$\n){2,}", CleanComment)

proc CommentToTsDoc(txt: string): string =
  txt.replace(re"(?m)^[^\S\r\n]*;(.*)$(?=\nexport const)", "/**$1 */")

proc TranslateComments*(txt: string): string =
  return txt
            .BlockCommentToTsDoc(re"(?sU);\/(.*)\/;")
            .BlockCommentToTsDoc(re"(?msU)^\s*{(.*)}")
            .MultiCommentToTsDoc()
            .CommentToTsDoc()
            .replace(re"(?m)^[^\S\r\n]*;", "//") # Process normal comments