import strutils
import sequtils
import re
import sugar
import ReStr
# import strformat

var blockCommentOpen = false ## \
  ## Used for flagging while parsing that a block comment has been opened

proc getLines(fn: string): seq[string] = 
  ## Gets file content as a sequence
  var f = open(fn)
  try:
    for l in f.lines:
      result.add(l)
  except:
    raise
  finally:
    close(f)

proc ProcessLine(l: string): string =
  type Match = tuple[matched: bool, s: string] 
  proc Replace (regx: string, f: (string, openArray[string]) -> string): Match {.discardable.} =
    var matches: array[20, string]
    let r =re(regx, {reIgnoreCase, reStudy})
    result.matched = l.match(r, matches)
    result.s = if (result.matched): f(l, matches) else: l

    if result.matched: 
      # echo matches
      echo result.s

  let snT = Replace(sn, TranslateScriptName)
  let prT = Replace(pr, TranslateProperty)

  if snT.matched: return snT.s
  elif prT.matched: return prT.s
  
  return l.toUpperAscii()

proc Process*(fn, version: string): void {.discardable.} =
  ## Converts a Papyrus file named `fn` to Typescript.
  let l = getLines(fn)
  blockCommentOpen = false 

  let ugly = l.map(ProcessLine)

  # for s in ugly:
  #   echo s