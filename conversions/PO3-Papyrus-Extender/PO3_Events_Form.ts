/*
==============================================
Typescript definitions for v5.1
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
import { Quest } from "skyrimPlatform"

const sn = (sp as any).PO3_Events_Form

/** EVENTS SHOULD BE CALLED ON A FORM - script that is attached to form/reference.
* DOCUMENTATION IS AVAILABLE AT https://github.com/powerof3/PapyrusExtenderSSE/wiki
* ACTOR FALL LONG DISTANCE
* calling script must extend ObjectReference
*/
	
export const RegisterForActorFallLongDistance = (akForm: Form | null): void => sn.RegisterForActorFallLongDistance(akForm)
export const UnregisterForActorFallLongDistance = (akForm: Form | null): void => sn.UnregisterForActorFallLongDistance(akForm)

//ACTOR KILL
	
export const RegisterForActorKilled = (akForm: Form | null): void => sn.RegisterForActorKilled(akForm)
export const UnregisterForActorKilled = (akForm: Form | null): void => sn.UnregisterForActorKilled(akForm)

/** ACTOR REANIMATE
* calling script must extend ObjectReference
*/
	
export const RegisterForActorReanimateStart = (akForm: Form | null): void => sn.RegisterForActorReanimateStart(akForm)
export const UnregisterForActorReanimateStart = (akForm: Form | null): void => sn.UnregisterForActorReanimateStart(akForm)
	
export const RegisterForActorReanimateStop = (akForm: Form | null): void => sn.RegisterForActorReanimateStop(akForm)
export const UnregisterForActorReanimateStop = (akForm: Form | null): void => sn.UnregisterForActorReanimateStop(akForm)

/** ACTOR RESURRECT
* calling script must extend ObjectReference
*/
	
export const RegisterForActorResurrected = (akForm: Form | null): void => sn.RegisterForActorResurrected(akForm)
export const UnregisterForActorResurrected = (akForm: Form | null): void => sn.UnregisterForActorResurrected(akForm)

//BOOKS READ
	
export const RegisterForBookRead = (akForm: Form | null): void => sn.RegisterForBookRead(akForm)
export const UnregisterForBookRead = (akForm: Form | null): void => sn.UnregisterForBookRead(akForm)

//CELL FULLY LOADED
	
export const RegisterForCellFullyLoaded = (akForm: Form | null): void => sn.RegisterForCellFullyLoaded(akForm)
export const UnregisterForCellFullyLoaded = (akForm: Form | null): void => sn.UnregisterForCellFullyLoaded(akForm)

//CRITICAL HIT
	
export const RegisterForCriticalHit = (akForm: Form | null): void => sn.RegisterForCriticalHit(akForm)
export const UnregisterForCriticalHit = (akForm: Form | null): void => sn.UnregisterForCriticalHit(akForm)

//DISARMED
	
export const RegisterForDisarmed = (akForm: Form | null): void => sn.RegisterForDisarmed(akForm)
export const UnregisterForDisarmed = (akForm: Form | null): void => sn.UnregisterForDisarmed(akForm)

//DRAGON SOUL ABSORBED
	
export const RegisterForDragonSoulGained = (akForm: Form | null): void => sn.RegisterForDragonSoulGained(akForm)
export const UnregisterForDragonSoulGained = (akForm: Form | null): void => sn.UnregisterForDragonSoulGained(akForm)

/** ON HIT EX
* calling script must extend ObjectReference
*/

export const RegisterForHitEventEx = (akForm: Form | null, akAggressorFilter: Form | null = null, akSourceFilter: Form | null = null, akProjectileFilter: Form | null = null, aiPowerFilter: number = -1, aiSneakFilter: number = -1, aiBashFilter: number = -1, aiBlockFilter: number = -1, abMatch: boolean = true): void => sn.RegisterForHitEventEx(akForm, akAggressorFilter, akSourceFilter, akProjectileFilter, aiPowerFilter, aiSneakFilter, aiBashFilter, aiBlockFilter, abMatch)
	
export const UnregisterForHitEventEx = (akForm: Form | null, akAggressorFilter: Form | null = null, akSourceFilter: Form | null = null, akProjectileFilter: Form | null = null, aiPowerFilter: number = -1, aiSneakFilter: number = -1, aiBashFilter: number = -1, aiBlockFilter: number = -1, abMatch: boolean = true): void => sn.UnregisterForHitEventEx(akForm, akAggressorFilter, akSourceFilter, akProjectileFilter, aiPowerFilter, aiSneakFilter, aiBashFilter, aiBlockFilter, abMatch)
	
export const UnregisterForAllHitEventsEx = (akForm: Form | null): void => sn.UnregisterForAllHitEventsEx(akForm)

//ITEM CRAFTED
	
export const RegisterForItemCrafted = (akForm: Form | null): void => sn.RegisterForItemCrafted(akForm)
export const UnregisterForItemCrafted = (akForm: Form | null): void => sn.UnregisterForItemCrafted(akForm)

//ITEM HARVESTED
	
export const RegisterForItemHarvested = (akForm: Form | null): void => sn.RegisterForItemHarvested(akForm)
export const UnregisterForItemHarvested = (akForm: Form | null): void => sn.UnregisterForItemHarvested(akForm)

