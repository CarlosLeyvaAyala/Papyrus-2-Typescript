Scriptname TestScript Hidden 


	;-------
	;SETTERS
	;-------
		
	Function ApplyMaterialShader(ObjectReference akRef, MaterialObject akMatObject, float directionalThresholdAngle) global native
	
	Function AddKeywordToRef(ObjectReference akRef, Keyword akKeyword) global native	
	
	Function MoveToNearestNavmeshLocation(ObjectReference akRef) global native
				
	Function RemoveAllModItems(ObjectReference akRef, String asModName, bool abOnlyUnequip = false) global native
	
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

float function GetPathFloatValue(string FileName, string Path, float missing = 0.0) global native
string function GetPathStringValue(string FileName, string Path, string missing = "") global native
form function GetPathFormValue(string FileName, string Path, form missing = none) global native
bool function GetPathBoolValue(string FileName, string Path, bool missing = false) global
	return GetPathIntValue(FileName, Path, (missing as int)) != 0
endFunction

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

; Get version of papyrus DLL library. Version 4.1 will return 41.
int function GetVersion() global native

; Get version of compiled papyrus scripts which should match return from GetVersion()
int function GetScriptVersion() global
	return 43
endFunction

; ##
; ## Array manipulation utilities
; ##



; ## Similar to the clamp functions, only values wrap around to the other side of range instead.
; ## Mostly useful for traversing around array values by wrapping the index from end to end without having to check for it being out of range first.
; ##     i.e.: Form var = myFormArray[WrapInt(i, (myFormArray.Length - 1))]
int function WrapInt(int value, int end, int start = 0) global native
float function WrapFloat(float value, float end, float start = 0.0) global native

; ## Returns the given value signed if bool is true, unsigned if false, regardless if value started out signed or not. 
int function SignInt(bool doSign, int value) global native
float function SignFloat(bool doSign, float value) global native

; ##
; ## Non-Native bool versions of some functions where SKSE version is bugged.
; ## SKSE version VMResultArray<bool> fails to be manipulated by other native functions past creation.
; ##

bool[] function ResizeBoolArray(bool[] ArrayValues, int toSize, bool filler = false) global
	bool[] Output = Utility.CreateBoolArray(toSize, filler)
	int i = ArrayValues.Length
	if i > toSize
		i = toSize
	endIf
	while i
		i -= 1
		Output[i] = ArrayValues[i]
	endWhile
	return Output
endFunction

bool[] function PushBool(bool[] ArrayValues, bool push) global
	return ResizeBoolArray(ArrayValues, ArrayValues.Length + 1, push)
endFunction

bool[] function RemoveBool(bool[] ArrayValues, bool ToRemove) global
	int count = CountBool(ArrayValues, ToRemove)
	return Utility.CreateBoolArray((ArrayValues.Length - Count), !ToRemove)
endFunction

bool[] function MergeBoolArray(bool[] ArrayValues1, bool[] ArrayValues2, bool RemoveDupes = false) global
	if !ArrayValues1 && !ArrayValues2
		return Utility.CreateBoolArray(0)
	elseIf RemoveDupes
		; Don't know why this option would ever be used for bool arrays, but provided for consistency sake with others
		bool[] Output = new bool[1]
		Output[0] = (ArrayValues1 && ArrayValues1[0]) || (!ArrayValues1 && ArrayValues2 && ArrayValues2[0])
		if (ArrayValues1 && ArrayValues1.Find(!Output[0]) != -1) || (ArrayValues2 && ArrayValues2.Find(!Output[0]) != -1)
			Output = PushBool(Output, !Output[0])
		endIf
		return Output
	elseIf !ArrayValues1
		return ArrayValues2
	elseIf !ArrayValues2
		return ArrayValues1
	endIf
	bool[] Output = Utility.CreateBoolArray(ArrayValues1.Length + ArrayValues2.Length)
	bool[] Source = ArrayValues2
	int n = Source.Length
	int i = Output.Length
	while i
		i -= 1
		n -= 1
		if n < 0 && i > 0
			Source = ArrayValues1
			n = ArrayValues1.Length - 1
		endIf
		Output[i] = Source[n]
	endWhile
	return Output
endFunction

bool[] function SliceBoolArray(bool[] ArrayValues, int StartIndex, int EndIndex = -1) global
	if !ArrayValues || (StartIndex > EndIndex && EndIndex > -1)
		return Utility.CreateBoolArray(0)
	elseIf StartIndex <= 0 && (EndIndex == -1 || EndIndex >= ArrayValues.Length)
		return ArrayValues
	endIf
	if StartIndex < 0
		StartIndex = 0
	endIf
	if EndIndex < 0 || EndIndex >= ArrayValues.Length
		EndIndex = ArrayValues.Length - 1
	endIf
	if StartIndex == EndIndex
		return Utility.CreateBoolArray(1, ArrayValues[StartIndex])
	endIf
	EndIndex += 1
	bool[] Output = Utility.CreateBoolArray(EndIndex - StartIndex)
	int i = Output.Length
	while i && EndIndex
		i -= 1
		EndIndex -= 1
		Output[i] = ArrayValues[EndIndex]
	endWhile
	return Output
endFunction


; ##
; ## DEPRECATED: SKSE now provides their own variable sized arrays for these types - mirrored here for backwards compatibility.
; ##

float[] function FloatArray(int size, float filler = 0.0) global
	return Utility.CreateFloatArray(size, filler)
endFunction
int[] function IntArray(int size, int filler = 0) global
	return Utility.CreateIntArray(size, filler)
endFunction
bool[] function BoolArray(int size, bool filler = false) global
	return Utility.CreateBoolArray(size, filler)
endFunction
string[] function StringArray(int size, string filler = "") global
	return Utility.CreateStringArray(size, filler)
endFunction
Form[] function FormArray(int size, Form filler = none) global
	return Utility.CreateFormArray(size, filler)
endFunction
Alias[] function AliasArray(int size, Alias filler = none) global
	return Utility.CreateAliasArray(size, filler)
endFunction

float[] function ResizeFloatArray(float[] ArrayValues, int toSize, float filler = 0.0) global
	return Utility.ResizeFloatArray(ArrayValues, toSize, filler)
endFunction
int[] function ResizeIntArray(int[] ArrayValues, int toSize, int filler = 0) global
	return Utility.ResizeIntArray(ArrayValues, toSize, filler)
endFunction
string[] function ResizeStringArray(string[] ArrayValues, int toSize, string filler = "") global
	return Utility.ResizeStringArray(ArrayValues, toSize, filler)
endFunction
Form[] function ResizeFormArray(Form[] ArrayValues, int toSize, Form filler = none) global
	return Utility.ResizeFormArray(ArrayValues, toSize, filler)
endFunction
Alias[] function ResizeAliasArray(Alias[] ArrayValues, int toSize, Alias filler = none) global
	return Utility.ResizeAliasArray(ArrayValues, toSize, filler)
endFunction