import json
import os
import strformat
import strutils
import sugar
import Files

var manualCfg: JsonNode

proc InitManualCfg*(): void {.discardable.} =
  manualCfg = parseJson(readFile(manualDefs))

proc GetSingleFileData(fileName: string): JsonNode =
  let fn = extractFilename(fileName).toLowerAscii()
  for k in manualCfg.keys: 
    let f = fmt"{k.toLowerAscii()}.psc"

    if f == fn: 
      # Need to add whole body back because manualCfg[k] returns only the array content
      var body: string
      body.toUgly(manualCfg[k])
      let obj = "{ \"$1\": $2 }" % [k, body]

      return obj.parseJson()
  return parseJson("{}")

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