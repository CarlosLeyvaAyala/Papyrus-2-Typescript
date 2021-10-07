unit ProcessFile;

interface

uses
  System.SysUtils, System.Classes, Functional.Sequence,
  System.RegularExpressions, System.StrUtils, System.Generics.Collections;

procedure Process(const fileName: string);

implementation

uses
  Functions.Regex, Functions.Strings;

const
  scriptNameVar = 'sn';

function ReadFile(const fileName: string): TStringList;
begin
  Result := TStringList.Create;
  Result.LoadFromFile(fileName);
end;

function GetPapyrusObjects: TArray<string>;
begin
  Result := TArray<string>.Create(
    'WorldSpace',
    'WordOfPower',
    'Weather',
    'Weapon',
    'VoiceType',
    'VisualEffect',
    'Utility',
    'Ui',
    'TreeObject',
    'TopicInfo',
    'Topic',
    'TextureSet',
    'TalkingActivator',
    'TESModPlatform',
    'Static',
    'Spell',
    'SoundDescriptor',
    'SoundCategory',
    'Sound',
    'SoulGem',
    'Shout',
    'ShaderParticleGeometry',
    'Scroll',
    'Scene',
    'ReferenceAlias',
    'Race',
    'Quest',
    'Projectile',
    'Potion',
    'Perk',
    'Package',
    'Outfit',
    'ObjectReference',
    'NetImmerse',
    'MusicType',
    'MiscObject',
    'Message',
    'MagicEffect',
    'LocationRefType',
    'LocationAlias',
    'Location',
    'Light',
    'LeveledSpell',
    'LeveledItem',
    'LeveledActor',
    'Keyword',
    'Key',
    'Input',
    'Ingredient',
    'ImpactDataSet',
    'ImageSpaceModifier',
    'Idle',
    'HeadPart',
    'Hazard',
    'GlobalVariable',
    'Game',
    'Furniture',
    'FormList',
    'Form',
    'Flora',
    'Faction',
    'Explosion',
    'EquipSlot',
    'EncounterZone',
    'Enchantment',
    'EffectShader',
    'Door',
    'DefaultObjectManager',
    'Debug',
    'Container',
    'ConstructibleObject',
    'CombatStyle',
    'ColorForm',
    'Class',
    'Cell',
    'Book',
    'AssociationType',
    'Art',
    'ArmorAddon',
    'Armor',
    'Apparatus',
    'Ammo',
    'Alias',
    'ActorValueInfo',
    'ActorBase',
    'Actor',
    'ActiveMagicEffect',
    'Activator',
    'Action'
    );
end;

// Trims content from multiline comments.
function BeautifyComments(s: string): string;
begin
  const r = AddFlags('(\/\*\*)(.*)(\*\/)', [singleLine, ungreedy]);
  const bs = TBullshitWrapper.Create;
  bs.g :=
    function(m: TMatch): string
    begin
      const g = m.Groups;
      const init = g[1].Value;
      const b = g[2].Value.Trim;
      const ending = g[3].Value;
      Result := Format('%s %s %s', [init, b, ending]);
    end;
  Result := TRegEx.Create(r).Replace(s, bs.SomethingGral);
end;

// Beautifies the output file.
function Beautify(s: string): string;
begin
  Result := BeautifyComments(s);
end;

// Transforms a variable type from Papyrus to Typescript
function PapyrusToTsType(t: string): string;
begin
  t := t.Trim.ToLower;
  if t = '' then begin
    Result := 'void';
    Exit;
  end;

  Result := t;
  Result := Result.Replace('float', 'number');
  Result := Result.Replace('int', 'number');
  Result := Result.Replace('bool', 'boolean');

  // Papyrus objects - special cases
  Result := Result.Replace('formlist', 'FormList');
  Result := Result.Replace('form[', 'Form[');
  Result := Result.Replace('form', 'Form | null');

  // Papyrus objects: all
  for var obj in GetPapyrusObjects do
    Result := Result.Replace(obj.ToLower, obj);
end;

const
  argsRegex = '((\w+)(\[\s*\])*)\s(\w+)=?(.*)';

// Transforms arguments in the form 'arg1, arg2, ... argN' to
// 'arg1´, arg2´, ... argN´'
function TransformArgList(args: string; f: TFunc<string, string>): string;
begin
  if args.Trim = '' then begin
    Result := '';
    Exit;
  end;

  const argList = TStringList.Create;
  argList.AddStrings(SplitString(args, ','));
  Result := TSeq.From(argList)
    .Map(f)
    .Fold<string>(PrettyComma(), '');
end;

// Removes typing from a list of arguments. Used for translating the calling function.
function UntypeArgs(args: string): string;
begin
  Result := TransformArgList(args,
    function(arg: string): string
    begin
      Result := TRegEx.Create(argsRegex).Replace(arg, '$4');
    end);
end;

