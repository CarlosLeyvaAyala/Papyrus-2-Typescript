##[
Unit containing all regex constants and functions needed to translate 
from Papyrus to Typescript.
]##
import strformat
import sugar
import strutils

const 
  scriptNameVar* = "sn"  ## \
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
  sn* = r"^\s*scriptname (\w*)(extends )?(.*)?( hidden)?" ## \
  ## *"ScriptName"*. 
  ## 
  ## Used for extracting the script name. See `scriptNameVar <#scriptNameVar>`_.
  
  snR = fmt"const {scriptNameVar} = (sp as any).$1"  ## \
  ## Typescript equivalent to `sn <#sn>`_.

  TranslateScriptName* = (l: string, m: openArray[string]) => snR % m[0] ##\
  ## Converts the ScriptName section from Papyrus to Typescript.
  
  # ========================================================================
  pr* = r"(.*)property (\w*)\s*=\s*(.*) autoreadonly(.*)"
  
  TranslateProperty* = (l: string, m: openArray[string]) => "export const $2 = $3" % m ##\
