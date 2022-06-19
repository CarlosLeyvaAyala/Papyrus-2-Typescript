const sn = (sp as any).TestScript

/** ----------------------------------------------------------------------------------------------------------
* COMMENT
* ----------------------------------------------------------------------------------------------------------
*/

export const BoolFunc = (akActiveEffect: ActiveMagicEffect | null, asScriptName: string): boolean => sn.BoolFunc(akActiveEffect, asScriptName)

/** Returns an array of all the existing key'd transforms to the particular node
* NodeDestination is a special key
*/
export const GetNodeTransformKeys = (akRef: ObjectReference | null, firstPerson: boolean, isFemale: boolean, nodeName: string): string[] => sn.GetNodeTransformKeys(akRef, firstPerson, isFemale, nodeName)
// --------------------------------------------------------------------
    
export const ArrayFunc = (akActor: Actor | null, abShowInactive: boolean = false): (MagicEffect | null)[] => sn.ArrayFunc(akActor, abShowInactive)
	
export const ArrayToArrayFunc = (akActor: (Actor | null)[]): (Form | null)[] => sn.ArrayToArrayFunc(akActor)
	
export const BiArrayFunc = (akActor: (Actor | null)[][]): number => sn.BiArrayFunc(akActor)
export const DefaultFunc = (akActor: Form | null = null): void => sn.DefaultFunc(akActor)
/** This is a block comment
*/
/** This 
* is a 
* 	block comment
*/
// THis is a comment }
		// Event OnNewEvent(Actor akMeh, Actor akMoh)
		// EndEvent
	
/** Copy all items to new native Papyrus array of dynamic size.
*     Items not matching the requested type will have default
*     values as the ones from the getInt/Flt/Str/Form functions.
*/
export const asIntArray = (object: number): number[] => sn.asIntArray(object)

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

/** Check if a json file exists or not */
export const JsonExists = (FileName: string): boolean => sn.JsonExists(FileName)
	if !FileName
		return false
	elseIf StringUtil.Find(FileName, ".json") == -1
		FileName += ".json"
	endIf
	return MiscUtil.FileExists("data/skse/plugins/StorageUtilData/"+FileName)
endFunction

/** Simplifies iteration over container's contents.
*     Accepts the @previousKey, returns the next key.
*     If @previousKey == @endKey the function returns the first key.
*     The function always returns so-called 'valid' keys (the ones != @endKey).
*     The function returns @endKey ('invalid' key) only once to signal that iteration has reached its end.
*     In most cases, if the map doesn't contain an invalid key ("" for JMap, None form-key for JFormMap)
*     it's ok to omit the @endKey.
*     
*     Usage:
*     
*         string key = JMap.nextKey(map, previousKey="", endKey="")
*         while key != ""
*           <retrieve values here>
*           key = JMap.nextKey(map, key, endKey="")
*         endwhile
*/
export const nextKey = (object: number, previousKey: Form | null = null, endKey: Form | null = null): Form | null => sn.nextKey(object, previousKey, endKey)

/** Attempts to retrieve the value associated with the @path.
*     For ex. the following information associated with 'frosfall' key:
*     
*     "frostfall" : {
*         "exposureRate" : 0.5,
*         "arrayC" : ["stringValue", 1.5, 10, 1.14]
*     }
*     
*     then JDB.solveFlt(".frostfall.exposureRate") will return 0.5 and
*     JDB.solveObj(".frostfall.arrayC") will return the array containing ["stringValue", 1.5, 10, 1.14] values
*/
export const solveFlt = (path: string, defaultVal: number = 0.0): number => sn.solveFlt(path, defaultVal)
