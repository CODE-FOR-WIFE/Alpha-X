#!/usr/bin/env bash
# Render demo/public/assets/hero.mp4 (desktop 1440p) + hero-mobile.mp4 (portrait 1080×1920) + hero-poster.jpg
# จากฟุตเทจดิบใน footage/raw (gitignored)
# ลำดับช็อตต้องตรงกับ slides ใน demo/src/components/hero-carousel.tsx และ offset ตรงกับ SLIDE (6.5 วิ)
# ใช้: scripts/build-hero-video.sh [crf]   (default 30 ≈ 13MB desktop — 26 คมกว่านิดแต่ 23MB)
set -euo pipefail
cd "$(dirname "$0")/../footage/raw"
OUT=../../demo/public/assets
CRF=${1:-30}

# ช็อต: ไฟล์ จุดเริ่ม(วิ) ตำแหน่ง crop แนวนอนของเวอร์ชันมือถือ (0 = ชิดซ้าย, 1 = ชิดขวา)
CLIPS=(
  "car.mp4 14 0.50"
  "yacht.mp4 0 0.35"
  "aircraft.mp4 4 0.45"
  "property.mp4 0 0.50"
  "gold.mp4 4.5 0.45"
)
# ปรับแสงรายช็อต — ทองต้นฉบับพื้นขาวสว่างมาก ต้องกดลงหนัก
TWEAK=("" ",eq=brightness=0.02" ",eq=brightness=-0.04" "" ",curves=all='0/0 0.5/0.28 1/0.72',eq=saturation=1.1")
GRADE="fps=24,setsar=1,unsharp=5:5:0.5,eq=contrast=1.08:saturation=0.85,colorbalance=bs=0.06:bm=0.03:rh=0.03,format=yuv420p"

render() { # $1 = ไฟล์ output, $2 = "desktop" | "mobile"
  local inputs=() f="" i=0
  for c in "${CLIPS[@]}"; do
    read -r file start x <<<"$c"
    inputs+=(-ss "$start" -t 7.5 -i "$file")
    if [[ $2 == desktop ]]; then
      # 1440p ไม่ใช่ 1080p — จอ retina ขยาย 1080 เกือบ 3 เท่าแล้วเบลอ
      fit="scale=2560:1440:force_original_aspect_ratio=increase:flags=lanczos,crop=2560:1440"
    else
      # มือถือ hero เป็นแนวตั้ง — ตัดแนวตั้งจาก 4K เลย ได้ภาพคมกว่าและไฟล์เล็กกว่าย่อ 16:9 แล้วให้ CSS crop
      fit="crop=ih*9/16:ih:(iw-ih*9/16)*$x:0,scale=1080:1920:flags=lanczos"
    fi
    f+="[$i:v]$fit,$GRADE${TWEAK[$i]}[v$i];"
    i=$((i + 1))
  done
  f+="[v0][v1]xfade=transition=fade:duration=1:offset=6.5[x1];[x1][v2]xfade=transition=fade:duration=1:offset=13[x2];"
  f+="[x2][v3]xfade=transition=fade:duration=1:offset=19.5[x3];[x3][v4]xfade=transition=fade:duration=1:offset=26,format=yuv420p[v]"
  ffmpeg -loglevel error -y "${inputs[@]}" -filter_complex "$f" -map "[v]" -an \
    -c:v libx264 -preset veryslow -tune film -crf "$CRF" -profile:v high -movflags +faststart "$1"
}

render "$OUT/hero.mp4" desktop
render "$OUT/hero-mobile.mp4" mobile
ffmpeg -loglevel error -y -ss 3 -i "$OUT/hero.mp4" -frames:v 1 -q:v 3 "$OUT/hero-poster.jpg"
ls -la "$OUT"/hero.mp4 "$OUT"/hero-mobile.mp4 "$OUT"/hero-poster.jpg
