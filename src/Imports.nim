import algorithm
import Files
import json
import ManualOps
import ReStr
import sequtils
import strformat
import strutils
import sugar

const spImport = "skyrimPlatform"

proc ObjImports(txt: string): string =
  # We don't get custom types because we only need vanilla objects. 
  # New types can be added with imports if necessary.
  var decl = GetPapyrusObjects(false)
    .filter((s: string) => txt.contains(fmt" {s},") or txt.contains(fmt"({s} ") or txt.contains(fmt" {s} |") or txt.contains(fmt" {s})"))
    .map(s => "import { $1 } from \"$2\"" % [s, spImport])
  sort(decl)
  return if decl.len() == 0: "" else: decl.foldr(a & "\n" & b)

proc ManualImports(fileName: string): string = 
  var lst: seq[string]
  const arr = "values"
  const fi = "file"

  for o in GetCfgProperty(fileName, "import"): 
    if o.hasKey(arr):
      for i in o{arr}.getElems(): lst.add(i.getStr())
    elif o.hasKey(fi):
      lst.add(readFile(fmt"{manualFilesPath}/{o[fi].getStr()}"))
    else: return ""

  return if lst.len() == 0: "" else: lst.foldr(a & "\n" & b)

proc AddImports*(txt, fileName: string): string = 
  let i = "import * as sp from \"$1\"\n\n" % spImport
  let d = [
    ObjImports(txt),
    ManualImports(fileName)
    ]
  let decl = if d.len() == 0: "" else: d.foldr(a & "\n" & b)
  return (i & decl).strip() & "\n\n" & txt

proc AddImports*(txt: string): string = AddImports(txt, WorkingFile())