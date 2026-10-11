#!/usr/bin/env bash
# Compatibility entry point: build independent moving clips, not a slideshow.
set -euo pipefail
exec bash "$(dirname "$0")/build-hero-clips.sh" "$@"
