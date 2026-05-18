# perjanjiankerjasama-main

Frontend (Vue) untuk aplikasi Perjanjian Kinerja.

## Prasyarat
- Node.js + npm

## Menjalankan Frontend

### macOS / Linux
- Local:
```bash
./run-local.sh
```
- Prod mode:
```bash
./run-prod.sh
```

### Windows (CMD)
- Local:
```bat
run-local.bat
```
- Prod mode:
```bat
run-prod.bat
```

## Detail Mode
- `local`:
  - FE default: `http://127.0.0.1:8080`
  - `VUE_APP_URL_API`: `http://127.0.0.1:8081/`
  - `VUE_APP_URL_APIDEFAULT`: `http://127.0.0.1:8081/`
- `prod`:
  - FE default: `http://127.0.0.1:8080`
  - `VUE_APP_URL_API`: `https://monika.sisda.net/`
  - `VUE_APP_URL_APIDEFAULT`: `https://monika.sisda.net/2026/`

## Override Host/Port FE

### macOS / Linux
```bash
FE_HOST=127.0.0.1 FE_PORT=8090 ./run-local.sh
```

### Windows (CMD)
```bat
set FE_HOST=127.0.0.1
set FE_PORT=8090
run-local.bat
```
