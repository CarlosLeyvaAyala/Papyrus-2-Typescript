import std/os
import ProcessFile

proc GetFileV(): string =
  when defined(release): 
    echo "What library version are you converting? "
    return stdin.readLine()
  else:
    return "1.0"

when isMainModule:
  when not defined(release): 
    echo """
*************************************
THIS IS A DEBUG BUILD. 

THIS MESSAGE SHOULD NOT BE VISIBLE.
CONTACT THE DEVELOPER.
*************************************
"""

  # Process files
  let params = commandLineParams()
  if params.len == 0:
    echo "You need to drag and drop some files to this executable or send some files as parameters."
  else:
    let version = GetFileV()

    for f in params:
      try:
        Process(f, version)
        echo "Files were successfully translated"
      except:
        echo "Error: " & getCurrentException().msg

    when defined(release): 
      echo "Press any key to continue"
      discard stdin.readLine()