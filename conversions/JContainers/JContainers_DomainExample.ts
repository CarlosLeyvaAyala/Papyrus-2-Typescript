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
import { FormList } from "skyrimPlatform"

const sn = (sp as any).JContainers_DomainExample

// JArray

export const JArray_object = (): number => sn.JArray_object()
export const JArray_objectWithSize = (size: number): number => sn.JArray_objectWithSize(size)
export const JArray_objectWithInts = (values: number[]): number => sn.JArray_objectWithInts(values)
export const JArray_objectWithStrings = (values: string[]): number => sn.JArray_objectWithStrings(values)
export const JArray_objectWithFloats = (values: number[]): number => sn.JArray_objectWithFloats(values)
export const JArray_objectWithBooleans = (values: boolean[]): number => sn.JArray_objectWithBooleans(values)
export const JArray_objectWithForms = (values: (Form | null)[] | null): number => sn.JArray_objectWithForms(values)
export const JArray_subArray = (object: number, startIndex: number, endIndex: number): number => sn.JArray_subArray(object, startIndex, endIndex)
export const JArray_addFromArray = (object: number, source: number, insertAtIndex: number = -1): void => sn.JArray_addFromArray(object, source, insertAtIndex)
export const JArray_addFromFormList = (object: number, source: FormList | null, insertAtIndex: number = -1): void => sn.JArray_addFromFormList(object, source, insertAtIndex)
export const JArray_getInt = (object: number, index: number, defaultVal: number = 0): number => sn.JArray_getInt(object, index, defaultVal)
export const JArray_getFlt = (object: number, index: number, defaultVal: number = 0.0): number => sn.JArray_getFlt(object, index, defaultVal)
export const JArray_getStr = (object: number, index: number, defaultVal: string = ""): string => sn.JArray_getStr(object, index, defaultVal)
export const JArray_getObj = (object: number, index: number, defaultVal: number = 0): number => sn.JArray_getObj(object, index, defaultVal)
export const JArray_getForm = (object: number, index: number, defaultVal: Form | null = null): Form | null => sn.JArray_getForm(object, index, defaultVal)
export const JArray_asIntArray = (object: number): number[] => sn.JArray_asIntArray(object)
export const JArray_asFloatArray = (object: number): number[] => sn.JArray_asFloatArray(object)
export const JArray_asStringArray = (object: number): string[] => sn.JArray_asStringArray(object)
export const JArray_asFormArray = (object: number): (Form | null)[] => sn.JArray_asFormArray(object)
export const JArray_findInt = (object: number, value: number, searchStartIndex: number = 0): number => sn.JArray_findInt(object, value, searchStartIndex)
export const JArray_findFlt = (object: number, value: number, searchStartIndex: number = 0): number => sn.JArray_findFlt(object, value, searchStartIndex)
export const JArray_findStr = (object: number, value: string, searchStartIndex: number = 0): number => sn.JArray_findStr(object, value, searchStartIndex)
export const JArray_findObj = (object: number, container: number, searchStartIndex: number = 0): number => sn.JArray_findObj(object, container, searchStartIndex)
export const JArray_findForm = (object: number, value: Form | null, searchStartIndex: number = 0): number => sn.JArray_findForm(object, value, searchStartIndex)
export const JArray_countInteger = (object: number, value: number): number => sn.JArray_countInteger(object, value)
export const JArray_countFloat = (object: number, value: number): number => sn.JArray_countFloat(object, value)
export const JArray_countString = (object: number, value: string): number => sn.JArray_countString(object, value)
export const JArray_countObject = (object: number, container: number): number => sn.JArray_countObject(object, container)
export const JArray_countForm = (object: number, value: Form | null): number => sn.JArray_countForm(object, value)
export const JArray_setInt = (object: number, index: number, value: number): void => sn.JArray_setInt(object, index, value)
export const JArray_setFlt = (object: number, index: number, value: number): void => sn.JArray_setFlt(object, index, value)
export const JArray_setStr = (object: number, index: number, value: string): void => sn.JArray_setStr(object, index, value)
export const JArray_setObj = (object: number, index: number, container: number): void => sn.JArray_setObj(object, index, container)
export const JArray_setForm = (object: number, index: number, value: Form | null): void => sn.JArray_setForm(object, index, value)
export const JArray_addInt = (object: number, value: number, addToIndex: number = -1): void => sn.JArray_addInt(object, value, addToIndex)
export const JArray_addFlt = (object: number, value: number, addToIndex: number = -1): void => sn.JArray_addFlt(object, value, addToIndex)
export const JArray_addStr = (object: number, value: string, addToIndex: number = -1): void => sn.JArray_addStr(object, value, addToIndex)
export const JArray_addObj = (object: number, container: number, addToIndex: number = -1): void => sn.JArray_addObj(object, container, addToIndex)
export const JArray_addForm = (object: number, value: Form | null, addToIndex: number = -1): void => sn.JArray_addForm(object, value, addToIndex)
export const JArray_count = (object: number): number => sn.JArray_count(object)
export const JArray_clear = (object: number): void => sn.JArray_clear(object)
export const JArray_eraseIndex = (object: number, index: number): void => sn.JArray_eraseIndex(object, index)
export const JArray_eraseRange = (object: number, first: number, last: number): void => sn.JArray_eraseRange(object, first, last)
export const JArray_eraseInteger = (object: number, value: number): number => sn.JArray_eraseInteger(object, value)
export const JArray_eraseFloat = (object: number, value: number): number => sn.JArray_eraseFloat(object, value)
export const JArray_eraseString = (object: number, value: string): number => sn.JArray_eraseString(object, value)
export const JArray_eraseObject = (object: number, container: number): number => sn.JArray_eraseObject(object, container)
export const JArray_eraseForm = (object: number, value: Form | null): number => sn.JArray_eraseForm(object, value)
export const JArray_valueType = (object: number, index: number): number => sn.JArray_valueType(object, index)
export const JArray_swapItems = (object: number, index1: number, index2: number): void => sn.JArray_swapItems(object, index1, index2)
export const JArray_sort = (object: number): number => sn.JArray_sort(object)
export const JArray_unique = (object: number): number => sn.JArray_unique(object)
export const JArray_reverse = (object: number): number => sn.JArray_reverse(object)
export const JArray_writeToIntegerPArray = (object: number, targetArray: number[], writeAtIdx: number = 0, stopWriteAtIdx: number = -1, readIdx: number = 0, defaultValRead: number = 0): boolean => sn.JArray_writeToIntegerPArray(object, targetArray, writeAtIdx, stopWriteAtIdx, readIdx, defaultValRead)
export const JArray_writeToFloatPArray = (object: number, targetArray: number[], writeAtIdx: number = 0, stopWriteAtIdx: number = -1, readIdx: number = 0, defaultValRead: number = 0.0): boolean => sn.JArray_writeToFloatPArray(object, targetArray, writeAtIdx, stopWriteAtIdx, readIdx, defaultValRead)
export const JArray_writeToFormPArray = (object: number, targetArray: (Form | null)[] | null, writeAtIdx: number = 0, stopWriteAtIdx: number = -1, readIdx: number = 0, defaultValRead: Form | null = null): boolean => sn.JArray_writeToFormPArray(object, targetArray, writeAtIdx, stopWriteAtIdx, readIdx, defaultValRead)
export const JArray_writeToStringPArray = (object: number, targetArray: string[], writeAtIdx: number = 0, stopWriteAtIdx: number = -1, readIdx: number = 0, defaultValRead: string = ""): boolean => sn.JArray_writeToStringPArray(object, targetArray, writeAtIdx, stopWriteAtIdx, readIdx, defaultValRead)

