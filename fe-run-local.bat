@echo off
setlocal EnableExtensions

set "ROOT_DIR=%~dp0"
call "%ROOT_DIR%fe-run.bat" local
exit /b %ERRORLEVEL%
