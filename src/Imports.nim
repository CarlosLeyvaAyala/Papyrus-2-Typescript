import algorithm
import sequtils
import strformat
import strutils
import sugar
import Files
import ManualOps
import ReStr
import json

proc ObjImports(txt: string): string =
  var decl = papyrusObjects
    .filter((s: string) => txt.contains(fmt" {s},") or txt.contains(fmt"({s} ") or txt.contains(fmt" {s} |") or txt.contains(fmt" {s})"))
    .map(s => "import { $1 } from \"../skyrimPlatform\"" % s)
  sort(decl)
  return decl.foldr(a & "\n" & b)

proc ManualImports(fileName: string): string = 
  var lst: seq[string]
  const arr = "imports"
  const fi = "file"

  for o in GetCfgProperty(fileName, "import"): 
    if o.hasKey(arr):
      for i in o{arr}.getElems(): lst.add(i.getStr())
    elif o.hasKey(fi):
      lst.add(readFile(fmt"{manualFilesPath}/{o[fi].getStr()}"))
    else: return ""

  return lst.foldr(a & "\n" & b)

proc AddImports*(txt, fileName: string): string = 
  let i = "import * as sp from \"../skyrimPlatform\"\n\n"
  let decl = [
    ObjImports(txt),
    ManualImports(fileName)
    ].foldr(a & "\n" & b)
  return i & decl & "\n\n" & txt

type People = tuple
  year: int
  name: string

var a: seq[People]

a.add((2000, "John"))
a.add((2005, "Marie"))
a.add((2010, "Jane"))

# Sorting with default system.cmp
a.sort()