// JAtomic

export const JAtomic_fetchAddInt = (object: number, path: string, value: number, initialValue: number = 0, createMissingKeys: boolean = false, onErrorReturn: number = 0): number => sn.JAtomic_fetchAddInt(object, path, value, initialValue, createMissingKeys, onErrorReturn)
export const JAtomic_fetchAddFlt = (object: number, path: string, value: number, initialValue: number = 0.0, createMissingKeys: boolean = false, onErrorReturn: number = 0.0): number => sn.JAtomic_fetchAddFlt(object, path, value, initialValue, createMissingKeys, onErrorReturn)
export const JAtomic_fetchMultInt = (object: number, path: string, value: number, initialValue: number = 0, createMissingKeys: boolean = false, onErrorReturn: number = 0): number => sn.JAtomic_fetchMultInt(object, path, value, initialValue, createMissingKeys, onErrorReturn)
export const JAtomic_fetchMultFlt = (object: number, path: string, value: number, initialValue: number = 0.0, createMissingKeys: boolean = false, onErrorReturn: number = 0.0): number => sn.JAtomic_fetchMultFlt(object, path, value, initialValue, createMissingKeys, onErrorReturn)
export const JAtomic_fetchModInt = (object: number, path: string, value: number, initialValue: number = 0, createMissingKeys: boolean = false, onErrorReturn: number = 0): number => sn.JAtomic_fetchModInt(object, path, value, initialValue, createMissingKeys, onErrorReturn)
export const JAtomic_fetchDivInt = (object: number, path: string, value: number, initialValue: number = 0, createMissingKeys: boolean = false, onErrorReturn: number = 0): number => sn.JAtomic_fetchDivInt(object, path, value, initialValue, createMissingKeys, onErrorReturn)
export const JAtomic_fetchDivFlt = (object: number, path: string, value: number, initialValue: number = 0.0, createMissingKeys: boolean = false, onErrorReturn: number = 0.0): number => sn.JAtomic_fetchDivFlt(object, path, value, initialValue, createMissingKeys, onErrorReturn)
export const JAtomic_fetchAndInt = (object: number, path: string, value: number, initialValue: number = 0, createMissingKeys: boolean = false, onErrorReturn: number = 0): number => sn.JAtomic_fetchAndInt(object, path, value, initialValue, createMissingKeys, onErrorReturn)
export const JAtomic_fetchXorInt = (object: number, path: string, value: number, initialValue: number = 0, createMissingKeys: boolean = false, onErrorReturn: number = 0): number => sn.JAtomic_fetchXorInt(object, path, value, initialValue, createMissingKeys, onErrorReturn)
export const JAtomic_fetchOrInt = (object: number, path: string, value: number, initialValue: number = 0, createMissingKeys: boolean = false, onErrorReturn: number = 0): number => sn.JAtomic_fetchOrInt(object, path, value, initialValue, createMissingKeys, onErrorReturn)
export const JAtomic_exchangeInt = (object: number, path: string, value: number, createMissingKeys: boolean = false, onErrorReturn: number = 0): number => sn.JAtomic_exchangeInt(object, path, value, createMissingKeys, onErrorReturn)
export const JAtomic_exchangeFlt = (object: number, path: string, value: number, createMissingKeys: boolean = false, onErrorReturn: number = 0.0): number => sn.JAtomic_exchangeFlt(object, path, value, createMissingKeys, onErrorReturn)
export const JAtomic_exchangeStr = (object: number, path: string, value: string, createMissingKeys: boolean = false, onErrorReturn: string = ""): string => sn.JAtomic_exchangeStr(object, path, value, createMissingKeys, onErrorReturn)
export const JAtomic_exchangeForm = (object: number, path: string, value: Form | null, createMissingKeys: boolean = false, onErrorReturn: Form | null = null): Form | null => sn.JAtomic_exchangeForm(object, path, value, createMissingKeys, onErrorReturn)
export const JAtomic_exchangeObj = (object: number, path: string, value: number, createMissingKeys: boolean = false, onErrorReturn: number = 0): number => sn.JAtomic_exchangeObj(object, path, value, createMissingKeys, onErrorReturn)
export const JAtomic_compareExchangeInt = (object: number, path: string, desired: number, expected: number, createMissingKeys: boolean = false, onErrorReturn: number = 0): number => sn.JAtomic_compareExchangeInt(object, path, desired, expected, createMissingKeys, onErrorReturn)
export const JAtomic_compareExchangeFlt = (object: number, path: string, desired: number, expected: number, createMissingKeys: boolean = false, onErrorReturn: number = 0.0): number => sn.JAtomic_compareExchangeFlt(object, path, desired, expected, createMissingKeys, onErrorReturn)
export const JAtomic_compareExchangeStr = (object: number, path: string, desired: string, expected: string, createMissingKeys: boolean = false, onErrorReturn: string = ""): string => sn.JAtomic_compareExchangeStr(object, path, desired, expected, createMissingKeys, onErrorReturn)
export const JAtomic_compareExchangeForm = (object: number, path: string, desired: Form | null, expected: Form | null, createMissingKeys: boolean = false, onErrorReturn: Form | null = null): Form | null => sn.JAtomic_compareExchangeForm(object, path, desired, expected, createMissingKeys, onErrorReturn)
export const JAtomic_compareExchangeObj = (object: number, path: string, desired: number, expected: number, createMissingKeys: boolean = false, onErrorReturn: number = 0): number => sn.JAtomic_compareExchangeObj(object, path, desired, expected, createMissingKeys, onErrorReturn)

