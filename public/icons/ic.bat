@echo off
mkdir icons
magick convert hospital-icon.png -resize 72x72 icons/icon-72x72.png
magick convert hospital-icon.png -resize 96x96 icons/icon-96x96.png
magick convert hospital-icon.png -resize 128x128 icons/icon-128x128.png
magick convert hospital-icon.png -resize 144x144 icons/icon-144x144.png
magick convert hospital-icon.png -resize 152x152 icons/icon-152x152.png
magick convert hospital-icon.png -resize 192x192 icons/icon-192x192.png
magick convert hospital-icon.png -resize 384x384 icons/icon-384x384.png
magick convert hospital-icon.png -resize 512x512 icons/icon-512x512.png
echo Íconos generados en la carpeta 'icons'.