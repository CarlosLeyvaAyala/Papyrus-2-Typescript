/*
Manually converted functions. Please test:
	- JsonExists
	- GetPathBoolValue

==============================================
Typescript definitions for v4.3
==============================================

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
import * as sp from "../skyrimPlatform"

import { Form } from "../skyrimPlatform"
import { FileExists } from "./MiscUtil"

const sn = (sp as any).JsonUtil


/** MOD AUTHORS, READ!
* 
* 	These functions all work in exactly the same way as their StorageUtil.psc equivalents. See them for usage docs.
* 
* 	The important difference between these functions and the ones on StorageUtil.psc, is that instead of giving "Form ObjKey"
* 	argument for the location to save the data, you give it a "string FileName" argument, pointing to an external JSON formatted file.
* 
* 	These files will be saved/loaded in JSON format, and the starting location for the files to save/load from is as follows:
* 
* 		data/skse/plugins/StorageUtilData/
* 
* 
* 	Some important notes on usage to keep in mind:
* 
* 	- You may specific a folder path in the filename, i.e. "../MyData/config" will save to data/skse/plugins/MyData/config.json
* 
* 	- If not given in the filename argument, the filename will have the extension .json appended to it automatically when used.
* 
* 	- You do not need to call Load() or Save() manually unless you have a specific need to.
* 
* 	- When the player saves their game any modified file will be automatically saved, written to, or created if it does not exist.
* 
* 	- When the player loads another save without saving themselves or the Save() function having been manually called by a script,
* 	  the loaded data will be discarded and revert back to whatever the contents of the current saved file are.
*/


export const Load = (FileName: string): boolean => sn.Load(FileName)
export const Save = (FileName: string, minify: boolean = false): boolean => sn.Save(FileName, minify)
export const Unload = (FileName: string, saveChanges: boolean = true, minify: boolean = false): boolean => sn.Unload(FileName, saveChanges, minify)

/** Check if given file has had any changes to it they haven't yet been saved */
export const IsPendingSave = (FileName: string): boolean => sn.IsPendingSave(FileName)
/** Check if the given file was succesfully loaded and has no json parser errors */
export const IsGood = (FileName: string): boolean => sn.IsGood(FileName)
/** Get a formatted error string of any json parser errors on a file, returns as empty string if no errors. */
export const GetErrors = (FileName: string): string => sn.GetErrors(FileName)
/** Returns a list of all filenames in a given folder that end in .json */
export const JsonInFolder = (folderPath: string): string[] => sn.JsonInFolder(folderPath)
/** Check if a json file exists or not */
export const JsonExists = (FileName: string): boolean => {
  if (!FileName) return false
  else if (FileName.indexOf(".json") == -1) FileName += ".json"
  return FileExists("data/skse/plugins/StorageUtilData/" + FileName)
}


/** See StorageUtil.psc for equivalent function usage instructions */
export const SetIntValue = (FileName: string, KeyName: string, value: number): number => sn.SetIntValue(FileName, KeyName, value)
export const SetFloatValue = (FileName: string, KeyName: string, value: number): number => sn.SetFloatValue(FileName, KeyName, value)
export const SetStringValue = (FileName: string, KeyName: string, value: string): string => sn.SetStringValue(FileName, KeyName, value)
export const SetFormValue = (FileName: string, KeyName: string, value: Form | null): Form | null => sn.SetFormValue(FileName, KeyName, value)

export const GetIntValue = (FileName: string, KeyName: string, missing: number = 0): number => sn.GetIntValue(FileName, KeyName, missing)
export const GetFloatValue = (FileName: string, KeyName: string, missing: number = 0.0): number => sn.GetFloatValue(FileName, KeyName, missing)
export const GetStringValue = (FileName: string, KeyName: string, missing: string = ""): string => sn.GetStringValue(FileName, KeyName, missing)
export const GetFormValue = (FileName: string, KeyName: string, missing: Form | null = null): Form | null => sn.GetFormValue(FileName, KeyName, missing)

