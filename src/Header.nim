import Files
import json
import strformat
import sugar
import strutils
import sequtils
import ManualOps

const AddDisclaimer = () => readFile(fmt"{filesPath}/disclaimer.txt")
proc AddVersion(v: string): string = readFile(fmt"{filesPath}/versionHeader.txt") % v
proc IfDebug(): string = 
  when not defined(release): 
    return """


********************************************
This file was generated with a debug build
and this message was shown to highlight the 
fact that this module may contain errors 
because of that.

This is a developer oversight. Contact him.
********************************************


"""
  else: return ""  

proc AddComments(fileName: string): string =
  var lst: seq[string]

  for o in GetCfgProperty(fileName, "headerComment"):
    lst.add(o.fileFromkey())

  return if lst.len() == 0: "" else: lst.foldr(a & "\n\n" & b)

proc AddManualReplacement(obj: JsonNode, msg: string): string = 
  var lst: seq[string]
  for o in obj: lst.add(o{"display"}.getStr())
  const tab = "\t"
  let l = lst
    .filter(s => s.strip() != "")
    .map(s => fmt"{tab}- {s}")
    
  let list = if l.len() == 0: "" else: l.foldr(a & "\n" & b)
  return if list.len() == 0: "" else: msg & ":\n" & list

proc AddManualConversion(fileName: string): string = 
  AddManualReplacement(GetManualConvertions(fileName), "Manually converted functions. Please test")

const delBecause = "Functions deleted because they need manual translation and are"

proc AddDeprecated(fileName: string): string = 
  const msg = fmt"{delBecause} already deprecated"
  AddManualReplacement(GetCfgProperty(fileName, "deprecated"), msg)

proc AddRedundant(fileName: string): string = 
  const msg = fmt"{delBecause} not really needed in Typescript"
  AddManualReplacement(GetCfgProperty(fileName, "redundant"), msg)

proc AddHeader*(txt, fileName, version: string): string = 
  let h = "/*\n" & @[
      AddVersion(version), 
      AddManualConversion(fileName), 
      AddRedundant(fileName),
      AddDeprecated(fileName),
      AddComments(fileName),
      AddDisclaimer()
    ].foldr(a & "\n\n" & b)
    .strip() & "\n*/\n"
  return h & IfDebug() & txt

proc AddHeader*(txt, version: string): string = AddHeader(txt, WorkingFile(), version)