/** JContainers
* JDB
*/

export const JDB_solveFlt = (path: string, defaultVal: number = 0.0): number => sn.JDB_solveFlt(path, defaultVal)
export const JDB_solveInt = (path: string, defaultVal: number = 0): number => sn.JDB_solveInt(path, defaultVal)
export const JDB_solveStr = (path: string, defaultVal: string = ""): string => sn.JDB_solveStr(path, defaultVal)
export const JDB_solveObj = (path: string, defaultVal: number = 0): number => sn.JDB_solveObj(path, defaultVal)
export const JDB_solveForm = (path: string, defaultVal: Form | null = null): Form | null => sn.JDB_solveForm(path, defaultVal)
export const JDB_solveFltSetter = (path: string, value: number, createMissingKeys: boolean = false): boolean => sn.JDB_solveFltSetter(path, value, createMissingKeys)
export const JDB_solveIntSetter = (path: string, value: number, createMissingKeys: boolean = false): boolean => sn.JDB_solveIntSetter(path, value, createMissingKeys)
export const JDB_solveStrSetter = (path: string, value: string, createMissingKeys: boolean = false): boolean => sn.JDB_solveStrSetter(path, value, createMissingKeys)
export const JDB_solveObjSetter = (path: string, value: number, createMissingKeys: boolean = false): boolean => sn.JDB_solveObjSetter(path, value, createMissingKeys)
export const JDB_solveFormSetter = (path: string, value: Form | null, createMissingKeys: boolean = false): boolean => sn.JDB_solveFormSetter(path, value, createMissingKeys)
export const JDB_setObj = (key: string, object: number): void => sn.JDB_setObj(key, object)
export const JDB_hasPath = (path: string): boolean => sn.JDB_hasPath(path)
export const JDB_allKeys = (): number => sn.JDB_allKeys()
export const JDB_allValues = (): number => sn.JDB_allValues()
export const JDB_writeToFile = (path: string): void => sn.JDB_writeToFile(path)
export const JDB_root = (): number => sn.JDB_root()

