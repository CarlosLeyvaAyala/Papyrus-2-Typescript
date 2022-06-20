import sequtils
import regex
import sugar
import strutils

proc MakeSubstitutions*(txt, fileName: string): string = 
  txt