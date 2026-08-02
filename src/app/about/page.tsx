import Link from "next/link";

import {
  CaseStudySection,
  EvidenceItem,
  EvidenceList,
  EvidencePanel,
} from "@/components/case-study";
import { generatePageMetadata } from "@/lib/metadata";

/**
 * The about sheet.
 *
 * It opens on the stance rather than the name, because the title block already
 * states the name on every screen and a sheet does not letter its author twice.
 * PRODUCT.md names human authority over judgment as the product's actual point
 * of view, so that is the claim the page leads with and then substantiates.
 *
 * Every focus area points at something a reader can open. The page previously
 * described the work in adjectives — reliable, secure, maintainable at scale —
 * which is the failure mode PRODUCT.md's first principle names by name.
 */

export const metadata = generatePageMetadata({
  title: "About N. Cole Summers",
  description:
    "Enterprise Applications Developer at the University of Idaho, building agent systems for the software delivery lifecycle with human approval over judgment.",
  path: "/about",
});

const certifications = [
  "Security+",
  "Advanced Certified Scrum Master",
  "Certified Scrum Developer",
  "Certified Scrum Product Owner",
];

const languages = ["TypeScript", "Python", "Go", "C#", "Rust"];

/**
 * Away from the work. Three entries, not four: the incumbent page ran "Music"
 * and "Food & Music" as separate tiles, which is one interest counted twice.
 * Set as a ruled list rather than a card grid, and without the icon-in-a-circle
 * treatment — the callout bubble is the only circle this system draws.
 */
const interests = [
  {
    name: "Reading",
    detail:
      "Fantasy and science fiction, alongside self-development, history, politics, and science.",
  },
  {
    name: "Music",
    detail: "Electronic and alternative, and live wherever possible.",
  },
  {
    name: "Gaming",
    detail: "Interactive storytelling, mostly as a way to unwind.",
  },
];

export default function AboutPage() {
  return (
    <main id="main-content" className="sheet">
      <section className="pt-8 sm:pt-12">
        {/* Two claims, so two lines. Left to itself the measure broke after
            "toil." mid-line, which puts a full stop inside a line of display
            type and hides the pivot the sentence turns on. Each clause is its
            own block and wraps on its own below the widths that fit it. */}
        <h1 className="type-display">
          <span className="block">AI removes the toil.</span>
          <span className="block">Humans keep the judgment.</span>
        </h1>
        <p className="type-body text-line-soft measure mt-6">
          I&apos;m an Enterprise Applications Developer at the University of
          Idaho, building agent systems for the software delivery lifecycle. Ten
          years in IT, five of them writing applications, and continuous
          practice with AI in that lifecycle since the GitHub Copilot technical
          preview in June 2021.
        </p>
      </section>

      <div className="mt-24">
        <CaseStudySection title="What I Build">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="type-body text-line-soft measure space-y-4">
              <p>
                My work is agent systems for software delivery, and the argument
                for it is{" "}
                <Link
                  href="/projects/loopworks"
                  className="text-line hover:text-annotation underline underline-offset-4 transition-colors"
                >
                  Loopworks
                </Link>
                , a public agentic software factory. A labeled GitHub issue
                enters and leaves as a draft pull request, having passed eight
                declared stages and two approval gates.
              </p>
              <p>
                It followed a published reference architecture, the Enterprise
                Agent Development Lifecycle, which asked what a full delivery
                lifecycle looks like when agents do the work and humans keep the
                judgment. Loopworks is that question answered as a running
                system.
              </p>
              <p>
                Alongside the agent work I build production systems at
                institutional scale, which is what keeps the agent claims from
                being theoretical.
              </p>
            </div>
            <EvidencePanel>
              <h3 className="type-title mb-4">Where the work is</h3>
              <EvidenceList>
                <EvidenceItem>
                  <strong className="text-line">Loopworks.</strong> Agents carry
                  work through declared stages. A maintainer approves the plan,
                  and approves again before the single write to GitHub.
                </EvidenceItem>
                <EvidenceItem>
                  <strong className="text-line">
                    Agent Development Lifecycle.
                  </strong>{" "}
                  A reference architecture on Anthropic&apos;s Claude Agent SDK,
                  synthesizing five Anthropic research documents.
                </EvidenceItem>
                <EvidenceItem>
                  <strong className="text-line">
                    University of Idaho website.
                  </strong>{" "}
                  The public site, on a headless Sitecore and Next.js
                  architecture delivered through Azure.
                </EvidenceItem>
                <EvidenceItem>
                  <strong className="text-line">MyUI.</strong> Lead developer on
                  the modernized student dashboard, built as custom React
                  components inside the Ellucian Experience platform.
                </EvidenceItem>
              </EvidenceList>
            </EvidencePanel>
          </div>
        </CaseStudySection>

        <CaseStudySection title="How I Work">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="type-body text-line-soft measure space-y-4">
              <p>
                Automation should eliminate toil, not judgment. The distinction
                is the whole design stance: an agent can do the work, draft the
                plan, and write the tests, but the decisions someone has to
                answer for stay with a person.
              </p>
              <p>
                In a system, that stance has to be a property rather than a
                preference. In Loopworks it is two approval gates that declare a
                bypass policy of none, so there is no configuration that turns
                them off and no urgent path around them.
              </p>
              <p>
                When the work can be public, the plan should be public too.
                Publishing intent before implementation exposes assumptions and
                tradeoffs while they can still be challenged. Keeping the
                decisions and the result inspectable creates a record that is
                stronger than a claim made after the fact.
              </p>
              <p>
                I believe in blameless postmortems for the same reason. A system
                that punishes the person who found the failure stops being told
                about failures.
              </p>
              <p>
                I work across {languages.slice(0, -1).join(", ")}, and{" "}
                {languages.at(-1)}, choosing per problem rather than defaulting
                to one stack.
              </p>
            </div>
            <EvidencePanel>
              <h3 className="type-title mb-4">Certifications</h3>
              <EvidenceList>
                {certifications.map(certification => (
                  <EvidenceItem key={certification}>
                    {certification}
                  </EvidenceItem>
                ))}
              </EvidenceList>
              <h3 className="type-title mt-8 mb-4">Current role</h3>
              <p className="type-body text-line-soft">
                Enterprise Applications Developer, University of Idaho. Ten
                years of IT experience and five years of application
                development.
              </p>
            </EvidencePanel>
          </div>
        </CaseStudySection>

        <CaseStudySection title="Beyond the Sheet">
          <EvidencePanel className="measure">
            <EvidenceList>
              {interests.map(interest => (
                <EvidenceItem key={interest.name}>
                  <strong className="text-line">{interest.name}.</strong>{" "}
                  {interest.detail}
                </EvidenceItem>
              ))}
            </EvidenceList>
          </EvidencePanel>
        </CaseStudySection>
      </div>
    </main>
  );
}