export const UnsetIntValue = (FileName: string, KeyName: string): boolean => sn.UnsetIntValue(FileName, KeyName)
export const UnsetFloatValue = (FileName: string, KeyName: string): boolean => sn.UnsetFloatValue(FileName, KeyName)
export const UnsetStringValue = (FileName: string, KeyName: string): boolean => sn.UnsetStringValue(FileName, KeyName)
export const UnsetFormValue = (FileName: string, KeyName: string): boolean => sn.UnsetFormValue(FileName, KeyName)

export const HasIntValue = (FileName: string, KeyName: string): boolean => sn.HasIntValue(FileName, KeyName)
export const HasFloatValue = (FileName: string, KeyName: string): boolean => sn.HasFloatValue(FileName, KeyName)
export const HasStringValue = (FileName: string, KeyName: string): boolean => sn.HasStringValue(FileName, KeyName)
export const HasFormValue = (FileName: string, KeyName: string): boolean => sn.HasFormValue(FileName, KeyName)

export const IntListAdd = (FileName: string, KeyName: string, value: number, allowDuplicate: boolean = true): number => sn.IntListAdd(FileName, KeyName, value, allowDuplicate)
export const FloatListAdd = (FileName: string, KeyName: string, value: number, allowDuplicate: boolean = true): number => sn.FloatListAdd(FileName, KeyName, value, allowDuplicate)
export const StringListAdd = (FileName: string, KeyName: string, value: string, allowDuplicate: boolean = true): number => sn.StringListAdd(FileName, KeyName, value, allowDuplicate)
export const FormListAdd = (FileName: string, KeyName: string, value: Form | null, allowDuplicate: boolean = true): number => sn.FormListAdd(FileName, KeyName, value, allowDuplicate)

export const IntListGet = (FileName: string, KeyName: string, index: number): number => sn.IntListGet(FileName, KeyName, index)
export const FloatListGet = (FileName: string, KeyName: string, index: number): number => sn.FloatListGet(FileName, KeyName, index)
export const StringListGet = (FileName: string, KeyName: string, index: number): string => sn.StringListGet(FileName, KeyName, index)
export const FormListGet = (FileName: string, KeyName: string, index: number): Form | null => sn.FormListGet(FileName, KeyName, index)

export const IntListSet = (FileName: string, KeyName: string, index: number, value: number): number => sn.IntListSet(FileName, KeyName, index, value)
export const FloatListSet = (FileName: string, KeyName: string, index: number, value: number): number => sn.FloatListSet(FileName, KeyName, index, value)
export const StringListSet = (FileName: string, KeyName: string, index: number, value: string): string => sn.StringListSet(FileName, KeyName, index, value)
export const FormListSet = (FileName: string, KeyName: string, index: number, value: Form | null): Form | null => sn.FormListSet(FileName, KeyName, index, value)

export const IntListRemove = (FileName: string, KeyName: string, value: number, allInstances: boolean = true): number => sn.IntListRemove(FileName, KeyName, value, allInstances)
export const FloatListRemove = (FileName: string, KeyName: string, value: number, allInstances: boolean = true): number => sn.FloatListRemove(FileName, KeyName, value, allInstances)
export const StringListRemove = (FileName: string, KeyName: string, value: string, allInstances: boolean = true): number => sn.StringListRemove(FileName, KeyName, value, allInstances)
export const FormListRemove = (FileName: string, KeyName: string, value: Form | null, allInstances: boolean = true): number => sn.FormListRemove(FileName, KeyName, value, allInstances)

export const IntListInsertAt = (FileName: string, KeyName: string, index: number, value: number): boolean => sn.IntListInsertAt(FileName, KeyName, index, value)
export const FloatListInsertAt = (FileName: string, KeyName: string, index: number, value: number): boolean => sn.FloatListInsertAt(FileName, KeyName, index, value)
export const StringListInsertAt = (FileName: string, KeyName: string, index: number, value: string): boolean => sn.StringListInsertAt(FileName, KeyName, index, value)
export const FormListInsertAt = (FileName: string, KeyName: string, index: number, value: Form | null): boolean => sn.FormListInsertAt(FileName, KeyName, index, value)

