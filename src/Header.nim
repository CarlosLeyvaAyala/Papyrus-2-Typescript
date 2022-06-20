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
    let fn = fmt"{manualFilesPath}/" & o{"fileAdd"}.getStr()
    lst.add(readFile(fn))

  return lst.foldr(a & "\n\n" & b)

proc AddManualConversion(fileName: string): string = 
  var lst: seq[string]
  for o in GetManualConvertions(fileName): lst.add(o{"display"}.getStr())
  const tab = "\t"
  let list = lst
    .filter(s => s.strip() != "")
    .map(s => fmt"{tab}- {s}")
    .foldr(a & "\n" & b)
  return "Manually converted functions. Please test:\n" & list

proc AddHeader*(txt, fileName, version: string): string = 
  let h = "/*\n" & @[
      AddManualConversion(fileName), # Manually converted functions
      AddComments(fileName), # Extra header info
      AddVersion(version), 
      AddDisclaimer()
    ].foldr(a & "\n\n" & b) & "\n*/\n"
  return h & IfDebug() & txt