// JFormDB

export const JFormDB_setEntry = (storageName: string, fKey: Form | null, entry: number): void => sn.JFormDB_setEntry(storageName, fKey, entry)
export const JFormDB_makeEntry = (storageName: string, fKey: Form | null): number => sn.JFormDB_makeEntry(storageName, fKey)
export const JFormDB_findEntry = (storageName: string, fKey: Form | null): number => sn.JFormDB_findEntry(storageName, fKey)
export const JFormDB_solveFlt = (fKey: Form | null, path: string, defaultVal: number = 0.0): number => sn.JFormDB_solveFlt(fKey, path, defaultVal)
export const JFormDB_solveInt = (fKey: Form | null, path: string, defaultVal: number = 0): number => sn.JFormDB_solveInt(fKey, path, defaultVal)
export const JFormDB_solveStr = (fKey: Form | null, path: string, defaultVal: string = ""): string => sn.JFormDB_solveStr(fKey, path, defaultVal)
export const JFormDB_solveObj = (fKey: Form | null, path: string, defaultVal: number = 0): number => sn.JFormDB_solveObj(fKey, path, defaultVal)
export const JFormDB_solveForm = (fKey: Form | null, path: string, defaultVal: Form | null = null): Form | null => sn.JFormDB_solveForm(fKey, path, defaultVal)
export const JFormDB_solveFltSetter = (fKey: Form | null, path: string, value: number, createMissingKeys: boolean = false): boolean => sn.JFormDB_solveFltSetter(fKey, path, value, createMissingKeys)
export const JFormDB_solveIntSetter = (fKey: Form | null, path: string, value: number, createMissingKeys: boolean = false): boolean => sn.JFormDB_solveIntSetter(fKey, path, value, createMissingKeys)
export const JFormDB_solveStrSetter = (fKey: Form | null, path: string, value: string, createMissingKeys: boolean = false): boolean => sn.JFormDB_solveStrSetter(fKey, path, value, createMissingKeys)
export const JFormDB_solveObjSetter = (fKey: Form | null, path: string, value: number, createMissingKeys: boolean = false): boolean => sn.JFormDB_solveObjSetter(fKey, path, value, createMissingKeys)
export const JFormDB_solveFormSetter = (fKey: Form | null, path: string, value: Form | null, createMissingKeys: boolean = false): boolean => sn.JFormDB_solveFormSetter(fKey, path, value, createMissingKeys)
export const JFormDB_hasPath = (fKey: Form | null, path: string): boolean => sn.JFormDB_hasPath(fKey, path)
export const JFormDB_allKeys = (fKey: Form | null, key: string): number => sn.JFormDB_allKeys(fKey, key)
export const JFormDB_allValues = (fKey: Form | null, key: string): number => sn.JFormDB_allValues(fKey, key)
export const JFormDB_getInt = (fKey: Form | null, key: string): number => sn.JFormDB_getInt(fKey, key)
export const JFormDB_getFlt = (fKey: Form | null, key: string): number => sn.JFormDB_getFlt(fKey, key)
export const JFormDB_getStr = (fKey: Form | null, key: string): string => sn.JFormDB_getStr(fKey, key)
export const JFormDB_getObj = (fKey: Form | null, key: string): number => sn.JFormDB_getObj(fKey, key)
export const JFormDB_getForm = (fKey: Form | null, key: string): Form | null => sn.JFormDB_getForm(fKey, key)
export const JFormDB_setInt = (fKey: Form | null, key: string, value: number): void => sn.JFormDB_setInt(fKey, key, value)
export const JFormDB_setFlt = (fKey: Form | null, key: string, value: number): void => sn.JFormDB_setFlt(fKey, key, value)
export const JFormDB_setStr = (fKey: Form | null, key: string, value: string): void => sn.JFormDB_setStr(fKey, key, value)
export const JFormDB_setObj = (fKey: Form | null, key: string, container: number): void => sn.JFormDB_setObj(fKey, key, container)
export const JFormDB_setForm = (fKey: Form | null, key: string, value: Form | null): void => sn.JFormDB_setForm(fKey, key, value)

