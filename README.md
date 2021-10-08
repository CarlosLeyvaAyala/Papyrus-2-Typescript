# Papyrus-2-Typescript
Transforms *.psc header files to *.ts

## About
This program is meant to be used to transform SKSE definition libraries to Typescript for using them in [Skyrim Platform][], so you can use in Typescript all your SKSE libraries the same way you would be using them in Papyrus.

***This program's aim is not to automate whole language features translation***, but only function headers. \
If the *.psc file contains actual code (think [PapyrusUtil.psc][PapyrusUtil]) the function header will be converted, but the rest will be output verbatim, waiting for a human to come and fix it.

## Converted files

I've added to this project some converted files for libraries I use myself. Grab them at the [conversions][] folder.

***BEWARE***: Not all functions have been tested.

## Usage
Drag and drop all your *.psc files to the executable.\
It will generate *.ts files in the same folder as its input.

In code, you'll have something like this:

```typescript
import { on } from "skyrimPlatform"
import * as JArray from "JContainers/JArray"

// Lines irrelevant to our illustration purposes were ommited.

on('update', () => {
  const a = JArray.object()
  JArray.addInt(a, 5)
  const t: number = JArray.getInt(a, 0)

  // This outputs `5`, indeed.
  printConsole(`Array value: ${t}`)
})
```

## Remarks
This program has no way to know the intention of the humans that made the scripts, so it's always advisable to manually check all generated files to make sure everything is declared as it should.

Take note ⚠️the program assumes generated scripts will be put in some subfolder to the folder where `skyrimPlatform.ts` is found⚠️, otherwise you'll get `"Cannot find module..."` type of errors.

If you want to have your scripts in some other place, you can always just change the relative path of each `import` for each *.ts file, of course.

## Building
[Delphi Community Edition][] will do.

Just open the project and build.


[Skyrim Platform]: https://www.nexusmods.com/skyrimspecialedition/mods/54909
[PapyrusUtil]: https://www.nexusmods.com/skyrimspecialedition/mods/13048
[Delphi Community Edition]: https://www.embarcadero.com/products/delphi/starter/free-download
[conversions]: /conversions/