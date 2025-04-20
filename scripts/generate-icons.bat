@echo off
setlocal EnableDelayedExpansion

REM Verificar si ImageMagick está instalado
where magick >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Error: ImageMagick no está instalado.
    echo Por favor, instale ImageMagick desde https://imagemagick.org/
    pause
    exit /b 1
)

REM Crear directorio de iconos si no existe
if not exist "..\public\icons" mkdir "..\public\icons"

REM Array de tamaños de iconos
set sizes=72 96 128 144 152 192 384 512

REM Generar iconos con fondo transparente
for %%s in (%sizes%) do (
    echo Generando icono %%sx%%s...
    magick convert hospital-icon.png -resize %%sx%%s -background none -gravity center -extent %%sx%%s "..\public\icons\icon-%%sx%%s.png"
    if !ERRORLEVEL! NEQ 0 (
        echo Error al generar icono %%sx%%s
        pause
        exit /b 1
    )
)

echo.
echo Todos los íconos fueron generados exitosamente en la carpeta 'public/icons'.
echo Los siguientes tamaños fueron creados:
for %%s in (%sizes%) do echo - %%sx%%s pixels
echo.

pause