export const IntListRemoveAt = (FileName: string, KeyName: string, index: number): boolean => sn.IntListRemoveAt(FileName, KeyName, index)
export const FloatListRemoveAt = (FileName: string, KeyName: string, index: number): boolean => sn.FloatListRemoveAt(FileName, KeyName, index)
export const StringListRemoveAt = (FileName: string, KeyName: string, index: number): boolean => sn.StringListRemoveAt(FileName, KeyName, index)
export const FormListRemoveAt = (FileName: string, KeyName: string, index: number): boolean => sn.FormListRemoveAt(FileName, KeyName, index)

export const IntListClear = (FileName: string, KeyName: string): number => sn.IntListClear(FileName, KeyName)
export const FloatListClear = (FileName: string, KeyName: string): number => sn.FloatListClear(FileName, KeyName)
export const StringListClear = (FileName: string, KeyName: string): number => sn.StringListClear(FileName, KeyName)
export const FormListClear = (FileName: string, KeyName: string): number => sn.FormListClear(FileName, KeyName)

export const IntListCount = (FileName: string, KeyName: string): number => sn.IntListCount(FileName, KeyName)
export const FloatListCount = (FileName: string, KeyName: string): number => sn.FloatListCount(FileName, KeyName)
export const StringListCount = (FileName: string, KeyName: string): number => sn.StringListCount(FileName, KeyName)
export const FormListCount = (FileName: string, KeyName: string): number => sn.FormListCount(FileName, KeyName)

export const IntListCountValue = (FileName: string, KeyName: string, value: number, exclude: boolean = false): number => sn.IntListCountValue(FileName, KeyName, value, exclude)
export const FloatListCountValue = (FileName: string, KeyName: string, value: number, exclude: boolean = false): number => sn.FloatListCountValue(FileName, KeyName, value, exclude)
export const StringListCountValue = (FileName: string, KeyName: string, value: string, exclude: boolean = false): number => sn.StringListCountValue(FileName, KeyName, value, exclude)
export const FormListCountValue = (FileName: string, KeyName: string, value: Form | null, exclude: boolean = false): number => sn.FormListCountValue(FileName, KeyName, value, exclude)

export const IntListFind = (FileName: string, KeyName: string, value: number): number => sn.IntListFind(FileName, KeyName, value)
export const FloatListFind = (FileName: string, KeyName: string, value: number): number => sn.FloatListFind(FileName, KeyName, value)
export const StringListFind = (FileName: string, KeyName: string, value: string): number => sn.StringListFind(FileName, KeyName, value)
export const FormListFind = (FileName: string, KeyName: string, value: Form | null): number => sn.FormListFind(FileName, KeyName, value)

export const IntListHas = (FileName: string, KeyName: string, value: number): boolean => sn.IntListHas(FileName, KeyName, value)
export const FloatListHas = (FileName: string, KeyName: string, value: number): boolean => sn.FloatListHas(FileName, KeyName, value)
export const StringListHas = (FileName: string, KeyName: string, value: string): boolean => sn.StringListHas(FileName, KeyName, value)
export const FormListHas = (FileName: string, KeyName: string, value: Form | null): boolean => sn.FormListHas(FileName, KeyName, value)

export const IntListSlice = (FileName: string, KeyName: string, slice: number[], startIndex: number = 0): void => sn.IntListSlice(FileName, KeyName, slice, startIndex)
export const FloatListSlice = (FileName: string, KeyName: string, slice: number[], startIndex: number = 0): void => sn.FloatListSlice(FileName, KeyName, slice, startIndex)
export const StringListSlice = (FileName: string, KeyName: string, slice: string[], startIndex: number = 0): void => sn.StringListSlice(FileName, KeyName, slice, startIndex)
export const FormListSlice = (FileName: string, KeyName: string, slice: (Form | null)[], startIndex: number = 0): void => sn.FormListSlice(FileName, KeyName, slice, startIndex)