// JFormMap

export const JFormMap_object = (): number => sn.JFormMap_object()
export const JFormMap_getInt = (object: number, key: Form | null, defaultVal: number = 0): number => sn.JFormMap_getInt(object, key, defaultVal)
export const JFormMap_getFlt = (object: number, key: Form | null, defaultVal: number = 0.0): number => sn.JFormMap_getFlt(object, key, defaultVal)
export const JFormMap_getStr = (object: number, key: Form | null, defaultVal: string = ""): string => sn.JFormMap_getStr(object, key, defaultVal)
export const JFormMap_getObj = (object: number, key: Form | null, defaultVal: number = 0): number => sn.JFormMap_getObj(object, key, defaultVal)
export const JFormMap_getForm = (object: number, key: Form | null, defaultVal: Form | null = null): Form | null => sn.JFormMap_getForm(object, key, defaultVal)
export const JFormMap_setInt = (object: number, key: Form | null, value: number): void => sn.JFormMap_setInt(object, key, value)
export const JFormMap_setFlt = (object: number, key: Form | null, value: number): void => sn.JFormMap_setFlt(object, key, value)
export const JFormMap_setStr = (object: number, key: Form | null, value: string): void => sn.JFormMap_setStr(object, key, value)
export const JFormMap_setObj = (object: number, key: Form | null, container: number): void => sn.JFormMap_setObj(object, key, container)
export const JFormMap_setForm = (object: number, key: Form | null, value: Form | null): void => sn.JFormMap_setForm(object, key, value)
export const JFormMap_hasKey = (object: number, key: Form | null): boolean => sn.JFormMap_hasKey(object, key)
export const JFormMap_valueType = (object: number, key: Form | null): number => sn.JFormMap_valueType(object, key)
export const JFormMap_allKeys = (object: number): number => sn.JFormMap_allKeys(object)
export const JFormMap_allKeysPArray = (object: number): (Form | null)[] => sn.JFormMap_allKeysPArray(object)
export const JFormMap_allValues = (object: number): number => sn.JFormMap_allValues(object)
export const JFormMap_removeKey = (object: number, key: Form | null): boolean => sn.JFormMap_removeKey(object, key)
export const JFormMap_count = (object: number): number => sn.JFormMap_count(object)
export const JFormMap_clear = (object: number): void => sn.JFormMap_clear(object)
export const JFormMap_addPairs = (object: number, source: number, overrideDuplicates: boolean): void => sn.JFormMap_addPairs(object, source, overrideDuplicates)
export const JFormMap_nextKey = (object: number, previousKey: Form | null = null, endKey: Form | null = null): Form | null => sn.JFormMap_nextKey(object, previousKey, endKey)
export const JFormMap_getNthKey = (object: number, keyIndex: number): Form | null => sn.JFormMap_getNthKey(object, keyIndex)

