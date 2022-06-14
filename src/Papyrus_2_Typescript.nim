import std/os
import ProcessFile

when isMainModule:

  # Process files
  let params = commandLineParams()
  if params.len == 0:
    echo "You need to drag and drop some files to this executable or send some files as parameters."
  else:
    # echo "What library version are you converting? "
    # var version = stdin.readLine()
    var version = "1.0"

    for f in params:
      try:
        Process(f, version)
      except:
        echo "Error: " & getCurrentException().msg
    echo ""
  # discard stdin.readLine()