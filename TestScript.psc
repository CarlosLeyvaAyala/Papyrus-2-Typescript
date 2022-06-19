Scriptname TestScript Hidden 

;----------------------------------------------------------------------------------------------------------
;COMMENT
;----------------------------------------------------------------------------------------------------------
	
	bool Function BoolFunc(ActiveMagicEffect akActiveEffect, String asScriptName) global native
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