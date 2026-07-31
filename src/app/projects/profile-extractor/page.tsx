import {
  CaseStudyHeader,
  CaseStudySection,
  EvidenceItem,
  EvidenceList,
  EvidencePanel,
  LiteralCode,
} from "@/components/case-study";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata = generatePageMetadata({
  title: "AI Data Extraction Research",
  description:
    "A feasibility study testing whether foundation models could turn public source pages into structured profiles with LangGraph and a verification step.",
  path: "/projects/profile-extractor",
});

function CodeEvidence({
  children,
  title,
}: {
  children: string;
  title: string;
}) {
  return (
    <div className="rule-leader min-w-0 p-4">
      <h4 className="type-title text-line-soft mb-3">{title}</h4>
      <pre className="text-line-soft max-w-full overflow-x-auto">
        <code className="type-code">{children}</code>
      </pre>
    </div>
  );
}

export default function ProfileExtractorPage() {
  return (
    <main id="main-content" className="sheet">
      <CaseStudyHeader
        figure={4}
        title="AI Data Extraction Research"
        summary="A research spike that tested whether foundation models could turn public source pages into structured profiles through a LangGraph extraction and verification workflow."
      />

      <CaseStudySection title="Introduction">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="type-body text-line-soft measure space-y-4">
            <p>
              This feasibility study examined a specific question: could a
              foundation-model workflow extract a consistent structure from
              public web pages whose HTML varies?
            </p>
            <p>
              The spike tested that question as research. It did not establish
              an operational service, and this case study does not publish the
              source material or extracted records.
            </p>
          </div>
          <EvidencePanel>
            <h3 className="type-title mb-4">Project evidence</h3>
            <EvidenceList>
              <EvidenceItem>Public source pages as inputs</EvidenceItem>
              <EvidenceItem>LangGraph extraction as orchestration</EvidenceItem>
              <EvidenceItem>Structured profiles as outputs</EvidenceItem>
              <EvidenceItem>A separate verification pass</EvidenceItem>
            </EvidenceList>
          </EvidencePanel>
        </div>
      </CaseStudySection>

      <CaseStudySection title="Project Overview">
        <div className="grid gap-8 md:grid-cols-[2fr_1fr] lg:grid-cols-2 xl:grid-cols-[3fr_1fr]">
          <div className="type-body text-line-soft measure space-y-4">
            <p>
              The work compared variable public source pages against a defined
              structured schema. Extraction was only one stage: every result
              also went through a separate verification pass so the spike could
              inspect where the approach worked and where it failed.
            </p>
            <p>
              That boundary matters. The evidence is the shape of the tested
              workflow and its inspectable outputs, not a claim of deployment,
              coverage, or measured accuracy.
            </p>
          </div>
          <EvidencePanel>
            <h3 className="type-title mb-4">Workflow under test</h3>
            <ol className="type-body text-line-soft divide-y divide-rule-leader">
              <li className="py-3 first:pt-0">Source pages</li>
              <li className="py-3">LangGraph extraction</li>
              <li className="py-3">Structured profiles</li>
              <li className="py-3 last:pb-0">Verification step</li>
            </ol>
            <h3 className="type-title mt-6 mb-4 border-t border-rule-leader pt-6">
              Technology stack
            </h3>
            <ul className="flex flex-wrap gap-2" aria-label="Technology stack">
              {["Python", "LangGraph", "Pydantic", "LangSmith"].map(
                technology => (
                  <li
                    key={technology}
                    className="type-label rule-leader px-2 py-1"
                  >
                    {technology}
                  </li>
                ),
              )}
            </ul>
          </EvidencePanel>
        </div>
      </CaseStudySection>

      <CaseStudySection title="Approach & Methodology">
        <EvidencePanel className="mb-8">
          <h3 className="type-title mb-4">Three-stage investigation</h3>
          <ol className="type-body text-line-soft divide-y divide-rule-leader">
            <li className="py-3 first:pt-0">
              <strong className="text-line">Identify inputs:</strong> derive a
              bounded set of public source URLs for the spike.
            </li>
            <li className="py-3">
              <strong className="text-line">Extract and structure:</strong>{" "}
              fetch, preprocess, and pass page content through a LangGraph state
              machine into a Pydantic schema.
            </li>
            <li className="py-3 last:pb-0">
              <strong className="text-line">Verify and inspect:</strong> compare
              structured outputs with source material, traces, and errors before
              drawing a feasibility conclusion.
            </li>
          </ol>
        </EvidencePanel>

        <div className="grid gap-8 md:grid-cols-2">
          <EvidencePanel>
            <h3 className="type-title mb-4">LangGraph state machine</h3>
            <EvidenceList>
              <EvidenceItem>
                <LiteralCode>fetch_page</LiteralCode> retrieves source HTML.
              </EvidenceItem>
              <EvidenceItem>
                <LiteralCode>preprocess_html</LiteralCode> parses and cleans the
                document.
              </EvidenceItem>
              <EvidenceItem>
                <LiteralCode>extract_data</LiteralCode> maps content into the
                structured schema.
              </EvidenceItem>
              <EvidenceItem>
                <LiteralCode>validate_data</LiteralCode> performs the
                verification step.
              </EvidenceItem>
              <EvidenceItem>
                <LiteralCode>handle_error</LiteralCode> records failures at each
                stage.
              </EvidenceItem>
            </EvidenceList>
          </EvidencePanel>
          <EvidencePanel>
            <h3 className="type-title mb-4">Crawling constraints</h3>
            <EvidenceList>
              <EvidenceItem>Configured delays between requests</EvidenceItem>
              <EvidenceItem>robots.txt directives observed</EvidenceItem>
              <EvidenceItem>Identified user agent</EvidenceItem>
              <EvidenceItem>Error handling with backoff</EvidenceItem>
              <EvidenceItem>Bounded concurrency</EvidenceItem>
            </EvidenceList>
          </EvidencePanel>
        </div>
      </CaseStudySection>

      <CaseStudySection title="Technical Implementation">
        <div className="grid gap-8 md:grid-cols-2">
          <EvidencePanel>
            <h3 className="type-title mb-4">Data schemas</h3>
            <p className="type-body text-line-soft mb-4">
              Pydantic models defined the structure of extracted data and the
              result of verification. Employer-sensitive field definitions are
              intentionally omitted here.
            </p>
            <div className="space-y-4">
              <CodeEvidence title="ProfileData Schema">
                {`class ProfileData(BaseModel):
    # Field definitions omitted from this public case study.
    ...`}
              </CodeEvidence>
              <CodeEvidence title="ValidationResult Schema">
                {`class FieldValidation(BaseModel):
    field: str
    status: Literal["Correct", "Incorrect", "Missing"]
    explanation: str | None = None

class ValidationResult(BaseModel):
    overall_accuracy: float
    field_validations: list[FieldValidation]
    suggestions: list[str] | None = None`}
              </CodeEvidence>
            </div>
          </EvidencePanel>
          <EvidencePanel>
            <h3 className="type-title mb-4">Model boundary</h3>
            <p className="type-body text-line-soft mb-4">
              One model configuration produced structured output; a separate
              verification pass checked that output against the source. Keeping
              those stages distinct made failures visible in the graph and its
              traces.
            </p>
            <EvidenceList>
              <EvidenceItem>Schema-constrained extraction</EvidenceItem>
              <EvidenceItem>Separate verification pass</EvidenceItem>
              <EvidenceItem>Node-level tracing in LangSmith</EvidenceItem>
              <EvidenceItem>Error logging and prompt inspection</EvidenceItem>
            </EvidenceList>
          </EvidencePanel>
        </div>
        <EvidencePanel className="mt-8">
          <h3 className="type-title mb-4">Monitoring and debugging</h3>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h4 className="type-title mb-4">Trace evidence</h4>
              <EvidenceList>
                <EvidenceItem>Each graph node traced separately</EvidenceItem>
                <EvidenceItem>
                  Errors categorized by workflow stage
                </EvidenceItem>
                <EvidenceItem>
                  Prompts inspectable during the spike
                </EvidenceItem>
              </EvidenceList>
            </div>
            <div>
              <h4 className="type-title mb-4">Verification evidence</h4>
              <EvidenceList>
                <EvidenceItem>Field-level validation status</EvidenceItem>
                <EvidenceItem>Source-to-output comparisons</EvidenceItem>
                <EvidenceItem>
                  Verification findings remain inspectable
                </EvidenceItem>
              </EvidenceList>
            </div>
          </div>
        </EvidencePanel>
      </CaseStudySection>

      <CaseStudySection title="Results">
        <div className="grid gap-8 md:grid-cols-3">
          <EvidencePanel>
            <h3 className="type-title mb-4">Feasibility question</h3>
            <p className="type-body text-line-soft">
              The spike established that the workflow could produce structured
              outputs from the bounded source set for inspection.
            </p>
          </EvidencePanel>
          <EvidencePanel>
            <h3 className="type-title mb-4">Checked output</h3>
            <p className="type-body text-line-soft">
              A separate verification node compared extracted fields with their
              source material instead of treating model output as authoritative.
            </p>
          </EvidencePanel>
          <EvidencePanel>
            <h3 className="type-title mb-4">Recorded failures</h3>
            <p className="type-body text-line-soft">
              The graph captured fetch, parsing, extraction, and validation
              errors so limitations remained part of the result.
            </p>
          </EvidencePanel>
        </div>

        <EvidencePanel className="mt-8">
          <h3 className="type-title mb-4">What was checked</h3>
          <EvidenceList>
            <EvidenceItem>Whether source pages could be fetched</EvidenceItem>
            <EvidenceItem>
              Whether extracted output matched the defined schema
            </EvidenceItem>
            <EvidenceItem>
              Whether validation exposed incorrect or missing fields
            </EvidenceItem>
            <EvidenceItem>
              Whether traces made failures diagnosable
            </EvidenceItem>
          </EvidenceList>
        </EvidencePanel>

        <EvidencePanel className="mt-8">
          <h3 className="type-title mb-4">Limitations & Challenges</h3>
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h4 className="type-title mb-4">Source discovery</h4>
              <p className="type-body text-line-soft">
                Sitemap-derived URLs can be stale, so the input list cannot
                stand in for comprehensive coverage.
              </p>
            </div>
            <div>
              <h4 className="type-title mb-4">HTML variability</h4>
              <p className="type-body text-line-soft">
                Source-page structures vary, which makes preprocessing a tested
                part of the workflow rather than a generic parser assumption.
              </p>
            </div>
            <div>
              <h4 className="type-title mb-4">Schema boundaries</h4>
              <p className="type-body text-line-soft">
                Pages that do not match the expected single-record shape require
                explicit handling instead of forced extraction.
              </p>
            </div>
          </div>
        </EvidencePanel>
      </CaseStudySection>

      <CaseStudySection title="Recommendations">
        <EvidencePanel>
          <h3 className="type-title mb-4">Feasibility assessment</h3>
          <p className="type-body text-line-soft measure mb-6">
            The spike answered its bounded research question well enough to
            justify further investigation. It did not establish a deployment
            decision or resolve the open review requirements.
          </p>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h4 className="type-title mb-4">Evidence to retain</h4>
              <EvidenceList>
                <EvidenceItem>Structured extraction contract</EvidenceItem>
                <EvidenceItem>Separate verification pass</EvidenceItem>
                <EvidenceItem>Traceable errors and limitations</EvidenceItem>
              </EvidenceList>
            </div>
            <div>
              <h4 className="type-title mb-4">Questions still open</h4>
              <EvidenceList>
                <EvidenceItem>More reliable source discovery</EvidenceItem>
                <EvidenceItem>Explicit handling for variant pages</EvidenceItem>
                <EvidenceItem>Human review workflow</EvidenceItem>
              </EvidenceList>
            </div>
          </div>
        </EvidencePanel>
      </CaseStudySection>

      <CaseStudySection title="Next Steps">
        <div className="grid gap-8 md:grid-cols-2">
          <EvidencePanel>
            <h3 className="type-title mb-4">Research follow-up</h3>
            <EvidenceList>
              <EvidenceItem>Refine source discovery</EvidenceItem>
              <EvidenceItem>Handle variant source-page shapes</EvidenceItem>
              <EvidenceItem>Separate graph nodes for maintenance</EvidenceItem>
              <EvidenceItem>
                Keep prompts in explicit configuration
              </EvidenceItem>
            </EvidenceList>
          </EvidencePanel>
          <EvidencePanel>
            <h3 className="type-title mb-4">Decision boundary</h3>
            <p className="type-body text-line-soft">
              Any move beyond the spike would require its own evidence, privacy
              review, operational design, and approval requirements. None of
              those outcomes is implied by this research result.
            </p>
          </EvidencePanel>
        </div>
      </CaseStudySection>

      <CaseStudySection title="Conclusion">
        <EvidencePanel>
          <p className="type-body text-line-soft measure">
            This spike tested a bounded extraction workflow from public source
            pages through LangGraph, structured profiles, and verification. Its
            useful result is an inspectable feasibility finding with errors and
            limitations intact, not an accuracy, scale, or deployment claim.
          </p>
        </EvidencePanel>
      </CaseStudySection>
    </main>
  );
}
