import Files
import strformat
import sugar
import strutils
import sequtils

const AddDisclaimer = () => readFile(fmt"{filesPath}/disclaimer.txt")
proc AddVersion(v: string): string = readFile(fmt"{filesPath}/versionHeader.txt") % v

proc AddHeader*(txt, fileName, version: string): string = 
  # Add manually converted functions
  # Add extra header info
  let h = @[
      AddVersion(version), 
      AddDisclaimer()
    ].foldr(a & "\n\n" & b)
  return "/*\n" & h & "\n*/\n" & txt