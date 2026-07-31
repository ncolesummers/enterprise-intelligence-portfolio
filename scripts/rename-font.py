"""Rename functional OpenType records for the modified code-font subset."""

from pathlib import Path
import sys

from fontTools.ttLib import TTFont


LEGAL_NAME_IDS = {0, 7, 8, 9, 10, 11, 12, 13, 14}
REPLACEMENTS = (
    ("Monaspace Neon Var", "Portfolio Code"),
    ("MonaspaceNeonVar", "PortfolioCode"),
    ("Monaspace Neon", "Portfolio Code"),
)


def main(source: Path, destination: Path) -> None:
    font = TTFont(source, recalcTimestamp=False)

    for record in font["name"].names:
        if record.nameID in LEGAL_NAME_IDS:
            continue

        value = record.toUnicode()
        renamed = value
        for reserved, replacement in REPLACEMENTS:
            renamed = renamed.replace(reserved, replacement)

        if renamed != value:
            record.string = renamed.encode(record.getEncoding())

    font.save(destination, reorderTables=False)


if __name__ == "__main__":
    if len(sys.argv) != 3:
        raise SystemExit("usage: rename-font.py SOURCE DESTINATION")
    main(Path(sys.argv[1]), Path(sys.argv[2]))