// Transforms Papyrus arguments to TS ones.
// Used for creating the function header.
function PapyrusArgsToTs(args: string): string;
begin
  const PapyDefaultToTs =
  function(s: string): string
  begin
    Result := ReplaceText(s, 'none', 'null');
  end;

  Result := TransformArgList(args,
    function(arg: string): string
    begin
      const g = TRegEx.Create(argsRegex).Match(arg).Groups;
      const varName = g.Item[4].Value;
      const varType = PapyrusToTsType(g.Item[1].Value);
      const defaultVal = PapyDefaultToTs(g.Item[5].Value);
      const dv = IfThen(defaultVal <> '', ' = ' + defaultVal, '');

      Result := Format('%s: %s%s', [varName, varType, dv]);
    end);
end;

// Tranforms a whole function declaration from Papyrus to Ts.
function TransformFuncDecl(s: string; m: TMatch): string;
begin
  const g = m.Groups;
  const ty = PapyrusToTsType(g.Item[1].Value);
  const fn = g.Item[2].Value;
  const input = PapyrusArgsToTs(g.Item[3].Value);
  const args = UntypeArgs(g.Item[3].Value);
  const r = 'export const %s = (%s): %s => %s.%s(%s)';
  Result := Format(r, [fn, input, ty, scriptNameVar, fn, args]);
end;

// Transforms the Scriptname to a Typescript object assignment.
function TransformScriptName(s: string; m: TMatch): string;
begin
  const g = m.Groups;
  const msg = 'How come a "ScriptName" structure has no name? Line: %s';
  Assert(g.Count > 1, Format(msg, [s]));
  const r = 'const %s = (sp as any).%s';
  Result := Format(r, [scriptNameVar, g.Item[1].Value]);
end;

// Transforms comments in a line.
function TransformPossibleComments(s: string): string;
begin
  Result := ReplaceStr(s, ';/', '/**');
  Result := ReplaceStr(Result, '/;', '*/');
  Result := ReplaceStr(Result, '{', '/**');
  Result := ReplaceStr(Result, '}', '*/');
  Result := ReplaceStr(Result, ';', '//');
end;

// Process a single line.
function ProcessLine(s: string): string;
begin
  const fl: Flags = [caseInsensitive];

  { TODO : Would it be better to take the ScriptName from the file name? }
  const sn = AddFlags('^\s*scriptname (\w*)( hidden)?', fl);
  const isScriptName = TRegEx.Create(sn).Match(s);

  const fn = AddFlags('(.* )?function (.*)\((.*)\).*', fl);
  const isFunc = TRegex.Create(fn).Match(s);

  if isScriptName.Success then
    Result := TransformScriptName(s, isScriptName)
  else if isFunc.Success then
    Result := TransformFuncDecl(s, isFunc)
  else
    Result := TransformPossibleComments(s);
end;

const
  nl = #13#10;
  fileComment =
    '/*' + nl +
    'This file was automatically generated by Papyrus-2-Typescript.exe' + nl +
    'https://github.com/CarlosLeyvaAyala/Papyrus-2-Typescript' + nl + nl +

    'The program has no way to know the intention of the humans that made' + nl +
    'the scripts, so it''s always advisable to manually check all generated' + nl +
    'files to make sure everything is declared as it should.' + nl + nl +

    'Take note that program assumes this script exists in some subfolder' + nl +
    'to the folder where `skyrimPlatform.ts` is found, otherwise you''ll get' + nl +
    '"Cannot find module..." type of errors.' + nl + nl +

    'If you want to have this script in some other place, just change the' + nl +
    'relative path of each `import`.' + nl +
    '*/' + nl + nl;

function AddPapyrusObjects(const s: string): string;
begin
  const fileImports = 'import * as sp from "../skyrimPlatform"';

  const objImports = TSeq.From<string>(GetPapyrusObjects)
    .Map(
      function(obj: string): string
      begin
        // If there's a type declaration for this object...
        if s.Contains(': ' + obj) then
          Result := Format('import { %s } from "../skyrimPlatform"', [obj])
        else
          Result := '';
      end)
    .Fold<string>(
      function(const input: string; const Accumulator: string): string
      begin
        if input = '' then
          Result := Accumulator
        else
          Result := Accumulator + IfThen(Accumulator = '', '', nl) + input;
      end, '');

  Result := fileImports + nl + objImports + nl + nl;
end;

function AddFileHeader(const s: string): string;
begin
  Result := fileComment + AddPapyrusObjects(s) + s;
end;

// Process a whole file.
procedure Process(const fileName: string);
begin
  if not FileExists(fileName) then
    Exit;

  const lines = ReadFile(fileName);
  try
    const ugly = TSeq.From(lines)
      .Map(ProcessLine)
      .Fold<string>(ReduceNewLine(), '');

    lines.Text := AddFileHeader(Beautify(ugly));
    const outName = ChangeFileExt(ExtractFileName(fileName), '.ts');
    lines.SaveToFile(ExtractFilePath(fileName) + outName);
  finally
    lines.Free;
  end;
end;

end.

