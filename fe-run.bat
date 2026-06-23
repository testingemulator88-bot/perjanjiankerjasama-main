@echo off
setlocal EnableExtensions

set "ROOT_DIR=%~dp0"
set "MODE=%~1"
if "%MODE%"=="" set "MODE=local"

set "HOST=%FE_HOST%"
if "%HOST%"=="" set "HOST=127.0.0.1"
set "PORT=%FE_PORT%"
if "%PORT%"=="" set "PORT=8080"

if /I "%MODE%"=="local" (
  set "API_BASE_URL=%VUE_APP_URL_API%"
  if "%API_BASE_URL%"=="" set "API_BASE_URL=http://127.0.0.1:8081/"
  set "API_DEFAULT_URL=%VUE_APP_URL_APIDEFAULT%"
  if "%API_DEFAULT_URL%"=="" set "API_DEFAULT_URL=http://127.0.0.1:8081/"
) else if /I "%MODE%"=="prod" (
  set "API_BASE_URL=%VUE_APP_URL_API%"
  if "%API_BASE_URL%"=="" set "API_BASE_URL=https://monika.sisda.net/"
  set "API_DEFAULT_URL=%VUE_APP_URL_APIDEFAULT%"
  if "%API_DEFAULT_URL%"=="" set "API_DEFAULT_URL=https://monika.sisda.net/2026/"
) else (
  echo [ERROR] Unknown mode: %MODE%
  echo Usage: fe-run.bat [local^|prod]
  exit /b 1
)

if not exist "%ROOT_DIR%package.json" (
  echo [ERROR] package.json not found in: %ROOT_DIR%
  exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
  echo [ERROR] npm command not found in PATH
  exit /b 1
)

if not exist "%ROOT_DIR%node_modules\.bin\vue-cli-service.cmd" (
  echo [FE] Dependencies not found/incomplete. Running npm install --legacy-peer-deps...
  pushd "%ROOT_DIR%" >nul
  call npm install --legacy-peer-deps
  if errorlevel 1 (
    popd >nul
    exit /b 1
  )
  popd >nul
)

echo [FE] Mode: %MODE%
echo [FE] Starting at http://%HOST%:%PORT%
echo [FE] Root: %ROOT_DIR%
pushd "%ROOT_DIR%" >nul
set "VUE_APP_URL_API=%API_BASE_URL%"
set "VUE_APP_URL_APIDEFAULT=%API_DEFAULT_URL%"
call npm run serve -- --host "%HOST%" --port "%PORT%"
set "EXIT_CODE=%ERRORLEVEL%"
popd >nul
exit /b %EXIT_CODE%
