:: This file compresses all mod files for a release version.
:: It also compresses a backup copy for a particular version of
:: the program.
:: Read all comments before using this.
::
:: You only need to care about this file if you inherited this project
:: and need to release it. Otherwise, ignore it.
:: It isn't strictly necessary to use this, but it will surely
:: save you a lot of time.
::
:: You need to download 7-zip for this to work.

@ECHO OFF

::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
:: Mod variables
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
SET /p AppVersion="Input the app version you are about to release: "

:: DON'T CHANGE THESE
SET appName="Papyrus-2-Typescript"
SET modEsp="SandowPP.esp"

::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
:: You need to update ALL these variables so they point towards
:: valid paths in your own computer.
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
:: 7 zip path
SET zipExe="C:\Program Files\7-Zip\7z"
:: Path to my library you downloaded from github at
:: https://github.com/CarlosLeyvaAyala/DM-SkyrimSE-Library.git
SET baseLib="F:\Skyrim SE\MO2\mods\DM-SkyrimSE-Library\"
SET lib=%baseLib%"scripts\"
:: This points towards a dir github will ignore. It saves backups
:: for newly released versions
SET backupDir="backups"

::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
:: External libraries required by this mod
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
SET req1="DM_Utils.pex"
SET req2="DM_MeterWidgetScript.pex"
:: Whole folder with Lua scripts
SET req3=%baseLib%"SKSE\"

::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
:: Files needed to compile, but not distributable.
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

:: These are included in this github repo, but they are
:: already distributed by SkyUI.
SET exc1="SKI_*"
:: Unneeded developing helpers
SET exc2="__*" "*.md"

::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
:: Create release zip (*.7z) file
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
:: See https://sevenzip.osdn.jp/chm/cmdline/index.htm

:: Compression level = 9
SET comp=-mx9
%zipExe% d %appName%.7z
%zipExe% a -t7z %appName%.7z bin
@REM %zipExe% a -t7z %appName%.7z SKSE -spf2 %comp%

:: Put libraries in the correct folder
@REM %zipExe% rn %appName%.7z %req1% scripts\%req1% %req2% scripts\%req2% %comp%

:: Delete undesired files from zip
@REM %zipExe% d %appName%.7z scripts\source %exc1% %exc2% -r -bb1 %comp%

::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
:: Copy backup
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
COPY %appName%.7z %backupDir%\%appName%" "%AppVersion%.7z

PAUSE
