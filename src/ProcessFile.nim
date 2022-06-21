import Header
import Imports
import ManualOps
import os
import re
import ReStr
import strutils
import Substitute

proc getLines*(fn: string): seq[string] = 
  ## Gets file content as a sequence
  var f = open(fn)
  try:
    for l in f.lines: result.add(l)
  except:
    raise
  finally:
    close(f)

proc Process*(fn, version: string): void {.discardable.} =
  ## Converts a Papyrus file named `fn` to Typescript.
  SetWorkingFile(fn)
  let output = readFile(fn)
    .TranslateScriptName()
    .TranslateProperties()
    .TranslateFunctions()
    .TranslateComments()
    .MakeSubstitutions()
    .AddImports()
    .AddHeader(version)
    .replace(re"(\n\s*){3,}", "\n\n")
    .strip() & "\n"

  writeFile(changeFileExt(fn, "ts"), output)
