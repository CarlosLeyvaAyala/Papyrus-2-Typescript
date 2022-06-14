unit Functions.Regex;

interface

uses
  System.RegularExpressions, System.SysUtils, System.StrUtils;

type
  Flag = (caseInsensitive, multiLine, singleLine, extended, ungreedy);

  Flags = set of Flag;

function GetSureGroup(const input: string; const expr: string): string;

function AddFlags(const expr: string; const aFlags: Flags): string;

type
  TBullshitWrapper = class
    f: TFunc<string, string>;
    g: TFunc<TMatch, string>;
    { It's bullshit only object methods are accepted as a TMatchEvaluator }
    class function LowerCase(const match: TMatch): string;
    function Something(const match: TMatch): string;
    // Use this instead of Something()
    function SomethingGral(const match: TMatch): string;
  end;

implementation

// Adds flags to some regex.
function AddFlags(const expr: string; const aFlags: Flags): string;
begin
  if aFlags = [] then begin
    Result := expr;
    Exit;
  end;

  Result := '';
  Result := Result + IfThen(caseInsensitive in aFlags, 'i', '');
  Result := Result + IfThen(multiLine in aFlags, 'm', '');
  Result := Result + IfThen(singleLine in aFlags, 's', '');
  Result := Result + IfThen(extended in aFlags, 'x', '');
  Result := Result + IfThen(ungreedy in aFlags, 'U', '');

  Result := Format('(?%s)%s', [Result, expr]);
end;

// Returns the first group of a regex when there's 100% certainty it exists
function GetSureGroup(const input: string; const expr: string): string;
var
  c: TGroupCollection;
begin
  c := TRegEx.Create(expr).Match(input).Groups;
  Assert(c.Count > 1, Format('Regex %s on %s failed to get an ensured group', [expr,
    input]));
  Result := c.Item[1].Value;
end;

{ TBullshitWrapper }

class function TBullshitWrapper.LowerCase(const match: TMatch): string;
begin
  Result := System.SysUtils.LowerCase(match.Value);
end;

function TBullshitWrapper.Something(const match: TMatch): string;
begin
  Result := f(match.Value);
end;

function TBullshitWrapper.SomethingGral(const match: TMatch): string;
begin
  Result := g(match);
end;

end.

