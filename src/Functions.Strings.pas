unit Functions.Strings;

interface

uses
  System.StrUtils, Functional.FuncFactory, System.SysUtils, Data.DB,
  System.Classes, Functional.Sequence, Vcl.StdCtrls, System.RegularExpressions;

function AskedForLowerCase(const toLowerCase: Boolean; const aText: string):
  string;

function FilterByContainsTxt(const aSubText: string): Functional.FuncFactory.TPredicate
  <string>;

function PrettyComma: TFoldFunc<string, string>;

function SortNLSeparatedStr(const aText: string; const allowDuplicates: Boolean
  = false): string;

function AppendSortedNLSeparatedStr(const txt1, txt2: string; const
  allowDuplicates: Boolean = false): string;

function CommaAndNL: TFoldFunc<string, string>;

function ReduceNewLine: TFoldFunc<string, string>;

function ReduceStr(const aSeparator: string): TFoldFunc<string, string>;

function ReduceStrField(const aField, aSeparator: string): TFoldFunc<TDataSet,
  string>;

function EncloseStr(const delim: string; delim2: string = ''): TFunc<string,
  string>;

function DeleteLast(const aText, aSubText: string): string;

function DeleteLastComma(const aText: string): string;

function StrToList(const aText: string; const aSorted: Boolean = true; const
  allowDuplicates: Boolean = true; const aCaseSensitive: Boolean = false):
  TStringList;

function DelBlankLines(const aText: string; const aSorted: Boolean = true; const
  allowDuplicates: Boolean = true; const aCaseSensitive: Boolean = false): string;

function SelectedItemsToString(const listBox: TListBox): string;

function ListSubstract(const aList, aSubstract: string): string;

function LowerCaseAdapter(s: string): string;

function StrToIntToStr(s: string; f: TFunc<Integer, Integer>): string;

function CamelCase(s: string): string;

function StrToListReduce(s: string; mapper: TFunc<string, string>; folder:
  TFoldFunc<string, string>; initAccum: string = ''): string;

function Compose(f1, f2: TFunc<string, string>): TFunc<string, string>;

function Append(willAppendThis: string): TFunc<string, string>;

function Prepend(willPrependThis: string): TFunc<string, string>;

implementation

uses
  Functions.Regex;

function Prepend(willPrependThis: string): TFunc<string, string>;
begin
  Result :=
    function(s: string): string
    begin
      Result := willPrependThis + s;
    end;
end;

function Append(willAppendThis: string): TFunc<string, string>;
begin
  Result :=
    function(s: string): string
    begin
      Result := s + willAppendThis;
    end;
end;

function Compose(f1, f2: TFunc<string, string>): TFunc<string, string>;
begin
  Result :=
    function(s: string): string
    begin
      Result := f2(f1(s));
    end;
end;

function StrToListReduce(s: string; mapper: TFunc<string, string>; folder:
  TFoldFunc<string, string>; initAccum: string): string;
var
  lst: TStringList;
begin
  lst := TStringList.Create;
  try
    lst.Text := s;
    Result := TSeq.From(lst)
      .Map(mapper)
      .Fold<string>(folder, initAccum);
  finally
    lst.Free;
  end;
end;

function CamelCase(s: string): string;
begin
  Result := TRegEx.Create('^\W*_*([A-Z])').Replace(s, TBullshitWrapper.LowerCase);
end;

function StrToIntToStr(s: string; f: TFunc<Integer, Integer>): string;
begin
  Result := IntToStr(f(StrToInt(s)));
end;

function LowerCaseAdapter(s: string): string;
begin
  Result := LowerCase(s);
end;

function ListSubstract(const aList, aSubstract: string): string;
var
  substract, lst: TStringList;
begin
  lst := StrToList(aList);
  substract := StrToList(aSubstract);
  try
    Result := TSeq.From(lst)
      .Filter(
      function(const aClass: string): Boolean
      var
        _: Integer;
      begin
        Result := not substract.Find(aClass, _);
      end)
      .Fold<string>(ReduceNewLine(), '');
  finally
    substract.Free;
    lst.Free;
  end;
