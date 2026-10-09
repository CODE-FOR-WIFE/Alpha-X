#!/usr/bin/env bash
# Render demo/public/assets/hero.mp4 + hero-poster.jpg จากฟุตเทจดิบใน footage/raw (gitignored)
# ลำดับช็อตต้องตรงกับ slides ใน demo/src/components/hero-carousel.tsx และ offset ตรงกับ SLIDE (6.5 วิ)
# ใช้: scripts/build-hero-video.sh [crf]   (default 30 ≈ 13MB — 26 คมกว่านิดแต่ 23MB)
set -euo pipefail
cd "$(dirname "$0")/../footage/raw"
OUT=../../demo/public/assets
CRF=${1:-30}

# 1440p ไม่ใช่ 1080p — จอ retina ขยาย 1080 เกือบ 3 เท่าแล้วเบลอ · lanczos + unsharp เบา ๆ ชดเชยการย่อจาก 4K
G="scale=2560:1440:force_original_aspect_ratio=increase:flags=lanczos,crop=2560:1440,fps=24,setsar=1,unsharp=5:5:0.5,eq=contrast=1.08:saturation=0.85,colorbalance=bs=0.06:bm=0.03:rh=0.03,format=yuv420p"
F="[0:v]${G}[a];[1:v]${G},eq=brightness=0.02[b];[2:v]${G},eq=brightness=-0.04[c];[3:v]${G}[d];[4:v]${G},curves=all='0/0 0.5/0.28 1/0.72',eq=saturation=1.1[e];[a][b]xfade=transition=fade:duration=1:offset=6.5[ab];[ab][c]xfade=transition=fade:duration=1:offset=13[abc];[abc][d]xfade=transition=fade:duration=1:offset=19.5[abcd];[abcd][e]xfade=transition=fade:duration=1:offset=26,format=yuv420p[v]"

ffmpeg -loglevel error -y \
  -ss 14 -t 7.5 -i car.mp4 \
  -ss 0 -t 7.5 -i yacht.mp4 \
  -ss 4 -t 7.5 -i aircraft.mp4 \
  -ss 0 -t 7.5 -i property.mp4 \
  -ss 4.5 -t 7.5 -i gold.mp4 \
  -filter_complex "$F" -map "[v]" -an \
  -c:v libx264 -preset veryslow -tune film -crf "$CRF" -profile:v high -movflags +faststart \
  "$OUT/hero.mp4"
ffmpeg -loglevel error -y -ss 3 -i "$OUT/hero.mp4" -frames:v 1 -q:v 3 "$OUT/hero-poster.jpg"
ls -la "$OUT/hero.mp4" "$OUT/hero-poster.jpg"
