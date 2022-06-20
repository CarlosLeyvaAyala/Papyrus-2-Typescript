import strutils
import sequtils
import re
import sugar
import Beautify
import Imports
import Header
import ReStr
import Substitute
import os

var blockCommentOpen = false ## \
  ## Used for flagging while parsing that a block comment has been opened

proc getLines(fn: string): seq[string] = 
  ## Gets file content as a sequence
  var f = open(fn)
  try:
    for l in f.lines: result.add(l)
  except:
    raise
  finally:
    close(f)

const Flag = (regx: string) => re(regx, {reIgnoreCase, reStudy})

proc ProcessLine(l: string): string =
  type Match = tuple[matched: bool, s: string] 
  proc Replace (regx: string, f: (string, openArray[string]) -> string): Match =
    var matches: array[20, string]
    let r = Flag(regx)
    result.matched = l.match(r, matches)
    result.s = if (result.matched): f(l, matches) else: l

  let sn = Replace(isScriptName, TranslateScriptName)
  let pr = Replace(isProperty, TranslateProperty)
  let fn = Replace(isFunction, TranslateFunction)

  if sn.matched: return sn.s
  elif fn.matched: return fn.s
  elif pr.matched: return pr.s
  else: return l.TransformSpecialCases()

proc Process*(fn, version: string): void {.discardable.} =
  ## Converts a Papyrus file named `fn` to Typescript.
  let l = getLines(fn)
  blockCommentOpen = false 

  let ugly = l.map(ProcessLine)
  let output = Beautify(ugly)
    .AddImports(fn)
    .MakeSubstitutions(fn)
    .AddHeader(fn, version)
    .replace(re"\n{3,}", "\n\n")
    .strip() & "\n"

  writeFile(changeFileExt(fn, "ts"), output)
