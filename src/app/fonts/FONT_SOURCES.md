# Font sources and regeneration

The shipped files are English/Latin web subsets. They remain under their
upstream SIL Open Font License 1.1 terms.

## Saira

- Upstream family: [Omnibus-Type/Saira](https://github.com/Omnibus-Type/Saira),
  source commit `1916f2a575479b626238d9842126e63aa208eebf` recorded by
  [Google Fonts metadata](https://github.com/google/fonts/blob/main/ofl/saira/METADATA.pb).
- Web artifact: Google Fonts Saira v21 Latin variable WOFF2,
  `https://fonts.gstatic.com/s/saira/v21/memwYa2wxmKQyNknTZM_ULUe.woff2`.
- Artifact SHA-256:
  `e97fc158e1132efe48ac3c9f90214dcdc04a2a4adae38c37a7bd868ee909683b`.
- License: `SairaLatinVar.LICENSE.txt`, copied from the
  [Google Fonts Saira license](https://github.com/google/fonts/blob/main/ofl/saira/OFL.txt).

The Google Fonts Latin artifact already limits coverage by Unicode range while
retaining Saira's `wdth` (50–125) and `wght` (100–900) axes, so no second
subsetting pass is applied.

## Monaspace Neon

- Upstream family: [githubnext/monaspace](https://github.com/githubnext/monaspace).
- Release: [`v1.400`](https://github.com/githubnext/monaspace/releases/tag/v1.400),
  tag commit `f31794b6e9e65698a062262e2f826f679dcb7070`.
- Immutable release artifact:
  `https://github.com/githubnext/monaspace/releases/download/v1.400/monaspace-webfont-variable-v1.400.zip`.
- Release archive SHA-256:
  `7e643a4c9f3994b8819308656c1c049af8c571666a74ed216764b9aae4908b40`.
- Source path within the archive:
  `Variable Web Fonts/Monaspace Neon/Monaspace Neon Var.woff2`.
- Source file: `MonaspaceNeonVar.woff2`.
- Source SHA-256:
  `6569968f448ae856ab5b57dff1f13b109b220ca8e3f664169e135fcb5c4f0721`.
- License: `MonaspaceNeonVar.LICENSE.txt`.

The subset covers Basic Latin, Latin-1, punctuation, currency, and the symbols
used by the site's literal code specimens. Because subsetting creates a modified
font, the script renames all functional OpenType records to the non-reserved
family `Portfolio Code`; the original copyright and OFL notices remain intact.
The derivative license is also copied alongside it as
`PortfolioCodeLatinVar.LICENSE.txt`. It retains all OpenType layout features
and variable axes; `scripts/verify-fonts.py` specifically checks `liga`, `calt`,
code-specimen glyph coverage, the weight range, and absence of reserved names
from functional naming records.

## Regenerate and verify

From the repository root:

```bash
./scripts/subset-fonts.sh
```

The script pins FontTools 4.58.5, verifies the downloaded Saira checksum, and
runs the binary verifier after generation. It does not change `package.json`,
the pnpm lockfile, or pnpm policy.
