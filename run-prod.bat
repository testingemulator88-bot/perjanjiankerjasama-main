@echo off
setlocal EnableExtensions

set "ROOT_DIR=%~dp0"
call "%ROOT_DIR%run.bat" prod
exit /b %ERRORLEVEL%
