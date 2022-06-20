# Automated manual definitions

Some files require some manual fixing before they can be used. Popular examples of such are PapyrusUtil and PO3_SKSEFunctions.

But the nature of those changes is tedious and never changes between releases.

For example, each time a new version of PapyrusUtil comes out, you would need to go to JsonUtil.psc and change the file this program generates from this:

```ts
export const JsonExists = (FileName: string): boolean => sn.JsonExists(FileName)
	if !FileName
		return false
	elseIf StringUtil.Find(FileName, ".json") == -1
		FileName += ".json"
	endIf
	return MiscUtil.FileExists("data/skse/plugins/StorageUtilData/"+FileName)
endFunction
```

To this:

```ts
export const JsonExists = (FileName: string): boolean => {
  if (!FileName) return false
  else if (FileName.indexOf(".json") == -1) FileName += ".json"
  return FileExists("data/skse/plugins/StorageUtilData/" + FileName)
}
```
These kind of changes can and should be automated, so human errors can be avoided as much as possible.

This can be done by defining entries in `manualConvertions/defs.json`.

## How does that file work

**Once the program made the basic translation** it makes some extra passes to substitute/add whatever is defined in `manualConvertions/defs.json`.

Depending on what

[JSON Escape / Unescape][JSONEscape]

[JSONEscape]: https://www.freeformatter.com/json-escape.html
[regexr]: https://regexr.com/