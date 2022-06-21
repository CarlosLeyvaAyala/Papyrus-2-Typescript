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
SET exe="Papyrus_2_Typescript.exe"
SET binDir="bin"
SET filesDir="files"
SET batFile="Drop_your_files_here.bat"

::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
:: You need to update ALL these variables so they point towards
:: valid paths in your own computer.
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
:: 7 zip path
SET zipExe="C:\Program Files\7-Zip\7z"
:: This points towards a dir github will ignore. It saves backups
:: for newly released versions
SET backupDir="backups"

::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
:: Create release zip (*.7z) file
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
:: See https://sevenzip.osdn.jp/chm/cmdline/index.htm

:: Compression level = 9
SET comp=-mx9
%zipExe% d %appName%.7z
%zipExe% a -t7z %appName%.7z %exe% %binDir% %filesDir% %batFile%

:: Put files in the correct folder
%zipExe% rn %appName%.7z %exe% %binDir%\%exe% %filesDir% %binDir%\%filesDir%

::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
:: Copy backup
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
COPY %appName%.7z %backupDir%\%appName%" "%AppVersion%.7z

PAUSE