// JIntMap

export const JIntMap_object = (): number => sn.JIntMap_object()
export const JIntMap_getInt = (object: number, key: number, defaultVal: number = 0): number => sn.JIntMap_getInt(object, key, defaultVal)
export const JIntMap_getFlt = (object: number, key: number, defaultVal: number = 0.0): number => sn.JIntMap_getFlt(object, key, defaultVal)
export const JIntMap_getStr = (object: number, key: number, defaultVal: string = ""): string => sn.JIntMap_getStr(object, key, defaultVal)
export const JIntMap_getObj = (object: number, key: number, defaultVal: number = 0): number => sn.JIntMap_getObj(object, key, defaultVal)
export const JIntMap_getForm = (object: number, key: number, defaultVal: Form | null = null): Form | null => sn.JIntMap_getForm(object, key, defaultVal)
export const JIntMap_setInt = (object: number, key: number, value: number): void => sn.JIntMap_setInt(object, key, value)
export const JIntMap_setFlt = (object: number, key: number, value: number): void => sn.JIntMap_setFlt(object, key, value)
export const JIntMap_setStr = (object: number, key: number, value: string): void => sn.JIntMap_setStr(object, key, value)
export const JIntMap_setObj = (object: number, key: number, container: number): void => sn.JIntMap_setObj(object, key, container)
export const JIntMap_setForm = (object: number, key: number, value: Form | null): void => sn.JIntMap_setForm(object, key, value)
export const JIntMap_hasKey = (object: number, key: number): boolean => sn.JIntMap_hasKey(object, key)
export const JIntMap_valueType = (object: number, key: number): number => sn.JIntMap_valueType(object, key)
export const JIntMap_allKeys = (object: number): number => sn.JIntMap_allKeys(object)
export const JIntMap_allKeysPArray = (object: number): number[] => sn.JIntMap_allKeysPArray(object)
export const JIntMap_allValues = (object: number): number => sn.JIntMap_allValues(object)
export const JIntMap_removeKey = (object: number, key: number): boolean => sn.JIntMap_removeKey(object, key)
export const JIntMap_count = (object: number): number => sn.JIntMap_count(object)
export const JIntMap_clear = (object: number): void => sn.JIntMap_clear(object)
export const JIntMap_addPairs = (object: number, source: number, overrideDuplicates: boolean): void => sn.JIntMap_addPairs(object, source, overrideDuplicates)
export const JIntMap_nextKey = (object: number, previousKey: number = 0, endKey: number = 0): number => sn.JIntMap_nextKey(object, previousKey, endKey)
export const JIntMap_getNthKey = (object: number, keyIndex: number): number => sn.JIntMap_getNthKey(object, keyIndex)

// JLua

