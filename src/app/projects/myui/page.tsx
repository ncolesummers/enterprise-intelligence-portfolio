import { ExternalLink } from "lucide-react";
import Link from "next/link";

import {
  CaseStudyHeader,
  CaseStudySection,
  EvidenceItem,
  EvidenceList,
  EvidencePanel,
} from "@/components/case-study";
import { Button } from "@/components/ui/button";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata = generatePageMetadata({
  title: "MyUI Dashboard - University of Idaho",
  description:
    "Lead developer building custom React components for the University of Idaho's MyUI within the Ellucian Experience platform.",
  path: "/projects/myui",
});

export default function MyUIPage() {
  return (
    <main id="main-content" className="sheet">
      <CaseStudyHeader
        figure={3}
        title="MyUI Dashboard"
        summary="A live University of Idaho service built by extending the Ellucian Experience platform with custom React components."
      >
        <Button variant="outline" asChild>
          <Link
            href="https://my.uidaho.edu"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            Visit MyUI
          </Link>
        </Button>
      </CaseStudyHeader>

      <CaseStudySection title="Introduction">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="type-body text-line-soft measure space-y-4">
            <p>
              MyUI is the University of Idaho&apos;s implementation of Ellucian
              Experience, delivered as a live production service.
            </p>
            <p>
              As lead developer, I designed and delivered the custom React
              components that extend the host platform.
            </p>
          </div>
          <EvidencePanel>
            <h3 className="type-title mb-4">Project highlights</h3>
            <EvidenceList>
              <EvidenceItem>
                Live production service at my.uidaho.edu
              </EvidenceItem>
              <EvidenceItem>Custom component delivery in React</EvidenceItem>
              <EvidenceItem>Ellucian platform integration</EvidenceItem>
              <EvidenceItem>Responsive presentation</EvidenceItem>
            </EvidenceList>
          </EvidencePanel>
        </div>
      </CaseStudySection>

      <CaseStudySection title="Project Overview">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="type-body text-line-soft measure space-y-4">
            <p>
              Ellucian provides the Experience host platform. The University of
              Idaho work described here is the custom component layer seated
              inside it, not a greenfield application.
            </p>
            <p>
              The implementation uses the platform&apos;s card model and
              integration surfaces while adding institution-specific services.
            </p>
          </div>
          <EvidencePanel>
            <h3 className="type-title mb-4">Technology stack</h3>
            <ul className="flex flex-wrap gap-2" aria-label="Technology stack">
              {[
                "React",
                "JavaScript",
                "CSS",
                "Ellucian Experience",
                "Ethos APIs",
              ].map(technology => (
                <li
                  key={technology}
                  className="type-label rule-leader px-2 py-1"
                >
                  {technology}
                </li>
              ))}
            </ul>
          </EvidencePanel>
        </div>
      </CaseStudySection>

      <CaseStudySection title="Key Features">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <EvidencePanel>
            <h3 className="type-title mb-4">Custom component cards</h3>
            <p className="type-body text-line-soft">
              University-specific services are delivered through custom React
              cards.
            </p>
          </EvidencePanel>
          <EvidencePanel>
            <h3 className="type-title mb-4">Ellucian shell</h3>
            <p className="type-body text-line-soft">
              The existing platform supplies the surrounding Experience shell.
            </p>
          </EvidencePanel>
          <EvidencePanel>
            <h3 className="type-title mb-4">Single sign-on</h3>
            <p className="type-body text-line-soft">
              The service uses University of Idaho credentials through the
              platform&apos;s access flow.
            </p>
          </EvidencePanel>
          <EvidencePanel>
            <h3 className="type-title mb-4">Responsive interface</h3>
            <p className="type-body text-line-soft">
              Components adapt across desktop and mobile layouts.
            </p>
          </EvidencePanel>
        </div>
      </CaseStudySection>

      <CaseStudySection title="My Role as Lead Developer">
        <div className="mb-8">
          <p className="type-body text-line-soft measure">
            I led component implementation, platform integration, responsive
            delivery, and department collaboration for the custom MyUI work.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <EvidencePanel>
            <h3 className="type-title mb-4">Component development</h3>
            <EvidenceList>
              <EvidenceItem>Designed custom React cards</EvidenceItem>
              <EvidenceItem>
                Implemented responsive component behavior
              </EvidenceItem>
            </EvidenceList>
          </EvidencePanel>
          <EvidencePanel>
            <h3 className="type-title mb-4">Platform delivery</h3>
            <EvidenceList>
              <EvidenceItem>Integrated with Ellucian Experience</EvidenceItem>
              <EvidenceItem>
                Worked with university departments to define component needs
              </EvidenceItem>
            </EvidenceList>
          </EvidencePanel>
        </div>
      </CaseStudySection>

      <CaseStudySection title="Benefits for the University Community">
        <div className="grid gap-8 md:grid-cols-3">
          <EvidencePanel>
            <h3 className="type-title mb-4">Unified access</h3>
            <p className="type-body text-line-soft">
              MyUI provides one destination for university services.
            </p>
          </EvidencePanel>
          <EvidencePanel>
            <h3 className="type-title mb-4">Platform extension</h3>
            <p className="type-body text-line-soft">
              Custom cards extend the existing platform without replacing its
              shell.
            </p>
          </EvidencePanel>
          <EvidencePanel>
            <h3 className="type-title mb-4">Cross-device access</h3>
            <p className="type-body text-line-soft">
              Responsive layouts support the live service across screen sizes.
            </p>
          </EvidencePanel>
        </div>
      </CaseStudySection>

      <CaseStudySection title="Technical Implementation">
        <EvidencePanel>
          <h3 className="type-title mb-4">Component architecture</h3>
          <EvidenceList>
            <EvidenceItem>
              React components define the custom layer
            </EvidenceItem>
            <EvidenceItem>
              Platform-defined APIs provide integration points
            </EvidenceItem>
            <EvidenceItem>CSS carries responsive presentation</EvidenceItem>
          </EvidenceList>
        </EvidencePanel>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <EvidencePanel>
            <h3 className="type-title mb-4">Integration constraints</h3>
            <p className="type-body text-line-soft">
              Component delivery had to work within platform-specific APIs,
              authentication flows, and the surrounding Ellucian shell.
            </p>
          </EvidencePanel>
          <EvidencePanel>
            <h3 className="type-title mb-4">Publication boundary</h3>
            <p className="type-body text-line-soft">
              The proprietary implementation and internal university data are
              not published in this case study.
            </p>
          </EvidencePanel>
        </div>
      </CaseStudySection>

      <CaseStudySection title="Ethos Integration">
        <EvidencePanel>
          <h3 className="type-title mb-4">Leveraging Ellucian Ethos</h3>
          <p className="type-body text-line-soft measure mb-6">
            The component layer uses Ellucian Ethos Business Process APIs as an
            integration surface.
          </p>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h4 className="type-title mb-4">API integration</h4>
              <EvidenceList>
                <EvidenceItem>Ellucian-provided API contracts</EvidenceItem>
                <EvidenceItem>
                  Platform-defined authentication flows
                </EvidenceItem>
              </EvidenceList>
            </div>
            <div>
              <h4 className="type-title mb-4">Component containment</h4>
              <EvidenceList>
                <EvidenceItem>
                  Custom React components sit inside the Ellucian Experience
                  shell
                </EvidenceItem>
              </EvidenceList>
            </div>
          </div>
        </EvidencePanel>
        <EvidencePanel className="mt-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="type-title mb-4">Integration challenges</h3>
              <p className="type-body text-line-soft">
                The work had to conform to vendor-defined interfaces while
                fitting the university&apos;s component requirements.
              </p>
            </div>
            <div>
              <h3 className="type-title mb-4">Published boundary</h3>
              <p className="type-body text-line-soft">
                The public evidence identifies the integration shape without
                exposing private code, internal data, or implementation detail.
              </p>
            </div>
          </div>
        </EvidencePanel>
      </CaseStudySection>

      <CaseStudySection title="Results and Impact">
        <EvidencePanel>
          <p className="type-body text-line-soft measure mb-4">
            The verifiable outcome is production delivery: MyUI is live with the
            custom component work deployed inside Ellucian Experience.
          </p>
          <p className="type-body text-line-soft measure mb-4">
            No adoption, satisfaction, or engagement metrics are claimed because
            none are published evidence for this case study.
          </p>
          <a
            href="https://my.uidaho.edu"
            target="_blank"
            rel="noopener noreferrer"
            className="type-label hover:text-annotation underline underline-offset-4 transition-colors"
          >
            Visit the live MyUI service
          </a>
        </EvidencePanel>
      </CaseStudySection>

      <CaseStudySection title="Conclusion">
        <EvidencePanel>
          <p className="type-body text-line-soft measure">
            MyUI shows enterprise component delivery within an existing
            enterprise platform: leading implementation, integration, and
            responsive execution while respecting the limits on what can be
            shown publicly.
          </p>
        </EvidencePanel>
      </CaseStudySection>
    </main>
  );
}
