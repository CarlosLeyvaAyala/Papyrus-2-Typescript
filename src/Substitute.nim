import json
import ManualOps
import regex
import sequtils
import strformat
import sugar

# Get substitution string
proc GetSubsStr(o: JsonNode): string =
  const ex = "expr"
  const fi = "file"
  if o.hasKey(ex): return o{ex}.getStr()
  elif o.hasKey(fi): return o.fileFromkey()
  return ""

proc MakeSubstitutions*(txt, fileName: string): string = 
  var tx = txt
  for o in GetManualConvertions(fileName):
    let rx = o{"find"}.getStr()
    if rx == "": continue
    let to = o.GetSubsStr()
    let r = re(rx)
    tx = tx.replace(r, to)
  tx