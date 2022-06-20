/*
==============================================
Typescript definitions for v4.3
==============================================

***********************************************************************
 
This file was automatically generated by Papyrus-2-Typescript.exe
https://github.com/CarlosLeyvaAyala/Papyrus-2-Typescript

The program has no way to know the intention of the humans that made
the scripts, so it's always advisable to manually check all generated
files to make sure everything is declared as it should.

Take note the program assumes this script exists in some subfolder
to the folder where `skyrimPlatform.ts` is found, otherwise you'll get
"Cannot find module..." type of errors.

If you want to have this script in some other place, just change the
relative path of each `import`.
*/
import * as sp from "skyrimPlatform"

import { Actor } from "skyrimPlatform"
import { Package } from "skyrimPlatform"

const sn = (sp as any).ActorUtil

/** Override packages of actors.
* 
* 	These overrides persist through save games. If you override package on same actor
* 	more than once then the package with highest priority will run, if multiple
* 	overrides have same priority then last added package will run. Priority ranges
* 	from 0 to 100 with 100 being highest priority.
*/

/** This will add a package to actor that will override its normal behavior. Using this function overrides all packages added from any other location. */
export const AddPackageOverride = (targetActor: Actor | null, targetPackage: Package | null, priority: number = 30, flags: number = 0): void => sn.AddPackageOverride(targetActor, targetPackage, priority, flags)

/** Remove a previously added package override. */
export const RemovePackageOverride = (targetActor: Actor | null, targetPackage: Package | null): boolean => sn.RemovePackageOverride(targetActor, targetPackage)

/** Count how many package overrides are currently on this actor. It will also count ones that's condition isn't met. */
export const CountPackageOverride = (targetActor: Actor | null): number => sn.CountPackageOverride(targetActor)

/** Remove all package overrides on this actor, including ones that were added by other mods. */
export const ClearPackageOverride = (targetActor: Actor | null): number => sn.ClearPackageOverride(targetActor)

/** Remove this package from all actor overrides. */
export const RemoveAllPackageOverride = (targetPackage: Package | null): number => sn.RemoveAllPackageOverride(targetPackage)