export const IntListResize = (FileName: string, KeyName: string, toLength: number, filler: number = 0): number => sn.IntListResize(FileName, KeyName, toLength, filler)
export const FloatListResize = (FileName: string, KeyName: string, toLength: number, filler: number = 0.0): number => sn.FloatListResize(FileName, KeyName, toLength, filler)
export const StringListResize = (FileName: string, KeyName: string, toLength: number, filler: string = ""): number => sn.StringListResize(FileName, KeyName, toLength, filler)
export const FormListResize = (FileName: string, KeyName: string, toLength: number, filler: Form | null = null): number => sn.FormListResize(FileName, KeyName, toLength, filler)

export const IntListCopy = (FileName: string, KeyName: string, copy: number[]): boolean => sn.IntListCopy(FileName, KeyName, copy)
export const FloatListCopy = (FileName: string, KeyName: string, copy: number[]): boolean => sn.FloatListCopy(FileName, KeyName, copy)
export const StringListCopy = (FileName: string, KeyName: string, copy: string[]): boolean => sn.StringListCopy(FileName, KeyName, copy)
export const FormListCopy = (FileName: string, KeyName: string, copy: (Form | null)[]): boolean => sn.FormListCopy(FileName, KeyName, copy)

export const IntListToArray = (FileName: string, KeyName: string): number[] => sn.IntListToArray(FileName, KeyName)
export const FloatListToArray = (FileName: string, KeyName: string): number[] => sn.FloatListToArray(FileName, KeyName)
export const StringListToArray = (FileName: string, KeyName: string): string[] => sn.StringListToArray(FileName, KeyName)
export const FormListToArray = (FileName: string, KeyName: string): (Form | null)[] => sn.FormListToArray(FileName, KeyName)

export const AdjustIntValue = (FileName: string, KeyName: string, amount: number): number => sn.AdjustIntValue(FileName, KeyName, amount)
export const AdjustFloatValue = (FileName: string, KeyName: string, amount: number): number => sn.AdjustFloatValue(FileName, KeyName, amount)
export const IntListAdjust = (FileName: string, KeyName: string, index: number, amount: number): number => sn.IntListAdjust(FileName, KeyName, index, amount)
export const FloatListAdjust = (FileName: string, KeyName: string, index: number, amount: number): number => sn.FloatListAdjust(FileName, KeyName, index, amount)

export const CountIntValuePrefix = (FileName: string, PrefixKey: string): number => sn.CountIntValuePrefix(FileName, PrefixKey)
export const CountFloatValuePrefix = (FileName: string, PrefixKey: string): number => sn.CountFloatValuePrefix(FileName, PrefixKey)
export const CountStringValuePrefix = (FileName: string, PrefixKey: string): number => sn.CountStringValuePrefix(FileName, PrefixKey)
export const CountFormValuePrefix = (FileName: string, PrefixKey: string): number => sn.CountFormValuePrefix(FileName, PrefixKey)

export const CountIntListPrefix = (FileName: string, PrefixKey: string): number => sn.CountIntListPrefix(FileName, PrefixKey)
export const CountFloatListPrefix = (FileName: string, PrefixKey: string): number => sn.CountFloatListPrefix(FileName, PrefixKey)
export const CountStringListPrefix = (FileName: string, PrefixKey: string): number => sn.CountStringListPrefix(FileName, PrefixKey)
export const CountFormListPrefix = (FileName: string, PrefixKey: string): number => sn.CountFormListPrefix(FileName, PrefixKey)

export const CountAllPrefix = (FileName: string, PrefixKey: string): number => sn.CountAllPrefix(FileName, PrefixKey)

/** Experimental custom json formatting handlers. Paths are resolved using typical json syntax.
* The path will be created as necessary when setting data and the path does not yet exists.
* examples:
* JSON File: { "foo": { "bar": [3, 10, 7] } }
* Function: GetPathIntValue("filename.json", ".foo.bar[1]")
* Return: 10
*/


export const SetPathIntValue = (FileName: string, Path: string, value: number): void => sn.SetPathIntValue(FileName, Path, value)
export const SetPathFloatValue = (FileName: string, Path: string, value: number): void => sn.SetPathFloatValue(FileName, Path, value)
export const SetPathStringValue = (FileName: string, Path: string, value: string): void => sn.SetPathStringValue(FileName, Path, value)
export const SetPathFormValue = (FileName: string, Path: string, value: Form | null): void => sn.SetPathFormValue(FileName, Path, value)

