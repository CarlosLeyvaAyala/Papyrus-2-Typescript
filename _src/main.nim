import std/os
import ProcessFile

# echo "What library version are you converting? "
# var version = stdin.readLine()
var version = "1.0"

# Process files
for f in commandLineParams():
  try:
    Process(f, version)
  except:
    echo "Error: " & getCurrentException().msg
echo ""
# discard stdin.readLine()