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
  Result := Result.Replace('formlist', 'Formlist');
  Result := Result.Replace('form[', 'Form[');
  Result := Result.Replace('form', 'Form | null');
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

// Process a whole file.
procedure Process(const fileName: string);
begin
  if not FileExists(fileName) then
    Exit;

  var lines := ReadFile(fileName);
  TSeq.From(lines)
    .Map(ProcessLine)
    .ForEach(
    procedure(s: string)
    begin
      Writeln(s);
    end);
  lines.Free;
end;

end.

