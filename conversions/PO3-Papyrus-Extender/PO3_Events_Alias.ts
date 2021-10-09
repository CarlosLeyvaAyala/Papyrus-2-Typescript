// Typescript definitions for v4.5.1

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
import { ReferenceAlias } from "../skyrimPlatform"
import { Quest } from "../skyrimPlatform"
import { Form } from "../skyrimPlatform"
import { Alias } from "../skyrimPlatform"

const sn = (sp as any).PO3_Events_Alias

//EVENTS SHOULD BE CALLED ON AN ALIAS - script that is attached to a reference alias/location alias.

//ACTOR KILL

export const RegisterForActorKilled = (akAlias: Alias | null | undefined): void => sn.RegisterForActorKilled(akAlias)
export const UnregisterForActorKilled = (akAlias: Alias | null | undefined): void => sn.UnregisterForActorKilled(akAlias)

	// Event OnActorKilled(Actor akVictim, Actor akKiller)
	// EndEvent

//ACTOR REANIMATE
//start fires when actor is reanimated and stop when the reanimate effect is dispelled

export const RegisterForActorReanimateStart = (akAlias: Alias | null | undefined): void => sn.RegisterForActorReanimateStart(akAlias)
export const UnregisterForActorReanimateStart = (akAlias: Alias | null | undefined): void => sn.UnregisterForActorReanimateStart(akAlias)

export const RegisterForActorReanimateStop = (akAlias: Alias | null | undefined): void => sn.RegisterForActorReanimateStop(akAlias)
export const UnregisterForActorReanimateStop = (akAlias: Alias | null | undefined): void => sn.UnregisterForActorReanimateStop(akAlias)

	// Event OnActorReanimateStart(Actor akTarget, Actor akCaster)
	// EndEvent

	// Event OnActorReanimateStop(Actor akTarget, Actor akCaster)
	// EndEvent

//ACTOR RESURRECT
//fires when the target has been resurrected via script or console command

export const RegisterForActorResurrected = (akAlias: Alias | null | undefined): void => sn.RegisterForActorResurrected(akAlias)
export const UnregisterForActorResurrected = (akAlias: Alias | null | undefined): void => sn.UnregisterForActorResurrected(akAlias)

	// Event OnActorResurrected(Actor akTarget, bool abResetInventory)
	// EndEvent

//BOOKS READ

export const RegisterForBookRead = (akAlias: Alias | null | undefined): void => sn.RegisterForBookRead(akAlias)
export const UnregisterForBookRead = (akAlias: Alias | null | undefined): void => sn.UnregisterForBookRead(akAlias)

	// Event OnBookRead(Book akBook)
	// EndEvent

//CELL FULLY LOADED
//Can fire multiple times in exteriors, for each cell that is fully loaded.

export const RegisterForCellFullyLoaded = (akAlias: Alias | null | undefined): void => sn.RegisterForCellFullyLoaded(akAlias)
export const UnregisterForCellFullyLoaded = (akAlias: Alias | null | undefined): void => sn.UnregisterForCellFullyLoaded(akAlias)

	// Event OnCellFullyLoaded(Cell akCell)
	// EndEvent

//CRITICAL HIT
//Player only event?

export const RegisterForCriticalHit = (akAlias: Alias | null | undefined): void => sn.RegisterForCriticalHit(akAlias)
export const UnregisterForCriticalHit = (akAlias: Alias | null | undefined): void => sn.UnregisterForCriticalHit(akAlias)

	// Event OnCriticalHit(Actor akAggressor, Weapon akWeapon, bool abSneakHit)
	// EndEvent

//DISARMED

export const RegisterForDisarmed = (akAlias: Alias | null | undefined): void => sn.RegisterForDisarmed(akAlias)
export const UnregisterForDisarmed = (akAlias: Alias | null | undefined): void => sn.UnregisterForDisarmed(akAlias)

	// Event OnDisarmed(Actor akSource, Weapon akTarget)
	// EndEvent

//DRAGON SOUL ABSORBED

export const RegisterForDragonSoulGained = (akAlias: Alias | null | undefined): void => sn.RegisterForDragonSoulGained(akAlias)
export const UnregisterForDragonSoulGained = (akAlias: Alias | null | undefined): void => sn.UnregisterForDragonSoulGained(akAlias)

	// Event OnDragonSoulGained(float afSouls)
	// EndEvent

//ITEM HARVESTED
//Player only event

export const RegisterForItemHarvested = (akAlias: Alias | null | undefined): void => sn.RegisterForItemHarvested(akAlias)
export const UnregisterForItemHarvested = (akAlias: Alias | null | undefined): void => sn.UnregisterForItemHarvested(akAlias)

	// Event OnItemHarvested(Form akProduce)
	// EndEvent

