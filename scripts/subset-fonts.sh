#!/usr/bin/env bash

set -euo pipefail

repo_root="$(cd "$(dirname "$0")/.." && pwd)"
font_dir="$repo_root/src/app/fonts"
font_tmp="$(mktemp -d)"
trap 'rm -rf "$font_tmp"' EXIT

saira_url="https://fonts.gstatic.com/s/saira/v21/memwYa2wxmKQyNknTZM_ULUe.woff2"
saira_sha="e97fc158e1132efe48ac3c9f90214dcdc04a2a4adae38c37a7bd868ee909683b"
saira_tmp="$font_tmp/SairaLatinVar.woff2"

curl --fail --location --silent --show-error "$saira_url" --output "$saira_tmp"
echo "$saira_sha  $saira_tmp" | shasum -a 256 --check
install -m 0644 "$saira_tmp" "$font_dir/SairaLatinVar.woff2"

monaspace_source_sha="6569968f448ae856ab5b57dff1f13b109b220ca8e3f664169e135fcb5c4f0721"
echo "$monaspace_source_sha  $font_dir/MonaspaceNeonVar.woff2" | shasum -a 256 --check

uv run --no-project --with 'fonttools[woff]==4.58.5' \
  python "$repo_root/scripts/rename-font.py" \
  "$font_dir/MonaspaceNeonVar.woff2" \
  "$font_tmp/PortfolioCodeVar.woff2"

uv run --no-project --with 'fonttools[woff]==4.58.5' pyftsubset \
  "$font_tmp/PortfolioCodeVar.woff2" \
  --output-file="$font_dir/PortfolioCodeLatinVar.woff2" \
  --flavor=woff2 \
  --unicodes='U+0020-007E,U+00A0-00FF,U+0131,U+0152-0153,U+2000-206F,U+20AC,U+2122,U+2190-2193,U+2212,U+2215,U+FEFF,U+FFFD' \
  --layout-features='*' \
  --name-IDs='*' \
  --name-legacy \
  --name-languages='*' \
  --no-recalc-timestamp

uv run --no-project --with 'fonttools[woff]==4.58.5' \
  python "$repo_root/scripts/verify-fonts.py"
