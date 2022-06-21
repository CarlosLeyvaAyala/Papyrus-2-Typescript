import json
import os
import strformat
import strutils
import sugar
import Files
import sequtils
import regex

var 
  manualCfg: JsonNode
  workingFile: string
  workingJson: JsonNode # Cache to accelerate file data finding

proc SetWorkingFile*(fn: string) =
  workingJson = nil
  workingFile = extractFilename(fn)

proc WorkingFile*: string = workingFile

proc InitManualCfg*(): void {.discardable.} =
  manualCfg = parseJson(readFile(manualDefs))

proc GetSingleFileData(fileName: string): JsonNode =
  if workingJson != nil: return workingJson

  var (d, fn, e) = splitFile(fileName)
  discard d
  discard e

  var files: seq[string] = @[]
  
  for k in manualCfg.keys: 
    let f = re("(?i)" & k.replace("*", ".*"))

    if fn.contains(f): 
      # Need to add whole body back because manualCfg[k] returns only the array content
      var body: string
      body.toUgly(manualCfg[k])
      files.add("\"$1\": $2" % [k, body])
  let content = if files.len == 0: "" else: files.foldr(a & ", " & b)
  workingJson = parseJson("{ $1 }" % content)
  return workingJson

proc GetFileData(fileName: string): JsonNode =
  when not defined(release):
    if fileName == "TestScript.psc": 
      return manualCfg
    else:
      return GetSingleFileData(fileName)
  else:
    return GetSingleFileData(fileName)

proc GetCfgProperty*(fileName: string, Test: (objType: string) -> bool): JsonNode =
  result = parseJson("[]")
  let d = GetFileData(fileName)
  for f in d.keys: 
    let fileObj = d[f]
    for obj in fileObj.items: 
      if Test(obj{"type"}.getStr()): add(result, obj)

proc GetCfgProperty*(fileName, property: string): JsonNode =
  return GetCfgProperty(fileName, (o) => o == property)

proc GetCfgProperty*(property: string): JsonNode =
  return GetCfgProperty(workingFile, (o) => o == property)

proc ForEachCfgProperty*(fileName, property: string, F: (o: JsonNode) -> void): void {.discardable.} = 
  let objs = GetCfgProperty(fileName, property)
  for o in objs: F(o)

proc GetManualConvertions*(fileName: string): JsonNode = 
  const T = (o: string) => o == "add" or o == "substitute"
  return GetCfgProperty(fileName, T)

proc GetSubstitutions*(fileName: string): JsonNode = 
  const T = (o: string) => o == "add" or o == "substitute" or o == "deprecated" or o == "redundant"
  return GetCfgProperty(fileName, T)

proc fileFromkey*(o: JsonNode, key: string = "file"): string = 
  let fn = fmt"{manualFilesPath}/" & o{"file"}.getStr()
  return readFile(fn)

# Returns custom types, like the ones declared in PO3
proc GetCustomTypes*(): seq[string] =
  result = @[]
  const arr = "values"
  for o in GetCfgProperty("types"): 
    if o.hasKey(arr):
      for i in o{arr}.getElems(): result.add(i.getStr())
