import json
import ManualOps
import regex
import sequtils
import strutils
import sugar

# Get substitution string
proc GetSubsStr(o: JsonNode): string =
  const ex = "expr"
  const fi = "file"
  if o.hasKey(ex): return o{ex}.getStr()
  elif o.hasKey(fi): return o.fileFromkey()
  return ""

# Returns substitution content, either verbatim or by special command
proc SpecialOrSelf(o: JsonNode): string =
  let rawRx = o{"find"}.getStr()
  if rawRx == "": return ""
  var m: RegexMatch
  if not rawRx.match(re"--s:(.*)", m): return rawRx
  let spMode = m.groupFirstCapture(0, rawRx)
  if spMode == "functionWithBody":
    return r"(?isU)(?isU)export const $1.*endFunction" % o{"display"}.getStr("Lololol function is null")
  return rawRx
  # r"(?isU)export const $1 =.*return\s+(\d+)\s+.*endFunction"

proc MakeSubstitutions*(txt, fileName: string): string = 
  var tx = txt
  for o in GetManualConvertions(fileName):
    let rx = o.SpecialOrSelf()
    if rx == "": continue
    let to = o.GetSubsStr()
    let r = re(rx)
    tx = tx.replace(r, to)
  tx