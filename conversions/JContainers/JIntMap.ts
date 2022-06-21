/*
==============================================
Typescript definitions for v4.2.2
==============================================

***********************************************************************
 
This file was automatically generated by Papyrus-2-Typescript.exe
https://github.com/CarlosLeyvaAyala/Papyrus-2-Typescript

The program has no way to know the intention of the humans that made
the scripts, so it's always advisable to manually check all generated
files to make sure everything is declared as it should.
*/

import * as sp from "skyrimPlatform"

import { Form } from "skyrimPlatform"

/** Associative key-value container.
*     Inherits JValue functionality
*/
const sn = (sp as any).JIntMap

/** creates new container object. returns container's identifier (unique integer number).
*/
export const object = (): number => sn.object()

/** Returns the value associated with the @key. If not, returns @default value
*/
export const getInt = (object: number, key: number, defaultVal: number = 0): number => sn.getInt(object, key, defaultVal)
export const getFlt = (object: number, key: number, defaultVal: number = 0.0): number => sn.getFlt(object, key, defaultVal)
export const getStr = (object: number, key: number, defaultVal: string = ""): string => sn.getStr(object, key, defaultVal)
export const getObj = (object: number, key: number, defaultVal: number = 0): number => sn.getObj(object, key, defaultVal)
export const getForm = (object: number, key: number, defaultVal: Form | null = null): Form | null => sn.getForm(object, key, defaultVal)

/** Inserts @key: @value pair. Replaces existing pair with the same @key
*/
export const setInt = (object: number, key: number, value: number): void => sn.setInt(object, key, value)
export const setFlt = (object: number, key: number, value: number): void => sn.setFlt(object, key, value)
export const setStr = (object: number, key: number, value: string): void => sn.setStr(object, key, value)
export const setObj = (object: number, key: number, container: number): void => sn.setObj(object, key, container)
export const setForm = (object: number, key: number, value: Form | null): void => sn.setForm(object, key, value)

/** Returns true, if the container has @key: value pair
*/
export const hasKey = (object: number, key: number): boolean => sn.hasKey(object, key)

/** Returns type of the value associated with the @key.
*     0 - no value, 1 - none, 2 - int, 3 - float, 4 - form, 5 - object, 6 - string
*/
export const valueType = (object: number, key: number): number => sn.valueType(object, key)

/** Returns a new array containing all keys
*/
export const allKeys = (object: number): number => sn.allKeys(object)
export const allKeysPArray = (object: number): number[] => sn.allKeysPArray(object)

/** Returns a new array containing all values
*/
export const allValues = (object: number): number => sn.allValues(object)

/** Removes the pair from the container where the key equals to the @key
*/
export const removeKey = (object: number, key: number): boolean => sn.removeKey(object, key)

/** Returns count of pairs in the conainer
*/
export const count = (object: number): number => sn.count(object)

/** Removes all pairs from the container
*/
export const clear = (object: number): void => sn.clear(object)

/** Inserts key-value pairs from the source container
*/
export const addPairs = (object: number, source: number, overrideDuplicates: boolean): void => sn.addPairs(object, source, overrideDuplicates)

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
export const nextKey = (object: number, previousKey: number = 0, endKey: number = 0): number => sn.nextKey(object, previousKey, endKey)

/** Retrieves N-th key. negative index accesses items from the end of container counting backwards.
*     Worst complexity is O(n/2)
*/
export const getNthKey = (object: number, keyIndex: number): number => sn.getNthKey(object, keyIndex)