end;

function AppendSortedNLSeparatedStr(const txt1, txt2: string; const
  allowDuplicates: Boolean = false): string;
begin
  Result := SortNLSeparatedStr(txt1 + #13#10 + txt2, allowDuplicates);
end;

function SelectedItemsToString(const listBox: TListBox): string;
var
  i: Integer;
begin
  Result := '';
  for i := 0 to listBox.Items.Count - 1 do begin
    if listBox.Selected[i] then
      Result := Result + listBox.Items[i] + #13#10;
  end;
  Result := Trim(Result);
end;

function AskedForLowerCase(const toLowerCase: Boolean; const aText: string):
  string;
begin
  Result := IfThen(toLowerCase, LowerCase(aText), aText);
end;

function NotNullStr(const s: string): Boolean;
begin
  Result := s <> '';
end;

function DelBlankLines(const aText: string; const aSorted: Boolean = true; const
  allowDuplicates: Boolean = true; const aCaseSensitive: Boolean = false): string;
var
  lst: TStringList;
begin
  lst := StrToList(aText, aSorted, allowDuplicates, aCaseSensitive);
  try
    Result := TSeq.From(lst)
      .Filter(NotNullStr)
      .Fold<string>(ReduceNewLine(), '');
  finally
    lst.Free;
  end;
end;

function SortNLSeparatedStr(const aText: string; const allowDuplicates: Boolean):
  string;
var
  tmp: TStringList;
begin
  tmp := StrToList(aText, true, allowDuplicates);
  try
    Result := tmp.Text;
  finally
    tmp.Free;
  end;
end;

function StrToList(const aText: string; const aSorted: Boolean; const
  allowDuplicates: Boolean; const aCaseSensitive: Boolean): TStringList;
begin
  Result := TStringList.Create;
  Result.CaseSensitive := aCaseSensitive;
  Result.Sorted := aSorted;
  if allowDuplicates then
    Result.Duplicates := dupAccept
  else
    Result.Duplicates := dupIgnore;
  Result.Text := aText;
end;

function ReduceNewLine: TFoldFunc<string, string>;
begin
  Result := ReduceStr(#13#10);
end;

function CommaAndNL: TFoldFunc<string, string>;
begin
  Result := ReduceStr(','#13#10);
end;

function PrettyComma: TFoldFunc<string, string>;
begin
  Result := ReduceStr(', ');
end;

function DeleteLastComma(const aText: string): string;
begin
  Result := DeleteLast(aText, ',');
end;

function DeleteLast(const aText, aSubText: string): string;
begin
  if EndsStr(aSubText, aText) then
    Result := LeftStr(aText, Length(aText) - Length(aSubText));
end;

function EncloseStr(const delim: string; delim2: string): TFunc<string, string>;
begin
  if delim2 = '' then
    delim2 := delim;

  Result :=
    function(s: string): string
    begin
      Result := delim + s + delim2;
    end;
end;

function FilterByContainsTxt(const aSubText: string): Functional.FuncFactory.TPredicate
  <string>;
begin
  Result :=
    function(const s: string): Boolean
    begin
      Result := ContainsText(s, aSubText);
    end;
end;

function ReduceStr(const aSeparator: string): TFoldFunc<string, string>;
begin
  Result :=
    function(const input: string; const Accumulator: string): string
    begin
      Result := Accumulator + IfThen(Accumulator = '', '', aSeparator) + input;
    end;
end;

function ReduceStrField(const aField, aSeparator: string): TFoldFunc<TDataSet,
  string>;
begin
  Result :=
    function(const input: TDataSet; const Accumulator: string): string
    begin
      Result := ReduceStr(aSeparator)(input.FieldByName(aField).AsString,
        Accumulator)
    end;
end;

end.

