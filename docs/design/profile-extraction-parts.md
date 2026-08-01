# FIG. 4 parts inventory — AI data extraction research

Captured 2026-07-28 from the checked-in case-study source and the written
redesign authority. Every part below is already stated by those sources.
**Nothing here is inferred.**

This file exists so the plate has an evidence base. The plate may show only the
research spike's input, extraction pass, output, and verification step. It is
not a diagram of a production system and does not reproduce profile records.

## Feasibility spike

| Part | Evidence |
| --- | --- |
| Feasibility question | `src/app/projects/profile-extractor/page.tsx` describes the work as a research spike and feasibility study; `docs/REDESIGN_PLAN.md` defines the plate's fact as a feasibility question with a checked answer. |
| Source pages | The case study identifies public profile pages as the source; the plate abstracts them to unlabeled pages so it does not expose employer data or record content. |
| LangGraph extraction pass | The case study identifies a LangGraph state machine for the extraction process; `docs/REDESIGN_PLAN.md` names a LangGraph extraction pass explicitly. |
| Structured profiles | The case study states that the spike extracted structured profile data; the plate names only the output category and no fields or values. |
| Verification | The case study documents a validation step after extraction; `docs/REDESIGN_PLAN.md` requires a verification step and a checked answer. |

The plate orders these parts exactly as the brief states: source pages →
LangGraph extraction → structured profiles → verification. The words “source
check” state what the verification pass compared the output against; they do
not publish a metric or claim a production outcome.

## Deliberately not drawn

- No accuracy, cost, throughput, duration, volume, or scale figure. PRODUCT.md
  prohibits unsupported measurements, and the plate brief explicitly prohibits
  accuracy numbers.
- No names, titles, email addresses, profile fields, people-like records, page
  content, or screenshots. The University of Idaho employer boundary applies.
- No model provider, crawler, parser, schema library, database, hosting,
  deployment, monitoring, or production boundary. Those are not part of the
  one structural fact assigned to this plate.
- No claim that the research became a production system or achieved a
  particular level of feasibility, reliability, or trust.
