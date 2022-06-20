import json
import os
import strformat
import strutils
import sugar
import Files

var manualCfg: JsonNode

proc InitManualCfg*(): void {.discardable.} =
  manualCfg = parseJson(readFile(manualDefs))

proc GetFileData(fileName: string): JsonNode =
  when defined(release): 
    let fn = extractFilename(fileName).toLowerAscii()
    for k in manualCfg.keys: 
      let f = fmt"{k.toLowerAscii()}.psc"
      if f == fn: return manualCfg[k]
    return parseJson("{}")
  else:
    return manualCfg
    
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