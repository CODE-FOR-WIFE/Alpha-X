#!/usr/bin/env bash
# Quiet luxury stories. Keep the approved automotive exports untouched.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ASSETS="$ROOT/demo/public/assets"
TEMP=$(mktemp -d)
RAW="$ROOT/footage/raw"
mkdir -p "$RAW"
NAMES=(marine aircraft property watch art)
FILES=(marine-v2 aircraft-v2 property-estate watch art-renaissance)
URLS=(
  https://videos.pexels.com/video-files/37524012/15898412_2560_1440_60fps.mp4
  https://videos.pexels.com/video-files/28586471/12427468_2560_1440_24fps.mp4
  https://videos.pexels.com/video-files/5744343/5744343-uhd_2732_1440_30fps.mp4
  https://videos.pexels.com/video-files/6230464/6230464-hd_1920_1080_24fps.mp4
  https://videos.pexels.com/video-files/37273773/15790524_1440_2560_30fps.mp4
)
for i in "${!NAMES[@]}"; do
  name=${NAMES[$i]}
  # Optional names let a new story be built without touching approved clips.
  if [[ $# -gt 0 && " $* " != *" $name "* ]]; then continue; fi
  input="$RAW/${FILES[$i]}.mp4"
  if [[ ! -f "$input" ]]; then
    curl --fail --location "${URLS[$i]}" -o "$TEMP/source.mp4"
    mv "$TEMP/source.mp4" "$input"
  fi
  grade="eq=contrast=1.06:brightness=-0.015:saturation=0.65"
  speed=1.4; start=0; duration=7
  # Begin after the bracelet-only reveal, with the complete dial already visible.
  [[ $name == watch ]] && start=6
  [[ $name == watch ]] && grade="eq=contrast=1.07:brightness=-0.01:saturation=0.72"
  # Preserve the red gallery walls and gilded frames of the selected collection.
  if [[ $name == art ]]; then
    grade="eq=contrast=1.04:brightness=-0.025:saturation=0.78"
    speed=1.5; start=0; duration=8
  fi
  [[ $name == property ]] && speed=1.8
  for size in desktop mobile; do
    suffix=""; scale="1920:1080"; frame="null"; bitrate="4000k"; buffer="8000k"
    if [[ $size == mobile ]]; then suffix="-mobile"; scale="720:1280"; bitrate="1800k"; buffer="3600k"; fi
    # Place the yacht to the right of the headline.
    if [[ $name == marine && $size == desktop ]]; then frame="crop=1920:1080:0:180"; fi
    if [[ $name == watch && $size == desktop ]]; then frame="crop=1440:810:0:135"; fi
    # Portrait footage becomes a right-hand collection panel, not a stretched panorama.
    if [[ $name == art && $size == desktop ]]; then frame="crop=1440:1440:0:320,scale=1080:1080:flags=lanczos,pad=1920:1080:840:0:color=0x050507"; fi
    filter="setpts=$speed*(PTS-STARTPTS),$frame,scale=$scale:force_original_aspect_ratio=increase:flags=lanczos,crop=$scale,setsar=1,$grade,format=yuv420p"
    ffmpeg -nostdin -v error -y -ss "$start" -i "$input" -t "$duration" \
      -vf "$filter" -an -r 24 \
      -c:v libx264 -preset fast -crf 23 -maxrate "$bitrate" -bufsize "$buffer" \
      -movflags +faststart "$TEMP/$name$suffix.mp4"
    ffmpeg -nostdin -v error -i "$TEMP/$name$suffix.mp4" -f null -
    mv "$TEMP/$name$suffix.mp4" "$ASSETS/hero-$name$suffix.mp4"
  done
  ffmpeg -nostdin -v error -y -i "$ASSETS/hero-$name.mp4" -frames:v 1 -q:v 2 "$ASSETS/hero-$name-poster.jpg"
done
echo "Selected luxury stories exported; approved automotive media untouched."
