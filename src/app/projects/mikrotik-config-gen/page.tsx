import type { ReactNode } from "react";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import mcg2020 from "@/assets/mcg-2020.jpeg";
import { Button } from "@/components/ui/button";
import { generatePageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

export const metadata = generatePageMetadata({
  title: "Mikrotik Configuration Generator",
  description:
    "A cross-platform desktop application that standardizes router configurations for ISP technicians, built with Go and Wails and designed to run offline.",
  path: "/projects/mikrotik-config-gen",
});

interface CaseStudySectionProps {
  children: ReactNode;
  title: string;
}

function CaseStudySection({ children, title }: CaseStudySectionProps) {
  return (
    <section className="mb-16" data-testid="case-study-section">
      <div className="mb-8 flex items-center gap-4">
        <h2 className="type-headline">{title}</h2>
        <div className="h-px flex-1 bg-rule-leader" aria-hidden="true" />
      </div>
      {children}
    </section>
  );
}

function EvidencePanel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("rule-leader min-w-0 p-6", className)}
      data-testid="evidence-panel"
    >
      {children}
    </div>
  );
}

function EvidenceList({ children }: { children: ReactNode }) {
  return (
    <ul className="type-body text-line-soft divide-y divide-rule-leader">
      {children}
    </ul>
  );
}

function EvidenceItem({ children }: { children: ReactNode }) {
  return <li className="py-3 first:pt-0 last:pb-0">{children}</li>;
}

function EvidenceCode({
  children,
  title,
}: {
  children: string;
  title: string;
}) {
  return (
    <div
      className="rule-leader mt-6 min-w-0 max-w-full p-4"
      data-testid="evidence-code"
    >
      <h4 className="type-title mb-3 text-base">{title}</h4>
      <pre className="max-w-full overflow-x-auto">
        <code className="type-code text-line-soft">{children}</code>
      </pre>
    </div>
  );
}

