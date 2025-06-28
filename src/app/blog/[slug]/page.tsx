import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Section from "@/components/ui/section";
import { generatePageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

// Placeholder blog post data - will be replaced with MDX content later
const placeholderPosts = {
  "microservice-architecture-lessons": {
    title: "5 Lessons from Building Microservice Architectures",
    excerpt: "Key insights from years of designing and implementing microservice systems in enterprise environments.",
    content: `
      <p>After years of building and maintaining microservice architectures in enterprise environments, 
      I've learned several key lessons that can make the difference between a successful implementation 
      and a distributed monolith nightmare.</p>

      <h2>1. Start with a Monolith</h2>
      <p>This might sound counterintuitive, but starting with a well-structured monolith allows you to 
      understand your domain boundaries before committing to service boundaries. Premature optimization 
      into microservices often leads to incorrect service boundaries that are expensive to fix later.</p>

      <h2>2. Service Boundaries Should Follow Business Boundaries</h2>
      <p>The most successful microservice architectures I've seen align service boundaries with business 
      capabilities, not technical layers. A "User Service" makes more sense than a "Database Service".</p>

      <h2>3. Invest Heavily in Observability</h2>
      <p>You can't debug what you can't see. Distributed tracing, centralized logging, and comprehensive 
      metrics are not optional in a microservice architecture. They're fundamental requirements.</p>

      <h2>4. Embrace Eventual Consistency</h2>
      <p>Trying to maintain strict consistency across services defeats the purpose of microservices. 
      Design your system to handle eventual consistency, and educate your stakeholders about what this means.</p>

      <h2>5. Automate Everything</h2>
      <p>The operational overhead of microservices is real. Without comprehensive automation for deployment, 
      testing, and monitoring, you'll spend all your time on operations instead of delivering value.</p>
    `,
    date: "2024-01-15",
    readTime: "8 min read",
    tags: ["Architecture", "Microservices", "Enterprise"],
    author: "Nathan Cole Summers"
  },
  "typescript-in-enterprise": {
    title: "Why TypeScript is Essential for Enterprise Applications",
    excerpt: "Exploring the benefits of strong typing and developer experience improvements in large-scale applications.",
    content: `
      <p>TypeScript has become the de facto standard for large-scale JavaScript applications, and for good reason. 
      After migrating several enterprise applications from JavaScript to TypeScript, I've seen firsthand the 
      transformative impact it can have on code quality and developer productivity.</p>

      <h2>The Case for Strong Typing</h2>
      <p>In enterprise applications, where multiple teams work on the same codebase and business logic can be 
      complex, TypeScript's type system provides invaluable guardrails. It catches errors at compile time that 
      would otherwise surface in production.</p>

      <h2>Developer Experience Benefits</h2>
      <p>Modern IDEs leverage TypeScript's type information to provide superior autocomplete, refactoring tools, 
      and inline documentation. This dramatically improves developer productivity, especially when working with 
      unfamiliar parts of a large codebase.</p>

      <h2>Living Documentation</h2>
      <p>Well-written TypeScript interfaces and types serve as living documentation. They communicate intent and 
      constraints more clearly than comments ever could, and they're guaranteed to stay in sync with the code.</p>
    `,
    date: "2024-01-10",
    readTime: "6 min read",
    tags: ["TypeScript", "Enterprise", "Best Practices"],
    author: "Nathan Cole Summers"
  },
  "ai-integration-patterns": {
    title: "Practical AI Integration Patterns for Modern Applications",
    excerpt: "Real-world patterns and best practices for integrating AI capabilities into existing enterprise systems.",
    content: `
      <p>Integrating AI into existing enterprise applications doesn't have to be overwhelming. Through several 
      successful implementations, I've identified patterns that make AI integration both practical and maintainable.</p>

      <h2>The Gateway Pattern</h2>
      <p>Instead of directly integrating AI providers into your services, use an AI Gateway service. This provides 
      a consistent interface, handles rate limiting, and makes it easy to switch providers or models without 
      changing your application code.</p>

      <h2>Prompt Management as Code</h2>
      <p>Treat your prompts like code. Version them, test them, and deploy them through your standard CI/CD pipeline. 
      This ensures consistency and makes it easy to roll back problematic changes.</p>

      <h2>Graceful Degradation</h2>
      <p>AI services can fail or be slow. Always design your integration with fallback mechanisms. Your application 
      should continue to provide value even when AI features are unavailable.</p>
    `,
    date: "2024-01-05",
    readTime: "10 min read",
    tags: ["AI", "Integration", "Architecture"],
    author: "Nathan Cole Summers"
  }
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = placeholderPosts[slug as keyof typeof placeholderPosts];
  
  if (!post) {
    return generatePageMetadata({
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
      path: `/blog/${slug}`
    });
  }

  return generatePageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${slug}`
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = placeholderPosts[slug as keyof typeof placeholderPosts];

  if (!post) {
    return (
      <div className="min-h-screen bg-black text-white">
        <header className="sticky top-0 left-2 z-50 w-full border-b border-white/10 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60 px-4">
          <div className="container flex h-14 items-center">
            <Link
              href="/blog"
              className="flex items-center gap-2 text-sm hover:text-gray-300"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </div>
        </header>

        <main className="container py-12 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-6 text-4xl font-bold">Post Not Found</h1>
            <p className="mb-8 text-xl text-gray-400">
              The blog post you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link href="/blog">
              <Button className="bg-white text-black hover:bg-gray-200">
                View All Posts
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  // Find adjacent posts for navigation
  const postSlugs = Object.keys(placeholderPosts);
  const currentIndex = postSlugs.indexOf(slug);
  const prevSlug = currentIndex > 0 ? postSlugs[currentIndex - 1] : null;
  const nextSlug = currentIndex < postSlugs.length - 1 ? postSlugs[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 left-2 z-50 w-full border-b border-white/10 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60 px-4">
        <div className="container flex h-14 items-center">
          <Link
            href="/blog"
            className="flex items-center gap-2 text-sm hover:text-gray-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </div>
      </header>

      <main className="container py-12 px-4">
        <article className="max-w-3xl mx-auto">
          {/* Post Header */}
          <header className="mb-12 text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tighter md:text-5xl">
              {post.title}
            </h1>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
              <span>by {post.author}</span>
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm rounded-full bg-white/10 text-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {/* Post Content */}
          <div 
            className="prose prose-invert prose-lg max-w-none mb-16"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Post Navigation */}
          <nav className="flex items-center justify-between border-t border-white/10 pt-8">
            {prevSlug ? (
              <Link 
                href={`/blog/${prevSlug}`}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
                <div className="text-left">
                  <div className="text-sm">Previous</div>
                  <div className="font-medium">
                    {placeholderPosts[prevSlug as keyof typeof placeholderPosts].title}
                  </div>
                </div>
              </Link>
            ) : (
              <div />
            )}
            
            {nextSlug ? (
              <Link 
                href={`/blog/${nextSlug}`}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-right"
              >
                <div>
                  <div className="text-sm">Next</div>
                  <div className="font-medium">
                    {placeholderPosts[nextSlug as keyof typeof placeholderPosts].title}
                  </div>
                </div>
                <ChevronRight className="h-5 w-5" />
              </Link>
            ) : (
              <div />
            )}
          </nav>
        </article>

        {/* Call to Action */}
        <Section title="Stay Connected" className="text-center mt-16">
          <p className="mb-8 text-lg text-gray-400 max-w-2xl mx-auto">
            Want to discuss this article or share your thoughts on {post.tags[0].toLowerCase()}? 
            I&apos;d love to hear from you.
          </p>
          <div className="flex justify-center gap-4">
            <a href="mailto:n_cole_summers@icloud.com">
              <Button className="bg-white text-black hover:bg-gray-200">
                Get in Touch
              </Button>
            </a>
            <Link href="/blog">
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                More Articles
              </Button>
            </Link>
          </div>
        </Section>
      </main>

      <footer className="border-t border-white/10 py-6 mt-16">
        <div className="container px-4 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Nathan Cole Summers. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}