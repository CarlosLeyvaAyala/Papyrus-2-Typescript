import sequtils
import regex
import sugar
import strutils

proc ToTsDoc(lines: seq[string]): string =
  let txt = "/**" & lines.map(s => "* " & s).foldr(a & "\n" & b) & "*/"

  let open = "/***"
  const openTo = "/**"
  let close = "*/"
  let closeTo = "\n*/"

  return txt.replace(open, openTo)
        .replace(close, closeTo) 

proc BlockCommentToTsDoc(txt: string, pattern: Regex): string = 
  const MToTsDoc = (m: RegexMatch, s: string) => ToTsDoc(m.group(0, s)[0].strip().split("\n"))
  txt.replace(pattern, MToTsDoc)

proc MultiCommentToTsDoc(txt: string): string = 
  proc CleanComment(m: RegexMatch, s: string): string =
    let lines = m.group(0, s)
    let clean = lines.map(l => l.replace(re"\s*;(.*)", "$1"))
      .map(s => strip(s))

    return "\n" & ToTsDoc(clean) & "\n"
  return txt.replace(re"(?m)(^\s*;(.*)$\n){2,}", CleanComment)

proc CommentToTsDoc(txt: string): string =
  txt.replace(re"(?m)^[^\S\r\n]*;(.*)$(?=\nexport const)", "/**$1 */")

proc BeautifyComments(txt: string): string =
  return txt
            .BlockCommentToTsDoc(re"(?sU);\/(.*)\/;")
            .BlockCommentToTsDoc(re"(?msU)^\s*{(.*)}")
            .MultiCommentToTsDoc()
            .CommentToTsDoc()
            .replace(";", "//") # Process normal comments

proc Beautify*(lines: seq[string]): string = 
  let txt = lines.foldr(a & "\n" & b)
  return BeautifyComments(txt)