//LEVEL INCREASE

export const RegisterForLevelIncrease = (akAlias: Alias | null | undefined): void => sn.RegisterForLevelIncrease(akAlias)
export const UnregisterForLevelIncrease = (akAlias: Alias | null | undefined): void => sn.UnregisterForLevelIncrease(akAlias)

	// Event OnLevelIncrease(int aiLevel)
	// EndEvent

//LOCATION DISCOVERY

export const RegisterForLocationDiscovery = (akAlias: Alias | null | undefined): void => sn.RegisterForLocationDiscovery(akAlias)
export const UnregisterForLocationDiscovery = (akAlias: Alias | null | undefined): void => sn.UnregisterForLocationDiscovery(akAlias)

	// Event OnLocationDiscovery(String asRegionName, String asWorldspaceName)
	// EndEvent

//OBJECT GRAB/RELEASE
//Doesn't work with telekinesis and when the player grabs the same object in a row

export const RegisterForObjectGrab = (akAlias: Alias | null | undefined): void => sn.RegisterForObjectGrab(akAlias)
export const UnregisterForObjectGrab = (akAlias: Alias | null | undefined): void => sn.UnregisterForObjectGrab(akAlias)

	// Event OnObjectGrab(ObjectReference akObjectRef)
	// EndEvent

	// Event OnObjectRelease(ObjectReference akObjectRef)
	// EndEvent

//OBJECT LOADED/UNLOADED
//Not all objects fire this event. It is somewhat inconsistent.

export const RegisterForObjectLoaded = (akAlias: Alias | null | undefined, formType: number): void => sn.RegisterForObjectLoaded(akAlias,  formType)
export const UnregisterForObjectLoaded = (akAlias: Alias | null | undefined, formType: number): void => sn.UnregisterForObjectLoaded(akAlias,  formType)
export const UnregisterForAllObjectsLoaded = (akAlias: Alias | null | undefined): void => sn.UnregisterForAllObjectsLoaded(akAlias)

	// Event OnObjectLoaded(ObjectReference akRef, int aiFormType)
	// EndEvent

	// Event OnObjectUnloaded(ObjectReference akRef, int aiFormType)
	// EndEvent

//QUEST START/STOP

export const RegisterForQuest = (akAlias: Alias | null | undefined, akQuest: Quest | null | undefined): void => sn.RegisterForQuest(akAlias,  akQuest)
export const UnregisterForQuest = (akAlias: Alias | null | undefined, akQuest: Quest | null | undefined): void => sn.UnregisterForQuest(akAlias,  akQuest)
export const UnregisterForAllQuests = (akAlias: Alias | null | undefined): void => sn.UnregisterForAllQuests(akAlias)

	// Event OnQuestStart(Quest akQuest)
	// EndEvent

	// Event OnQuestStop(Quest akQuest)
	// EndEvent

//QUEST STAGE CHANGE

export const RegisterForQuestStage = (akAlias: Alias | null | undefined, akQuest: Quest | null | undefined): void => sn.RegisterForQuestStage(akAlias,  akQuest)
export const UnregisterForQuestStage = (akAlias: Alias | null | undefined, akQuest: Quest | null | undefined): void => sn.UnregisterForQuestStage(akAlias,  akQuest)
export const UnregisterForAllQuestStages = (akAlias: Alias | null | undefined): void => sn.UnregisterForAllQuestStages(akAlias)

	// Event OnQuestStageChange(Quest akQuest, Int aiNewStage)
	// EndEvent

//SHOUT ATTACK
//Player only event

export const RegisterForShoutAttack = (akAlias: Alias | null | undefined): void => sn.RegisterForShoutAttack(akAlias)
export const UnregisterForShoutAttack = (akAlias: Alias | null | undefined): void => sn.UnregisterForShoutAttack(akAlias)

	// Event OnShoutAttack(Shout akShout)
	// EndEvent

//SKILL INCREASE

export const RegisterForSkillIncrease = (akAlias: Alias | null | undefined): void => sn.RegisterForSkillIncrease(akAlias)
export const UnregisterForSkillIncrease = (akAlias: Alias | null | undefined): void => sn.UnregisterForSkillIncrease(akAlias)

	// Event OnSkillIncrease(String asSkill)
	// EndEvent

//SOUL TRAP
//// Event will fire after OnDying/OnDeath