export default function MikrotikConfigGenPage() {
  return (
    <main id="main-content" className="sheet">
      <Link
        href="/#work"
        className="type-label text-line-soft hover:text-annotation inline-flex items-center gap-2 transition-colors"
      >
        <ArrowLeft className="h-3 w-3" aria-hidden="true" />
        Return to index
      </Link>

      <header className="mb-16 flex flex-col items-center text-center">
        <h1 className="type-display mb-6">Mikrotik Configuration Generator</h1>
        <p className="type-body text-line-soft measure mb-8">
          A self-contained desktop application that generates standardized
          router configurations for ISP technicians and runs offline.
        </p>
        <Button variant="outline" asChild>
          <Link
            href="https://presentation.ncolesummers.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            View presentation
          </Link>
        </Button>
      </header>

      <CaseStudySection title="Introduction">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="type-body text-line-soft measure space-y-4">
            <p>
              The Mikrotik Configuration Generator was developed for First Step
              Internet to address inconsistent home-router setup. When each
              router was configured differently, troubleshooting and maintenance
              also varied from installation to installation.
            </p>
            <p>
              I built a tool that could work offline, remain self-contained, and
              give technicians a direct way to generate standardized Mikrotik
              configurations.
            </p>
          </div>
          <EvidencePanel>
            <h3 className="type-title mb-4">Project highlights</h3>
            <EvidenceList>
              <EvidenceItem>Cross-platform desktop application</EvidenceItem>
              <EvidenceItem>Go and Wails implementation</EvidenceItem>
              <EvidenceItem>Offline operation</EvidenceItem>
              <EvidenceItem>Self-contained executable</EvidenceItem>
              <EvidenceItem>Standardized configuration generation</EvidenceItem>
            </EvidenceList>
          </EvidencePanel>
        </div>
      </CaseStudySection>

      <CaseStudySection title="Project Overview">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="type-body text-line-soft measure space-y-4">
            <p>
              The project began as a Python console application and later moved
              to a desktop interface built with Go and Wails.
            </p>
            <p>
              Technicians enter site and network parameters, and the application
              renders standardized configuration scripts that can be carried to
              Mikrotik routers.
            </p>
            <p>
              The iterations reflect the same fixed constraints: offline
              operation, a self-contained executable, cross-platform delivery,
              and a learnable interface.
            </p>
          </div>
          <EvidencePanel className="overflow-hidden p-0">
            <div className="border-b border-rule-leader p-4">
              <div className="aspect-video overflow-hidden">
                <Image
                  src={mcg2020}
                  alt="Mikrotik Configuration Generator desktop interface"
                  className="h-full w-full object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
            <div className="p-4">
              <h3 className="type-title mb-2">Technology stack</h3>
              <ul
                className="flex flex-wrap gap-2"
                aria-label="Technology stack"
              >
                {["Go", "Wails", "React", "Material UI", "HTML templates"].map(
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
            </div>
          </EvidencePanel>
        </div>
      </CaseStudySection>

      <CaseStudySection title="Challenges Faced">
        <div className="grid gap-8 md:grid-cols-3">
          <EvidencePanel>
            <h3 className="type-title mb-4">Technical requirements</h3>
            <p className="type-body text-line-soft">
              Offline operation and a self-contained executable constrained the
              viable frameworks and packaging approaches.
            </p>
          </EvidencePanel>
          <EvidencePanel>
            <h3 className="type-title mb-4">User experience</h3>
            <p className="type-body text-line-soft">
              The initial text user interface was functional but difficult for
              entry-level technicians to learn.
            </p>
          </EvidencePanel>
          <EvidencePanel>
            <h3 className="type-title mb-4">Cross-platform compatibility</h3>
            <p className="type-body text-line-soft">
              The application needed a lightweight desktop interface that could
              run across the technicians&apos; target laptops.
            </p>
          </EvidencePanel>
        </div>
        <EvidencePanel className="mt-8">
          <h3 className="type-title mb-4">Framework exploration</h3>
          <EvidenceList>
            <EvidenceItem>
              <strong className="text-line">Flutter Desktop:</strong> still in
              alpha at the time
            </EvidenceItem>
            <EvidenceItem>
              <strong className="text-line">Electron:</strong> too large a
              memory footprint for the target laptops
            </EvidenceItem>
            <EvidenceItem>
              <strong className="text-line">WinForms:</strong> a documented
              native desktop candidate
            </EvidenceItem>
            <EvidenceItem>
              <strong className="text-line">Fyne:</strong> a Go GUI candidate
            </EvidenceItem>
            <EvidenceItem>
              <strong className="text-line">.NET 5:</strong> Windows single-file
              executable support had moved to .NET 6
            </EvidenceItem>
          </EvidenceList>
        </EvidencePanel>
      </CaseStudySection>

      <CaseStudySection title="Solutions Implemented">
        <div className="grid gap-8 md:grid-cols-2">
          <EvidencePanel>
            <h3 className="type-title mb-4">
              Version 1.0: Python console program
            </h3>
            <p className="type-body text-line-soft">
              The first version proved configuration generation in a text-based
              interface, but duplicated template code and the TUI made it a poor
              long-term fit.
            </p>
            <EvidenceCode title="Python input validation excerpt">
              {`def input_validation(x):
    # syntax_breakers dictionary omitted from this excerpt
    syntax_breakers_list = list(syntax_breakers.keys())
    for c in x:
        for key in syntax_breakers_list:
            if c == key:
                x = x.replace(c, syntax_breakers.get(c))
                syntax_breakers_list.remove(c)
    return x`}
            </EvidenceCode>
          </EvidencePanel>
          <EvidencePanel>
            <h3 className="type-title mb-4">Version 2.0: Go with Wails</h3>
            <p className="type-body text-line-soft mb-4">
              The second version used Go and Wails for the desktop application.
            </p>
            <EvidenceList>
              <EvidenceItem>
                Go Embed packaged the embedded filesystem in the executable
              </EvidenceItem>
              <EvidenceItem>
                Go&apos;s standard library templates replaced duplicated
                configuration strings
              </EvidenceItem>
              <EvidenceItem>
                Wails supplied the desktop interface around the Go functions
              </EvidenceItem>
            </EvidenceList>
            <EvidenceCode title="Wails bindings excerpt">
              {`app.Bind(builder.BuildFiber)
app.Bind(builder.BuildeFiber)
app.Bind(builder.BuildRadio)
app.Bind(builder.BuildRouter)
app.Run()`}
            </EvidenceCode>
          </EvidencePanel>
        </div>
      </CaseStudySection>

      <CaseStudySection title="Results Achieved">
        <div className="grid gap-8 md:grid-cols-2">
          <EvidencePanel>
            <h3 className="type-title mb-4">Standardized output</h3>
            <p className="type-body text-line-soft">
              Technician-supplied parameters produce standardized configuration
              scripts for Mikrotik routers.
            </p>
          </EvidencePanel>
          <EvidencePanel>
            <h3 className="type-title mb-4">Offline delivery</h3>
            <p className="type-body text-line-soft">
              The desktop application packages its required files and runs
              without a network service.
            </p>
          </EvidencePanel>
        </div>
        <EvidencePanel className="mt-8">
          <h3 className="type-title mb-4">Published result</h3>
          <p className="type-body text-line-soft measure mb-4">
            The verifiable result is a self-contained desktop application that
            runs offline and generates standardized configuration scripts.
          </p>
          <p className="type-body text-line-soft measure">
            No timing, error-rate, adoption, or training metrics are claimed
            because none are published evidence for this case study.
          </p>
        </EvidencePanel>
      </CaseStudySection>

      <CaseStudySection title="Conclusion">
        <EvidencePanel>
          <p className="type-body text-line-soft measure mb-4">
            The project is a constraint-driven evolution from a Python console
            program to a Go and Wails application.
          </p>
          <p className="type-body text-line-soft measure">
            The final form addresses the offline, self-contained, and
            cross-platform constraints while keeping configuration generation
            consistent for technicians.
          </p>
        </EvidencePanel>
      </CaseStudySection>
    </main>
  );
}
