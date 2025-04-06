"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { PlayIcon } from "@/components/icons/play-icon";
import ContentCard from "@/components/ui/content-card";
import BulletedList, { ListItem } from "@/components/ui/bulleted-list";
import Section from "@/components/ui/section";

export default function MyUIPage() {
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
            MyUI Dashboard
          </h1>
          <p className="mb-8 max-w-2xl text-xl text-gray-400">
            A modernized online dashboard streamlining access to university
            services for the University of Idaho community
          </p>
          <div className="flex gap-4">
            <Link href="https://my.uidaho.edu" target="_blank">
              <Button
                variant="outline"
                className="flex items-center gap-2 border-white/20 text-white hover:bg-white/10"
              >
                <PlayIcon className="h-4 w-4" />
                Visit MyUI
              </Button>
            </Link>
          </div>
        </div>

        {/* Introduction */}
        <Section title="Introduction">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <p className="mb-4 text-lg text-gray-300">
                MyUI at the University of Idaho is a modernized online dashboard
                designed to streamline access to various university services for
                students, faculty, and staff. It replaced the older VandalWeb
                system on September 9, 2024.
              </p>
              <p className="text-lg text-gray-300">
                As the lead developer on this project, I was responsible for
                creating custom React components and cards that integrate
                seamlessly with the Ellucian Experience platform, providing
                users with a unified and personalized experience.
              </p>
            </div>
            <ContentCard>
              <h3 className="mb-4 text-xl font-semibold">Project Highlights</h3>
              <BulletedList>
                <ListItem>
                  Modernized dashboard replacing legacy VandalWeb system
                </ListItem>
                <ListItem>Built on the Ellucian Experience platform</ListItem>
                <ListItem>
                  Customizable interface with card-based architecture
                </ListItem>
                <ListItem>Mobile-friendly responsive design</ListItem>
                <ListItem>
                  Single sign-on integration with university credentials
                </ListItem>
              </BulletedList>
            </ContentCard>
          </div>
        </Section>

        {/* Project Overview */}
        <Section title="Project Overview">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <p className="mb-4 text-lg text-gray-300">
                MyUI offers a unified, personalized experience with features
                organized into &quot;cards,&quot; which categorize and integrate
                different administrative and academic functions into one
                platform.
              </p>
              <p className="mb-4 text-lg text-gray-300">
                The dashboard consolidates tools like financial aid management,
                course registration, academic records, housing information, and
                faculty advising into a single interface, significantly
                improving the user experience for the entire university
                community.
              </p>
              <p className="text-lg text-gray-300">
                Users can configure their dashboard with cards relevant to their
                needs, creating a personalized experience that prioritizes the
                information and tools most important to them.
              </p>
            </div>
            <div className="overflow-hidden rounded-lg bg-gray-800">
              <div className="aspect-video w-full bg-gray-700 p-4 flex items-center justify-center">
                <p className="text-center text-gray-400">
                  MyUI Dashboard Interface
                </p>
              </div>
              <div className="p-4">
                <h3 className="mb-2 text-xl font-semibold">Technology Stack</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-md bg-white/10 px-2 py-1 text-sm">
                    React
                  </span>
                  <span className="rounded-md bg-white/10 px-2 py-1 text-sm">
                    JavaScript
                  </span>
                  <span className="rounded-md bg-white/10 px-2 py-1 text-sm">
                    CSS
                  </span>
                  <span className="rounded-md bg-white/10 px-2 py-1 text-sm">
                    Ellucian Experience API
                  </span>
                  <span className="rounded-md bg-white/10 px-2 py-1 text-sm">
                    Ethos Integration
                  </span>
                  <span className="rounded-md bg-white/10 px-2 py-1 text-sm">
                    Ethos BP APIs
                  </span>
                  <span className="rounded-md bg-white/10 px-2 py-1 text-sm">
                    RabbitMQ
                  </span>
                  <span className="rounded-md bg-white/10 px-2 py-1 text-sm">
                    RESTful APIs
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Key Features */}
        <Section title="Key Features">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <ContentCard>
              <h3 className="mb-4 text-xl font-semibold">Centralized Access</h3>
              <p className="text-gray-300">
                MyUI consolidates tools like financial aid management, course
                registration, academic records, housing information, and faculty
                advising into a single interface.
              </p>
            </ContentCard>
            <ContentCard>
              <h3 className="mb-4 text-xl font-semibold">
                Customizable Dashboard
              </h3>
              <p className="text-gray-300">
                Users can configure their dashboard with cards relevant to their
                needs, such as class schedules, library resources, health and
                wellness services, and more.
              </p>
            </ContentCard>
            <ContentCard>
              <h3 className="mb-4 text-xl font-semibold">Single Sign-On</h3>
              <p className="text-gray-300">
                It allows seamless login using University of Idaho credentials
                for all integrated systems, eliminating the need for multiple
                logins.
              </p>
            </ContentCard>
            <ContentCard>
              <h3 className="mb-4 text-xl font-semibold">
                Mobile-Friendly Interface
              </h3>
              <p className="text-gray-300">
                Designed for accessibility on both desktop and mobile devices,
                ensuring students and faculty can access important information
                from anywhere.
              </p>
            </ContentCard>
          </div>
        </Section>

        {/* My Role */}
        <section className="mb-16">
          <div className="mb-8 flex items-center">
            <h2 className="text-3xl font-bold">My Role as Lead Developer</h2>
            <div className="ml-4 h-px flex-1 bg-white/10"></div>
          </div>
          <div className="mb-8">
            <p className="mb-4 text-lg text-gray-300">
              I was chosen as the lead developer for the MyUI dashboard due to
              my advanced skillset with React and deep understanding of user
              experience design principles. My responsibilities included:
            </p>
            <BulletedList className="mb-4">
              <ListItem>
                Designing and implementing custom React components for the
                dashboard
              </ListItem>
              <ListItem>
                Creating specialized cards for different university services
              </ListItem>
              <ListItem>
                Ensuring seamless integration with the Ellucian Experience
                platform
              </ListItem>
              <ListItem>
                Collaborating with university departments to understand their
                specific needs
              </ListItem>
              <ListItem>
                Implementing responsive design principles for cross-device
                compatibility
              </ListItem>
            </BulletedList>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <ContentCard>
              <h3 className="mb-4 text-xl font-semibold">
                Library Card Development
              </h3>
              <p className="mb-4 text-gray-300">
                One of my key contributions was the development of the Library
                Card, which allows students to:
              </p>
              <BulletedList>
                <ListItem>
                  Reserve study rooms directly from the dashboard
                </ListItem>
                <ListItem>
                  Book time on 3D printers and other specialized equipment
                </ListItem>
                <ListItem>
                  Check availability of library resources in real-time
                </ListItem>
                <ListItem>
                  Access digital collections and research databases
                </ListItem>
              </BulletedList>
            </ContentCard>

            <ContentCard>
              <h3 className="mb-4 text-xl font-semibold">
                Accounts and Billings Card
              </h3>
              <p className="mb-4 text-gray-300">
                Another significant component I developed was the Accounts and
                Billings card, which leverages Ethos Business Process APIs to:
              </p>
              <BulletedList>
                <ListItem>
                  Display real-time account balances and financial information
                </ListItem>
                <ListItem>
                  Show detailed transaction history with filtering capabilities
                </ListItem>
                <ListItem>
                  Integrate with payment providers through the Ethos serverless
                  API pipeline
                </ListItem>
                <ListItem>
                  Provide notifications for upcoming payment deadlines
                </ListItem>
              </BulletedList>
            </ContentCard>
          </div>

          <div className="mt-8 rounded-lg bg-gray-900 p-4">
            <h4 className="mb-2 text-sm font-medium text-gray-400">
              Code Availability Notice
            </h4>
            <p className="text-gray-300">
              The code for these components and other custom elements of the
              MyUI dashboard is proprietary and protected under the University
              of Idaho&apos;s intellectual property policies. As such, the
              actual implementation details cannot be shared publicly.
            </p>
            <p className="mt-2 text-gray-300">
              The component architecture follows React best practices with a
              focus on modularity, reusability, and performance optimization.
              The implementation includes custom hooks for resource fetching,
              state management for reservation systems, and responsive UI
              elements.
            </p>
          </div>
        </section>

        {/* Benefits */}
        <section className="mb-16">
          <div className="mb-8 flex items-center">
            <h2 className="text-3xl font-bold">
              Benefits for the University Community
            </h2>
            <div className="ml-4 h-px flex-1 bg-white/10"></div>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <ContentCard>
              <h3 className="mb-4 text-xl font-semibold">For Students</h3>
              <p className="text-gray-300">
                Simplifies workflows by integrating academic planning tools,
                assignment tracking, and registration processes in one place. It
                also displays important deadlines and notifications to help
                students stay organized.
              </p>
            </ContentCard>
            <ContentCard>
              <h3 className="mb-4 text-xl font-semibold">For Faculty</h3>
              <p className="text-gray-300">
                Provides tools for advising and course management, including
                access to student GPAs, class loads, and the ability to manage
                holds directly from the dashboard.
              </p>
            </ContentCard>
            <ContentCard>
              <h3 className="mb-4 text-xl font-semibold">For Administration</h3>
              <p className="text-gray-300">
                Increases efficiency by reducing the need to navigate multiple
                systems, centralizing all essential university functions into
                one platform, and providing better data insights.
              </p>
            </ContentCard>
          </div>
        </section>

        {/* Technical Implementation */}
        <section className="mb-16">
          <div className="mb-8 flex items-center">
            <h2 className="text-3xl font-bold">Technical Implementation</h2>
            <div className="ml-4 h-px flex-1 bg-white/10"></div>
          </div>
          <ContentCard>
            <h3 className="mb-4 text-xl font-semibold">
              React Component Architecture
            </h3>
            <p className="mb-4 text-gray-300">
              The MyUI dashboard is built using a modular React component
              architecture, allowing for:
            </p>
            <BulletedList>
              <ListItem>
                <strong>Reusable Components:</strong> Core UI elements that
                maintain consistency across the platform
              </ListItem>
              <ListItem>
                <strong>Service-Specific Cards:</strong> Custom components for
                different university departments
              </ListItem>
              <ListItem>
                <strong>API Integration:</strong> Seamless connection to
                university data systems
              </ListItem>
              <ListItem>
                <strong>State Management:</strong> Efficient handling of user
                preferences and data
              </ListItem>
              <ListItem>
                <strong>Responsive Design:</strong> Adaptive layouts for all
                device sizes
              </ListItem>
            </BulletedList>
          </ContentCard>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <ContentCard>
              <h3 className="mb-4 text-xl font-semibold">
                Integration Challenges
              </h3>
              <p className="mb-4 text-gray-300">
                Working with the Ellucian Experience platform presented several
                integration challenges:
              </p>
              <BulletedList>
                <ListItem>
                  Adapting to platform-specific APIs and authentication flows
                </ListItem>
                <ListItem>
                  Ensuring consistent performance across different university
                  systems
                </ListItem>
                <ListItem>
                  Managing data synchronization between legacy systems and the
                  new dashboard
                </ListItem>
              </BulletedList>
            </ContentCard>
            <ContentCard>
              <h3 className="mb-4 text-xl font-semibold">
                Performance Optimization
              </h3>
              <p className="mb-4 text-gray-300">
                To ensure a smooth user experience, several performance
                optimizations were implemented:
              </p>
              <BulletedList>
                <ListItem>
                  Lazy loading of card components to reduce initial load time
                </ListItem>
                <ListItem>
                  Caching strategies for frequently accessed data
                </ListItem>
                <ListItem>
                  Optimized rendering with React.memo and useCallback
                </ListItem>
                <ListItem>
                  Efficient state management to minimize re-renders
                </ListItem>
              </BulletedList>
            </ContentCard>
          </div>
        </section>

        {/* Ethos Integration */}
        <section className="mb-16">
          <div className="mb-8 flex items-center">
            <h2 className="text-3xl font-bold">Ethos Integration</h2>
            <div className="ml-4 h-px flex-1 bg-white/10"></div>
          </div>
          <ContentCard>
            <h3 className="mb-4 text-xl font-semibold">
              Leveraging Ellucian Ethos Platform
            </h3>
            <p className="mb-4 text-lg text-gray-300">
              A critical aspect of the MyUI project was its integration with
              Ellucian&apos;s Ethos platform, a cloud-based integration solution
              designed specifically for higher education institutions. As lead
              developer, I worked extensively with Ethos Business Process APIs
              to connect the dashboard with the university&apos;s core systems.
            </p>
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h4 className="mb-2 text-lg font-semibold">
                  Ethos Integration Approach
                </h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">•</span>
                    <div>
                      <strong>Data Integration:</strong> Utilized Ethos&apos;s
                      hub-and-spoke model to replace point-to-point integrations
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">•</span>
                    <div>
                      <strong>API Implementation:</strong> Leveraged pre-built
                      APIs and the Ellucian Ethos Data Model
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">•</span>
                    <div>
                      <strong>Identity Management:</strong> Implemented secure
                      single sign-on using SAML2 protocols
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">•</span>
                    <div>
                      <strong>Workflow Automation:</strong> Created custom
                      workflows using Ethos Business Process APIs
                    </div>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="mb-2 text-lg font-semibold">
                  Business Process API Implementation
                </h4>
                <p className="mb-4 text-gray-300">
                  For the Library Card component and other key features, I
                  implemented Ethos Business Process APIs to:
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">•</span>
                    <div>
                      Access real-time data about library resource availability
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">•</span>
                    <div>
                      Process room and equipment reservations through serverless
                      API pipelines
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">•</span>
                    <div>
                      Implement event publishing for real-time updates across
                      integrated systems
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">•</span>
                    <div>
                      Ensure secure data transmission using HTTPS TLS v1.2+ and
                      API key authentication
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </ContentCard>
          <div className="mt-8 rounded-lg bg-gray-800 p-6">
            <h3 className="mb-4 text-xl font-semibold">
              Technical Challenges and Solutions
            </h3>
            <p className="mb-4 text-gray-300">
              Working with Ethos Business Process APIs presented several
              technical challenges that required innovative solutions:
            </p>
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h4 className="mb-2 text-lg font-semibold">Challenges</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">•</span>
                    <div>
                      <strong>Data Model Complexity:</strong> Navigating the
                      extensive Ethos Data Model structure
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">•</span>
                    <div>
                      <strong>API Rate Limiting:</strong> Managing API call
                      frequency to prevent throttling
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">•</span>
                    <div>
                      <strong>Real-time Updates:</strong> Ensuring timely data
                      synchronization across systems
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">•</span>
                    <div>
                      <strong>Authentication Flows:</strong> Implementing
                      secure, seamless authentication
                    </div>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="mb-2 text-lg font-semibold">Solutions</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">•</span>
                    <div>
                      <strong>Custom Data Adapters:</strong> Created adapters to
                      transform and normalize data
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">•</span>
                    <div>
                      <strong>Caching Strategy:</strong> Implemented intelligent
                      caching to reduce API calls
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">•</span>
                    <div>
                      <strong>Event-Driven Architecture:</strong> Used RabbitMQ
                      for real-time messaging
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">•</span>
                    <div>
                      <strong>Token Management:</strong> Developed a robust
                      token refresh mechanism
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-4 rounded-lg bg-gray-900 p-4">
              <h4 className="mb-2 text-sm font-medium text-gray-400">
                Implementation Note
              </h4>
              <p className="text-gray-300">
                While the specific implementation details are proprietary, the
                integration approach followed Ellucian&apos;s best practices for
                Ethos Integration. This included using the hub-and-spoke model
                for data integration, implementing secure API calls, and
                leveraging the Ethos Data Model for consistent data
                representation across the platform.
              </p>
            </div>
          </div>
        </section>

        {/* Results and Impact */}
        <section className="mb-16">
          <div className="mb-8 flex items-center">
            <h2 className="text-3xl font-bold">Results and Impact</h2>
            <div className="ml-4 h-px flex-1 bg-white/10"></div>
          </div>
          <div className="rounded-lg bg-gray-800 p-6">
            <p className="mb-4 text-lg text-gray-300">
              The launch of MyUI has significantly improved the digital
              experience for the University of Idaho community:
            </p>
            <ul className="mb-4 space-y-2 text-gray-300">
              <li className="flex items-start">
                <span className="mr-2 text-primary">•</span>
                <strong className="mr-2">Increased Efficiency:</strong> Reduced
                time spent navigating between different university systems
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary">•</span>
                <strong className="mr-2">Improved Accessibility:</strong>{" "}
                Mobile-friendly design allows access from any device
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary">•</span>
                <strong className="mr-2">
                  Enhanced User Satisfaction:
                </strong>{" "}
                Positive feedback from students and faculty on the intuitive
                interface
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary">•</span>
                <strong className="mr-2">Streamlined Processes: </strong>{" "}
                Simplified administrative tasks for both students and staff
              </li>
            </ul>
            <p className="text-lg text-gray-300">
              The Library Card component, in particular, has seen high
              engagement rates, with a significant increase in study room
              reservations and 3D printer usage since its implementation.
            </p>
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
              The MyUI project represents a significant modernization of the
              University of Idaho&apos;s digital infrastructure. As lead
              developer, I was able to leverage my React expertise to create a
              user-friendly, efficient platform that serves the diverse needs of
              the university community.
            </p>
            <p className="mb-4 text-lg text-gray-300">
              The card-based architecture provides flexibility for future
              expansion, allowing new services to be integrated seamlessly as
              the university&apos;s needs evolve. The successful implementation
              of MyUI demonstrates the power of modern web technologies to
              transform institutional systems.
            </p>
            <p className="text-lg text-gray-300">
              Looking forward, there are opportunities to further enhance the
              platform with additional personalization options, deeper
              integration with academic tools, and expanded mobile capabilities.
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <h2 className="mb-6 text-3xl font-bold">
            Interested in learning more?
          </h2>
          <div className="flex justify-center gap-4">
            <Link href="https://my.uidaho.edu" target="_blank">
              <Button
                variant="outline"
                className="flex items-center gap-2 border-white/20 text-white hover:bg-white/10"
              >
                <PlayIcon className="h-4 w-4" />
                Visit MyUI
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
