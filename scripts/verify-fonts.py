"""Deterministic checks for the local Phase 3 font contract.

Run with the pinned verifier dependency:

    uv run --no-project --with 'fonttools[woff]==4.58.5' \
      python scripts/verify-fonts.py
"""

from pathlib import Path
import hashlib
import sys

from fontTools.ttLib import TTFont


ROOT = Path(__file__).resolve().parents[1]
FONT_DIR = ROOT / "src/app/fonts"
SAIRA = FONT_DIR / "SairaLatinVar.woff2"
MONASPACE = FONT_DIR / "PortfolioCodeLatinVar.woff2"
SAIRA_SHA256 = "e97fc158e1132efe48ac3c9f90214dcdc04a2a4adae38c37a7bd868ee909683b"
MONASPACE_SOURCE_SHA256 = (
    "6569968f448ae856ab5b57dff1f13b109b220ca8e3f664169e135fcb5c4f0721"
)


def require(condition: bool, message: str) -> None:
    if not condition:
        raise AssertionError(message)


def axes(font: TTFont) -> dict[str, tuple[float, float]]:
    require("fvar" in font, "font must remain variable")
    return {
        axis.axisTag: (axis.minValue, axis.maxValue)
        for axis in font["fvar"].axes
    }


def feature_tags(font: TTFont) -> set[str]:
    require("GSUB" in font, "font must retain its GSUB table")
    feature_list = font["GSUB"].table.FeatureList
    require(feature_list is not None, "font must retain OpenType features")
    records = {
        record.FeatureTag: record.Feature for record in feature_list.FeatureRecord
    }
    for required_tag in ("liga", "calt"):
        require(required_tag in records, f"Monaspace lost {required_tag} substitutions")
        require(
            bool(records[required_tag].LookupListIndex),
            f"Monaspace {required_tag} feature has no substitutions",
        )
    return set(records)


def codepoints(font: TTFont) -> set[int]:
    return {
        codepoint
        for table in font["cmap"].tables
        for codepoint in table.cmap
    }


def reserved_functional_names(font: TTFont) -> list[str]:
    # The OFL copyright/license notices must retain the RFNs. Functional font
    # naming records must not: those names identify the modified derivative.
    legal_name_ids = {0, 7, 8, 9, 10, 11, 12, 13, 14}
    violations = []
    for record in font["name"].names:
        if record.nameID in legal_name_ids:
            continue
        value = record.toUnicode()
        folded = value.casefold()
        if "monaspace" in folded or "neon" in folded:
            violations.append(f"{record.nameID}: {value}")
    return sorted(set(violations))


def sha256(path: Path) -> str:
    return hashlib.file_digest(path.open("rb"), "sha256").hexdigest()


def main() -> None:
    layout = (ROOT / "src/app/layout.tsx").read_text()
    css = (ROOT / "src/app/globals.css").read_text()

    require("next/font/google" not in layout, "layout still imports Google fonts")
    require("next/font/local" not in layout, "font loading must live in local CSS")
    require("SairaLatinVar.woff2" in css, "local Saira face is not declared")
    require(
        "PortfolioCodeLatinVar.woff2" in css,
        "local Monaspace face is not declared",
    )
    require('"liga" 1' in css, "code ligatures are not enabled")
    require('"calt" 1' in css, "code contextual alternates are not enabled")

    require(SAIRA.is_file(), f"missing {SAIRA.relative_to(ROOT)}")
    require(MONASPACE.is_file(), f"missing {MONASPACE.relative_to(ROOT)}")
    require(
        (FONT_DIR / "SairaLatinVar.LICENSE.txt").is_file(),
        "missing Saira license",
    )
    require(
        (FONT_DIR / "FONT_SOURCES.md").is_file(),
        "missing reproducible source record",
    )
    require(
        (FONT_DIR / "PortfolioCodeLatinVar.LICENSE.txt").is_file(),
        "missing modified Monaspace subset license",
    )
    require(sha256(SAIRA) == SAIRA_SHA256, "Saira does not match its pinned source")
    require(
        sha256(FONT_DIR / "MonaspaceNeonVar.woff2") == MONASPACE_SOURCE_SHA256,
        "Monaspace source does not match its pinned source record",
    )
    for license_name in (
        "SairaLatinVar.LICENSE.txt",
        "MonaspaceNeonVar.LICENSE.txt",
        "PortfolioCodeLatinVar.LICENSE.txt",
    ):
        license_text = (FONT_DIR / license_name).read_text()
        require("SIL OPEN FONT LICENSE" in license_text, f"invalid {license_name}")

    saira = TTFont(SAIRA)
    monaspace = TTFont(MONASPACE)
    require(saira.flavor == "woff2", "Saira must ship as WOFF2")
    require(monaspace.flavor == "woff2", "Monaspace must ship as WOFF2")
    reserved_names = reserved_functional_names(monaspace)
    require(
        not reserved_names,
        "Monaspace derivative retains reserved functional names: "
        + "; ".join(reserved_names),
    )
    typographic_families = {
        record.toUnicode()
        for record in monaspace["name"].names
        if record.nameID == 16
    }
    require(
        typographic_families == {"Portfolio Code"},
        f"unexpected derivative family names: {sorted(typographic_families)}",
    )

    saira_axes = axes(saira)
    require("wght" in saira_axes, "Saira lost the weight axis")
    require("wdth" in saira_axes, "Saira lost the width axis")
    require(
        saira_axes["wght"][0] <= 400 and saira_axes["wght"][1] >= 800,
        "Saira no longer covers weights 400 through 800",
    )
    require(
        saira_axes["wdth"][0] <= 87.5 and saira_axes["wdth"][1] >= 100,
        "Saira no longer covers 87.5% and 100% widths",
    )

    monaspace_axes = axes(monaspace)
    require("wght" in monaspace_axes, "Monaspace lost the weight axis")
    require(
        monaspace_axes["wght"][0] <= 200
        and monaspace_axes["wght"][1] >= 800,
        "Monaspace no longer covers weights 200 through 800",
    )
    retained_features = feature_tags(monaspace)

    specimen = (
        'class ProfileData(BaseModel): status: Literal["Correct"] | None = None '
        "# ... <= >= != == -> => :: // fetch_page"
    )
    missing = sorted({ord(character) for character in specimen} - codepoints(monaspace))
    require(not missing, f"Monaspace is missing code-specimen codepoints: {missing}")

    require(
        MONASPACE.stat().st_size < (FONT_DIR / "MonaspaceNeonVar.woff2").stat().st_size,
        "Monaspace subset is not smaller than its source font",
    )

    print(
        "font verification passed: "
        f"Saira axes={saira_axes}; "
        f"Monaspace axes={monaspace_axes}; "
        "features=calt,liga"
    )


if __name__ == "__main__":
    try:
        main()
    except (AssertionError, KeyError) as error:
        print(f"font verification failed: {error}", file=sys.stderr)
        raise SystemExit(1)