//LEVEL INCREASE
	
export const RegisterForLevelIncrease = (akForm: Form | null): void => sn.RegisterForLevelIncrease(akForm)
export const UnregisterForLevelIncrease = (akForm: Form | null): void => sn.UnregisterForLevelIncrease(akForm)

//LOCATION DISCOVERY
	
export const RegisterForLocationDiscovery = (akForm: Form | null): void => sn.RegisterForLocationDiscovery(akForm)
export const UnregisterForLocationDiscovery = (akForm: Form | null): void => sn.UnregisterForLocationDiscovery(akForm)

//OBJECT GRAB/RELEASE

export const RegisterForObjectGrab = (akForm: Form | null): void => sn.RegisterForObjectGrab(akForm)
export const UnregisterForObjectGrab = (akForm: Form | null): void => sn.UnregisterForObjectGrab(akForm)

//OBJECT LOADED/UNLOADED

export const RegisterForObjectLoaded = (akForm: Form | null, formType: number): void => sn.RegisterForObjectLoaded(akForm, formType)
export const UnregisterForObjectLoaded = (akForm: Form | null, formType: number): void => sn.UnregisterForObjectLoaded(akForm, formType)
export const UnregisterForAllObjectsLoaded = (akForm: Form | null): void => sn.UnregisterForAllObjectsLoaded(akForm)

//QUEST START/STOP

export const RegisterForQuest = (akForm: Form | null, akQuest: Quest | null): void => sn.RegisterForQuest(akForm, akQuest)
export const UnregisterForQuest = (akForm: Form | null, akQuest: Quest | null): void => sn.UnregisterForQuest(akForm, akQuest)
export const UnregisterForAllQuests = (akForm: Form | null): void => sn.UnregisterForAllQuests(akForm)

//QUEST STAGE CHANGE

export const RegisterForQuestStage = (akForm: Form | null, akQuest: Quest | null): void => sn.RegisterForQuestStage(akForm, akQuest)
export const UnregisterForQuestStage = (akForm: Form | null, akQuest: Quest | null): void => sn.UnregisterForQuestStage(akForm, akQuest)
export const UnregisterForAllQuestStages = (akForm: Form | null): void => sn.UnregisterForAllQuestStages(akForm)

//SHOUT ATTACK

export const RegisterForShoutAttack = (akForm: Form | null): void => sn.RegisterForShoutAttack(akForm)
export const UnregisterForShoutAttack = (akForm: Form | null): void => sn.UnregisterForShoutAttack(akForm)

//SKILL INCREASE

export const RegisterForSkillIncrease = (akForm: Form | null): void => sn.RegisterForSkillIncrease(akForm)
export const UnregisterForSkillIncrease = (akForm: Form | null): void => sn.UnregisterForSkillIncrease(akForm)

//SOUL TRAP

export const RegisterForSoulTrapped = (akForm: Form | null): void => sn.RegisterForSoulTrapped(akForm)
export const UnregisterForSoulTrapped = (akForm: Form | null): void => sn.UnregisterForSoulTrapped(akForm)

//SPELL LEARNED

export const RegisterForSpellLearned = (akForm: Form | null): void => sn.RegisterForSpellLearned(akForm)
export const UnregisterForSpellLearned = (akForm: Form | null): void => sn.UnregisterForSpellLearned(akForm)

//WEATHER CHANGE

export const RegisterForWeatherChange = (akForm: Form | null): void => sn.RegisterForWeatherChange(akForm)
export const UnregisterForWeatherChange = (akForm: Form | null): void => sn.UnregisterForWeatherChange(akForm)

/** MAGIC EFFECT APPLY
* calling script must extend ObjectReference
*/

export const RegisterForMagicEffectApplyEx = (akForm: Form | null, akEffectFilter: Form | null, abMatch: boolean): void => sn.RegisterForMagicEffectApplyEx(akForm, akEffectFilter, abMatch)
export const UnregisterForMagicEffectApplyEx = (akForm: Form | null, akEffectFilter: Form | null, abMatch: boolean): void => sn.UnregisterForMagicEffectApplyEx(akForm, akEffectFilter, abMatch)
export const UnregisterForAllMagicEffectApplyEx = (akForm: Form | null): void => sn.UnregisterForAllMagicEffectApplyEx(akForm)

/** ON WEAPON HIT
* calling script must extend ObjectReference
*/
	
export const RegisterForWeaponHit = (akForm: Form | null): void => sn.RegisterForWeaponHit(akForm)
export const UnregisterForWeaponHit = (akForm: Form | null): void => sn.UnregisterForWeaponHit(akForm)

/** ON MAGIC HIT
* calling script must extend ObjectReference
*/

export const RegisterForMagicHit = (akForm: Form | null): void => sn.RegisterForMagicHit(akForm)
export const UnregisterForMagicHit = (akForm: Form | null): void => sn.UnregisterForMagicHit(akForm)

/** ON PROJECTILE HIT
* calling script must extend ObjectReference
*/

export const RegisterForProjectileHit = (akForm: Form | null): void => sn.RegisterForProjectileHit(akForm)
export const UnregisterForProjectileHit = (akForm: Form | null): void => sn.UnregisterForProjectileHit(akForm)
