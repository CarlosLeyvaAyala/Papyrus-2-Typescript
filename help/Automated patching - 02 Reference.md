# Reference

## __defs.json file

Basic file structure:

```json
{
	"file name 1": [{}, {}, {}],
	"file name 2": [
		{
			"properties": "of object 1"
		},
		{
			"properties": "of object 2"
		}
	]
}
```

Each entry is the file name to which apply the patches.

## File names

```json
{
	"NiOverride": [{}],
	"LibFire": [{}, {}, {}],
	"PapyrusUtil": [{}, {}],
	"PO3_Events_*": [{}],
	"PO3_Events_AME": [{}, {}]
}
```
- Names are case insensitive.
- The `*` wildcard is allowed.
- If a file name matches with many possible entries (`PO3_Events_AME` and `PO3_Events_*` both match with `PO3_Events_AME.psc`), all those patches will be applied to the file.

# Patch types

**A patch must always have a `"type"` property**. If no such property exist, the patch will be simply ignored.

Different properties are available depending on the patch type.

If a property isn't needed, it will simply be ignored. \
This can be useful to add comments on what the patch does.

```json
{
  "type": "headerComment",
  "file": "whatever.txt",
  "comment": "This will be ignored",
  "comment1": "This too",
  "comment2": "Also this",
  "other": "...and counting me, we are ten"
}
```

Even though all non used entries will be ignored, it's always a good idea to name comment entries with names like `comment`, `commentN`... that way you can be sure I'll never use them those properties in the future.

## `"headerComment"`

Inserts a comment in the file header. Just above the _"This file was automatically generated..."_ disclaimer.

```json
{
  "type": "headerComment",
  "file": "file name.ext"
}
```
- `"file"`: Content will be gotten from a file inside `files/autoPatches/`. File extension is required.

## `"import"`

Inserts content below all the `import { Form } from "skyrimPlatform"` lines.

```json
{
  "type": "import",
  "values": ["", ""],
  "file": "file name.ext"
}
```
Both these are mutually exclusive. If `"values"` is present, `"file"` will be ignored.

- `"values"`: **Array of strings** to be added.
- `"file"`: Content will be gotten from a file inside `files/autoPatches/`. File extension is required.

#### Remarks

You can put in here whatever you like (not only manually added imports), as long as it doesn't depend on definitions made down below in the same file.

For example, I used this section for adding some useful enums in `nioverride.ts` that aren't present/possible in `nioverride.psc`.

<!-- ------------------------------ -->
Depending on what
`--s:functionWithBody`

```ts
export const CountFalse = (ArrayValues: boolean[]): number => sn.CountFalse(ArrayValues)
	return CountBool(ArrayValues, false)
endFunction
```

`--s:functionReturnsInt`

```ts
export const GetScriptVersion = (): number => sn.GetScriptVersion()
	return 7
EndFunction
```

[JSONEscape]: https://www.freeformatter.com/json-escape.html
[regexr]: https://regexr.com/
[RegexRef]: https://nitely.github.io/nim-regex/regex.html