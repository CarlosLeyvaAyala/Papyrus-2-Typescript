/*
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

/** This way you can even, probably, implement true locks and etc */
const sn = (sp as any).JAtomic

/** A group of the functions that perform various math on the value at the @path of the container. Returns previos value:
    
        T previousValue = container.path
        container.path = someMathFunction(container.path, value)
        return previousValue
    
    If the value at the @path is None, then the @initialValue being read and passed into math function instead of None.
    If @createMissingKeys is True, the function attemps to create missing @path elements. */
export const fetchAddInt = (object: number, path: string, value: number, initialValue: number = 0, createMissingKeys: boolean = false, onErrorReturn: number = 0): number => sn.fetchAddInt(object,  path,  value,  initialValue,  createMissingKeys,  onErrorReturn)
export const fetchAddFlt = (object: number, path: string, value: number, initialValue: number = 0.0, createMissingKeys: boolean = false, onErrorReturn: number = 0.0): number => sn.fetchAddFlt(object,  path,  value,  initialValue,  createMissingKeys,  onErrorReturn)

/** x *= v */
export const fetchMultInt = (object: number, path: string, value: number, initialValue: number = 0, createMissingKeys: boolean = false, onErrorReturn: number = 0): number => sn.fetchMultInt(object,  path,  value,  initialValue,  createMissingKeys,  onErrorReturn)
export const fetchMultFlt = (object: number, path: string, value: number, initialValue: number = 0.0, createMissingKeys: boolean = false, onErrorReturn: number = 0.0): number => sn.fetchMultFlt(object,  path,  value,  initialValue,  createMissingKeys,  onErrorReturn)

/** x %= v */
export const fetchModInt = (object: number, path: string, value: number, initialValue: number = 0, createMissingKeys: boolean = false, onErrorReturn: number = 0): number => sn.fetchModInt(object,  path,  value,  initialValue,  createMissingKeys,  onErrorReturn)

/** x /= v */
export const fetchDivInt = (object: number, path: string, value: number, initialValue: number = 0, createMissingKeys: boolean = false, onErrorReturn: number = 0): number => sn.fetchDivInt(object,  path,  value,  initialValue,  createMissingKeys,  onErrorReturn)
export const fetchDivFlt = (object: number, path: string, value: number, initialValue: number = 0.0, createMissingKeys: boolean = false, onErrorReturn: number = 0.0): number => sn.fetchDivFlt(object,  path,  value,  initialValue,  createMissingKeys,  onErrorReturn)

/** x &= v */
export const fetchAndInt = (object: number, path: string, value: number, initialValue: number = 0, createMissingKeys: boolean = false, onErrorReturn: number = 0): number => sn.fetchAndInt(object,  path,  value,  initialValue,  createMissingKeys,  onErrorReturn)

/** x ^= v */
export const fetchXorInt = (object: number, path: string, value: number, initialValue: number = 0, createMissingKeys: boolean = false, onErrorReturn: number = 0): number => sn.fetchXorInt(object,  path,  value,  initialValue,  createMissingKeys,  onErrorReturn)

/** x |= v */
export const fetchOrInt = (object: number, path: string, value: number, initialValue: number = 0, createMissingKeys: boolean = false, onErrorReturn: number = 0): number => sn.fetchOrInt(object,  path,  value,  initialValue,  createMissingKeys,  onErrorReturn)

/** Exchanges the value at the @path with the @value. Returns previous value. */
export const exchangeInt = (object: number, path: string, value: number, createMissingKeys: boolean = false, onErrorReturn: number = 0): number => sn.exchangeInt(object,  path,  value,  createMissingKeys,  onErrorReturn)
export const exchangeFlt = (object: number, path: string, value: number, createMissingKeys: boolean = false, onErrorReturn: number = 0.0): number => sn.exchangeFlt(object,  path,  value,  createMissingKeys,  onErrorReturn)
export const exchangeStr = (object: number, path: string, value: string, createMissingKeys: boolean = false, onErrorReturn: string = ""): string => sn.exchangeStr(object,  path,  value,  createMissingKeys,  onErrorReturn)
export const exchangeForm = (object: number, path: string, value: Form | null, createMissingKeys: boolean = false, onErrorReturn: Form | null = null): Form | null => sn.exchangeForm(object,  path,  value,  createMissingKeys,  onErrorReturn)
export const exchangeObj = (object: number, path: string, value: number, createMissingKeys: boolean = false, onErrorReturn: number = 0): number => sn.exchangeObj(object,  path,  value,  createMissingKeys,  onErrorReturn)

/** Compares the value at the @path with the @expected and, if they are equal, exchanges the value at the @path with the @desired values.
    Returns previous value. */
export const compareExchangeInt = (object: number, path: string, desired: number, expected: number, createMissingKeys: boolean = false, onErrorReturn: number = 0): number => sn.compareExchangeInt(object,  path,  desired,  expected,  createMissingKeys,  onErrorReturn)
export const compareExchangeFlt = (object: number, path: string, desired: number, expected: number, createMissingKeys: boolean = false, onErrorReturn: number = 0.0): number => sn.compareExchangeFlt(object,  path,  desired,  expected,  createMissingKeys,  onErrorReturn)
export const compareExchangeStr = (object: number, path: string, desired: string, expected: string, createMissingKeys: boolean = false, onErrorReturn: string = ""): string => sn.compareExchangeStr(object,  path,  desired,  expected,  createMissingKeys,  onErrorReturn)
export const compareExchangeForm = (object: number, path: string, desired: Form | null, expected: Form | null, createMissingKeys: boolean = false, onErrorReturn: Form | null = null): Form | null => sn.compareExchangeForm(object,  path,  desired,  expected,  createMissingKeys,  onErrorReturn)
export const compareExchangeObj = (object: number, path: string, desired: number, expected: number, createMissingKeys: boolean = false, onErrorReturn: number = 0): number => sn.compareExchangeObj(object,  path,  desired,  expected,  createMissingKeys,  onErrorReturn)
