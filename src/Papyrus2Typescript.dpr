program Papyrus2Typescript;

{$APPTYPE CONSOLE}

{$R *.res}

uses
  System.SysUtils,
  Functional.Sequence,
  System.Generics.Collections,
  ProcessFile in 'ProcessFile.pas',
  Functions.Regex in 'Functions.Regex.pas',
  Functions.Strings in 'Functions.Strings.pas';

begin
  try
    for var i := 1 to ParamCount do begin
      Process(ParamStr(i));
    end;
    Readln;
  except
    on E: Exception do begin
      Writeln(E.ClassName, ': ', E.Message);
      Readln;
    end;
  end;
end.

