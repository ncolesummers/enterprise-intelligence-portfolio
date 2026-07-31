import { ArrowRight } from "lucide-react";
import Link from "next/link";
import {
  PlateUIdaho,
  PlateMyUI,
  PlateProfileExtractor,
  PlateMikrotik,
  PlateForthcoming,
} from "@/components/figures/index-plates";
import { cn } from "@/lib/utils";

/**
 * The figure index.
 *
 * A sheet of figures the visitor can scan at once, rather than a procession
 * that forces sequence. Evaluators compare candidates under time pressure, so
 * depth stays one click away and never in the way.
 *
 * FIG. 1 is not repeated here. It is drawn at full scale immediately above,
 * and a thumbnail of the figure the visitor just read would be noise. Its way
 * into the case study is the caption of the drawing itself.
 *
 * The ADLC entry is gone: per PRODUCT.md it retires as a standalone study and
 * folds into Loopworks as lineage, which the Loopworks case study now carries.
 */

type Figure = {
  numeral: number;
  title: string;
  description: string;
  tags: readonly string[];
  href?: string;
  plate?: React.ReactNode;
  /** Exact structural fact exposed to assistive technology for a decorative plate. */
  plateDescription?: string;
  /** Set when the system itself is undrawn, not merely the plate. */
  forthcoming?: boolean;
};

const figures: readonly Figure[] = [
  {
    numeral: 2,
    title: "University of Idaho website",
    description:
      "A redesign of the university's public website built with Sitecore, Next.js, TypeScript, Storybook, and Azure services.",
    tags: ["TypeScript", "Next.js", "Sitecore"],
    href: "/projects/uidaho-website",
    plate: <PlateUIdaho />,
    plateDescription:
      "Sitecore holds authored content. A separate Next.js application renders it for delivery on Azure.",
  },
  {
    numeral: 3,
    title: "MyUI",
    description:
      "Lead developer on the university's modernized student dashboard, building custom React components on Ellucian Experience.",
    tags: ["JavaScript", "React", "Ellucian Experience"],
    href: "/projects/myui",
    plate: <PlateMyUI />,
    plateDescription:
      "Custom React components are seated inside the Ellucian Experience shell; the platform is not owned by the University of Idaho.",
  },
  {
    numeral: 4,
    title: "AI data extraction research",
    description:
      "A research spike on whether foundation models could extract faculty and staff profile data reliably enough to trust.",
    tags: ["Python", "LangGraph", "Gemini Flash"],
    href: "/projects/profile-extractor",
    plate: <PlateProfileExtractor />,
    plateDescription:
      "Source pages pass through a LangGraph extraction step into structured profiles, followed by verification. The research spike asked a feasibility question and checked the answer.",
  },
  {
    numeral: 5,
    title: "Mikrotik configuration generator",
    description:
      "A self-contained desktop tool that standardizes router configurations for ISP technicians, and runs with no network at all.",
    tags: ["Go", "Wails", "React"],
    href: "/projects/mikrotik-config-gen",
    plate: <PlateMikrotik />,
  },
  {
    numeral: 6,
    title: "Inbox Idaho",
    description:
      "An Outlook add-in using retrieval-augmented generation to draft replies to incoming questions. Not yet launched, and nothing about it is measured.",
    tags: ["RAG", "Outlook add-in"],
    plate: <PlateForthcoming />,
    forthcoming: true,
  },
];

/**
 * One figure's cell.
 *
 * The whole cell is the way in, not a label at the foot of it. The title carries
 * the link and its hit area is stretched over the cell with an inset overlay, so
 * the plate — the largest thing in the cell, and the thing a reader actually aims
 * at — leads where it looks like it should. One link per cell, named by the
 * project, which is also the most useful name in a screen reader's list of links.
 *
 * The state is drawn rather than lit: the cell's own rule goes from leader ink to
 * object ink, and the title takes the annotation red. That is the same vocabulary
 * FIG. 1's parts use when pointed at, and it needs no shadow and no fill.
 *
 * The overlay does mean text inside a linked cell cannot be selected. That is the
 * cost of the pattern, and it is worth paying on a cell whose entire purpose is to
 * be followed.
 */
const Cell = ({ figure }: { figure: Figure }) => (
  <article
    className={cn(
      "rule-leader relative flex h-full flex-col p-5 transition-colors",
      figure.href &&
        "group hover:border-rule-object focus-within:border-rule-object",
    )}
  >
    <div className="flex items-baseline gap-3">
      <span className="type-label shrink-0">FIG. {figure.numeral}</span>
      {figure.forthcoming && (
        <span className="type-label text-line-soft">Forthcoming</span>
      )}
    </div>

    <figure className="mt-5 mb-6">
      {figure.plate ?? (
        <svg
          viewBox="0 0 320 170"
          fill="none"
          aria-hidden="true"
          focusable="false"
          className="w-full"
        >
          <rect className="fig-leader" x={8} y={20} width={304} height={130} />
          <text className="fig-box-sub" x={160} y={89}>
            Plate in preparation
          </text>
        </svg>
      )}
      {figure.plateDescription && (
        <figcaption className="sr-only">{figure.plateDescription}</figcaption>
      )}
    </figure>

    <h3
      className={cn(
        "type-title mt-auto transition-colors",
        figure.href && "group-hover:text-annotation",
      )}
    >
      {figure.href ? (
        <Link href={figure.href} className="after:absolute after:inset-0">
          {figure.title}
        </Link>
      ) : (
        figure.title
      )}
    </h3>
    <p className="type-body text-line-soft mt-3 text-[0.9375rem]">
      {figure.description}
    </p>

    <ul className="mt-4 flex flex-wrap gap-2">
      {figure.tags.map(tag => (
        <li key={tag} className="type-label rule-leader px-2 py-1">
          {tag}
        </li>
      ))}
    </ul>

    {/* The cue, not the control. The title above is the link, so announcing this
        too would put the same destination in the tab order twice under two
        different names. It stays visible because a cell has to look followable
        before it is pointed at. */}
    {figure.href && (
      <p
        aria-hidden="true"
        className="type-label text-line-soft group-hover:text-annotation mt-5 flex items-center gap-2 transition-colors"
      >
        Read FIG. {figure.numeral}
        <ArrowRight className="h-3 w-3" />
      </p>
    )}
  </article>
);

const FigureIndex = () => (
  <section id="work" className="pt-24 pb-20">
    <div className="rule-object flex flex-wrap items-baseline gap-x-4 gap-y-1 border-0 border-b pb-4">
      <h2 className="type-label shrink-0">Figure index</h2>
      <p className="type-label text-line-soft">Figures 2 through 6</p>
    </div>

    <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {figures.map(figure => (
        <Cell key={figure.numeral} figure={figure} />
      ))}
    </div>
  </section>
);

export default FigureIndex;
