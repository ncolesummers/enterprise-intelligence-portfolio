import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ProgressCircleIcon } from "@/components/icons/progress-circle-icon";
import Link from "next/link";

export default function ProfileExtractorPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
        <div className="container flex h-14 items-center">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm hover:text-gray-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="container py-12 px-4">
        {/* Hero Section */}
        <div className="mb-16 flex flex-col items-center text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tighter md:text-6xl">
            AI Data Extraction Research
          </h1>
          <p className="mb-8 max-w-2xl text-xl text-gray-400">
            A research spike exploring the feasibility of using foundation
            models to extract faculty and staff profile data for the University
            of Idaho website
          </p>
        </div>

        {/* Introduction */}
        <section className="mb-16">
          <div className="mb-8 flex items-center">
            <h2 className="text-3xl font-bold">Introduction</h2>
            <div className="ml-4 h-px flex-1 bg-white/10"></div>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <p className="mb-4 text-lg text-gray-300">
                The Person Profile Data Extraction Spike was a feasibility study
                conducted to evaluate the potential of using foundation models
                to extract structured data from faculty and staff profile pages
                on the University of Idaho website.
              </p>
              <p className="text-lg text-gray-300">
                Rather than relying on a poorly documented legacy database, this
                approach aimed to directly extract key information from public
                profile pages, creating a more reliable and maintainable dataset
                for the university's website.
              </p>
            </div>
            <div className="rounded-lg bg-gray-800 p-6">
              <h3 className="mb-4 text-xl font-semibold">Project Highlights</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  92.79% success rate in extracting profile data
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  Cost-effective solution at $0.0012 per profile
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  Processed 901 URLs in under 2 hours
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  Used LangGraph state machine for orchestration
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  Implemented ethical web crawling practices
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Project Overview */}
        <section className="mb-16">
          <div className="mb-8 flex items-center">
            <h2 className="text-3xl font-bold">Project Overview</h2>
            <div className="ml-4 h-px flex-1 bg-white/10"></div>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <p className="mb-4 text-lg text-gray-300">
                The goal of this spike was to determine if foundation models
                could reliably extract structured data from faculty and staff
                profile pages on the University of Idaho website. The extracted
                data would include key fields such as Name, Title, Email,
                Degrees, and other information defined in the project's user
                story.
              </p>
              <p className="mb-4 text-lg text-gray-300">
                By leveraging AI models instead of relying on direct database
                access, the project aimed to create a more maintainable and
                flexible approach to keeping the university's website profile
                information up-to-date.
              </p>
              <p className="text-lg text-gray-300">
                The spike focused on evaluating the accuracy, cost, and
                performance of this approach to determine its feasibility for
                full-scale implementation.
              </p>
            </div>
            <div className="overflow-hidden rounded-lg bg-gray-800">
              <div className="aspect-video w-full bg-gray-700 p-4 flex items-center justify-center">
                <p className="text-center text-gray-400">
                  Profile Extraction Workflow
                </p>
              </div>
              <div className="p-4">
                <h3 className="mb-2 text-xl font-semibold">Technology Stack</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-md bg-white/10 px-2 py-1 text-sm">
                    Python
                  </span>
                  <span className="rounded-md bg-white/10 px-2 py-1 text-sm">
                    LangGraph
                  </span>
                  <span className="rounded-md bg-white/10 px-2 py-1 text-sm">
                    LangChain
                  </span>
                  <span className="rounded-md bg-white/10 px-2 py-1 text-sm">
                    Google Gemini
                  </span>
                  <span className="rounded-md bg-white/10 px-2 py-1 text-sm">
                    BeautifulSoup4
                  </span>
                  <span className="rounded-md bg-white/10 px-2 py-1 text-sm">
                    Pydantic
                  </span>
                  <span className="rounded-md bg-white/10 px-2 py-1 text-sm">
                    LangSmith
                  </span>
                  <span className="rounded-md bg-white/10 px-2 py-1 text-sm">
                    Pandas
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Approach & Methodology */}
        <section className="mb-16">
          <div className="mb-8 flex items-center">
            <h2 className="text-3xl font-bold">Approach & Methodology</h2>
            <div className="ml-4 h-px flex-1 bg-white/10"></div>
          </div>
          <div className="rounded-lg bg-gray-800 p-6 mb-8">
            <h3 className="mb-4 text-xl font-semibold">Three-Step Process</h3>
            <p className="mb-4 text-gray-300">
              The project followed a structured three-step approach to test the
              feasibility of using foundation models for profile data
              extraction:
            </p>
            <ol className="space-y-4 text-gray-300">
              <li className="flex items-start">
                <span className="mr-2 font-bold">1.</span>
                <div>
                  <strong>Identify Profiles:</strong>{" "}
                  Started with a list of known profile URLs stored in{" "}
                  <code>data/uidaho_urls.json</code>, generated by analyzing the
                  website's sitemap.xml file to identify faculty and staff
                  profile pages.
                </div>
              </li>
              <li className="flex items-start">
                <span className="mr-2 font-bold">2.</span>
                <div>
                  <strong>Crawl & Extract:</strong>{" "}
                  Processed these URLs using a LangGraph state machine with
                  steps for fetching pages, preprocessing HTML, extracting data
                  with foundation models, and validating the results.
                </div>
              </li>
              <li className="flex items-start">
                <span className="mr-2 font-bold">3.</span>
                <div>
                  <strong>Evaluate:</strong>{" "}
                  Analyzed the results based on accuracy (using an
                  LLM-as-a-judge pattern), cost, and processing time, with
                  detailed tracing and debugging via LangSmith.
                </div>
              </li>
            </ol>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-lg bg-gray-800 p-6">
              <h3 className="mb-4 text-xl font-semibold">
                LangGraph State Machine
              </h3>
              <p className="mb-4 text-gray-300">
                The core of the extraction process was implemented as a
                LangGraph state machine with the following key nodes:
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  <strong>fetch_page:</strong>{" "}
                  Retrieves HTML content respectfully (using configured delays)
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  <strong>preprocess_html:</strong>{" "}
                  Parses and cleans HTML using BeautifulSoup
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  <strong>extract_data:</strong>{" "}
                  Uses Gemini Flash to extract information into a Pydantic
                  schema
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  <strong>validate_data:</strong>{" "}
                  Employs an LLM-as-a-judge pattern to evaluate accuracy
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  <strong>handle_error:</strong>{" "}
                  Captures and logs errors at each step
                </li>
              </ul>
            </div>
            <div className="rounded-lg bg-gray-800 p-6">
              <h3 className="mb-4 text-xl font-semibold">
                Ethical Crawling Practices
              </h3>
              <p className="mb-4 text-gray-300">
                The project implemented responsible web crawling practices to
                ensure minimal impact on the university's web servers:
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  Configured delays between requests to prevent server overload
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  Respected robots.txt directives and crawl-delay settings
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  Used proper user-agent identification
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  Implemented error handling to back off on server errors
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  Limited concurrent requests to maintain server health
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Technical Implementation */}
        <section className="mb-16">
          <div className="mb-8 flex items-center">
            <h2 className="text-3xl font-bold">Technical Implementation</h2>
            <div className="ml-4 h-px flex-1 bg-white/10"></div>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-lg bg-gray-800 p-6">
              <h3 className="mb-4 text-xl font-semibold">Data Schemas</h3>
              <p className="mb-4 text-gray-300">
                Pydantic models were used to define the structure of the
                extracted data and validation results:
              </p>
              <div className="rounded-lg bg-gray-900 p-4">
                <h4 className="mb-2 text-sm font-medium text-gray-400">
                  ProfileData Schema
                </h4>
                <pre className="overflow-x-auto text-sm text-gray-300">
                  <code>{`class ProfileData(BaseModel):
    name: str
    title: str
    email: Optional[str] = None
    phone: Optional[str] = None
    office: Optional[str] = None
    department: Optional[str] = None
    degrees: Optional[List[str]] = None
    bio: Optional[str] = None
    research_interests: Optional[List[str]] = None
    courses_taught: Optional[List[str]] = None
    publications: Optional[List[str]] = None
    website: Optional[str] = None`}</code>
                </pre>
              </div>
              <div className="mt-4 rounded-lg bg-gray-900 p-4">
                <h4 className="mb-2 text-sm font-medium text-gray-400">
                  ValidationResult Schema
                </h4>
                <pre className="overflow-x-auto text-sm text-gray-300">
                  <code>{`class FieldValidation(BaseModel):
    field: str
    status: Literal["Correct", "Incorrect", "Missing"]
    explanation: Optional[str] = None

class ValidationResult(BaseModel):
    overall_accuracy: float
    field_validations: List[FieldValidation]
    suggestions: Optional[List[str]] = None`}</code>
                </pre>
              </div>
            </div>
            <div className="rounded-lg bg-gray-800 p-6">
              <h3 className="mb-4 text-xl font-semibold">LLM Integration</h3>
              <p className="mb-4 text-gray-300">
                The project leveraged Google's Gemini Flash model for both
                extraction and validation:
              </p>
              <div className="rounded-lg bg-gray-900 p-4">
                <h4 className="mb-2 text-sm font-medium text-gray-400">
                  Model Configuration
                </h4>
                <pre className="overflow-x-auto text-sm text-gray-300">
                  <code>{`# Initialize the Gemini model
extraction_model = ChatGoogleGenerativeAI(
    model="gemini-flash",
    temperature=0.1,
    convert_system_message_to_human=True,
    safety_settings={
        HarmCategory.HARM_CATEGORY_HARASSMENT: HarmBlockThreshold.BLOCK_NONE,
        HarmCategory.HARM_CATEGORY_HATE_SPEECH: HarmBlockThreshold.BLOCK_NONE,
        HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: HarmBlockThreshold.BLOCK_NONE,
        HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_NONE,
    }
)

# Initialize the validation model (same model, different instance)
validation_model = ChatGoogleGenerativeAI(
    model="gemini-flash",
    temperature=0.1,
    convert_system_message_to_human=True,
    safety_settings={
        HarmCategory.HARM_CATEGORY_HARASSMENT: HarmBlockThreshold.BLOCK_NONE,
        HarmCategory.HARM_CATEGORY_HATE_SPEECH: HarmBlockThreshold.BLOCK_NONE,
        HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: HarmBlockThreshold.BLOCK_NONE,
        HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_NONE,
    }
)`}</code>
                </pre>
              </div>
              <p className="mt-4 text-gray-300">
                The extraction process used structured prompts to guide the
                model in extracting specific fields from the HTML content, while
                the validation process employed an LLM-as-a-judge pattern to
                evaluate the accuracy of the extracted data.
              </p>
            </div>
          </div>
          <div className="mt-8 rounded-lg bg-gray-800 p-6">
            <h3 className="mb-4 text-xl font-semibold">
              Monitoring and Debugging
            </h3>
            <p className="mb-4 text-gray-300">
              LangSmith was used for comprehensive monitoring and debugging of
              the extraction process:
            </p>
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h4 className="mb-2 text-lg font-semibold">
                  LangSmith Features Used
                </h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    Detailed tracing of each step in the LangGraph state machine
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    Token usage tracking for cost estimation
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    Latency measurement for performance analysis
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    Error logging and categorization
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    Prompt inspection and refinement
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="mb-2 text-lg font-semibold">
                  Metrics Collected
                </h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    <strong>Accuracy:</strong>{" "}
                    Field-level correctness reported by the validation node
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    <strong>Token Usage:</strong>{" "}
                    Input, output, and total tokens per LLM call
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    <strong>Estimated Cost:</strong>{" "}
                    Calculated based on token usage and model pricing
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    <strong>Latency:</strong>{" "}
                    Processing time per profile and per node
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    <strong>Success Rate:</strong>{" "}
                    Percentage of URLs processed without errors
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="mb-16">
          <div className="mb-8 flex items-center">
            <h2 className="text-3xl font-bold">Results</h2>
            <div className="ml-4 h-px flex-1 bg-white/10"></div>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-gray-800 p-6">
              <h3 className="mb-4 text-xl font-semibold">Accuracy</h3>
              <div className="mb-4 flex items-center justify-center">
                <div className="relative h-32 w-32">
                  <ProgressCircleIcon percentage={92.8} className="h-32 w-32" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold">92.8%</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-300">
                <strong>Success Rate:</strong>{" "}
                92.79% (836 successful extractions out of 901 URLs)
              </p>
              <p className="mt-2 text-gray-300">
                <strong>Error Analysis:</strong>{" "}
                Of the 65 failed extractions, 64 (98.5%) were due to HTTP 404
                errors, indicating the URLs from the sitemap no longer exist on
                the website.
              </p>
            </div>
            <div className="rounded-lg bg-gray-800 p-6">
              <h3 className="mb-4 text-xl font-semibold">Cost</h3>
              <div className="mb-4 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-3xl font-bold">$0.0012</span>
                  <p className="text-sm text-gray-400">per profile</p>
                </div>
              </div>
              <p className="text-gray-300">
                <strong>Total Cost:</strong>{" "}
                $1.0254 for processing all 901 profiles
              </p>
              <p className="mt-2 text-gray-300">
                <strong>Token Usage:</strong>{" "}
                Average of 3,132 tokens per successful profile, with 2,618,463
                tokens used across all profiles
              </p>
            </div>
            <div className="rounded-lg bg-gray-800 p-6">
              <h3 className="mb-4 text-xl font-semibold">Performance</h3>
              <div className="mb-4 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-3xl font-bold">6.6s</span>
                  <p className="text-sm text-gray-400">per profile</p>
                </div>
              </div>
              <p className="text-gray-300">
                <strong>Total Time:</strong>{" "}
                1h 32m 27s for processing all 901 profiles
              </p>
              <p className="mt-2 text-gray-300">
                <strong>Note:</strong>{" "}
                Most processing time was due to intentional delays between
                requests to ensure ethical crawling of the university website.
              </p>
            </div>
          </div>
          <div className="mt-8 rounded-lg bg-gray-800 p-6">
            <h3 className="mb-4 text-xl font-semibold">Known Issues</h3>
            <div className="grid gap-8 md:grid-cols-3">
              <div>
                <h4 className="mb-2 text-lg font-semibold">Sitemap 404s</h4>
                <p className="text-gray-300">
                  The <code>uidaho.edu</code>{" "}
                  sitemap contains URLs that return 404 errors, indicating it's
                  outdated. Relying solely on the sitemap for comprehensive
                  coverage is not viable.
                </p>
              </div>
              <div>
                <h4 className="mb-2 text-lg font-semibold">HTML Variability</h4>
                <p className="text-gray-300">
                  The HTML structure of different faculty profile pages varies
                  (e.g., different class names, layouts). The{" "}
                  <code>preprocess_html</code>{" "}
                  step handled these variations well.
                </p>
              </div>
              <div>
                <h4 className="mb-2 text-lg font-semibold">
                  Multiple Profiles Page
                </h4>
                <p className="text-gray-300">
                  One failure occurred on a page listing multiple faculty
                  profiles (<code>/people/adjuncts</code>), which didn't conform
                  to the single-profile schema our extraction currently
                  supports.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Recommendations */}
        <section className="mb-16">
          <div className="mb-8 flex items-center">
            <h2 className="text-3xl font-bold">Recommendations</h2>
            <div className="ml-4 h-px flex-1 bg-white/10"></div>
          </div>
          <div className="rounded-lg bg-gray-800 p-6">
            <h3 className="mb-4 text-xl font-semibold">
              Feasibility Assessment
            </h3>
            <p className="mb-4 text-lg text-gray-300">
              The foundation model approach has proven highly feasible for
              extracting the required profile data, with a 92.79% success rate.
              Based on the results of this spike, I recommend proceeding with
              this approach for the full implementation.
            </p>
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h4 className="mb-2 text-lg font-semibold">Model Choice</h4>
                <p className="text-gray-300">
                  Gemini Flash provided excellent accuracy at a low cost
                  ($0.0012 per profile). Based on these results, evaluating more
                  expensive models like Claude 3.7 Sonnet or GPT-4o is
                  unnecessary.
                </p>
              </div>
              <div>
                <h4 className="mb-2 text-lg font-semibold">
                  Process Improvements
                </h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    Develop a more reliable strategy for identifying profile
                    URLs beyond the outdated sitemap
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    Consider a special handler for pages with multiple profiles
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    Split the nodes into files for better code organization
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    Move the prompts into the config file for easier maintenance
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section className="mb-16">
          <div className="mb-8 flex items-center">
            <h2 className="text-3xl font-bold">Next Steps</h2>
            <div className="ml-4 h-px flex-1 bg-white/10"></div>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-lg bg-gray-800 p-6">
              <h3 className="mb-4 text-xl font-semibold">Short-Term Actions</h3>
              <ol className="space-y-2 text-gray-300 list-decimal pl-5">
                <li>
                  <strong>Refine URL Discovery:</strong>{" "}
                  Develop a more reliable strategy for identifying profile URLs
                  beyond the outdated sitemap
                </li>
                <li>
                  <strong>Support Multiple Profiles:</strong>{" "}
                  Add support for pages containing multiple profiles
                </li>
                <li>
                  <strong>Documentation:</strong>{" "}
                  Update documentation with final findings and procedures
                </li>
                <li>
                  <strong>Code Refactoring:</strong>{" "}
                  Split the nodes into files and move prompts to the config file
                </li>
              </ol>
            </div>
            <div className="rounded-lg bg-gray-800 p-6">
              <h3 className="mb-4 text-xl font-semibold">Long-Term Vision</h3>
              <p className="mb-4 text-gray-300">
                This spike demonstrates the potential for using foundation
                models in other data extraction and integration scenarios at the
                university:
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  Expand to other types of university content (courses, events,
                  news)
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  Create an automated pipeline for regular updates to keep data
                  fresh
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  Develop a validation interface for human review of extracted
                  data
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  Integrate with the university's content management system
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Conclusion */}
        <section className="mb-16">
          <div className="mb-8 flex items-center">
            <h2 className="text-3xl font-bold">Conclusion</h2>
            <div className="ml-4 h-px flex-1 bg-white/10"></div>
          </div>
          <div className="rounded-lg bg-gray-800 p-6">
            <p className="mb-4 text-lg text-gray-300">
              The Person Profile Data Extraction Spike has successfully
              demonstrated the feasibility of using foundation models to extract
              structured data from faculty and staff profile pages on the
              University of Idaho website.
            </p>
            <p className="mb-4 text-lg text-gray-300">
              With a 92.79% success rate, low cost per profile ($0.0012), and
              reasonable processing time (6.6 seconds per profile), this
              approach has proven to be a viable solution for extracting faculty
              and staff profile data.
            </p>
            <p className="text-lg text-gray-300">
              The use of foundation models for this task not only eliminates the
              need to rely on poorly documented legacy databases but also
              provides a more flexible and maintainable approach to keeping the
              university's website profile information up-to-date. This
              successful spike paves the way for similar applications of AI in
              other data extraction and integration scenarios at the university.
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <h2 className="mb-6 text-3xl font-bold">
            Interested in similar solutions?
          </h2>
          <div className="flex justify-center gap-4">
            <Link href="/">
              <Button className="bg-white text-black hover:bg-gray-200">
                Back to Portfolio
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
