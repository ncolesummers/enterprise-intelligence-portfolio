import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { UploadIcon } from "@/components/icons/upload-icon";

export default function MikrotikConfigGenPage() {
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
            Mikrotik Configuration Generator
          </h1>
          <p className="mb-8 max-w-2xl text-xl text-gray-400">
            A desktop application that standardizes router configurations for
            ISP technicians
          </p>
          <div className="flex gap-4">
            <Link href="https://presentation.ncolesummers.com" target="_blank">
              <Button
                variant="outline"
                className="flex items-center gap-2 border-white/20 text-white hover:bg-white/10"
              >
                <UploadIcon className="h-4 w-4" />
                View Presentation
              </Button>
            </Link>
          </div>
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
                The Mikrotik Configuration Generator was developed for First
                Step Internet to address the lack of standardization in home
                router installations. Without standards, each router was
                configured uniquely, increasing the complexity of
                troubleshooting and maintenance.
              </p>
              <p className="text-lg text-gray-300">
                As the developer, I needed to create a solution that would work
                offline, be self-contained, and provide a simple interface for
                technicians to generate standardized configurations for Mikrotik
                routers.
              </p>
            </div>
            <div className="rounded-lg bg-gray-800 p-6">
              <h3 className="mb-4 text-xl font-semibold">Project Highlights</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  Cross-platform desktop application
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  Built with Go and Wails framework
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  Evolved through multiple iterations and technologies
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  Simplified workflow for ISP technicians
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  Self-contained executable with embedded filesystem
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
                The Mikrotik Configuration Generator went through several
                iterations, starting as a Python console application and
                eventually evolving into a modern desktop application built with
                Go and Wails.
              </p>
              <p className="mb-4 text-lg text-gray-300">
                The application allows technicians to input customer and network
                details through a simple interface, then generates standardized
                configuration scripts for Mikrotik routers. These scripts can be
                directly applied to the routers, ensuring consistent setup
                across all installations.
              </p>
              <p className="text-lg text-gray-300">
                The project's evolution reflects a journey through different
                technologies and approaches, each addressing specific
                requirements and constraints.
              </p>
            </div>
            <div className="overflow-hidden rounded-lg bg-gray-800">
              <div className="aspect-video w-full bg-gray-700 p-4 flex items-center justify-center">
                <p className="text-center text-gray-400">
                  Mikrotik Configuration Generator UI
                </p>
              </div>
              <div className="p-4">
                <h3 className="mb-2 text-xl font-semibold">Technology Stack</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-md bg-white/10 px-2 py-1 text-sm">
                    Go
                  </span>
                  <span className="rounded-md bg-white/10 px-2 py-1 text-sm">
                    Wails
                  </span>
                  <span className="rounded-md bg-white/10 px-2 py-1 text-sm">
                    ReactJS
                  </span>
                  <span className="rounded-md bg-white/10 px-2 py-1 text-sm">
                    Material UI
                  </span>
                  <span className="rounded-md bg-white/10 px-2 py-1 text-sm">
                    HTML Templates
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Challenges Faced */}
        <section className="mb-16">
          <div className="mb-8 flex items-center">
            <h2 className="text-3xl font-bold">Challenges Faced</h2>
            <div className="ml-4 h-px flex-1 bg-white/10"></div>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-gray-800 p-6">
              <h3 className="mb-4 text-xl font-semibold">
                Technical Requirements
              </h3>
              <p className="text-gray-300">
                The application needed to work offline and be a self-contained
                executable, which limited the choice of frameworks and
                technologies.
              </p>
            </div>
            <div className="rounded-lg bg-gray-800 p-6">
              <h3 className="mb-4 text-xl font-semibold">User Experience</h3>
              <p className="text-gray-300">
                The initial TUI (Text User Interface) was easy to develop but
                difficult for entry-level technicians to learn and use
                efficiently.
              </p>
            </div>
            <div className="rounded-lg bg-gray-800 p-6">
              <h3 className="mb-4 text-xl font-semibold">
                Cross-Platform Compatibility
              </h3>
              <p className="text-gray-300">
                Finding a framework that could produce a lightweight,
                cross-platform application with a modern UI proved challenging.
              </p>
            </div>
          </div>
          <div className="mt-8 rounded-lg bg-gray-800 p-6">
            <h3 className="mb-4 text-xl font-semibold">
              Framework Exploration
            </h3>
            <p className="mb-4 text-gray-300">
              Several frameworks were considered during development:
            </p>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start">
                <span className="mr-2 text-primary">•</span>
                <strong>Flutter Desktop</strong>{" "}
                - Too new and still in alpha at the time
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary">•</span>
                <strong>Electron</strong>{" "}
                - Memory footprint was too high for the target laptops
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary">•</span>
                <strong>Winforms</strong>{" "}
                - Well-documented and supported native solution
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary">•</span>
                <strong>Fyne</strong>{" "}
                - The GUI library written in Go with the most stars on Github
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary">•</span>
                <strong>C# with .NET 5.0</strong>{" "}
                - Single File Executables for Windows were pushed back to .NET
                6.0
              </li>
            </ul>
          </div>
        </section>

        {/* Solutions Implemented */}
        <section className="mb-16">
          <div className="mb-8 flex items-center">
            <h2 className="text-3xl font-bold">Solutions Implemented</h2>
            <div className="ml-4 h-px flex-1 bg-white/10"></div>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-xl font-semibold">
                Version 1.0: Python Console Program
              </h3>
              <p className="mb-4 text-gray-300">
                The initial version was a Python console application with a
                text-based interface. While functional, it had limitations:
              </p>
              <ul className="mb-4 space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  Lots of duplicated code, particularly in string templates
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  TUI was difficult for entry-level technicians to learn
                </li>
              </ul>
              <div className="rounded-lg bg-gray-900 p-4">
                <h4 className="mb-2 text-sm font-medium text-gray-400">
                  Example Python Function
                </h4>
                <pre className="overflow-x-auto text-sm text-gray-300">
                  <code>{`def input_validation(x):
    '''This function substitutes characters that will break
    Mikrotik Scripting Syntax with their
    corresponding hex code.'''
    syntax_breakers = {
        '[': '\\5B',
        ']': '\\5C',
        '(': '\\28',
        ')': '\\29',
        '$': '\\$',
        '?': '\\?',
        '{': '\\7B',
        '}': '\\7D',
        ':': '\\3A',
        ';': '\\3B',
        '\\': '\\\\'
    }
    syntax_breakers_list = list(syntax_breakers.keys())
    for c in x:
        for key in syntax_breakers_list:
            if c == key:
                x = x.replace(c, syntax_breakers.get(c))
                syntax_breakers_list.remove(c)
    return x`}</code>
                </pre>
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-xl font-semibold">
                Version 2.0: Go with Wails
              </h3>
              <p className="mb-4 text-gray-300">
                The final solution was built with Go and Wails, which offered
                several advantages:
              </p>
              <ul className="mb-4 space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  Go's Embed feature made it trivial to include an entire
                  filesystem in the binary
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  The templating engine in Go's standard library allowed reuse
                  of templates with minor changes
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  Wails provided a modern UI framework that met all project
                  requirements
                </li>
              </ul>
              <div className="rounded-lg bg-gray-900 p-4">
                <h4 className="mb-2 text-sm font-medium text-gray-400">
                  Example Go Code
                </h4>
                <pre className="overflow-x-auto text-sm text-gray-300">
                  <code>{`app := wails.CreateApp(&wails.AppConfig{
    Width:     576,
    Height:    576,
    Title:     "Mikrotik Configuration Generator v" + version,
    JS:        js,
    CSS:       css,
    Colour:    "#131313",
    Resizable: true,
})

app.Bind(builder.BuildFiber)
app.Bind(builder.BuildeFiber)
app.Bind(builder.BuildRadio)
app.Bind(builder.BuildRouter)
app.Run()`}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Results Achieved */}
        <section className="mb-16">
          <div className="mb-8 flex items-center">
            <h2 className="text-3xl font-bold">Results Achieved</h2>
            <div className="ml-4 h-px flex-1 bg-white/10"></div>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-lg bg-gray-800 p-6">
              <h3 className="mb-4 text-xl font-semibold">
                Standardized Configurations
              </h3>
              <p className="text-gray-300">
                The application successfully standardized router configurations,
                reducing the complexity of troubleshooting and maintenance.
                Technicians could now generate consistent configurations with
                minimal training.
              </p>
            </div>
            <div className="rounded-lg bg-gray-800 p-6">
              <h3 className="mb-4 text-xl font-semibold">
                Improved Efficiency
              </h3>
              <p className="text-gray-300">
                The intuitive UI significantly reduced the time required to
                configure routers, allowing technicians to complete
                installations more quickly and with fewer errors.
              </p>
            </div>
          </div>
          <div className="mt-8 rounded-lg bg-gray-800 p-6">
            <h3 className="mb-4 text-xl font-semibold">
              Technical Achievements
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start">
                <span className="mr-2 text-primary">•</span>
                Created a cross-platform desktop application that works offline
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary">•</span>
                Developed a self-contained executable with an embedded
                filesystem
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary">•</span>
                Built a modern UI that's easy for entry-level technicians to use
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary">•</span>
                Implemented a templating system for generating configuration
                scripts
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary">•</span>
                Successfully navigated through multiple technologies to find the
                optimal solution
              </li>
            </ul>
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
              The Mikrotik Configuration Generator project demonstrates the
              importance of selecting the right tools for specific requirements.
              Through multiple iterations and technology explorations, the final
              solution successfully addressed the need for standardized router
              configurations.
            </p>
            <p className="mb-4 text-lg text-gray-300">
              The journey from a text-based interface to a modern desktop
              application highlights the evolution of the project and the
              developer's commitment to finding the optimal solution. The final
              product not only met the technical requirements but also provided
              a user-friendly experience for technicians.
            </p>
            <p className="text-lg text-gray-300">
              Looking forward, there are opportunities for further improvement,
              such as adding animations, swapping Material UI components for
              Headless UI and TailwindCSS, or potentially rebuilding with newer
              frameworks like .NET 6/MAUI or Tauri.
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <h2 className="mb-6 text-3xl font-bold">
            Interested in learning more?
          </h2>
          <div className="flex justify-center gap-4">
            <Link href="https://presentation.ncolesummers.com" target="_blank">
              <Button
                variant="outline"
                className="flex items-center gap-2 border-white/20 text-white hover:bg-white/10"
              >
                <UploadIcon className="h-4 w-4" />
                View Presentation
              </Button>
            </Link>
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
