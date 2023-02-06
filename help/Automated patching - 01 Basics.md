# Automated patching

Remember the goal of this program: translate function headers so SKSE dlls can be used in Skyrim Platform.\
Ie. `global native` functions like these:

```papyrus
; Returns the index of the first perk in `argPerks` assigned to `akActor` - if not found, -1 is returned
Int Function ActorFindAnyPerk(Actor akActor, Perk[] argPerks) Global Native

; Returns whether `akActor` has any keyword in `akKeywords`
Bool Function ActorHasAnyKeyword(Actor akActor, FormList akKeywords) Global Native

; Returns whether `akActor` has `akPerk` and its rank is `aiRank` - if match not found, `False` is returned
Bool Function ActorHasPerkRank(Actor akActor, Perk akPerk, Int aiRank) Global Native
```

Because of this, it won't properly translate functions that have bodies with actual Papyrus code.\
Popular examples of files with such functions are PapyrusUtil and JContainers.

Those kind of functions require to be manually translated by a human, but the nature of those fixes is tedious and there are seldomly any changes between releases on those functions (if ever).

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

Since those kind of changes can and should be automated, this program has capabilities to do just that.

***This program still doesn't know how to translate those kind of functions***, but it can know what hand-made patch to apply when it finds things that need to be patched.

## How to register patches

Patches are registered by defining entries in `bin\files\autoPatches\__defs.json`.

The basic structure of that file is this:

```json
{
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
}
```

Basically, a file name has an array of patches that can be applied to it. 
Each patch is a Json object (delimited by `{}`).

Let's see an example.

```json
{
  "NiOverride": [{}, {}, {}],
  "LibFire": [{}, {}, {}],
  "PapyrusUtil": [{}, {}, {}]
}
```

When this program finds it's working on `"nioverride.psc"` (notice how file name comparison is case insensitive) it applies patches defined in the `"NiOverride"` entry.

# Inner workings

## Regex 

Most patches are PCRE-flavored regular expressions that find something and replace it with some other things.

Things to always keep in mind:

- It's always a good idea to use flags on the regex, like `(?i)`, `(?U)`, etc.
- The whole file content is treated as a single string, so if you want to use `^` and `$` for each line you must also use `(?m)`.
- If your regex uses `\n` and it isn't working, try to include `\r` as well.
- You need to escape your regexes before adding them to the json file.\
	[JSON Escape / Unescape][JSONEscape] works quite well for me.
- [regexr][] is a good testing ground to check if your regex works.
- Documentation on the available syntax is a bit vague ([read only the first paragraph][RegexRef]), so I don't really know what works and what doesn't.\
	I know look-aheads work (the app uses them to translate comments), but maybe look-behinds don't?

## Patching order

It's good to know when you patches are being applied, so you don't get unexpected results.

These are the general translation steps this program does:

1. General translation (properties, functions, comments...)
2. Autopatching substitutions
3. Insert imports from Skyrim Platform (`import { Form } from "skyrimPlatform"`...)
4. Insert patches at `import` level
5. Insert patches at `header` level
6. Header

Patches are applied in a top to down fashion, like this:

```json
{
  "file name 2": [
    {
      "patch order": "#1"
    },
    {
      "patch order": "#2"
    },
    {
      "patch order": "#3"
    }
  ]
}
```

[JSONEscape]: https://www.freeformatter.com/json-escape.html
[regexr]: https://regexr.com/
[RegexRef]: https://nitely.github.io/nim-regex/regex.html