export const RegisterForSoulTrapped = (akAlias: Alias | null | undefined): void => sn.RegisterForSoulTrapped(akAlias)
export const UnregisterForSoulTrapped = (akAlias: Alias | null | undefined): void => sn.UnregisterForSoulTrapped(akAlias)

	// Event OnSoulTrapped(Actor akVictim, Actor akKiller)
	// EndEvent

//SPELL LEARNED

export const RegisterForSpellLearned = (akAlias: Alias | null | undefined): void => sn.RegisterForSpellLearned(akAlias)
export const UnregisterForSpellLearned = (akAlias: Alias | null | undefined): void => sn.UnregisterForSpellLearned(akAlias)

	// Event OnSpellLearned(Spell akSpell)
	// EndEvent

//WEATHER CHANGE

export const RegisterForWeatherChange = (akAlias: Alias | null | undefined): void => sn.RegisterForWeatherChange(akAlias)
export const UnregisterForWeatherChange = (akAlias: Alias | null | undefined): void => sn.UnregisterForWeatherChange(akAlias)

	// Event OnWeatherChange(Weather akOldWeather, Weather akNewWeather)
	// EndEvent

//MAGIC EFFECT APPLY
//Filter takes in a matching magic effect, a keyword, or a formlist containing keywords.
//bApplied will return if the magic effect was applied or not, unlike vanilla event which fires for everything.

export const RegisterForMagicEffectApplyEx = (akRefAlias: ReferenceAlias | null | undefined, akEffectFilter: Form | null | undefined, abMatch: boolean): void => sn.RegisterForMagicEffectApplyEx(akRefAlias,  akEffectFilter,  abMatch)
export const UnregisterForMagicEffectApplyEx = (akRefAlias: ReferenceAlias | null | undefined, akEffectFilter: Form | null | undefined, abMatch: boolean): void => sn.UnregisterForMagicEffectApplyEx(akRefAlias,  akEffectFilter,  abMatch)
export const UnregisterForAllMagicEffectApplyEx = (akRefAlias: ReferenceAlias | null | undefined): void => sn.UnregisterForAllMagicEffectApplyEx(akRefAlias)

	// Event OnMagicEffectApplyEx(ObjectReference akCaster, MagicEffect akEffect, Form akSource, bool abApplied)
	// EndEvent

//ON WEAPON HIT
//// Event OnHit except weapons only AND the aggressor recieves this event for each target hit by it
//Statics have no hit flags - 0

/** FLAGS - use SKSE's LogicalAnd to check if flag is set

		kBlocked = 1,
		kBlockWithWeapon = 2,
		kBlockCandidate = 4,
		kCritical = 8,
		kCriticalOnDeath = 16,
		kFatal = 32,
		kDismemberLimb = 64,
		kExplodeLimb = 128,
		kCrippleLimb = 256,
		kDisarm = 512,
		kDisableWeapon = 1024,
		kSneakAttack = 2048,
		kIgnoreCritical = 4096,
		kPredictDamage = 8192,
		kPredictBaseDamage = 16384,
		kBash = 32768,
		kTimedBash = 65536,
		kPowerAttack = 131072,
		kMeleeAttack = 262144,
		kRicochet = 524288,
		kExplosion = 1048576 */

export const RegisterForWeaponHit = (akRefAlias: ReferenceAlias | null | undefined): void => sn.RegisterForWeaponHit(akRefAlias)
export const UnregisterForWeaponHit = (akRefAlias: ReferenceAlias | null | undefined): void => sn.UnregisterForWeaponHit(akRefAlias)

	// Event OnWeaponHit(ObjectReference akTarget, Form akSource, Projectile akProjectile, Int aiHitFlagMask)
	// EndEvent

//ON MAGIC HIT
//// Event OnHit except for magic AND the aggressor recieves this event for each target hit by it

export const RegisterForMagicHit = (akRefAlias: ReferenceAlias | null | undefined): void => sn.RegisterForMagicHit(akRefAlias)
export const UnregisterForMagicHit = (akRefAlias: ReferenceAlias | null | undefined): void => sn.UnregisterForMagicHit(akRefAlias)

	// Event OnMagicHit(ObjectReference akTarget, Form akSource, Projectile akProjectile)
	// EndEvent

//ON PROJECTILE HIT
//// Event OnHit except for projectiles AND the aggressor recieves this event for each target hit by it

export const RegisterForProjectileHit = (akRefAlias: ReferenceAlias | null | undefined): void => sn.RegisterForProjectileHit(akRefAlias)
export const UnregisterForProjectileHit = (akRefAlias: ReferenceAlias | null | undefined): void => sn.UnregisterForProjectileHit(akRefAlias)

	// Event OnProjectileHit(ObjectReference akTarget, Form akSource, Projectile akProjectile)
	// EndEvent