export const SetRawPathValue = (FileName: string, Path: string, RawJSON: string): boolean => sn.SetRawPathValue(FileName, Path, RawJSON)

export const GetPathIntValue = (FileName: string, Path: string, missing: number = 0): number => sn.GetPathIntValue(FileName, Path, missing)
export const GetPathFloatValue = (FileName: string, Path: string, missing: number = 0.0): number => sn.GetPathFloatValue(FileName, Path, missing)
export const GetPathStringValue = (FileName: string, Path: string, missing: string = ""): string => sn.GetPathStringValue(FileName, Path, missing)
export const GetPathFormValue = (FileName: string, Path: string, missing: Form | null = null): Form | null => sn.GetPathFormValue(FileName, Path, missing)
export const GetPathBoolValue = (FileName: string, Path: string, missing: boolean = false): boolean => GetPathIntValue(FileName, Path, missing ? 1 : 0) != 0

export const PathIntElements = (FileName: string, Path: string, invalidType: number = 0): number[] => sn.PathIntElements(FileName, Path, invalidType)
export const PathFloatElements = (FileName: string, Path: string, invalidType: number = 0.0): number[] => sn.PathFloatElements(FileName, Path, invalidType)
export const PathStringElements = (FileName: string, Path: string, invalidType: string = ""): string[] => sn.PathStringElements(FileName, Path, invalidType)
export const PathFormElements = (FileName: string, Path: string, invalidType: Form | null = null): (Form | null)[] => sn.PathFormElements(FileName, Path, invalidType)

export const FindPathIntElement = (FileName: string, Path: string, toFind: number): number => sn.FindPathIntElement(FileName, Path, toFind)
export const FindPathFloatElement = (FileName: string, Path: string, toFind: number): number => sn.FindPathFloatElement(FileName, Path, toFind)
export const FindPathStringElement = (FileName: string, Path: string, toFind: string): number => sn.FindPathStringElement(FileName, Path, toFind)
export const FindPathFormElement = (FileName: string, Path: string, toFind: Form | null): number => sn.FindPathFormElement(FileName, Path, toFind)

export const PathCount = (FileName: string, Path: string): number => sn.PathCount(FileName, Path)
export const PathMembers = (FileName: string, Path: string): string[] => sn.PathMembers(FileName, Path)

export const CanResolvePath = (FileName: string, Path: string): boolean => sn.CanResolvePath(FileName, Path)
export const IsPathString = (FileName: string, Path: string): boolean => sn.IsPathString(FileName, Path)
export const IsPathNumber = (FileName: string, Path: string): boolean => sn.IsPathNumber(FileName, Path)
export const IsPathForm = (FileName: string, Path: string): boolean => sn.IsPathForm(FileName, Path)
export const IsPathBool = (FileName: string, Path: string): boolean => sn.IsPathBool(FileName, Path)
export const IsPathArray = (FileName: string, Path: string): boolean => sn.IsPathArray(FileName, Path)
export const IsPathObject = (FileName: string, Path: string): boolean => sn.IsPathObject(FileName, Path)

export const SetPathIntArray = (FileName: string, Path: string, arr: number[], append: boolean = false): void => sn.SetPathIntArray(FileName, Path, arr, append)
export const SetPathFloatArray = (FileName: string, Path: string, arr: number[], append: boolean = false): void => sn.SetPathFloatArray(FileName, Path, arr, append)
export const SetPathStringArray = (FileName: string, Path: string, arr: string[], append: boolean = false): void => sn.SetPathStringArray(FileName, Path, arr, append)
export const SetPathFormArray = (FileName: string, Path: string, arr: (Form | null)[], append: boolean = false): void => sn.SetPathFormArray(FileName, Path, arr, append)

export const ClearPath = (FileName: string, Path: string): void => sn.ClearPath(FileName, Path)
export const ClearPathIndex = (FileName: string, Path: string, Index: number): void => sn.ClearPathIndex(FileName, Path, Index)

/** Debug use */
export const ClearAll = (FileName: string): void => sn.ClearAll(FileName)