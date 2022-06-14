##[
Unit containing all regex constants and functions needed to translate 
from Papyrus to Typescript.
]##
import strformat
import sugar
import strutils

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
