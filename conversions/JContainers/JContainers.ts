/*
==============================================
Typescript definitions for v4.2.2
==============================================

Manually converted functions. Please test:
	- __isInstalled (made private)
	- isInstalled

***********************************************************************
 
This file was automatically generated by Papyrus-2-Typescript.exe
https://github.com/CarlosLeyvaAyala/Papyrus-2-Typescript

The program has no way to know the intention of the humans that made
the scripts, so it's always advisable to manually check all generated
files to make sure everything is declared as it should.
*/

import * as sp from "skyrimPlatform"

/** Utility functionality
*/
const sn = (sp as any).JContainers

/** It's NOT part of public API
*/
const __isInstalled = (): boolean => sn.__isInstalled()

/** Version information.
*     It's a good practice to validate installed JContainers version with the following code:
*         bool isJCValid = JContainers.APIVersion() == AV && JContainers.featureVersion() >= FV
*     where AV and FV are hardcoded API and feature version numbers.
*     Current API version is 4
*     Current feature version is 2
*/
export const APIVersion = (): number => sn.APIVersion()
export const featureVersion = (): number => sn.featureVersion()

/** Returns true if the file at a specified @path exists
*/
export const fileExistsAtPath = (path: string): boolean => sn.fileExistsAtPath(path)
export const contentsOfDirectoryAtPath = (directoryPath: string, extension: string = ""): string[] => sn.contentsOfDirectoryAtPath(directoryPath, extension)

/** Deletes the file or directory identified by the @path
*/
export const removeFileAtPath = (path: string): void => sn.removeFileAtPath(path)

/** A path to user-specific directory - My Games/Skyrim Special Edition/JCUser/
*/
export const userDirectory = (): string => sn.userDirectory()

/** Returns true if JContainers plugin installed properly */
export const isInstalled = (): boolean => __isInstalled() && APIVersion() === 4 && featureVersion() === 2
