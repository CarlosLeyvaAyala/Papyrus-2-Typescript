unit ProcessFile;

interface

uses
  System.SysUtils, System.Classes, Functional.Sequence,
  System.RegularExpressions, System.StrUtils, System.Generics.Collections;

procedure Process(const fileName, version: string);

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
function BeautifyTrimMultilineComments(s: string): string;
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
  bs.Free;
end;

// Converts normal comments to TsDoc comments
function BeautifyDocComments(s: string): string;
begin
  const c = AddFlags('^\s*\/\/(.*)(export)', [singleLine, ungreedy, multiLine]);
  const bs = TBullshitWrapper.Create;
  bs.g := function (m: TMatch): string
    begin
      // Ignore comments that are separated from the function definition
      // by a blank line.
      const x = m.Groups[1].Value;
      const s = m.Groups[1].Value.Trim;
      const l = LastDelimiter(#10, s);
      const rest = LeftStr(s, l);
      const r = IfThen(rest <> '', '//' + rest, '');
      const noBlank = RightStr(s, Length(s) - l);
//      const noBlank = TRegex.Create('(.*\n)').Replace(m.Groups[1].Value.trim, '');
      Result := r + '/** ' + noBlank + ' */'#13#10 + m.Groups[2].Value;
    end;
  Result := TRegex.Create(c).Replace(s, bs.SomethingGral);
  bs.Free;
end;

function BeautifyComments(s: string): string;
begin
  Result := BeautifyTrimMultilineComments(s);
//  Result := BeautifyDocComments(Result);
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

  // Papyrus objects - all
  for var obj in GetPapyrusObjects do begin
    const l = obj.ToLower;
    if not StartsStr(l, Result) then Continue;

    // Array type. Example: Replace('form[', 'Form[')
    Result := Result.Replace(l + '[', obj + '[');

    // Nullable object type. Example: Replace('form', 'Form | null')
    if l = Result then
      Result := Result.Replace(l, obj + ' | null | undefined');
  end;
end;

// Transforms arguments in the form 'arg1, arg2, ... argN' to
// 'arg1�, arg2�, ... argN�'
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
  argList.Free;
end;

// Renames TS reserved words that are not a problem in Papyrus
function AvoidReserved(s: string): string;
begin
  Result := s.Replace('default', 'defaultVal');
end;

const
  argsRegex = '((\w+)(\[\s*\])*)\s(\w+)\s*=?(.*)';

// Removes typing from a list of arguments. Used for translating the calling function.
function UntypeArgs(args: string): string;
begin
  Result := TransformArgList(args,
    function(arg: string): string
    begin
      Result := AvoidReserved(TRegEx.Create(argsRegex).Replace(arg, '$4'));
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

  try
    Result := TransformArgList(args,
      function(arg: string): string
      begin
        const g = TRegEx.Create(argsRegex).Match(arg).Groups;
        const varName = AvoidReserved(g.Item[4].Value);
        const varType = PapyrusToTsType(g.Item[1].Value);
        const defaultVal = PapyDefaultToTs(g.Item[5].Value);
        const dv = IfThen(defaultVal <> '', ' = ' + defaultVal.trim, '');

        Result := Format('%s: %s%s', [varName, varType, dv]);
      end);
  except on E: Exception do
    // If something fails, the more likely case is embedded Papyrus code;
    // like the way most PapyrusUtil source files have inside them.
    // This program aim is not to automate whole language translation, but
    // only function headers, so that kind of code is output verbatim for a
    // human to fix it.
    Result := '// '+  args;
  end;
end;

// Tranforms a whole function declaration from Papyrus to Ts.
function TransformFuncDecl(_: string; m: TMatch): string;
begin
  const g = m.Groups;
  const typ = PapyrusToTsType(g.Item[2].Value);
  const fn = g.Item[5].Value;
  const input = PapyrusArgsToTs(g.Item[6].Value);
  const args = UntypeArgs(g.Item[6].Value);
  const r = 'export const %s = (%s): %s => %s.%s(%s)';
  Result := Format(r, [fn, input, typ, scriptNameVar, fn, args]);
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

function TransformBlockCommentStart(s, bcL, bcS: string;
  isBlockCommentEnd: TMatch; var bcOpen: Boolean): string;
begin
  if isBlockCommentEnd.Success then
    // Block comment ends in same line
    Result := TRegex.Create(bcL).Replace(s, '/** $2 */')
  else begin
    Result := TRegex.Create(bcS).Replace(s, '/** $2');
    bcOpen := true;
  end
end;

function TransformBlockCommentEnd(s, bcE: string;
  isBlockCommentEnd: TMatch; var bcOpen: Boolean): string;
begin
  if isBlockCommentEnd.Success then begin
    Result := TRegex.Create(bcE).Replace(s, '$1 */');
    bcOpen := false;
  end
  else
    // Comment open. Don't transform
    Result := s
end;

// Transforms special cases, like PO3 Papyrus Extender
function TransformSpecialCases(s: string): string;
begin
//
  const bs = TBullshitWrapper.Create;
  bs.g :=function (m: TMatch): string
    begin
      Result := '// ' + m.Value;
    end;

  const ev = AddFlags('^\s*event .*$', [caseInsensitive]);
  const eev = AddFlags('^\s*endevent.*$', [caseInsensitive]);
  Result := TRegEx.Create(ev).Replace(s, bs.SomethingGral);
  Result := TRegEx.Create(eev).Replace(Result, bs.SomethingGral);
  bs.Free;
end;

var
  blockCommentOpen: Boolean = false;

// Process a single line.
function ProcessLine(s: string): string;
begin
  const fl: Flags = [caseInsensitive];

  { TODO : Would it be better to take the ScriptName from the file name? }
  const sn = AddFlags('^\s*scriptname (\w*)( hidden)?', fl);
  const isScriptName = TRegEx.Create(sn).Match(s);

  const fn = AddFlags('^\s*(((\w*)\s*(\[\s*\]\s*)*)\s+)?function (\w*)\s*\((.*)\).*', fl);
  const isFunc = TRegex.Create(fn).Match(s);

  const pr = AddFlags('(.*)property (\w*)\s*=\s*(.*) autoreadonly(.*)', fl);
  const isProperty = TRegEx.Create(pr).Match(s);

  const bcS = '^\s*(;\/|{)(.*)';
  const isBlockCommentStart = TRegex.Create(bcS).Match(s);

  const bcE = '(.*)((\/;)|})\s*$';
  const isBlockCommentEnd = TRegex.Create(bcE).Match(s);

  const bcL= '^\s*(;\/|{)(.*)(\/;|})\s*$';

  // For all regex replaces, I traded performance for code clarity
  if isBlockCommentStart.Success then
    Result := TransformBlockCommentStart(s, bcL, bcS,isBlockCommentEnd, blockCommentOpen)
  else if blockCommentOpen then
    Result := TransformBlockCommentEnd(s, bcE, isBlockCommentEnd, blockCommentOpen)
  else if isScriptName.Success then
    Result := TransformScriptName(s, isScriptName)
  else if isFunc.Success then
    Result := TransformFuncDecl(s, isFunc)
  else if isProperty.Success then
    Result := TRegex.Create(pr).Replace(s, 'export const $2 = $3')
  else
    Result := TransformSpecialCases(TransformPossibleComments(s));
end;

const
  nl = #13#10;
  fileComment =
    '/*' + nl +
    '==============================================' + nl +
    'Typescript definitions for v%s' + nl +
    '==============================================' + nl +
    nl +
    'This file was automatically generated by Papyrus-2-Typescript.exe' + nl +
    'https://github.com/CarlosLeyvaAyala/Papyrus-2-Typescript' + nl + nl +

    'The program has no way to know the intention of the humans that made' + nl +
    'the scripts, so it''s always advisable to manually check all generated' + nl +
    'files to make sure everything is declared as it should.' + nl + nl +

    'Take note the program assumes this script exists in some subfolder' + nl +
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

function AddFileHeader(const s, version: string): string;
begin
  Result := Format(fileComment, [version]) + AddPapyrusObjects(s) + s;
end;

// Process a whole file.
procedure Process(const fileName, version: string);
begin
  if not FileExists(fileName) then
    Exit;

  blockCommentOpen := false;
  const lines = ReadFile(fileName);
  try
    const ugly = TSeq.From(lines)
      .Map(ProcessLine)
      .Fold<string>(ReduceNewLine(), '');

    lines.Text := AddFileHeader(Beautify(ugly), version);
    const outName = ChangeFileExt(ExtractFileName(fileName), '.ts');
    lines.SaveToFile(ExtractFilePath(fileName) + outName);
  finally
    lines.Free;
  end;
end;

end.
