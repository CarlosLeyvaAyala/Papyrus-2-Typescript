Scriptname TestScript Hidden 

;----------------------------------------------------------------------------------------------------------
;COMMENT
;----------------------------------------------------------------------------------------------------------

bool Function BoolFunc(ActiveMagicEffect akActiveEffect, String asScriptName) global native
    ; Returns an array of all the existing key'd transforms to the particular node
    ; NodeDestination is a special key
string[] Function GetNodeTransformKeys(ObjectReference akRef, bool firstPerson, bool isFemale, string nodeName) native global
; --------------------------------------------------------------------
    
	MagicEffect[] Function ArrayFunc(Actor akActor, bool abShowInactive=false) global native
	
Form[] Function ArrayToArrayFunc(Actor[] akActor) global native
	
	float Function BiArrayFunc(Actor[][] akActor) global native
	Function DefaultFunc(Form akActor = None) global native
	
{ This is a block comment }
{ This 
is a 
	block comment 
	}
; THis is a comment }
		Event OnNewEvent(Actor akMeh, Actor akMoh)
		EndEvent
	
;/  Copy all items to new native Papyrus array of dynamic size.
    Items not matching the requested type will have default
    values as the ones from the getInt/Flt/Str/Form functions.
/;
Int[] function asIntArray(Int object) global native

;/
	Override packages of actors.

	These overrides persist through save games. If you override package on same actor
	more than once then the package with highest priority will run, if multiple
	overrides have same priority then last added package will run. Priority ranges
	from 0 to 100 with 100 being highest priority.
/;

; This will add a package to actor that will override its normal behavior. Using this function overrides all packages added from any other location.
function AddPackageOverride(Actor targetActor, Package targetPackage, int priority = 30, int flags = 0) global native

; Remove a previously added package override.
bool function RemovePackageOverride(Actor targetActor, Package targetPackage) global native

; Check if a json file exists or not
bool function JsonExists(string FileName) global
	if !FileName
		return false
	elseIf StringUtil.Find(FileName, ".json") == -1
		FileName += ".json"
	endIf
	return MiscUtil.FileExists("data/skse/plugins/StorageUtilData/"+FileName)
endFunction

;/  Simplifies iteration over container's contents.
    Accepts the @previousKey, returns the next key.
    If @previousKey == @endKey the function returns the first key.
    The function always returns so-called 'valid' keys (the ones != @endKey).
    The function returns @endKey ('invalid' key) only once to signal that iteration has reached its end.
    In most cases, if the map doesn't contain an invalid key ("" for JMap, None form-key for JFormMap)
    it's ok to omit the @endKey.
    
    Usage:
    
        string key = JMap.nextKey(map, previousKey="", endKey="")
        while key != ""
          <retrieve values here>
          key = JMap.nextKey(map, key, endKey="")
        endwhile
    
/;
Form function nextKey(Int object, Form previousKey=None, Form endKey=None) global native

;/  Attempts to retrieve the value associated with the @path.
    For ex. the following information associated with 'frosfall' key:
    
    "frostfall" : {
        "exposureRate" : 0.5,
        "arrayC" : ["stringValue", 1.5, 10, 1.14]
    }
    
    then JDB.solveFlt(".frostfall.exposureRate") will return 0.5 and
    JDB.solveObj(".frostfall.arrayC") will return the array containing ["stringValue", 1.5, 10, 1.14] values
/;
Float function solveFlt(String path, Float default=0.0) global native