export const JLua_evalLuaFlt = (luaCode: string, transport: number, defaultVal: number = 0.0, minimizeLifetime: boolean = true): number => sn.JLua_evalLuaFlt(luaCode, transport, defaultVal, minimizeLifetime)
export const JLua_evalLuaInt = (luaCode: string, transport: number, defaultVal: number = 0, minimizeLifetime: boolean = true): number => sn.JLua_evalLuaInt(luaCode, transport, defaultVal, minimizeLifetime)
export const JLua_evalLuaStr = (luaCode: string, transport: number, defaultVal: string = "", minimizeLifetime: boolean = true): string => sn.JLua_evalLuaStr(luaCode, transport, defaultVal, minimizeLifetime)
export const JLua_evalLuaObj = (luaCode: string, transport: number, defaultVal: number = 0, minimizeLifetime: boolean = true): number => sn.JLua_evalLuaObj(luaCode, transport, defaultVal, minimizeLifetime)
export const JLua_evalLuaForm = (luaCode: string, transport: number, defaultVal: Form | null = null, minimizeLifetime: boolean = true): Form | null => sn.JLua_evalLuaForm(luaCode, transport, defaultVal, minimizeLifetime)
export const JLua_setStr = (key: string, value: string, transport: number = 0): number => sn.JLua_setStr(key, value, transport)
export const JLua_setFlt = (key: string, value: number, transport: number = 0): number => sn.JLua_setFlt(key, value, transport)
export const JLua_setInt = (key: string, value: number, transport: number = 0): number => sn.JLua_setInt(key, value, transport)
export const JLua_setForm = (key: string, value: Form | null, transport: number = 0): number => sn.JLua_setForm(key, value, transport)
export const JLua_setObj = (key: string, value: number, transport: number = 0): number => sn.JLua_setObj(key, value, transport)

// JMap

export const JMap_object = (): number => sn.JMap_object()
export const JMap_getInt = (object: number, key: string, defaultVal: number = 0): number => sn.JMap_getInt(object, key, defaultVal)
export const JMap_getFlt = (object: number, key: string, defaultVal: number = 0.0): number => sn.JMap_getFlt(object, key, defaultVal)
export const JMap_getStr = (object: number, key: string, defaultVal: string = ""): string => sn.JMap_getStr(object, key, defaultVal)
export const JMap_getObj = (object: number, key: string, defaultVal: number = 0): number => sn.JMap_getObj(object, key, defaultVal)
export const JMap_getForm = (object: number, key: string, defaultVal: Form | null = null): Form | null => sn.JMap_getForm(object, key, defaultVal)
export const JMap_setInt = (object: number, key: string, value: number): void => sn.JMap_setInt(object, key, value)
export const JMap_setFlt = (object: number, key: string, value: number): void => sn.JMap_setFlt(object, key, value)
export const JMap_setStr = (object: number, key: string, value: string): void => sn.JMap_setStr(object, key, value)
export const JMap_setObj = (object: number, key: string, container: number): void => sn.JMap_setObj(object, key, container)
export const JMap_setForm = (object: number, key: string, value: Form | null): void => sn.JMap_setForm(object, key, value)
export const JMap_hasKey = (object: number, key: string): boolean => sn.JMap_hasKey(object, key)
export const JMap_valueType = (object: number, key: string): number => sn.JMap_valueType(object, key)
export const JMap_allKeys = (object: number): number => sn.JMap_allKeys(object)
export const JMap_allKeysPArray = (object: number): string[] => sn.JMap_allKeysPArray(object)
export const JMap_allValues = (object: number): number => sn.JMap_allValues(object)
export const JMap_removeKey = (object: number, key: string): boolean => sn.JMap_removeKey(object, key)
export const JMap_count = (object: number): number => sn.JMap_count(object)
export const JMap_clear = (object: number): void => sn.JMap_clear(object)
export const JMap_addPairs = (object: number, source: number, overrideDuplicates: boolean): void => sn.JMap_addPairs(object, source, overrideDuplicates)
export const JMap_nextKey = (object: number, previousKey: string = "", endKey: string = ""): string => sn.JMap_nextKey(object, previousKey, endKey)
export const JMap_getNthKey = (object: number, keyIndex: number): string => sn.JMap_getNthKey(object, keyIndex)

// JString

export const JString_wrap = (sourceText: string, charactersPerLine: number = 60): number => sn.JString_wrap(sourceText, charactersPerLine)

// JValue

export const JValue_enableAPILog = (arg0: boolean): void => sn.JValue_enableAPILog(arg0)
export const JValue_retain = (object: number, tag: string = ""): number => sn.JValue_retain(object, tag)
export const JValue_release = (object: number): number => sn.JValue_release(object)
export const JValue_releaseAndRetain = (previousObject: number, newObject: number, tag: string = ""): number => sn.JValue_releaseAndRetain(previousObject, newObject, tag)
export const JValue_releaseObjectsWithTag = (tag: string): void => sn.JValue_releaseObjectsWithTag(tag)
export const JValue_zeroLifetime = (object: number): number => sn.JValue_zeroLifetime(object)
export const JValue_addToPool = (object: number, poolName: string): number => sn.JValue_addToPool(object, poolName)
export const JValue_cleanPool = (poolName: string): void => sn.JValue_cleanPool(poolName)
export const JValue_shallowCopy = (object: number): number => sn.JValue_shallowCopy(object)
export const JValue_deepCopy = (object: number): number => sn.JValue_deepCopy(object)
export const JValue_isExists = (object: number): boolean => sn.JValue_isExists(object)
export const JValue_isArray = (object: number): boolean => sn.JValue_isArray(object)
export const JValue_isMap = (object: number): boolean => sn.JValue_isMap(object)
export const JValue_isFormMap = (object: number): boolean => sn.JValue_isFormMap(object)
export const JValue_isIntegerMap = (object: number): boolean => sn.JValue_isIntegerMap(object)
export const JValue_empty = (object: number): boolean => sn.JValue_empty(object)
export const JValue_count = (object: number): number => sn.JValue_count(object)
export const JValue_clear = (object: number): void => sn.JValue_clear(object)
export const JValue_readFromFile = (filePath: string): number => sn.JValue_readFromFile(filePath)
export const JValue_readFromDirectory = (directoryPath: string, extension: string = ""): number => sn.JValue_readFromDirectory(directoryPath, extension)
export const JValue_objectFromPrototype = (prototype: string): number => sn.JValue_objectFromPrototype(prototype)
export const JValue_writeToFile = (object: number, filePath: string): void => sn.JValue_writeToFile(object, filePath)
export const JValue_solvedValueType = (object: number, path: string): number => sn.JValue_solvedValueType(object, path)
export const JValue_hasPath = (object: number, path: string): boolean => sn.JValue_hasPath(object, path)
export const JValue_solveFlt = (object: number, path: string, defaultVal: number = 0.0): number => sn.JValue_solveFlt(object, path, defaultVal)
export const JValue_solveInt = (object: number, path: string, defaultVal: number = 0): number => sn.JValue_solveInt(object, path, defaultVal)
export const JValue_solveStr = (object: number, path: string, defaultVal: string = ""): string => sn.JValue_solveStr(object, path, defaultVal)
export const JValue_solveObj = (object: number, path: string, defaultVal: number = 0): number => sn.JValue_solveObj(object, path, defaultVal)
export const JValue_solveForm = (object: number, path: string, defaultVal: Form | null = null): Form | null => sn.JValue_solveForm(object, path, defaultVal)
export const JValue_solveFltSetter = (object: number, path: string, value: number, createMissingKeys: boolean = false): boolean => sn.JValue_solveFltSetter(object, path, value, createMissingKeys)
export const JValue_solveIntSetter = (object: number, path: string, value: number, createMissingKeys: boolean = false): boolean => sn.JValue_solveIntSetter(object, path, value, createMissingKeys)
export const JValue_solveStrSetter = (object: number, path: string, value: string, createMissingKeys: boolean = false): boolean => sn.JValue_solveStrSetter(object, path, value, createMissingKeys)
export const JValue_solveObjSetter = (object: number, path: string, value: number, createMissingKeys: boolean = false): boolean => sn.JValue_solveObjSetter(object, path, value, createMissingKeys)
export const JValue_solveFormSetter = (object: number, path: string, value: Form | null, createMissingKeys: boolean = false): boolean => sn.JValue_solveFormSetter(object, path, value, createMissingKeys)
export const JValue_evalLuaFlt = (object: number, luaCode: string, defaultVal: number = 0.0): number => sn.JValue_evalLuaFlt(object, luaCode, defaultVal)
export const JValue_evalLuaInt = (object: number, luaCode: string, defaultVal: number = 0): number => sn.JValue_evalLuaInt(object, luaCode, defaultVal)
export const JValue_evalLuaStr = (object: number, luaCode: string, defaultVal: string = ""): string => sn.JValue_evalLuaStr(object, luaCode, defaultVal)
export const JValue_evalLuaObj = (object: number, luaCode: string, defaultVal: number = 0): number => sn.JValue_evalLuaObj(object, luaCode, defaultVal)
export const JValue_evalLuaForm = (object: number, luaCode: string, defaultVal: Form | null = null): Form | null => sn.JValue_evalLuaForm(object, luaCode, defaultVal)
